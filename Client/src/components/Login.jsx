import React, { useState, useContext } from "react";
import BackButton from "../components/BackButton";
import { ClientContext } from "../../contexts/ClientContext.jsx";
import "../assets/css/clientstartup.css";
import "./LoginValidation";
import startupVideo from "/images/clientstartup/online-shopping(1).mp4";
import logo from "../assets/images/logo/GMBizLogo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import LoginValidation from "./LoginValidation";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, query, where, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase.js";

const Login = () => {
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  const { setClient } = useContext(ClientContext);
  const [errors, setErrors] = useState();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setLoginValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    const { email, password } = loginValues;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const docRef = doc(db, "clients", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setErrors("User profile not found.");
        return;
      }
      const clientData = { id: docSnap.id, ...docSnap.data() };
      setClient(clientData);
      localStorage.setItem("client", JSON.stringify(clientData));

      if (clientData.profilePic) {
        localStorage.setItem("profileImage", clientData.profilePic);
      }

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setErrors("Invalid email or password.");
    }
  };

  return (
    <div className="loginPage flex">
      <BackButton />

      <div className="loginContainer flex">
        <div className="videoDiv">
          <video src={startupVideo} autoPlay muted loop />
          <div className="textDiv">
            <h2 className="title">Join US</h2>
          </div>
          <div className="clientstartupContainerFooterDiv">
            <Link to="/register">
              <span className="noAccountText me-4">Don't have an Account?</span>
            </Link>
            <Link to="/register">
              <button className="btn btnText">Sign UP</button>
            </Link>
          </div>
        </div>
        <div className="formDiv">
          <div className="formHeaderDiv">
            <img src={logo} alt="GM Business Services Logo" />
            <h3>Welcome Back!!</h3>
          </div>
          <form action="" onSubmit={handleSubmit} className="form grid">
            <div className="inputDiv">
              <label htmlFor="email">Email</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  onChange={handleInput}
                  name="email"
                  required
                />
              </div>
            </div>
            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={handleInput}
                  name="password"
                  required
                />
              </div>
            </div>
            {errors && <p style={{ color: "red" }}>{errors}</p>}
            <button type="submit" className="btn flex btnText">
              <span>Log IN</span>
              <AiOutlineSwapRight className="icon" />
            </button>
            <a
              onClick={() => {
                const email = loginValues.email;
                if (!email) {
                  alert("Please enter your email first.");
                  return;
                }
                sendPasswordResetEmail(auth, email)
                  .then(() => alert("Password reset link sent!"))
                  .catch((error) => alert("Error: " + error.message));
              }}
              className="mb-4 flex cursor-pointer text-blue-600 hover:underline"
            >
              <span className="forgotPasswordText me-2">
                Forgot your Password!?
              </span>
              <span className="clickHereText">Click Here</span>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
