import express from "express";
import admin from "firebase-admin";
import fs from "fs/promises";
import fsSync from "fs";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";
import validator from "validator";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { v4 as uuidv4 } from "uuid";
import { Server as SocketIOServer } from "socket.io";
import bodyParser from "body-parser";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import mpesaRoutes from "./routes/mpesaRoutes.js";
import nodemailer from "nodemailer";
import twilio from "twilio";
import otpRoutes from "./routes/otpRoutes.js";

dotenv.config();

// Firebase Admin Initialization
async function startServer() {
  const fileContent = await fs.readFile("mpesaConfig.json", "utf8");
  const config = JSON.parse(fileContent);
  const mpesaConfig = config.mpesa;

  const serviceAccount = JSON.parse(
    await fs.readFile(
      new URL("./serviceAccountKey.json", import.meta.url),
      "utf-8",
    ),
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET,
  });

  const db = admin.firestore();
  const bucket = admin.storage().bucket();

  const app = express();
  const PORT = process.env.PORT || 5000;

  // Create HTTP server
  const httpServer = createServer(app);
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: "http://localhost:5173", // Match your frontend
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    },
  });

  // Setup WebSocket event listeners
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Example event
    socket.on("test-message", (data) => {
      console.log("Received from user:", data);
      socket.emit("server-response", { message: "Hello from server" });
    });
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  // Middleware
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // Image upload setup
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const uploadDir = path.join(__dirname, "uploads");

  if (!fsSync.existsSync(uploadDir)) {
    fsSync.mkdirSync(uploadDir, { recursive: true });
  }

  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname)),
  });

  const upload = multer({
    storage: multerStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (allowedTypes.includes(file.mimetype)) cb(null, true);
      else cb(new Error("Only JPG, PNG, and WEBP files are allowed"), false);
    },
  });

  app.use("/uploads", express.static(uploadDir));

  app.use("/api/auth", otpRoutes);

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json());

  app.use("/api/mpesa", mpesaRoutes);

  app.use("/api/otp", otpRoutes);

  // API Routes
  app.get("/", (req, res) => res.send("Server is running..."));

  //Add a new slider image
  app.post("/api/slider-images", upload.single("image"), async (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const { title, alt } = req.body;
    const safeName = req.file.originalname
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9._-]/g, "");
    const GMFileName = `slider-images/${Date.now()}_${safeName}`;
    const file = bucket.file(GMFileName);
    let responseSent = false;

    const stream = file.createWriteStream({
      metadata: { contentType: req.file.mimetype },
    });

    stream.on("error", (err) => {
      if (!responseSent) {
        responseSent = true;
        console.error("File upload error:", err);
        res.status(500).json({ success: false, message: "File upload failed" });
      }
    });

    stream.on("finish", async () => {
      try {
        await file.makePublic();
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${GMFileName}`;

        const docRef = await db.collection("sliderImages").add({
          src: imageUrl,
          title,
          alt,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
          storagePath: GMFileName,
        });

        io.emit("slider-image-added", { imageUrl, id: docRef.id });

        if (!responseSent) {
          responseSent = true;
          res.json({ success: true, imageUrl, id: docRef.id });
        }
      } catch (err) {
        if (!responseSent) {
          responseSent = true;
          console.error("Post-upload error", err);
          res.status(500).json({
            success: false,
            message: "Error after Course category upload finish:",
          });
        }
      }

      await fs.unlink(req.file.path).catch(() => {});
    });

    try {
      stream.end(await fs.readFile(req.file.path));
    } catch (readErr) {
      console.error("Read file error:", readErr);
      res
        .status(500)
        .json({ success: false, message: "Failed to read uploaded file" });
    }
  });

  // Email transporter (Gmail Example)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Twilio setup
  const twilioClient = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH_TOKEN,
  );

  let otpStore = {};

  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Send OTP
  app.post("/send-otp", async (req, res) => {
    const { contact } = req.body; // type = 'email' or 'phone'
    const otp = generateOTP();
    const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

    otpStore[contact] = { otp, expiry };

    try {
      if (contact.includes("@")) {
        //send via email
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: contact,
          subject: "Your OTP Code",
          text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
        });
      } else {
        //send via SMS
        await twilioClient.messages.create({
          body: `Your OTP is ${otp}. It will expire in 5 minutes.`,
          from: process.env.TWILIO_PHONE,
          to: contact,
        });
      }

      res.json({ success: true, message: "OTP sent successfully" }); // You might store this OTP in DB/session instead of sending back
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to send OTP", error });
    }
  });

  // Verify OTP

  app.post("/verify-otp", (req, res) => {
    const { contact, otp } = req.body;

    if (!otpStore[contact]) {
      return res.status(400).json({
        success: false,
        message: "No OTP found. Please request a new one.",
      });
    }

    const { otp: storedOtp, expiry } = otpStore[contact];

    if (Date.now() > expiry) {
      delete otpStore[contact];
      return res.status(400).json({
        success: false,
        message: "OTP expired. Please request again.",
      });
    }

    if (otp === storedOtp) {
      delete otpStore[contact];
      return res.json({ success: true, message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
  });

  // Fetch Slider Images
  app.get("/slider-images", async (req, res) => {
    try {
      const querySnapshot = await db
        .collection("sliderImages")
        .orderBy("timestamp", "desc")
        .get();
      const images = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.json(images);
    } catch (err) {
      console.error("Fetch error:", err);
      res.status(500).json({ error: "Failed to fetch images" });
    }
  });

  //Delete a slider image

  app.delete("/slider-images/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const docRef = db.collection("sliderImages").doc(id);
      const doc = await docRef.get();

      if (!doc.exists)
        return res
          .status(404)
          .json({ success: false, message: "Image not found" });

      const { storagePath } = doc.data();

      // Delete from Firebase Storage
      if (storagePath) {
        await bucket.file(storagePath).delete();
      }

      // Delete from Firestore
      await docRef.delete();

      // 🔄 Emit deletion to clients
      io.emit("slider-image-deleted", { id });

      res.json({ success: true });
    } catch (err) {
      console.error("Delete error:", err);
      res
        .status(500)
        .json({ success: false, message: "Failed to delete image" });
    }
  });

  app.post("/api/register", upload.single("profilePic"), async (req, res) => {
    try {
      const { fullname, username, email, phone, password, confirmPassword } =
        req.body;

      if (
        !fullname ||
        !username ||
        !email ||
        !phone ||
        !password ||
        !confirmPassword
      ) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "Profile picture is required" });
      }

      if (!validator.isEmail(email)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email" });
      }

      const clientsSnapshot = await db
        .collection("clients")
        .where("email", "==", email)
        .get();

      if (!clientsSnapshot.empty) {
        return res
          .status(400)
          .json({ success: false, message: "Email already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const localPath = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;

      const clientData = {
        fullname,
        username,
        email,
        phone,
        password: hashedPassword,
        profilePic: localPath,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      const docRef = db.collection("clients").doc(uid).set(clientData);

      res.status(201).json({
        success: true,
        message: "Client registered successfully",
        id: docRef.id,
        profilePic: localPath,
      });
    } catch (error) {
      console.error("ERROR in Local User Registration:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  });

  // Start server
  // 404 Handler
  app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
  });

  httpServer.listen(PORT, () => {
    console.log(`Server + Socket.IO running on http://localhost:${PORT}`);
  });

  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    try {
      const snapshot = await db
        .collection("clients")
        .where("username", "==", username)
        .limit(1)
        .get();

      if (snapshot.empty) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
      const doc = snapshot.docs[0];
      const client = doc.data();

      const isMatch = await bcrypt.compare(password, client.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      res.status(200).json({
        id: doc.id,
        username: client.username,
        fullname: client.fullname,
        email: client.email,
        profilePic: client.profilePic,
        cart: client.cart || [],
        wishlist: client.wishlist || [],
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error during login" });
    }
  });

  //Upload image to Firebase Storage
  app.post("/api/upload", upload.single("image"), async (req, res) => {
    try {
      const { title, alt, type } = req.body;
      if (!req.file)
        return res.status(400).json({ error: "No file uploaded." });

      const fileName = `${uuidv4()}_${req.file.originalname}`;
      const file = bucket.file(`uploads/${fileName}`);

      await file.save(req.file.buffer, {
        metadata: {
          contentType: req.file.mimetype,
          metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
          },
        },
      });

      const url = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURIComponent(`uploads/${fileName}`)}?alt=media`;

      // Save metadata to Firestore
      await db.collection(type || "images").add({
        title,
        alt,
        imageUrl: url,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res.status(200).json({ message: "Upload successful", url });
    } catch (error) {
      console.error("Upload Error:", error.message);
      return res
        .status(500)
        .json({ error: "Upload failed", details: error.message });
    }
  });

  {
    /*
  app.post("/api/checkout", (req, res) => {
    const cart = req.body;
    console.log("Received checkout cart:", cart);

    res.json({
      success: true,
      data: {
        mpesa: true,
        airtel: true,
        visa: true,
        mastercard: true,
      },
    });
  }); */
  }

  // ==== 🔧 Endpoint to update M-Pesa and other payment configs ====

  app.get("/api/payment-config", (req, res) => {
    res.json({
      success: true,
      data: {
        mpesa: true,
        airtel: true,
        visa: true,
        mastercard: true,
      },
    });
  });

  app.post("/api/payment-config", async (req, res) => {
    const { consumerKey, consumerSecret, shortcode, passkey, callbackURL } =
      req.body;
    if (
      !consumerKey ||
      !consumerSecret ||
      !shortcode ||
      !passkey ||
      !callbackURL
    ) {
      return res
        .status(400)
        .json({ error: "All M-Pesa config fields are required" });
    }

    try {
      await db.collection("site").doc("paymentConfig").set(
        {
          mpesa: {
            consumerKey,
            consumerSecret,
            shortcode,
            passkey,
            callbackURL,
          },
        },
        { merge: true },
      );
      return res.status(200).json({ message: "M-Pesa config updated" });
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to update config", details: err.message });
    }
  });

  // STK Push Endpoint
  app.post("/api/mpesa/stk-push", async (req, res) => {
    try {
      const { phone, amount } = req.body;
      if (!phone || !amount)
        return res.status(400).json({ error: "Missing phone or amount" });

      // Get M-Pesa credentials from Firestore
      const configDoc = await db.collection("site").doc("paymentConfig").get();
      const config = configDoc.exists ? configDoc.data().mpesa : null;

      if (!config)
        return res
          .status(500)
          .json({ error: "M-Pesa configuration missing in Firestore." });

      const { consumerKey, consumerSecret, shortcode, passkey, callbackURL } =
        config;

      // Step 1: Get access token
      const authBuffer = Buffer.from(
        `${consumerKey}:${consumerSecret}`,
      ).toString("base64");

      const tokenResponse = await axios.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
          headers: { Authorization: `Basic ${authBuffer}` },
        },
      );
      const accessToken = tokenResponse.data.access_token;

      // Step 2: Generate password
      const timestamp = new Date()
        .toISOString()
        .replace(/[^0-9]/g, "")
        .slice(0, 14);

      const password = Buffer.from(
        `${shortcode}${passkey}${timestamp}`,
      ).toString("base64");

      // Step 3: Send STK Push
      const stkPayload = {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: shortcode,
        PhoneNumber: phone,
        CallBackURL: callbackURL,
        AccountReference: "ThesisMinds",
        TransactionDesc: "Payment for Thesis",
      };

      const stkResponse = await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        stkPayload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        },
      );

      return res
        .status(200)
        .json({ message: "STK push sent", data: stkResponse.data });
    } catch (err) {
      console.error("M-Pesa Error:", err?.response?.data || err.message);
      return res.status(500).json({
        error: "Failed to process STK push",
        details: err?.response?.data || err.message,
      });
    }
  });

  app.post("/api/mpesa/callback", express.json(), async (req, res) => {
    const body = req.body;

    console.log("📲 M-Pesa Callback received:", JSON.stringify(body, null, 2));

    if (body.Body?.stkCallback) {
      const callback = body.Body.stkCallback;

      const checkoutRequestID = callback.CheckoutRequestID;
      const resultCode = callback.ResultCode;
      const resultDesc = callback.ResultDesc;

      const metadata = callback.CallbackMetadata?.Item || [];

      const amount = metadata.find((i) => i.Name === "Amount")?.Value || null;
      const mpesaReceipt =
        metadata.find((i) => i.Name === "MpesaReceiptNumber")?.Value || null;
      const phone =
        metadata.find((i) => i.Name === "PhoneNumber")?.Value || null;

      // ✅ Save to Firestore if the transaction was successful
      if (resultCode === 0 && mpesaReceipt && amount && phone) {
        const paymentData = {
          phone,
          amount,
          mpesaReceipt,
          checkoutRequestID,
          resultDesc,
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        };
        try {
          await admin.firestore().collection("payments").add(paymentData);
          console.log("💾 Payment saved to Firestore:", paymentData);
        } catch (err) {
          console.error("🔥 Failed to save payment:", err.message);
        }
      } else {
        console.warn("⚠️ Transaction not successful or missing data");
      }

      res.status(200).json({ message: "Callback received" });
    } else {
      console.error("⚠️ Malformed M-Pesa callback");
      res.status(400).json({ error: "Invalid callback format" });
    }
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
