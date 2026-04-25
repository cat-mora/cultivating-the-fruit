// /api/create-oto-session.js
// Vercel serverless function — creates a Stripe Checkout Session for OTO purchases only
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  conversations: 'price_1TOBbOEmfa6ZbajN6cbrnCNy',
  cherished:     'price_1TOBcAEmfa6ZbajNEzTkthhB',
  otoBundle:     'price_1TOBdGEmfa6ZbajNBvl1ItzV',
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://cultivatingthefruit.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { otos, session_id } = req.body;
    // otos: 'conversations' | 'cherished' | 'otoBundle'
    // session_id: original purchase session ID — passed through to welcome page

    if (!otos || !PRICE_IDS[otos]) {
      return res.status(400).json({ error: 'Invalid OTO selection' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        { price: PRICE_IDS[otos], quantity: 1 }
      ],
      // Pass original session_id through so welcome page knows full purchase history
      success_url: `${BASE_URL}/strengthen-wives/welcome?session_id=${session_id}&oto_session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${BASE_URL}/strengthen-wives/oto?session_id=${session_id}`,
      metadata: {
        otos:               otos,
        original_session_id: session_id
      }
    });

    return res.status(200).json({ url: session.url });

  } catch (err) {
    console.error('OTO session error:', err);
    return res.status(500).json({ error: err.message });
  }
}
