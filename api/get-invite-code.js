// /api/get-invite-code.js
// Returns the invite code stored in the original Stripe checkout session metadata
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'Missing session_id' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const inviteCode = session.metadata?.invite_code;

    if (session.payment_status !== 'paid') {
      return res.status(403).json({ error: 'Session not paid' });
    }

    if (!inviteCode) {
      return res.status(404).json({ error: 'No invite code found for this session' });
    }

    return res.status(200).json({ invite_code: inviteCode });

  } catch (err) {
    console.error('get-invite-code error:', err);
    return res.status(500).json({ error: err.message });
  }
}
