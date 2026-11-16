import express from "express";
import axios from "axios";
import moment from "moment";
import { getMpesaConfig } from "../utils/getMpesaConfig.js";

const router = express.Router();

router.post("/stkpush", async (req, res) => {
  const { phone, amount } = req.body;

  const mpesa = getMpesaConfig();

  const auth = Buffer.from(
    `${mpesa.consumerKey}:${mpesa.consumerSecret}`
  ).toString("base64");

  try {
    // Step 1: Get Access Token
    const tokenResponse = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Step 2: Prepare STK Push Payload
    const timestamp = moment().format("YYYYMMDDHHmmss");

    const password = Buffer.from(
      mpesa.shortcode + mpesa.passkey + timestamp
    ).toString("base64");

    const payload = {
      BusinessShortCode: mpesa.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: mpesa.shortcode,
      PhoneNumber: phone,
      CallBackURL: mpesa.callbackURL,
      AccountReference: "REF123", // can be dynamic
      TransactionDesc: "Payment for goods",
    };

    // Step 3: Make STK Push Request
    const stkResponse = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      message: "STK Push request sent successfully",
      response: stkResponse.data,
    });
  } catch (error) {
    console.error("STK Push Error:", error?.response?.data || error.message);
    res.status(500).json({
      error: "STK Push failed",
      details: error?.response?.data || error.message,
    });
  }
});

export default router;
