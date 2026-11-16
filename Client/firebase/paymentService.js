import { db } from "./config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const savePaymentResult = async ({
  checkoutRequestID,
  phone,
  amount,
  mpesaReceipt,
  resultCode,
  resultDesc,
}) => {
  if (!checkoutRequestID) throw new Error("checkoutRequestID is required");
  const paymentRef = doc(db, "payments", checkoutRequestID);
  await setDoc(paymentRef, {
    phone,
    amount,
    receipt: mpesaReceipt,
    status: resultCode === 0 ? "success" : "failed",
    resultDesc,
    timestamp: serverTimestamp(),
  });
  console.log("Payment saved to Firestore");
};
