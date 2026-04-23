import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const LOOPS_TRANSACTIONAL = {
  purchaseConfirmation: 'cmo6yt6oo000a0i02l6acnv7t',
  guideDelivery: 'cmo6z01kt01un0iypb327bb49',
};

const GUIDE_CONTENT = {
  drift: 'WHEN YOU FEEL THE DRIFT\nDownload your guide here: https://onwijddzljigbizsnrpo.supabase.co/storage/v1/object/public/Guides/strengthen-wives/When_You_Feel_the_Drift_for_Wives.pdf\nFor the woman who can feel the distance even when nothing looks wrong enough to call a crisis. What is yours to do, what is not yours to carry, and how to take one wise step without panic or over-functioning.',
  grace: 'SAY IT WITH GRACE\nDownload your guide here: https://onwijddzljigbizsnrpo.supabase.co/storage/v1/object/public/Guides/strengthen-wives/Say_It_With_Grace_for_Wives.pdf\nFor when you have things that need saying but they keep coming out too strongly, he reacts poorly, or they stay buried too long. How to say what matters without sounding like his mother, starting a fight, or letting it sit another week.',
  conversations: '10 CONVERSATIONS TO FEEL CLOSE AGAIN\nDownload your guide here: https://onwijddzljigbizsnrpo.supabase.co/storage/v1/object/public/Guides/strengthen-wives/10_Conversations_for_Wives.pdf\nTen guided conversations to help you move past kids, calendars, and logistics and back into real knowing. The kind of closeness that does not come from sharing a life ... it comes from still choosing to know each other in it.',
  cherished: 'CHERISHED AGAIN\nDownload your guide here: https://onwijddzljigbizsnrpo.supabase.co/storage/v1/object/public/Guides/strengthen-wives/Cherished_Again_for_Wives.pdf\nFor when you have been carrying the mental load so long you have stopped feeling like his wife and started feeling like the one who runs everything. How to step back from that role where it is hurting your marriage and find your way back to each other.',
};

export const config = { api: { bodyParser: false } };

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
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
    if (!email) return res.status(400).json({ error: 'No email in session' });
    const bumps = session.metadata?.bumps || 'none';
    const otos = session.metadata?.otos || 'none';
    const extraProps = {
      ...(bumps === 'drift' || bumps === 'bumpBundle' ? { purchasedDrift: true } : {}),
      ...(bumps === 'grace' || bumps === 'bumpBundle' ? { purchasedGrace: true } : {}),
      ...(otos === 'conversations' || otos === 'otoBundle' ? { purchasedConversations: true } : {}),
      ...(otos === 'cherished' || otos === 'otoBundle' ? { purchasedCherished: true } : {}),
    };
    const hasGuides = Object.keys(extraProps).length > 0;
    const loopsContactProps = { email, firstName, ...extraProps };
    await loopsUpsertContact(loopsContactProps);
    await loopsFetch('/transactional', {
      transactionalId: LOOPS_TRANSACTIONAL.purchaseConfirmation,
      email,
      dataVariables: { firstName, purchasedDrift: extraProps.purchasedDrift || false, purchasedGrace: extraProps.purchasedGrace || false, purchasedConversations: extraProps.purchasedConversations || false, purchasedCherished: extraProps.purchasedCherished || false },
    });
    if (hasGuides) {
      await loopsFetch('/transactional', {
        transactionalId: LOOPS_TRANSACTIONAL.guideDelivery,
        email,
        dataVariables: { firstName, driftContent: extraProps.purchasedDrift ? GUIDE_CONTENT.drift : '', graceContent: extraProps.purchasedGrace ? GUIDE_CONTENT.grace : '', conversationsContent: extraProps.purchasedConversations ? GUIDE_CONTENT.conversations : '', cherishedContent: extraProps.purchasedCherished ? GUIDE_CONTENT.cherished : '' },
      });
    }
    console.log(`Processed purchase for ${email} — bumps: ${bumps}, otos: ${otos}`);
  }
  return res.status(200).json({ received: true });
}

async function loopsUpsertContact(props) {
  const createResponse = await fetch('https://app.loops.so/api/v1/contacts/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.LOOPS_API_KEY}` },
    body: JSON.stringify(props),
  });
  if (createResponse.status === 409) {
    const updateResponse = await fetch('https://app.loops.so/api/v1/contacts/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.LOOPS_API_KEY}` },
      body: JSON.stringify(props),
    });
    if (!updateResponse.ok) { const text = await updateResponse.text(); throw new Error(`Loops update error: ${updateResponse.status} ${text}`); }
    return updateResponse.json();
  }
  if (!createResponse.ok) { const text = await createResponse.text(); throw new Error(`Loops create error: ${createResponse.status} ${text}`); }
  return createResponse.json();
}

async function loopsFetch(path, body) {
  const response = await fetch(`https://app.loops.so/api/v1${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.LOOPS_API_KEY}` },
    body: JSON.stringify(body),
  });
  if (!response.ok) { const text = await response.text(); throw new Error(`Loops API error: ${response.status} ${text}`); }
  return response.json();
}
