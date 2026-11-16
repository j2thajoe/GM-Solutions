// PaymentVerification.jsx
import React, { useState } from "react";
import { auth, db, setUpRecaptcha } from "./firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const PaymentVerification = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState("");
  const [status, setStatus] = useState("");
  const [verifying, setVerifying] = useState(false);

  const sendCode = async () => {
    if (!phone || !receipt || !amount) return alert("Fill all fields");

    try {
      setUpRecaptcha();
      const formatted = phone.startsWith("+")
        ? phone
        : "+254" + phone.slice(-9);
      const confirmation = await signInWithPhoneNumber(
        auth,
        formatted,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      alert("Verification code sent!");
    } catch (err) {
      alert("Error sending code: " + err.message);
    }
  };

  const verifyCode = async () => {
    if (!code || !confirmationResult) return;

    setVerifying(true);
    try {
      await confirmationResult.confirm(code);

      const paymentRef = doc(db, "payments", receipt);
      await setDoc(paymentRef, {
        phone,
        amount,
        receipt,
        verified: true,
        timestamp: serverTimestamp(),
      });

      setStatus("✅ Payment Verified & Saved");
    } catch (err) {
      setStatus("❌ Verification failed: " + err.message);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h2>Confirm M-Pesa Payment</h2>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone (e.g. 0712...)"
      />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <input
        value={receipt}
        onChange={(e) => setReceipt(e.target.value)}
        placeholder="M-Pesa Receipt Number"
      />
      <div id="recaptcha-container"></div>
      <button onClick={sendCode}>Send SMS Code</button>

      {confirmationResult && (
        <>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter SMS Code"
          />
          <button onClick={verifyCode} disabled={verifying}>
            {verifying ? "Verifying..." : "Verify & Save"}
          </button>
        </>
      )}
      {status && <p>{status}</p>}
    </div>
  );
};

export default PaymentVerification;
