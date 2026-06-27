// Test endpoint to check if environment variables are loaded
export default async function handler(req, res) {
  return res.status(200).json({
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    hasLoopsKey: !!process.env.LOOPS_API_KEY,
    hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAppUrl: !!process.env.NEXT_PUBLIC_APP_URL,
    hasBaseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
    nodeVersion: process.version,
  });
}
