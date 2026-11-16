// File: src/components/Checkout.jsx
import React, { useState, useEffect, useContext } from "react";
import BackButton from "../components/BackButton";
import {
  useLocation as useRouterLocation,
  useNavigate,
} from "react-router-dom";
import { db, app, auth } from "../../firebase/config.js";
//import { savePaymentResult } from "../../firebase/paymentService.js";
import { CartContext } from "../../contexts/CartContext.jsx";
import { ClientContext } from "../../contexts/ClientContext.jsx";
import { sendOTP } from "./AuthService.jsx";
import {
  signInWithPhoneNumber,
  sendEmailVerification,
  RecaptchaVerifier,
  onAuthStateChanged,
  getAuth,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  getDoc,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import "../assets/css/checkout.css";
import kenyaTowns from "../kenyacountiesntowns.json";
import mpesaIcon from "../assets/images/payments/safaricom-mpesa.png";
import airtelIcon from "../assets/images/payments/airtel-money.png";
import visaIcon from "../assets/images/payments/visa.png";
import mastercardIcon from "../assets/images/payments/mastercard.png";
import OTPmodal from "./OTPmodal.jsx";

const shippingRates = {
  Nyeri: 100,
  Nairobi: 200,
  Mombasa: 500,
  Kisumu: 400,
};

const paymentMethods = [
  {
    name: "Mpesa",
    icon: mpesaIcon,
  },
  {
    name: "Airtel Money",
    icon: airtelIcon,
  },
  {
    name: "Visa",
    icon: visaIcon,
  },
  {
    name: "MasterCard",
    icon: mastercardIcon,
  },
];

const Checkout = () => {
  const routerLocation = useRouterLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { cart, cartItems, total } = useContext(CartContext);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [initialDeliveryLocation, setInitialDeliveryLocation] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [editingLocation, setEditingLocation] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [airtelPhone, setAirtelPhone] = useState("");
  const [phone, setPhone] = useState("");
  const [bankMail, setBankMail] = useState("");
  const shippingFee = shippingRates[deliveryLocation] || 0;
  const totalProductAmount = products.reduce(
    (sum, item) => sum + item.price,
    0
  );
  const totalShippingFee = shippingFee * products.length;
  const grandTotal = totalProductAmount + totalShippingFee;

  const [sentCode, setSentCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const [user, setUser] = useState(null);
  const [paymentConfig, setPaymentConfig] = useState(null);
  const [otpIdentifier, setOtpIdentifier] = useState("");
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [showOTPmodal, setShowOTPmodal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [activePaymentBox, setActivePaymentBox] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const selectedProducts = cart;
  console.log("Selected products in Checkout:", selectedProducts);

  const isValidPhonePrefix = (phone, type) => {
    const safaricomPrefixes = [
      "+254700",
      "+254701",
      "+254702",
      "+254703",
      "+254704",
      "+254705",
      "+254706",
      "+254707",
      "+254708",
      "+254709",
      "+254710",
      "+254711",
      "+254712",
      "+254713",
      "+254714",
      "+254715",
      "+254716",
      "+254717",
      "+254718",
      "+254719",
      "+254720",
      "+254721",
      "+254722",
      "+254723",
      "+254724",
      "+254725",
      "+254726",
      "+254727",
      "+254728",
      "+254729",
    ];

    const airtelPrefixes = [
      "+254730",
      "+254731",
      "+254732",
      "+254733",
      "+254734",
      "+254735",
      "+254736",
      "+254737",
      "+254738",
      "+254739",
      "+254750",
      "+254751",
      "+254752",
      "+254753",
      "+254754",
      "+254755",
      "+254756",
      "+254757",
      "+254758",
      "+254759",
    ];

    const list = type === "Mpesa" ? safaricomPrefixes : airtelPrefixes;
    return list.some((prefix) => phone.startsWith(prefix));
  };

  useEffect(() => {
    // Check user authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("✅ User signed in:", currentUser);
      } else {
        console.log("❌ No user signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (initialDeliveryLocation) {
      setDeliveryLocation(initialDeliveryLocation);
    }
  }, [initialDeliveryLocation]);

  useEffect(() => {
    const state = routerLocation.state;
    const user = auth.currentUser;

    if (state?.products?.length) {
      setProducts(state.products);
      if (state.location) setInitialDeliveryLocation(state.location);
      setLoadingProducts(false);
    } else if (user) {
      const fetchCart = async () => {
        try {
          const cartRef = doc(db, "carts", user.uid);
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
            const cartData = cartSnap.data();
            setProducts(cartData.products || []);
            setInitialDeliveryLocation(cartData.location || "");
          } else {
            console.log("No cart found for user.");
          }
        } catch (error) {
          console.error("Error loading cart:", error);
        } finally {
          setLoadingProducts(false);
        }
      };
      fetchCart();
    } else {
      setLoadingProducts(false);
      console.warn("User not logged in or no cart products.");
    }
  }, []);

  useEffect(() => {
    fetch(`${backendURL}/api/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server Error: ${res.status} - ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success && data.data) {
          setPaymentConfig(data.data);
          console.log("Payment Config:", data.data);
        } else {
          setPaymentConfig({
            mpesa: true,
            airtel: true,
            visa: true,
            mastercard: true,
          });
        }
      })
      .catch((err) => {
        console.error("Error in checkout submission ", err);

        setPaymentConfig({
          mpesa: true,
          airtel: true,
          visa: true,
          mastercard: true,
        });
      });
  }, []);

  if (loadingProducts) {
    return <div>Loading selected products...</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products selected</div>;
  }

  function setupRecaptcha() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA verified:", response);
          },
        },
        auth
      );

      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
        console.log("✅ reCAPTCHA rendered:", widgetId);
      });
    }
  }

  const sendSMSVerification = async (phone, setConfirmationResult) => {
    try {
      setupRecaptcha();
      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      console.log("📲 OTP sent to", phone);
      return true;
    } catch (error) {
      console.error("❌ Error sending OTP:", error);
      return false;
    }
  };

  const handleSendPhoneOTP = async (phone) => {
    if (!phone) return;

    let normalized = phone.trim();
    if (normalized.startsWith("07"))
      normalized = "+254" + normalized.substring(1);
    else if (normalized.startsWith("254")) normalized = "+" + normalized;
    else if (!normalized.startsWith("+254")) normalized = "+254" + normalized;

    console.log("Normalized phone:", normalized);

    try {
      const res = await fetch(`${backendURL}/api/otp/send-phone-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: normalized }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({
          type: "success",
          content: `📱 OTP sent to ${normalized}`,
        });
        setShowOTPmodal(true);
        setOtpIdentifier(normalized);
      } else {
        setMessage({
          type: "error",
          content: data.error || "Failed to send OTP",
        });
      }
    } catch (err) {
      console.error("Failed to send OTP:", err.code, err.message);
      setMessage({ type: "error", content: "Failed to send OTP. Try again." });
    }
  };

  const handleSendEmailOTP = async (bankMail) => {
    if (!bankMail) return;

    try {
      const res = await fetch(`${backendURL}/api/otp/send-email-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bankMail }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", content: `📧 OTP sent to ${bankMail}` });
        setShowOTPmodal(true);
        setOtpIdentifier(bankMail);
      } else {
        setMessage({
          type: "error",
          content: data.error || "Failed to send OTP",
        });
      }
    } catch (err) {
      console.error("❌ Email OTP send failed:", err);
      setMessage({ type: "error", content: "Network error sending OTP" });
    }
  };

  const handleVerifyOTP = async (otp) => {
    try {
      const res = await fetch(`${backendURL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: otpIdentifier, otp }),
      });

      const data = await res.json();
      if (data.success) {
        setIsVerified(true);
        setShowOTPmodal(false);
        setMessage({
          type: "success",
          content: "✅ Verified successfully",
        });
      } else {
        setMessage({ type: "error", content: data.error || "Invalid OTP" });
      }
    } catch (err) {
      console.error("❌ Email OTP verify failed:", err);
      setMessage({ type: "error", content: "Network error verifying OTP" });
    }
  };

  const handleProceed = async () => {
    if (!selectedPayment) {
      setMessage({ type: "error", content: "Please select a payment method." });
      return;
    }

    if (
      (selectedPayment === "Mpesa" || selectedPayment === "Airtel Money") &&
      !isVerified
    ) {
      setMessage({
        type: "error",
        content: "Please verify your phone number with OTP before proceeding.",
      });
      return;
    }

    if (selectedPayment === "MasterCard" || selectedPayment === "Visa") {
      setMessage({
        type: "error",
        content: "Please verify your account with OTP before proceeding.",
      });
      return;
    }

    await handlePaymentAfterVerification();
  };

  return (
    <div className="checkout-container">
      <BackButton />

      <h1>Checkout Information</h1>

      {/* 1. Shipping Info */}
      <br></br>
      <div className="section">
        <h2>Shipping Location</h2>
        <br></br>
        {!editingLocation ? (
          <div>
            <h3>Location</h3>
            <p>Location: {deliveryLocation || "Not specified"}</p>
            <button onClick={() => setEditingLocation(true)}>Edit</button>
          </div>
        ) : (
          <div>
            <select
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              className="border p-2 rounded w-full"
            >
              <option value="">-- Select Town --</option>
              {kenyaTowns.map((countyData) =>
                countyData.towns
                  .slice()
                  .sort((a, b) => a.localeCompare(b))
                  .map((town) => (
                    <option
                      key={`${countyData.county} - ${town}`}
                      value={`${countyData.county} - ${town}`}
                    >
                      {town} - {countyData.county}
                    </option>
                  ))
              )}
            </select>
            <button onClick={() => setEditingLocation(false)}>Save</button>
          </div>
        )}
      </div>

      {phoneNumber && (
        <div className="verified-phone border p-2 rounded mb-3 bg-green-100 text-green-800">
          ✅ Verified Phone: <strong>{phoneNumber}</strong>
        </div>
      )}

      <div className="section">
        <h2>Payment Method</h2>
        <div className="payment-options">
          {paymentMethods.map((method) => (
            <button
              key={method.name}
              className={`payment-icon-button ${selectedPayment === method.name ? "selected" : ""}`}
              onClick={() => {
                setSelectedPayment(method.name);
                setActivePaymentBox(method.name);
                setShowPaymentPopup(true);
              }}
            >
              <img
                src={method.icon}
                alt={method.name}
                className="payment-icon"
              />
            </button>
          ))}
        </div>

        {showPaymentPopup && (
          <div
            className="modal-overlay"
            onClick={() => setShowPaymentPopup(false)}
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              onSubmit={() => {}}
            >
              <button
                className="close-btn"
                onClick={() => setShowPaymentPopup(false)}
              >
                ✕
              </button>

              <h2>{activePaymentBox} Payment</h2>

              {activePaymentBox === "Mpesa" && (
                <div className="payment-box">
                  {!showOTPmodal ? (
                    <div>
                      <input
                        type="tel"
                        placeholder="example: 0712345678"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        className="payment-input"
                      />
                      <button
                        type="submit"
                        onClick={() => handleSendPhoneOTP(mpesaPhone)}
                        disabled={!mpesaPhone || !grandTotal}
                      >
                        Send OTP
                      </button>
                      <div className="modal-buttons">
                        <button onClick={() => setShowPaymentPopup(false)}>
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p>Enter OTP sent to {mpesaPhone}</p>
                    </div>
                  )}
                </div>
              )}

              {activePaymentBox === "Airtel Money" && (
                <div className="payment-box">
                  {!showOTPmodal ? (
                    <div>
                      <input
                        type="tel"
                        placeholder="example: 0712345678"
                        value={airtelPhone}
                        onChange={(e) => setAirtelPhone(e.target.value)}
                        className="payment-input"
                      />
                      <button
                        type="submit"
                        onClick={() => handleSendPhoneOTP(airtelPhone)}
                        disabled={!airtelPhone}
                      >
                        Send OTP
                      </button>
                      <div className="modal-buttons">
                        <button onClick={() => setShowPaymentPopup(false)}>
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p>Enter OTP sent to {airtelPhone}</p>
                    </div>
                  )}
                </div>
              )}

              {(activePaymentBox === "MasterCard" ||
                activePaymentBox === "Visa") && (
                <div className="payment-box">
                  {!showOTPmodal ? (
                    <div>
                      {/*<label> Mail Registered to Bank Account:</label>*/}
                      <input
                        type="mail"
                        placeholder="Enter mail registered to bank account"
                        value={bankMail}
                        onChange={(e) => setBankMail(e.target.value)}
                        className="payment-input"
                      />
                      <button
                        type="submit"
                        onClick={() => {
                          alert(
                            `${activePaymentBox} payment with account: ${bankMail}`
                          ),
                            handleSendEmailOTP(bankMail);
                        }}
                        disabled={!bankMail}
                      >
                        {activePaymentBox} Payment Verification
                      </button>
                      <div className="modal-buttons">
                        <button onClick={() => setShowPaymentPopup(false)}>
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p>Enter OTP sent to {bankMail}</p>
                    </div>
                  )}
                </div>
              )}

              <div id="recaptcha-container"></div>

              <OTPmodal
                isOpen={showOTPmodal}
                onClose={() => setShowOTPmodal(false)}
                onVerify={handleVerifyOTP}
              />
            </div>
          </div>
        )}
        <br></br>

        {/* 3. Product Order Summary */}
        <div className="section">
          <h2>Order Summary</h2>

          {products.map((product, index) => (
            <div key={index} className="product-summary">
              <img
                src={
                  product.image && product.image.startsWith("http")
                    ? product.image
                    : product.localImageKey &&
                        product.localImageKey.startsWith("http")
                      ? product.localImageKey
                      : "/fallback-image.png"
                }
                alt={product.title}
                className="product-summary-image"
              />

              <div className="product-details">
                <h3>{product.title}</h3>
                <p>{product.description}</p>

                <div className="price-info">
                  <span className="current-price">KES {product.price}</span>
                  {product.prevPrice && (
                    <span className="prev-price">KES {product.prevPrice}</span>
                  )}
                </div>

                <p>
                  Shipping to {deliveryLocation || "your location"}: KES{" "}
                  {shippingFee}
                </p>
                <p>
                  <strong>Total for item:</strong> KES{" "}
                  {product.price + shippingFee}
                </p>
              </div>
            </div>
          ))}

          <div className="summary-total">
            <p>
              <strong>Items Total:</strong> KES {totalProductAmount}
            </p>
            <p>
              <strong>Shipping Fee:</strong> KES {totalShippingFee}
            </p>
            <h3>
              <strong>Grand Total:</strong> KES {grandTotal}
            </h3>
          </div>

          <button
            className="proceed-button"
            onClick={handleProceed}
            disabled={
              !selectedPayment || !deliveryLocation || isLoading || !isVerified
            }
          >
            {isLoading ? "Processing..." : "Proceed to Pay"}
          </button>

          {message.content && (
            <p className={`message-${message.type}`}>{message.content}</p>
          )}
        </div>

        {/*<div id="recaptcha-container" style={{ display: "none" }}></div>*/}
      </div>
    </div>
  );
};

export default Checkout;
