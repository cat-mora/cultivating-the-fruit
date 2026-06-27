import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

const LOOPS_TRANSACTIONAL_ID = "cmo6yt6oo000a0i02l6acnv7t";

function generateInviteCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, email } = req.body;

  if (!firstName || !email) {
    return res.status(400).json({ error: "firstName and email are required" });
  }

  try {
    const inviteCode = generateInviteCode();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 365);

    const { error: inviteError } = await supabase
      .from("signup_invites")
      .insert({
        invite_code: inviteCode,
        created_by: null,
        expires_at: expiresAt.toISOString(),
        status: "pending",
      });

    if (inviteError && inviteError.code !== "23505") {
      console.error("Error saving invite code:", inviteError);
      return res.status(500).json({ error: "Failed to create invite code" });
    }

    const appBaseUrl =
      process.env.NEXT_PUBLIC_APP_URL || "https://app.cultivatingthefruit.com";
    const appSignupUrl = `${appBaseUrl}/auth/sign-up?email=${encodeURIComponent(email)}&code=${inviteCode}`;

    const loopsRes = await fetch("https://app.loops.so/api/v1/transactional", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
      },
      body: JSON.stringify({
        transactionalId: LOOPS_TRANSACTIONAL_ID,
        email,
        dataVariables: {
          firstName,
          inviteCode,
          appSignupUrl,
          tierLabel: "Trial Group",
          tierPrice: "Complimentary",
          purchasedDrift: false,
          purchasedGrace: false,
          purchasedConversations: false,
          purchasedCherished: false,
        },
      }),
    });

    if (!loopsRes.ok) {
      const text = await loopsRes.text();
      console.error("Loops error:", text);
    }

    console.log(`Trial signup: ${email} — code: ${inviteCode}`);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Trial signup error:", err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
