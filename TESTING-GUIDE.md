# Testing Guide - Without Affecting Production

## 🎯 Goal
Test the integration without touching the customer's live Stripe account or production webhooks.

---

## Option 1: Use Customer's Stripe Test Mode (Recommended)

### Step 1: Get Customer's Test Keys

1. **Access their Stripe Dashboard**: https://dashboard.stripe.com
2. **Toggle to Test Mode** - Look for the "Test mode" switch in top right corner
3. **Get Test API Keys**:
   - Go to: Developers → API keys
   - Copy **Secret key** (starts with `sk_test_`)
   - Update `.env.test` file with this key

### Step 2: Set Up Local Testing

1. **Copy test environment file**:
   ```bash
   cd D:\client-projects\cultivating-the-fruit
   cp .env.test .env.local
   ```

2. **Install and login to Stripe CLI**:
   ```bash
   stripe login
   ```

3. **Start Stripe webhook listener** (Terminal 1):
   ```bash
   stripe listen --forward-to http://localhost:3000/api/webhook
   ```

   **Copy the webhook secret** it shows (starts with `whsec_`)

4. **Update `.env.local`**:
   - Replace `STRIPE_WEBHOOK_SECRET` with the secret from step 3

5. **Start your development server** (Terminal 2):
   ```bash
   # If you have a dev script:
   npm run dev

   # OR if it's a static site:
   npx serve -p 3000
   ```

### Step 3: Test a Payment

1. **Go to checkout page**: http://localhost:3000/strengthen-wives/checkout
2. **Use test card**: `4242 4242 4242 4242`
3. **Expiry**: Any future date
4. **CVC**: Any 3 digits
5. **Complete payment**

### Step 4: Verify Everything Works

**Check Terminal 1** (Stripe CLI):
```
✓ Webhook received: checkout.session.completed
✓ Response: 200 OK
```

**Check Supabase**:
```sql
SELECT * FROM signup_invites
WHERE created_at > NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC;
```

**Check Email**:
- Look for Loops email
- Click the signup link
- Verify email and code are pre-filled

**Test Signup**:
- Create a password
- Complete signup
- Should work perfectly!

---

## Option 2: Use Your Own Stripe Account

If you don't have access to customer's Stripe or want to use your own:

### Step 1: Set Up Your Test Account

1. **Go to your Stripe**: https://dashboard.stripe.com
2. **Toggle to Test Mode**
3. **Get your test keys**:
   - Developers → API keys
   - Copy **Secret key** (starts with `sk_test_`)

### Step 2: Create Test Products

You'll need to create products matching the price IDs in `api/create-checkout-session.js`:

**Current price IDs in code**:
```javascript
app_1month:  'price_1TPwm9Emfa6ZbajN13Q15HiF'
app_6month:  'price_1TPwmsEmfa6ZbajNFSyqAKue'
app_12month: 'price_1TPwpcEmfa6ZbajNxCEFdD6m'
```

**Create your own products**:
1. Stripe Dashboard → Products → Add Product
2. Create: "App Access - 1 Month" - Set price (e.g., $19)
3. Create: "App Access - 6 Months" - Set price (e.g., $45)
4. Create: "App Access - 12 Months" - Set price (e.g., $79)
5. Copy the **price IDs** (starts with `price_`)

### Step 3: Update Code Temporarily

Create a test version of `api/create-checkout-session.js`:

```javascript
// Replace the PRICE_IDS with your test ones
const PRICE_IDS = {
  app_1month:  'price_YOUR_TEST_ID_1',
  app_6month:  'price_YOUR_TEST_ID_2',
  app_12month: 'price_YOUR_TEST_ID_3',
  // ... keep others for now
};
```

### Step 4: Follow Same Testing Steps
- Follow steps 2-4 from Option 1 above
- Use YOUR test keys in `.env.local`

---

## 🚀 Moving to Production

Once testing is complete:

### Step 1: Update Vercel Environment Variables

Go to: https://vercel.com/[your-project]/settings/environment-variables

**Add/Update these (PRODUCTION values)**:
```
NEXT_PUBLIC_SUPABASE_URL=https://onwijddzljigbizsnrpo.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
STRIPE_SECRET_KEY=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
STRIPE_WEBHOOK_SECRET=whsec_DsCtN9HpOlwzZB7V7uhSyg12sx8uEYG
LOOPS_API_KEY=3f9948606642830be493589594034Abd
NEXT_PUBLIC_APP_URL=https://app.cultivatingthefruits.com
NEXT_PUBLIC_BASE_URL=https://cultivatingthefruit.com
```

### Step 2: Verify Production Webhook in Stripe

The customer should already have this set up, but verify:

1. **Customer's Stripe Dashboard** (LIVE mode)
2. **Developers → Webhooks**
3. **Should see**: `https://cultivatingthefruit.com/api/webhook`
4. **Listening for**: `checkout.session.completed`
5. **Signing secret**: Should match the `STRIPE_WEBHOOK_SECRET` in Vercel

### Step 3: Deploy

```bash
cd D:\client-projects\cultivating-the-fruit
git add .
git commit -m "Add Supabase invite code integration"
git push origin main
```

**Or use Vercel CLI**:
```bash
vercel --prod
```

### Step 4: Test Production (Small Test)

1. **Make a small real payment** (or use Stripe test mode in production)
2. **Check Supabase** for new invite
3. **Check email** was sent
4. **Test signup link** works
5. **Monitor first few real customers**

---

## 📊 Monitoring Production

### Vercel Function Logs
- Vercel Dashboard → Your project → Functions
- Check `/api/webhook` logs for any errors

### Stripe Webhook Logs
- Customer's Stripe → Developers → Webhooks → [endpoint]
- View recent events and responses

### Supabase Invites
```sql
-- Check recent invites
SELECT
  invite_code,
  created_at,
  status,
  expires_at
FROM signup_invites
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

### Loops Email Delivery
- Loops Dashboard → Emails → Sent
- Check delivery rates and opens

---

## 🔒 Security Checklist

Before going live:

- [ ] `.env.local` is in `.gitignore` (already done ✅)
- [ ] Service role key ONLY in Vercel env vars (not in code)
- [ ] Production Stripe keys in Vercel (not test keys)
- [ ] Webhook secret matches Stripe dashboard
- [ ] Test with small payment first
- [ ] Monitor first few transactions closely

---

## 🆘 Rollback Plan

If something goes wrong in production:

1. **Disable webhook in Stripe** (temporary)
2. **Check Vercel logs** for errors
3. **Fix issue**
4. **Re-enable webhook**
5. **Retry failed webhooks** in Stripe dashboard

The old flow (without Supabase) will still work via Stripe metadata, so customers can still get their codes even if Supabase fails.

---

## ✅ Testing Checklist

- [ ] Got customer's Stripe test keys OR set up own test account
- [ ] Updated `.env.local` with test keys
- [ ] Installed Stripe CLI
- [ ] Started webhook listener locally
- [ ] Updated webhook secret in `.env.local`
- [ ] Started dev server
- [ ] Completed test payment
- [ ] Verified webhook received (Stripe CLI)
- [ ] Verified invite code in Supabase
- [ ] Verified email sent via Loops
- [ ] Tested signup link (email/code pre-filled)
- [ ] Completed test signup successfully
- [ ] Set production env vars in Vercel
- [ ] Verified production webhook in Stripe
- [ ] Deployed to production
- [ ] Tested with small real payment

---

**Ready to test?** Start with Option 1 (customer's test mode) for the easiest path! 🚀
