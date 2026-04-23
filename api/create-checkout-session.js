// /api/create-checkout-session.js
// Vercel serverless function — creates a Stripe Checkout Session dynamically

import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Price IDs for each product
const PRICE_IDS = {
  app:          'price_1TNn6aEmfa6ZbajNrsLNT6kj',
  drift:        'price_1TOsUhEmfa6ZbajNlKbpx41K',
  grace:        'price_1TOsX6Emfa6ZbajNJmAkcRvS',
  bumpBundle:   'price_1TOsY1Emfa6ZbajNW2kCZsoi',
  conversations:'price_1TOBbOEmfa6ZbajN6cbrnCNy',
  cherished:    'price_1TOBcAEmfa6ZbajNEzTkthhB',
  otoBundle:    'price_1TOBdGEmfa6ZbajNBvl1ItzV',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, bumps, otos } = req.body;
    // bumps: 'none' | 'drift' | 'grace' | 'bumpBundle'
    // otos:  'none' | 'conversations' | 'cherished' | 'otoBundle'

    const lineItems = [
      { price: PRICE_IDS.app, quantity: 1 }
    ];

    if (bumps === 'drift')       lineItems.push({ price: PRICE_IDS.drift, quantity: 1 });
    if (bumps === 'grace')       lineItems.push({ price: PRICE_IDS.grace, quantity: 1 });
    if (bumps === 'bumpBundle')  lineItems.push({ price: PRICE_IDS.bumpBundle, quantity: 1 });

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
