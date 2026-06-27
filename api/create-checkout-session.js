// /api/create-checkout-session.js
// Vercel serverless function — creates a Stripe Checkout Session dynamically
import Stripe from "stripe";
import crypto from "crypto";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Price IDs for each product
const PRICE_IDS = {
  app_1month: "price_1TPwm9Emfa6ZbajN13Q15HiF",
  app_6month: "price_1TPwmsEmfa6ZbajNFSyqAKue",
  app_12month: "price_1TPwpcEmfa6ZbajNxCEFdD6m",
  drift: "price_1TOsUhEmfa6ZbajNlKbpx41K",
  grace: "price_1TOsX6Emfa6ZbajNJmAkcRvS",
  bumpBundle: "price_1TOsY1Emfa6ZbajNW2kCZsoi",
  conversations: "price_1TOBbOEmfa6ZbajN6cbrnCNy",
  cherished: "price_1TOBcAEmfa6ZbajNEzTkthhB",
  otoBundle: "price_1TOBdGEmfa6ZbajNBvl1ItzV",
};

// Access duration in months per tier
const TIER_MONTHS = {
  app_1month: 1,
  app_6month: 6,
  app_12month: 12,
};

// Maps API bump values back to checkout selection param for cancel URL
const BUMP_TO_SELECTION = {
  none: "main",
  drift: "bump1",
  grace: "bump2",
  bumpBundle: "bundle",
};

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://cultivatingthefruit.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, tier, bumps } = req.body;

    // Validate email server-side
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid or missing email" });
    }

    // Validate tier — do not silently default to 12 months
    if (!tier || !TIER_MONTHS[tier] || !PRICE_IDS[tier]) {
      return res.status(400).json({ error: "Invalid or missing tier" });
    }

    const tierKey = tier;

    // Generate a unique invite code and store it in Stripe metadata
    const inviteCode = crypto.randomBytes(3).toString("hex").toUpperCase();

    // Sanitise bumps value
    const safeBumps = ["drift", "grace", "bumpBundle"].includes(bumps)
      ? bumps
      : "none";
    const checkoutSelection = BUMP_TO_SELECTION[safeBumps];

    const lineItems = [{ price: PRICE_IDS[tierKey], quantity: 1 }];

    if (safeBumps === "drift")
      lineItems.push({ price: PRICE_IDS.drift, quantity: 1 });
    if (safeBumps === "grace")
      lineItems.push({ price: PRICE_IDS.grace, quantity: 1 });
    if (safeBumps === "bumpBundle")
      lineItems.push({ price: PRICE_IDS.bumpBundle, quantity: 1 });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: lineItems,
      success_url: `${BASE_URL}/strengthen-wives/oto?session_id={CHECKOUT_SESSION_ID}&tier=${tierKey}&bumps=${safeBumps}`,
      cancel_url: `${BASE_URL}/strengthen-wives/checkout?tier=${tierKey}&selection=${checkoutSelection}`,
      metadata: {
        tier: tierKey,
        tier_months: String(TIER_MONTHS[tierKey]),
        bumps: safeBumps,
        email: email,
        invite_code: inviteCode,
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe session error:", err);
    return res.status(500).json({ error: err.message });
  }
}
