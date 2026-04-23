import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

    // Read what was purchased from session metadata
    const bumps = session.metadata?.bumps || 'none';
    const otos = session.metadata?.otos || 'none';

    const extraProps = {
      ...(bumps === 'drift' || bumps === 'bumpBundle' ? { purchasedDrift: true } : {}),
      ...(bumps === 'grace' || bumps === 'bumpBundle' ? { purchasedGrace: true } : {}),
      ...(otos === 'conversations' || otos === 'otoBundle' ? { purchasedConversations: true } : {}),
      ...(otos === 'cherished' || otos === 'otoBundle' ? { purchasedCherished: true } : {}),
    };
    const hasGuides = Object.keys(extraProps).length > 0;

    // Build the Loops contact properties
    const loopsContactProps = {
      email,
      firstName,
      ...extraProps,
    };

    // 1. Create or update contact in Loops
    await loopsUpsertContact(loopsContactProps);

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

    console.log(`Processed purchase for ${email} — bumps: ${bumps}, otos: ${otos}`);
  }

  return res.status(200).json({ received: true });
}

async function loopsUpsertContact(props) {
  const createResponse = await fetch('https://app.loops.so/api/v1/contacts/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
    },
    body: JSON.stringify(props),
  });

  if (createResponse.status === 409) {
    // Contact already exists, update instead
    const updateResponse = await fetch('https://app.loops.so/api/v1/contacts/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
      },
      body: JSON.stringify(props),
    });
    if (!updateResponse.ok) {
      const text = await updateResponse.text();
      console.error('Loops update contact error:', text);
      throw new Error(`Loops update error: ${updateResponse.status}`);
    }
    return updateResponse.json();
  }

  if (!createResponse.ok) {
    const text = await createResponse.text();
    console.error('Loops create contact error:', text);
    throw new Error(`Loops create error: ${createResponse.status}`);
  }

  return createResponse.json();
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
