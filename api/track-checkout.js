// /api/track-checkout.js
// Server-side endpoint to fire checkout_started event to Loops
// Keeps the Loops API key off the client

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, selection } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid or missing email" });
  }

  try {
    const response = await fetch("https://app.loops.so/api/v1/events/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
      },
      body: JSON.stringify({
        eventName: "checkout_started",
        email,
        eventProperties: {
          selection: selection || "main",
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Loops track-checkout error:", response.status, text);
      // Return 200 anyway — don't block checkout if Loops fails
      return res.status(200).json({ ok: false });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("track-checkout error:", err);
    // Return 200 anyway — don't block checkout if Loops fails
    return res.status(200).json({ ok: false });
  }
}
