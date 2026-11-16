import express from "express";
const router = express.Router();

router.post('/verify', async (req, res) => {
  try {
    const { userId, cart } = req.body;

    if (!userId || !cart || cart.length === 0) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    console.log(`Verifying checkout for user: ${userId} with cart items: ${cart.length}`);

    return res.status(200).json({ message: 'Verification successful' });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ error: 'Verification failed' });
  }
});

router.post('/pay', async (req, res) => {
  try {
    const { userId, amount, method } = req.body;

    if (!userId || !amount || !method) {
      return res.status(400).json({ error: 'Missing payment details' });
    }

    console.log(`Processing payment of ${amount} for user ${userId} using ${method}`);
    
    return res.status(200).json({ message: 'Payment processed successfully' });
  } catch (error) {
    console.error('Payment error:', error);
    return res.status(500).json({ error: 'Payment failed' });
  }
});

router.get('/status', (req, res) => {
  res.json({ message: 'Checkout route is up and running!' });
});

router.post("/", (req, res) => {
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
});

export default router;