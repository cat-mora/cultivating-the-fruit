# Quick Start - Testing Without Affecting Production

## 🎯 Safe Testing Approach

You can test the Supabase integration using the customer's **Stripe test mode** without affecting their live payments or webhooks.

---

## ⚡ Fastest Way to Test (5 minutes)

### 1. Get Customer's Test Stripe Key

1. Go to their Stripe: https://dashboard.stripe.com
2. **Toggle "Test mode" ON** (top right corner)
3. Go to: **Developers → API keys**
4. Copy the **Secret key** (starts with `sk_test_`)

### 2. Update Test Environment File

Edit `.env.test` and replace:
```env
STRIPE_SECRET_KEY=sk_test_XXXXXXX
```
With their actual test key.

### 3. Switch to Test Mode

```bash
# Copy test environment to active
copy .env.test .env.local
```

Or use the helper script:
```bash
switch-env.bat test
```

### 4. Start Testing

**Terminal 1 - Stripe Webhook Listener:**
```bash
stripe login
stripe listen --forward-to http://localhost:3000/api/webhook
```

Copy the webhook secret (starts with `whsec_`) and update it in `.env.local`:
```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

**Terminal 2 - Start Server:**
```bash
npm run dev
# OR
npx serve -p 3000
```

### 5. Make Test Payment

1. Go to: http://localhost:3000/strengthen-wives/checkout
2. Card: `4242 4242 4242 4242`
3. Any future date, any CVC
4. Complete payment

### 6. Check Results

**✅ Terminal 1:** Should show webhook received
**✅ Supabase:** Check for new invite code
**✅ Email:** Should receive Loops email
**✅ Signup:** Click link → email/code pre-filled!

---

## 📁 Environment Files

- `.env.test` - Customer's Stripe **test mode** keys (safe to test)
- `.env.production` - Customer's Stripe **live** keys (production only)
- `.env.local` - Active environment (git ignored)

**Switch between them:**
```bash
switch-env.bat test    # For testing
switch-env.bat prod    # For production (careful!)
```

---

## 🚀 Deploy to Production

Once testing works:

### 1. Set Vercel Environment Variables

Go to: Vercel Dashboard → Settings → Environment Variables

Add these (**production values - get from client**):
```
NEXT_PUBLIC_SUPABASE_URL=https://onwijddzljigbizsnrpo.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci... (get from Supabase dashboard)
STRIPE_SECRET_KEY=sk_live_... (get from client's Stripe account)
STRIPE_WEBHOOK_SECRET=whsec_... (get from Stripe webhook settings)
LOOPS_API_KEY=... (get from client's Loops account)
NEXT_PUBLIC_APP_URL=https://app.cultivatingthefruits.com
NEXT_PUBLIC_BASE_URL=https://cultivatingthefruit.com
```

### 2. Deploy

```bash
git add .
git commit -m "Add Supabase invite code integration"
git push origin main
```

### 3. Verify Webhook Still Configured

Customer's Stripe Dashboard (LIVE mode) should already have:
- Endpoint: `https://cultivatingthefruit.com/api/webhook`
- Event: `checkout.session.completed`
- Secret: Matches Vercel env var

**No changes needed to their webhook!** The code update is backward compatible.

---

## 🔍 What Changed in Production

When you deploy, the webhook will:
1. ✅ Continue working as before (sends emails via Loops)
2. ✅ **NEW:** Also save invite codes to Supabase
3. ✅ **NEW:** Include direct signup link in emails

**Existing customers:** Not affected
**New customers:** Get seamless signup experience

---

## 📚 Full Documentation

- `TESTING-GUIDE.md` - Complete testing instructions
- `SETUP-INSTRUCTIONS.md` - Initial setup guide
- `INTEGRATION-SUMMARY.md` - How everything works

---

## ✅ Quick Checklist

- [ ] Got customer's Stripe test key
- [ ] Updated `.env.test` with test key
- [ ] Ran `switch-env.bat test`
- [ ] Started Stripe CLI listener
- [ ] Updated webhook secret in `.env.local`
- [ ] Started dev server
- [ ] Made test payment
- [ ] Verified webhook worked
- [ ] Checked Supabase for invite
- [ ] Received email
- [ ] Tested signup link
- [ ] Ready to deploy!

---

**Questions?** Check `TESTING-GUIDE.md` for detailed instructions!
