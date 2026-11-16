// src/services/authService.js
import { auth } from "../../firebase/config.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );
  }
  return window.recaptchaVerifier;
};

export const sendOTP = async (phone) => {
  const appVerifier = setupRecaptcha();
  return await signInWithPhoneNumber(auth, phone, appVerifier);
};
