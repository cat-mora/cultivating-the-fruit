// /api/create-checkout-session.js
// Vercel serverless function — creates a Stripe Checkout Session dynamically
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Price IDs for each product
const PRICE_IDS = {
  app_1month:    'price_1TPwm9Emfa6ZbajN13Q15HiF',
  app_6month:    'price_1TPwmsEmfa6ZbajNFSyqAKue',
  app_12month:   'price_1TPwpcEmfa6ZbajNxCEFdD6m',
  drift:         'price_1TOsUhEmfa6ZbajNlKbpx41K',
  grace:         'price_1TOsX6Emfa6ZbajNJmAkcRvS',
  bumpBundle:    'price_1TOsY1Emfa6ZbajNW2kCZsoi',
  conversations: 'price_1TOBbOEmfa6ZbajN6cbrnCNy',
  cherished:     'price_1TOBcAEmfa6ZbajNEzTkthhB',
  otoBundle:     'price_1TOBdGEmfa6ZbajNBvl1ItzV',
};

// Access duration in months per tier
const TIER_MONTHS = {
  app_1month:  1,
  app_6month:  6,
  app_12month: 12,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, tier, bumps, otos } = req.body;

    // tier: 'app_1month' | 'app_6month' | 'app_12month'
    // bumps: 'none' | 'drift' | 'grace' | 'bumpBundle'
    // otos:  'none' | 'conversations' | 'cherished' | 'otoBundle'

    // Validate tier
    const tierKey = tier && PRICE_IDS[tier] ? tier : 'app_12month';

    const lineItems = [
      { price: PRICE_IDS[tierKey], quantity: 1 }
    ];

    if (bumps === 'drift')      lineItems.push({ price: PRICE_IDS.drift, quantity: 1 });
    if (bumps === 'grace')      lineItems.push({ price: PRICE_IDS.grace, quantity: 1 });
    if (bumps === 'bumpBundle') lineItems.push({ price: PRICE_IDS.bumpBundle, quantity: 1 });

    if (otos === 'conversations') lineItems.push({ price: PRICE_IDS.conversations, quantity: 1 });
    if (otos === 'cherished')     lineItems.push({ price: PRICE_IDS.cherished, quantity: 1 });
    if (otos === 'otoBundle')     lineItems.push({ price: PRICE_IDS.otoBundle, quantity: 1 });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://cultivatingthefruit.com'}/strengthen-wives/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://cultivatingthefruit.com'}/strengthen-wives/checkout`,
      metadata: {
        tier: tierKey,
        tier_months: TIER_MONTHS[tierKey],
        bumps: bumps || 'none',
        otos: otos || 'none',
        email: email
      }
    });

    return res.status(200).json({ url: session.url });

  } catch (err) {
    console.error('Stripe session error:', err);
    return res.status(500).json({ error: err.message });
  }
}
