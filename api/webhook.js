import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Loops transactional email IDs
const LOOPS_TRANSACTIONAL = {
  purchaseConfirmation: 'cmo6yt6oo000a0i02l6acnv7t', // Email 1 — Purchase Confirmation
  guideDelivery: 'cmo6z01kt01un0iypb327bb49',        // Email 2 — Guide Delivery
};

// Guide content blocks — sent as data variables to Loops
const GUIDE_CONTENT = {
  drift: `WHEN YOU FEEL THE DRIFT
Download your guide here: https://onwijddzljigbizsnrpo.supabase.co/storage/v1/object/public/Guides/strengthen-wives/When_You_Feel_the_Drift_for_Wives.pdf

For the woman who can feel the distance even when nothing looks wrong enough to call a crisis. What is yours to do, what is not yours to carry, and how to take one wise step without panic or over-functioning.`,

  grace: `SAY IT WITH GRACE
Download your guide here: https://onwijddzljigbizsnrpo.supabase.co/storage/v1/object/public/Guides/strengthen-wives/Say_It_With_Grace_for_Wives.pdf

For when you have things that need saying but they keep coming out too strongly, he reacts poorly, or they stay buried too long. How to say what matters without sounding like his mother, starting a fight, or letting it sit another week.`,

  conversations: `10 CONVERSATIONS TO FEEL CLOSE AGAIN
Download your guide here: https://onwijddzljigbizsnrpo.supabase.co/storage/v1/object/public/Guides/strengthen-wives/10_Conversations_for_Wives.pdf

Ten guided conversations to help you move past kids, calendars, and logistics and back into real knowing. The kind of closeness that does not come from sharing a life ... it comes from still choosing to know each other in it.`,

  cherished: `CHERISHED AGAIN
Download your guide here: https://onwijddzljigbizsnrpo.supabase.co/storage/v1/object/public/Guides/strengthen-wives/Cherished_Again_for_Wives.pdf

For when you have been carrying the mental load so long you have stopped feeling like his wife and started feeling like the one who runs everything. How to step back from that role where it is hurting your marriage and find your way back to each other.`,
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
      ...(otos === 'conversations' || otos === '
