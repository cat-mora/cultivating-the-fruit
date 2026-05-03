# Landing Page Setup Instructions

## ✅ What's Been Done

1. ✅ **Installed Supabase Client** - `@supabase/supabase-js` package added
2. ✅ **Updated Webhook** - `api/webhook.js` now saves invite codes to Supabase
3. ✅ **Created .env.local** - Environment variables template created
4. ✅ **Updated .gitignore** - Environment files protected from git

## 🚨 CRITICAL: You MUST Do This Now

### 1. Get Your Supabase Service Role Key

**THIS IS REQUIRED - The integration won't work without it!**

1. Go to: https://supabase.com/dashboard/project/onwijddzljigbizsnrpo/settings/api
2. Scroll to **"Project API keys"**
3. Find the **"service_role"** key (NOT the anon key)
4. Click to reveal it
5. Copy the entire key (starts with `eyJ...`)

### 2. Update .env.local File

Open `.env.local` and replace this line:
```
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

With your actual service role key:
```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJI....(your actual key)
```

**⚠️ IMPORTANT:** Keep this key SECRET - never commit it to git or share it publicly!

---

## 🔄 How It Works Now

### Old Flow:
```
Payment → Generate Code → Store in Stripe → Send Email
```

### New Flow:
```
Payment → Generate Code → Save to Supabase ✨ → Store in Stripe → Send Email
```

### What Happens After Payment:

1. **Stripe Checkout Completed** - User pays
2. **Webhook Triggered** - `api/webhook.js` runs
3. **Code Saved to Supabase** - Invite code stored in `signup_invites` table
4. **Email Sent** - Loops email includes:
   - `{{inviteCode}}` - The 6-character code
   - `{{appSignupUrl}}` - Direct link to app signup with email/code pre-filled

### New Email Variables Available:

Your Loops email templates now have access to:
- `{{inviteCode}}` - The invite code (e.g., "A1B2C3")
- `{{appSignupUrl}}` - **NEW!** Direct signup link: `https://app.cultivatingthefruits.com/(web)/auth/sign-up?email=user@example.com&code=A1B2C3`
- `{{getAppUrl}}` - Legacy URL (still works)

---

## 🧪 Testing Locally

### 1. Install Stripe CLI (if not already installed)

**Mac:**
```bash
brew install stripe/stripe-cli/stripe
```

**Windows:**
```bash
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe
```

### 2. Login to Stripe
```bash
stripe login
```

### 3. Forward Webhooks Locally
```bash
stripe listen --forward-to http://localhost:3000/api/webhook
```

This will give you a **webhook signing secret** for local testing. Copy it!

### 4. Update .env.local for Local Testing

Temporarily replace your production webhook secret with the local one:
```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx  # Use the one from stripe listen
```

### 5. Start the Site
```bash
npm run dev
# or if using a static server
npx serve -p 3000
```

### 6. Test a Payment

1. Go to your checkout page
2. Use test card: `4242 4242 4242 4242`
3. Any future expiry date, any CVC
4. Complete payment

### 7. Check the Results

**In Stripe CLI terminal:**
- You should see the webhook event logged

**In Supabase:**
```sql
SELECT * FROM signup_invites
WHERE created_at > NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC;
```
- Should see your new invite code

**In your email:**
- Check the email sent via Loops
- Click the signup link
- Verify email and code are pre-filled

---

## 🚀 Deploy to Production

### 1. Push Your Changes
```bash
git add .
git commit -m "Add Supabase integration for invite codes"
git push origin main
```

### 2. Set Environment Variables in Vercel

Go to: https://vercel.com/your-project/settings/environment-variables

Add these variables (if not already set):

```
NEXT_PUBLIC_SUPABASE_URL=https://onwijddzljigbizsnrpo.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbG... (your service role key)
STRIPE_SECRET_KEY=sk_live_51TLz...
STRIPE_WEBHOOK_SECRET=whsec_DsCtN... (production secret)
LOOPS_API_KEY=3f9948606...
NEXT_PUBLIC_APP_URL=https://app.cultivatingthefruits.com
NEXT_PUBLIC_BASE_URL=https://cultivatingthefruit.com
```

**Important:** Make sure `STRIPE_WEBHOOK_SECRET` is the **production** secret from your Stripe Dashboard webhook (NOT the local testing one).

### 3. Redeploy
```bash
vercel --prod
```

Or push to main if auto-deploy is enabled.

---

## 🔍 Debugging

### Check if Invite Was Created

**Supabase Dashboard:**
https://supabase.com/dashboard/project/onwijddzljigbizsnrpo/editor

Run query:
```sql
SELECT * FROM signup_invites
ORDER BY created_at DESC
LIMIT 10;
```

### Check Webhook Logs

**Vercel:**
- Go to your project → Deployments → Latest → Functions
- Find `/api/webhook` and click to see logs

**Stripe:**
- Dashboard → Developers → Webhooks → [Your endpoint]
- View recent events and their responses

### Common Issues

**❌ "SUPABASE_SERVICE_ROLE_KEY not set"**
- You didn't update .env.local with your service role key
- Solution: Get the key from Supabase dashboard and add it to .env.local

**❌ Webhook not firing**
- Check Stripe webhook logs for errors
- Verify webhook secret matches
- Make sure endpoint is publicly accessible (HTTPS)

**❌ Invite code not saved**
- Check Vercel function logs
- Verify service role key is correct
- Check Supabase RLS policies allow inserts

**❌ Email not sent**
- Verify Loops API key
- Check Loops dashboard for failed sends
- Make sure template ID is correct

---

## 📧 Update Your Loops Email Template

You can now use the new `{{appSignupUrl}}` variable for a direct signup link!

**Example Email Button:**
```html
<a href="{{appSignupUrl}}"
   style="background: #6B2D3E; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600;">
  Complete Your Account Setup
</a>
```

The link will automatically include the user's email and invite code!

---

## 📋 Quick Checklist

- [ ] Got Supabase service_role key from dashboard
- [ ] Updated `.env.local` with service role key
- [ ] Tested locally with Stripe CLI
- [ ] Verified invite code saved to Supabase
- [ ] Verified email sent with correct link
- [ ] Tested signup link (email/code pre-filled)
- [ ] Set environment variables in Vercel
- [ ] Deployed to production
- [ ] Tested production payment
- [ ] Updated Loops email template to use `{{appSignupUrl}}`

---

## 🎉 You're Done!

Once the service role key is added, the integration is complete!

Every payment will now:
1. ✅ Generate invite code
2. ✅ Save to Supabase (new!)
3. ✅ Send email with direct signup link (new!)
4. ✅ User clicks → email/code pre-filled → creates password → done!

**Need help?** Check the full integration guide in the app repo:
- `LANDING-PAGE-INTEGRATION.md`
- `LANDING-INTEGRATION-QUICKSTART.md`
