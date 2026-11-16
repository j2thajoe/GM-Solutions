import React, { useState, useContext } from "react";
import BackButton from "../components/BackButton";
import { ClientContext } from "../../contexts/ClientContext.jsx";
import "../assets/css/clientstartup.css";
import "./RegisterValidation";
import { Link, useNavigate } from "react-router-dom";
import startupVideo from "/images/clientstartup/generalgoods-short-video.mp4";
import logo from "../assets/images/logo/GMBizLogo.jpeg";
import { FaUser, FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase.js";

const Register = () => {
  const navigate = useNavigate();
  const { setClient } = useContext(ClientContext);
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const currentUser = JSON.parse(localStorage.getItem("client"));

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { email, password, confirmPassword, fullname, username, phone } =
        formData;

      if (password !== confirmPassword) {
        return setError("Passwords do not match.");
      }

      console.log("Creating user...");

      //1. Create Auth User
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      console.log("Auth User created:", user.uid);

      //upload profile pic if exists
      let profilePicUrl = "";
      if (profilePic) {
        profilePicUrl = await convertFileToBase64(profilePic);
        localStorage.setItem("profilePic", profilePicUrl);
      }

      //save user data to Firestore
      const clientsSnapshot = await getDocs(collection(db, "clients"));
      const isFirstUser = clientsSnapshot.empty;

      const clientData = {
        fullname,
        username,
        email,
        phone,
        profilePic: profilePicUrl,
        isAdmin: false,
        createdAt: serverTimestamp(),
      };

      //SAVE TO FIRESTORE
      await setDoc(doc(db, "clients", user.uid), clientData);
      console.log("Saved to Firestore");

      await signInWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(user);
      alert("Verification email sent. Please check your mail inbox.");

      //READ BACK FROM FIRESTORE
      const userSnap = await getDoc(doc(db, "clients", user.uid));

      if (userSnap.exists()) {
        const client = { id: user.uid, ...userSnap.data() };
        setClient(client);
        console.log("Client registered successfully:", client);
      }

      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        try {
          const loginResult = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user = loginResult.user;
          console.warn("Email already registered. Logged in instead.");

          const storedClient = {
            id: user.uid,
            fullname,
            username,
            email,
            phone,
            profilePic: profilePic ? await convertFileToBase64(profilePic) : "",
          };
          localStorage.setItem("client", JSON.stringify(storedClient));
          setClient(storedClient);

          navigate("/");
        } catch (loginError) {
          console.error(
            "Login after failed registration also failed:",
            loginError,
          );
          setError(
            "Email already in use. Login attempt failed. Please try logging in.",
          );
        }
      } else {
        console.error("Registration error:", err);
        setError(err.message || "Registration failed");
      }
    }
  };

  return (
    <div className="registerPage flex">
      <BackButton />

      <div className="registerContainer flex">
        <div className="videoDiv">
          <video src={startupVideo} autoPlay muted loop />
          <div className="textDiv">
            <h2 className="title">Welcome BACK</h2>
          </div>
          <div className="clientstartupContainerFooterDiv">
            <Link to="/login">
              <span className="noAccountText me-4">
                Already have an Account??
              </span>
            </Link>
            <Link to="/login">
              <button className="btn btnText">Log IN</button>
            </Link>
          </div>
        </div>
        <div className="formDiv">
          <div className="formHeaderDiv">
            <img src={logo} alt="GM Business Services Logo" />
            <h3>Join US</h3>
          </div>
          <form onSubmit={handleSubmit} className="form grid">
            <div className="inputDiv">
              {/* <label htmlFor="fullname">Fullname</label> */}
              <div className="input flex">
                <FaUser className="icon" />
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="Enter your Fullname"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="inputDiv">
              {/* <label htmlFor="username">Username</label> */}
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  className="input"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your Username"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="inputDiv">
              {/*  <label htmlFor="username">Email</label> */}
              <div className="input flex">
                <FaEnvelope className="icon" />
                <input
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {/* Profile Pic Upload */}
            <div className="inputDiv">
              <label htmlFor="profilePic" className="flex flex-col">
                <span>Choose Profile Picture</span>
                <input
                  type="file"
                  name="profilePic"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="inputDiv">
              {/*  <label htmlFor="phonenumber">Phonenumber</label> */}
              <div className="input flex">
                <FaPhone className="icon" />
                <input
                  type="text"
                  name="phone"
                  id="phonenumber"
                  placeholder="Enter your Phonenumber"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="inputDiv">
              {/* <label htmlFor="password">Password</label> */}
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your Password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="inputDiv">
              {/* <label htmlFor="password">Confirm Password</label> */}
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm your Password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            {currentUser?.isAdmin && (
              <div className="inputDiv">
                <label>
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                  />{" "}
                  Register as an Administrator
                </label>
              </div>
            )}

            <br />
            <div className="validation">
              <div className="validation-check">
                <label htmlFor="validation">
                  <input type="checkbox" name="terms&conditions" required />I
                  agree to the terms and conditions
                </label>
              </div>
            </div>
            <button type="submit" className="btn flex btnText mt-4 mb-4">
              <span>Sign UP</span>
              <AiOutlineSwapRight className="icon" />
            </button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
