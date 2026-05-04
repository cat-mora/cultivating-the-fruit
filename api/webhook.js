import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize Supabase client with service role key (has admin privileges)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const LOOPS_TRANSACTIONAL = {
  purchaseConfirmation: 'cmo6yt6oo000a0i02l6acnv7t',
  bumpGuideDelivery: 'cmo6z01kt01un0iypb327bb49',
  otoGuideDelivery:  'cmoe2l9sx12360iwea6ym9kpz',
};

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

    // ── Read invite code from Stripe metadata (set by create-checkout-session.js) ──
    const inviteCode = session.metadata?.invite_code || '';

    // ── Save invite code to Supabase (only for main purchases, not OTO-only) ──
    const isOTOOnly = !session.metadata?.tier;
    if (inviteCode && !isOTOOnly) {
      const tierMonths = parseInt(session.metadata?.tier_months || '12', 10);
      await saveInviteCodeToSupabase(inviteCode, email, tierMonths);
    }

    // ── Build app signup URL with pre-filled email and code ──
    const appSignupUrl = `${process.env.NEXT_PUBLIC_APP_URL}/(web)/auth/sign-up?email=${encodeURIComponent(email)}&code=${inviteCode}`;
    const getAppUrl    = `https://www.cultivatingthefruit.com/strengthen-wives/get-the-app?code=${inviteCode}`; // Legacy URL
    const welcomeUrl   = `https://www.cultivatingthefruit.com/strengthen-wives/welcome?session_id=${session.id}`;

    // ── Build tier label and price for email ──
    const tierMonths = session.metadata?.tier_months;
    const tierLabel  = tierMonths === '1' ? '1 month' : tierMonths === '6' ? '6 months' : '12 months';
    const TIER_PRICES = { app_1month: 'AU$19', app_6month: 'AU$45', app_12month: 'AU$79' };
    const tierPrice  = TIER_PRICES[session.metadata?.tier] || 'AU$79';

    // ── Work out which guides were purchased ──
    const extraProps = {
      ...(bumps === 'drift'         || bumps === 'bumpBundle' ? { purchasedDrift: true }          : {}),
      ...(bumps === 'grace'         || bumps === 'bumpBundle' ? { purchasedGrace: true }          : {}),
      ...(otos  === 'conversations' || otos  === 'otoBundle'  ? { purchasedConversations: true }  : {}),
      ...(otos  === 'cherished'     || otos  === 'otoBundle'  ? { purchasedCherished: true }      : {}),
    };

    // ── For main purchases only: upsert contact and fire onboarding sequence ──
    if (!isOTOOnly) {
      await loopsUpsertContact({
        email,
        firstName,
        inviteCode,
        getAppUrl,        // Legacy URL (keep for existing templates)
        appSignupUrl,     // NEW: Direct signup URL with pre-filled email/code
        welcomeUrl,
        ...extraProps,
      });

      await loopsFetch('/events/send', {
        eventName: 'purchase_completed',
        email,
        eventProperties: {
          tier: session.metadata?.tier,
          tierLabel,
          tierPrice,
          inviteCode,
          getAppUrl,
          appSignupUrl,   // NEW: Direct signup URL
        },
      });

      await loopsFetch('/transactional', {
        transactionalId: LOOPS_TRANSACTIONAL.purchaseConfirmation,
        email,
        dataVariables: {
          firstName,
          inviteCode,
          getAppUrl,        // Legacy URL (keep for existing templates)
          appSignupUrl,     // NEW: Direct signup URL with pre-filled email/code
          tierLabel,
          tierPrice,
          purchasedDrift:         extraProps.purchasedDrift         || false,
          purchasedGrace:         extraProps.purchasedGrace         || false,
          purchasedConversations: extraProps.purchasedConversations  || false,
          purchasedCherished:     extraProps.purchasedCherished      || false,
        },
      });

      // ── Send bump guide email ──
      const hasBumps = extraProps.purchasedDrift || extraProps.purchasedGrace;
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
    }

    // ── Send OTO guide email (only fires if OTO guides were purchased) ──
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

    console.log(`Processed purchase for ${email} — bumps: ${bumps}, otos: ${otos}, tier: ${isOTOOnly ? 'OTO-only (no code)' : tierLabel + ' code: ' + inviteCode}`);
  }

  return res.status(200).json({ received: true });
}

/**
 * Save invite code to Supabase signup_invites table
 * @param {string} inviteCode - The 6-character invite code
 * @param {string} email - Customer email (for logging/tracking)
 * @param {number} tierMonths - Number of months of access (1, 6, or 12)
 * @returns {Promise<boolean>} - true if saved successfully
 */
async function saveInviteCodeToSupabase(inviteCode, email, tierMonths = 12) {
  if (!inviteCode) {
    console.error('No invite code provided to save');
    return false;
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('⚠️  SUPABASE_SERVICE_ROLE_KEY not set - invite code NOT saved to database!');
    console.log('   Get the service role key from: https://supabase.com/dashboard/project/onwijddzljigbizsnrpo/settings/api');
    return false;
  }

  try {
    // Calculate expiration based on tier months
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (tierMonths * 30)); // Approximate months as days

    const inviteData = {
      invite_code: inviteCode.toUpperCase(),
      created_by: null, // System-generated codes don't have a user
      expires_at: expiresAt.toISOString(),
      status: 'pending',
    };

    const { data, error } = await supabase
      .from('signup_invites')
      .insert(inviteData)
      .select()
      .single();

    if (error) {
      // Check if it's a duplicate code error
      if (error.code === '23505') {
        console.warn(`Invite code ${inviteCode} already exists in database (duplicate). This is OK - code can still be used.`);
        return true; // Return true because the code exists and can be used
      }

      console.error('Error saving invite code to Supabase:', error);
      return false;
    }

    console.log(`✅ Invite code ${inviteCode} saved to Supabase for ${email} (expires: ${expiresAt.toLocaleDateString()})`);
    return true;

  } catch (err) {
    console.error('Exception saving invite code to Supabase:', err);
    return false;
  }
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
