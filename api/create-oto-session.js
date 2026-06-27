// /api/create-oto-session.js
// Vercel serverless function — creates a Stripe Checkout Session for OTO purchases only
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  conversations: "price_1TOBbOEmfa6ZbajN6cbrnCNy",
  cherished: "price_1TOBcAEmfa6ZbajNEzTkthhB",
  otoBundle: "price_1TOBdGEmfa6ZbajNBvl1ItzV",
};

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://cultivatingthefruit.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { otos, session_id } = req.body;

    if (!otos || !PRICE_IDS[otos]) {
      return res.status(400).json({ error: "Invalid OTO selection" });
    }

    if (!session_id) {
      return res.status(400).json({ error: "Missing original session_id" });
    }

    // Look up customer email from the original Stripe session
    const originalSession = await stripe.checkout.sessions.retrieve(session_id);
    const customerEmail =
      originalSession.customer_details?.email || originalSession.customer_email;

    const encodedOriginalSessionId = encodeURIComponent(session_id);

    const sessionParams = {
      mode: "payment",
      line_items: [{ price: PRICE_IDS[otos], quantity: 1 }],
      success_url: `${BASE_URL}/strengthen-wives/welcome?session_id=${encodedOriginalSessionId}&oto_session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/strengthen-wives/oto?session_id=${encodedOriginalSessionId}`,
      metadata: {
        otos,
        original_session_id: session_id,
      },
    };

    if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("OTO session error:", err);
    return res.status(500).json({ error: err.message });
  }
}
