require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Stripe = require('stripe');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/algotrade', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Payment schema
const paymentSchema = new mongoose.Schema({
  email: String,
  amount: Number,
  stripe_payment_intent_id: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);

// Initialize Stripe with secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Create Stripe PaymentIntent endpoint
app.post('/create-payment-intent', async (req, res) => {
  const { amount, email } = req.body;
  if (!amount || !email) {
    return res.status(400).json({ error: 'Amount and email required' });
  }

  try {
    // Create a PaymentIntent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // amount in paise/cents
      currency: 'inr',
      receipt_email: email,
    });

    // Save payment record with status 'created'
    const payment = new Payment({
      email,
      amount,
      stripe_payment_intent_id: paymentIntent.id,
      status: 'created',
    });
    await payment.save();

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating payment intent' });
  }
});

// Webhook endpoint to listen for payment success events from Stripe
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    try {
      // Update payment record status to 'paid'
      const payment = await Payment.findOneAndUpdate(
        { stripe_payment_intent_id: paymentIntent.id },
        { status: 'paid' },
        { new: true }
      );

      if (payment) {
        // Send confirmation email
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: payment.email,
          subject: 'Payment Confirmation',
          text: `Thank you for your payment of ₹${payment.amount}. Your payment was successful.`,
        };

        await transporter.sendMail(mailOptions);
      }
    } catch (err) {
      console.error('Error updating payment or sending email:', err);
    }
  }

  res.json({ received: true });
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
