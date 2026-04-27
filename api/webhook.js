import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const LOOPS_TRANSACTIONAL = {
  purchaseConfirmation: 'cmo6yt6oo000a0i02l6acnv7t',
  bumpGuideDelivery: 'cmo6z01kt01un0iypb327bb49',
  otoGuideDelivery:  'cmoe2l9sx12360iwea6ym9kpz',
};

// ── Invite codes — add more here when stock runs low ──
const INVITE_CODES = [
  'XZ9Z9Q','DSHMNF','R2QHM3','9LNKZL','ABDVP5','SQWAPF','B73M6V','4GZVKS',
  'EWTRM5','CRM9QU','PQHB4K','CS4TME','UE35FK','79ESC8','Y6EYBL','DKSJF7',
  'BCB8ES','ZRMFVV','URUDKY','UF5U7Z','XRVTFB','SSFHME','UE24C7','PWPBBU',
  '8WXJMV','QJPCHM','M2D4CS','K5E227','46U4JF','68S8XR','3HDX7R','KRCUXT',
  'TPV8SR','XXD5LW','SJKRCM','AKWVWR','DWCME6','Z566FD','GB5F5N','7GW54L',
  'LHLBT8','PRHP9M','RCM26W','LU22XH','H8F7D5','7YVLZV'
];

// Assigns a consistent code per email using a hash
function assignInviteCode(email) {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = ((hash << 5) - hash) + email.charCodeAt(i);
    hash |= 0;
  }
  return INVITE_CODES[Math.abs(hash) % INVITE_CODES.length];
}

// ── Guide metadata — title, description, and hosted PDF URL ──
const GUIDES = {
  drift: {
    title: 'When You Feel the Drift',
    description: 'For the woman who can feel the distance even when nothing looks wrong enough to call a crisis. What is yours to do, what is not yours to carry, and how to take one wise step without panic or over-functioning.',
    url: 'https://onwijddzljigbizsnrpo.supabase.co/storage/v1/object/public/Guides/strengthen-wives/When_You_Feel_the_Drift_for_Wives.pdf'
  },
  grace: {
    title: 'Say It With Grace',
    description: 'For when you have things that need saying but they keep coming out too strongly, he reacts poorly, or they stay buried too long. How to say what matters without sounding like his mother, starting a fight, or letting it sit another week.',
    url: 'https://onwijddzljigbizsnrpo.supabase.co/storage/v1/object/public/Guides/strengthen-wives/Say_It_With_Grace_for_Wives.pdf'
  },
  conversations: {
    title: '10 Conversations To Feel Close Again',
    description: 'Ten guided conversations to help you move past kids, calendars, and logistics and back into real knowing. The kind of closeness that does not come from sharing a life — it comes from still choosing to know each other in it.',
    url: 'https://onwijddzljigbizsnrpo.supabase.co/storage/v1/object/public/Guides/strengthen-wives/10_Conversations_for_Wives.pdf'
  },
  cherished: {
    title: 'Cherished Again',
    description: 'For when you have been carrying the mental load so long you have stopped feeling like his wife and started feeling like the one who runs everything. How to step back from that role where it is hurting your marriage and find your way back to each other.',
    url: 'https://onwijddzljigbizsnrpo.supabase.co/storage/v1/object/public/Guides/strengthen-wives/Cherished_Again_for_Wives.pdf'
  },
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
    const otos  = session.metadata?.otos  || 'none';

    // ── Assign invite code and build app URLs ──
    const inviteCode = assignInviteCode(email);
    const getAppUrl  = `https://www.cultivatingthefruit.com/strengthen-wives/get-the-app?code=${inviteCode}`;
    const welcomeUrl = `https://www.cultivatingthefruit.com/strengthen-wives/welcome?code=${inviteCode}`;

    // ── Work out which guides were purchased ──
    const extraProps = {
      ...(bumps === 'drift'         || bumps === 'bumpBundle' ? { purchasedDrift: true }          : {}),
      ...(bumps === 'grace'         || bumps === 'bumpBundle' ? { purchasedGrace: true }          : {}),
      ...(otos  === 'conversations' || otos  === 'otoBundle'  ? { purchasedConversations: true }  : {}),
      ...(otos  === 'cherished'     || otos  === 'otoBundle'  ? { purchasedCherished: true }      : {}),
    };

    // ── Detect OTO-only session ──
    const isOTOOnly = !session.metadata?.tier;

    // ── Upsert contact in Loops with invite code and app URL ──
    await loopsUpsertContact({
      email,
      firstName,
      inviteCode,
      getAppUrl,
      welcomeUrl,
      ...extraProps,
    });

    // ── Send purchase confirmation (main purchase only) ──
    if (!isOTOOnly) {
      await loopsFetch('/transactional', {
        transactionalId: LOOPS_TRANSACTIONAL.purchaseConfirmation,
        email,
        dataVariables: {
          firstName,
          inviteCode,
          getAppUrl,
          purchasedDrift:         extraProps.purchasedDrift         || false,
          purchasedGrace:         extraProps.purchasedGrace         || false,
          purchasedConversations: extraProps.purchasedConversations  || false,
          purchasedCherished:     extraProps.purchasedCherished      || false,
        },
      });
    }

    // ── Send bump guide email (main purchase only) ──
    const hasBumps = !isOTOOnly && (extraProps.purchasedDrift || extraProps.purchasedGrace);
    if (hasBumps) {
      const bumpGuides = [];
      if (extraProps.purchasedDrift)  bumpGuides.push(GUIDES.drift);
      if (extraProps.purchasedGrace)  bumpGuides.push(GUIDES.grace);
      await loopsFetch('/transactional', {
        transactionalId: LOOPS_TRANSACTIONAL.bumpGuideDelivery,
        email,
        dataVariables: { firstName, guides: bumpGuides },
      });
    }

    // ── Send OTO guide email ──
    const hasOTOs = extraProps.purchasedConversations || extraProps.purchasedCherished;
    if (hasOTOs) {
      const otoGuides = [];
      if (extraProps.purchasedConversations) otoGuides.push(GUIDES.conversations);
      if (extraProps.purchasedCherished)     otoGuides.push(GUIDES.cherished);
      await loopsFetch('/transactional', {
        transactionalId: LOOPS_TRANSACTIONAL.otoGuideDelivery,
        email,
        dataVariables: { firstName, guides: otoGuides },
      });
    }

    console.log(`Processed purchase for ${email} — bumps: ${bumps}, otos: ${otos}, code: ${inviteCode}`);
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
    if (!updateResponse.ok) {
      const text = await updateResponse.text();
      throw new Error(`Loops update error: ${updateResponse.status} ${text}`);
    }
    return updateResponse.json();
  }

  if (!createResponse.ok) {
    const text = await createResponse.text();
    throw new Error(`Loops create error: ${createResponse.status} ${text}`);
  }

  return createResponse.json();
}

async function loopsFetch(path, body) {
  const response = await fetch(`https://app.loops.so/api/v1${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.LOOPS_API_KEY}` },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Loops API error: ${response.status} ${text}`);
  }
  return response.json();
}
