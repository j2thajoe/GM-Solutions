import React, { useState, useRef, useEffect } from "react";
import "../assets/css/otpModal.css";

const OTPModal = ({ isOpen, onClose, onVerify }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setOtp(Array(6).fill("")); // reset OTP on open
      setError("");
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus(); // focus first box
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (value, index) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");

      // Move to next input if not last box
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasted)) {
      const digits = pasted.split("");
      setOtp(digits);
      inputRefs.current[5].focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length === 6) {
      onVerify(code);
    } else {
      setError("Please enter all 6 digits");
    }
  };

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
        <h2>Enter OTP Code</h2>
        <p>We have sent a code to your phone or email.</p>

        <div className="otp-inputs" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>

        {error && <p className="otp-error">{error}</p>}

        <div className="otp-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="verify-btn" onClick={handleVerify}>
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
