import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPayments = () => {
  const [paymentData, setPaymentData] = useState({
    mpesaPaybill: "",
    airtelNumber: "",
    visaLink: "",
    mastercardLink: "",
  });

  useEffect(() => {
    // Fetch existing payment config from server
    axios
      .get("http://localhost:5000/api/payment-config")
      .then((res) => {
        if (res.data) setPaymentData(res.data);
      })
      .catch((err) => console.error("Failed to fetch payment config", err));
  }, []);

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/payment-config",
        paymentData
      );
      alert("Payment configuration saved successfully!");
    } catch (err) {
      console.error("Failed to save config", err);
      alert("Failed to save payment settings.");
    }
  };

  return (
    <div className="admin-payments">
      <h2>Payment Configuration</h2>
      <label>M-Pesa Paybill / Till Number</label>
      <input
        type="text"
        name="mpesaPaybill"
        value={paymentData.mpesaPaybill}
        onChange={handleChange}
      />

      <label>Airtel Money Business Number</label>
      <input
        type="text"
        name="airtelNumber"
        value={paymentData.airtelNumber}
        onChange={handleChange}
      />

      <label>Visa Payment Link</label>
      <input
        type="text"
        name="visaLink"
        value={paymentData.visaLink}
        onChange={handleChange}
      />

      <label>Mastercard Payment Link</label>
      <input
        type="text"
        name="mastercardLink"
        value={paymentData.mastercardLink}
        onChange={handleChange}
      />

      <button onClick={handleSave}>Save Payment Config</button>
    </div>
  );
};

export default AdminPayments;
