import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_51RK0KoQSTTiLEkHkXA18fNAivEUtREPsNr8RLi8mxzhxn0N2NkVIAZu72iorqbxT9yLKFEUjMue980VFh63rJcVx0048lGgH5e');

const CheckoutForm: React.FC = () => {
  const [paymentEmail, setPaymentEmail] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    if (!paymentEmail || !paymentAmount) {
      alert('Please enter both email and amount.');
      return;
    }

    const amountNum = Number(paymentAmount);
    if (isNaN(amountNum) || amountNum < 100 || amountNum > 1000000) {
      alert('Amount must be between ₹100 and ₹1,000,000');
      return;
    }

    setLoading(true);

    try {
      // Create PaymentIntent on backend
      const response = await fetch('http://localhost:5173/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountNum, email: paymentEmail }),
      });

      const { clientSecret, error } = await response.json();

      if (error) {
        alert(error);
        setLoading(false);
        return;
      }

      // Confirm card payment
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        alert('Card details not entered');
        setLoading(false);
        return;
      }

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: paymentEmail,
          },
        },
      });

      setLoading(false);

      if (paymentResult.error) {
        alert(paymentResult.error.message);
      } else if (paymentResult.paymentIntent && paymentResult.paymentIntent.status === 'succeeded') {
        alert(`Payment of ₹${amountNum} successful! Confirmation email sent to ${paymentEmail}.`);
        setPaymentEmail('');
        setPaymentAmount('');
        cardElement.clear();
      }
    } catch (err) {
      setLoading(false);
      alert('Payment failed: ' + (err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg max-w-md mx-auto space-y-6">
      <div>
        <label htmlFor="email" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={paymentEmail}
          onChange={(e) => setPaymentEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label htmlFor="amount" className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
          Amount (₹100 - ₹1,000,000)
        </label>
        <input
          id="amount"
          type="number"
          placeholder="100"
          min={100}
          max={1000000}
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Card Details</label>
        <div className="p-3 border rounded-md dark:bg-gray-600">
          <CardElement options={{ style: { base: { color: '#fff', fontSize: '16px' } } }} />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 text-white rounded-md ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const Payment: React.FC = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default Payment;
