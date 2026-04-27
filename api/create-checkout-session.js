// /api/create-checkout-session.js
// Vercel serverless function — creates a Stripe Checkout Session dynamically
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Price IDs for each product
const PRICE_IDS = {
      app_1month:  'price_1TPwm9Emfa6ZbajN13Q15HiF',
      app_6month:  'price_1TPwmsEmfa6ZbajNFSyqAKue',
      app_12month: 'price_1TPwpcEmfa6ZbajNxCEFdD6m',
      drift:       'price_1TOsUhEmfa6ZbajNlKbpx41K',
      grace:       'price_1TOsX6Emfa6ZbajNJmAkcRvS',
      bumpBundle:  'price_1TOsY1Emfa6ZbajNW2kCZsoi',
      conversations: 'price_1TOBbOEmfa6ZbajN6cbrnCNy',
      cherished:   'price_1TOBcAEmfa6ZbajNEzTkthhB',
      otoBundle:   'price_1TOBdGEmfa6ZbajNBvl1ItzV',
};

// Access duration in months per tier
const TIER_MONTHS = {
      app_1month:  1,
      app_6month:  6,
      app_12month: 12,
};

// Maps API bump values back to checkout selection param for cancel URL
const BUMP_TO_SELECTION = {
      none:       'main',
      drift:      'bump1',
      grace:      'bump2',
      bumpBundle: 'bundle',
};

// Invite codes pool
const INVITE_CODES = [
      'XZ9Z9Q','DSHMNF','R2QHM3','9LNKZL','ABDVP5','SQWAPF','B73M6V','4GZVKS',
      'EWTRM5','CRM9QU','PQHB4K','CS4TME','UE35FK','79ESC8','Y6EYBL','DKSJF7',
      'BCB8ES','ZRMFVV','URUDKY','UF5U7Z','XRVTFB','SSFHME','UE24C7','PWPBBU',
      '8WXJMV','QJPCHM','M2D4CS','K5E227','46U4JF','68S8XR','3HDX7R','KRCUXT',
      'TPV8SR','XXD5LW','SJKRCM','AKWVWR','DWCME6','Z566FD','GB5F5N','7GW54L',
      'LHLBT8','PRHP9M','RCM26W','LU22XH','H8F7D5','7YVLZV'
    ];

// Assigns a consistent code per email using a hash — same logic as webhook.js
function assignInviteCode(email) {
      let hash = 0;
      for (let i = 0; i < email.length; i++) {
              hash = ((hash << 5) - hash) + email.charCodeAt(i);
              hash |= 0;
      }
      return INVITE_CODES[Math.abs(hash) % INVITE_CODES.length];
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://cultivatingthefruit.com';

export default async function handler(req, res) {
      if (req.method !== 'POST') {
              return res.status(405).json({ error: 'Method not allowed' });
      }

  try {
          const { email, tier, bumps } = req.body;

        // Validate email server-side
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  return res.status(400).json({ error: 'Invalid or missing email' });
        }

        // Validate tier — do not silently default to 12 months
        if (!tier || !TIER_MONTHS[tier] || !PRICE_IDS[tier]) {
                  return res.status(400).json({ error: 'Invalid or missing tier' });
        }

        const tierKey = tier;

        // Assign invite code at session creation time
', feerart):; 
    a s s i grne tiunrvni tree sc.osdtea tauts (s5e0s0s)i.ojns ocnr(e{a teirorno,r :p aesrsr .tmhersosuagghe  s}u)c;c
        // Sanitise bumps value
        const safeBumps = ['drift', 'grace', 'bumpBundle'].includes(bumps) ? bumps : 'none';
          const checkoutSelection = BUMP_TO_SELECTION[safeBumps];

        const lineItems = [
            { price: PRICE_IDS[tierKey], quantity: 1 }
                ];

        if (safeBumps === 'drift')      lineItems.push({ price: PRICE_IDS.drift,      quantity: 1 });
          if (safeBumps === 'grace')      lineItems.push({ price: PRICE_IDS.grace,      quantity: 1 });
          if (safeBumps === 'bumpBundle') lineItems.push({ price: PRICE_IDS.bumpBundle, quantity: 1 });

        const session = await stripe.checkout.sessions.create({
                  mode: 'payment',
                  customer_email: email,
                  line_items: lineItems,
                  // Success goes to OTO page with invite code in URL
                  success_url: `${BASE_URL}/strengthen-wives/oto?session_id={CHECKOUT_SESSION_ID}&tier=${tierKey}&bumps=${safeBumps}&code=${inviteCode}`,
                  cancel_url:  `${BASE_URL}/strengthen-wives/checkout?tier=${tierKey}&selection=${checkoutSelection}`,
                  metadata: {
                              tier:        tierKey,
                              tier_months: String(TIER_MONTHS[tierKey]),
                              bumps:       safeBumps,
                              email:       email,
                              invite_code: inviteCode
                  }
        });

        return res.status(200).json({
