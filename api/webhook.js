import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Map Stripe payment link IDs to purchase properties
// The payment link ID is the part after buy.stripe.com/
const PAYMENT_LINK_MAP = {
  '7sY4gz4vq5Rf4w90xBbo400': { product: 'main' },
  '9B6aEX9PKenL4w91BFbo402': { product: 'bump1', loopsProps: { purchasedDrift: true } },
  'aFa28r8LGenL0fTbcfbo403': { product: 'bump2', loopsProps: { purchasedGrace: true } },
  '14A5kDge8cfDgeR803bo404': { product: 'bundle', loopsProps: { purchasedDrift: true, purchasedGrace: true } },
  'eVq00jbXS5Rf9Qt1BFbo405': { product: 'oto1', loopsProps: { purchasedConversations: true } },
  '28E8wPd1WfrPfaNgwzbo406': { product: 'oto2', loopsProps: { purchasedCherished: true } },
};

// Loops transactional email IDs
const LOOPS_TRANSACTIONAL = {
  purchaseConfirmation: 'cmo6yt6oo000a0i02l6acnv7t', // Email 1 — Purchase Confirmation
  guideDelivery: 'cmo6z01kt01un0iypb327bb49',        // Email 2 — Guide Delivery
};

export const config = {
  api: { bodyParser: false },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const buf = await buffer(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    const email = session.customer_details?.email;
    const firstName = session.customer_details?.name?.split(' ')[0] || '';

    if (!email) {
      console.error('No email found in session');
      return res.status(400).json({ error: 'No email in session' });
    }

    // Work out which payment link was used
    const paymentLinkId = session.payment_link
      ? session.payment_link.split('/').pop()
      : null;

    const linkData = paymentLinkId ? PAYMENT_LINK_MAP[paymentLinkId] : null;
    const extraProps = linkData?.loopsProps || {};
    const hasGuides = Object.keys(extraProps).length > 0;

    // Build the Loops contact properties
    const loopsContactProps = {
      email,
      firstName,
      ...extraProps,
    };

    // 1. Create or update contact in Loops
    await loopsFetch('/contacts/createOrUpdate', loopsContactProps);

    // 2. Send purchase confirmation email (Email 1)
    await loopsFetch('/transactional', {
      transactionalId: LOOPS_TRANSACTIONAL.purchaseConfirmation,
      email,
      dataVariables: {
        firstName,
        purchasedDrift: extraProps.purchasedDrift || false,
        purchasedGrace: extraProps.purchasedGrace || false,
        purchasedConversations: extraProps.purchasedConversations || false,
        purchasedCherished: extraProps.purchasedCherished || false,
      },
    });

    // 3. If they bought any guides, send guide delivery email (Email 2)
    if (hasGuides) {
      await loopsFetch('/transactional', {
        transactionalId: LOOPS_TRANSACTIONAL.guideDelivery,
        email,
        dataVariables: {
          firstName,
          purchasedDrift: extraProps.purchasedDrift || false,
          purchasedGrace: extraProps.purchasedGrace || false,
          purchasedConversations: extraProps.purchasedConversations || false,
          purchasedCherished: extraProps.purchasedCherished || false,
        },
      });
    }

    console.log(`Processed purchase for ${email} — product: ${linkData?.product || 'unknown'}`);
  }

  return res.status(200).json({ received: true });
}

async function loopsFetch(path, body) {
  const response = await fetch(`https://app.loops.so/api/v1${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`Loops API error on ${path}:`, text);
    throw new Error(`Loops API error: ${response.status}`);
  }

  return response.json();
}
