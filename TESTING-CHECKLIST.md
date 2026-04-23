# Epic 4 Testing Checklist - Interactive Guide

## ✅ Pre-Test Setup

### Step 1: Supabase Project
Do you have a Supabase project?
- [ ] Yes - I have project URL and API key
- [ ] No - Need to create one

**If YES, continue to Step 2**
**If NO, go to:** https://supabase.com → Create new project → Get credentials

---

### Step 2: Create `.env.local`

**Location:** `app/.env.local`

**Content:** (Replace with YOUR values)
```
EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find these:**
1. Go to Supabase → Your Project
2. Settings → API
3. Copy:
   - Project URL (e.g., `https://abcdef.supabase.co`)
   - Anon Public Key (e.g., `eyJhb...`)

**Verify creation:**
```bash
cat app/.env.local
# Should show your URL and key
```

---

### Step 3: Database Migration

**Goal:** Create partner tables in Supabase

**Steps:**
1. Open Supabase → SQL Editor
2. Click "New Query"
3. Copy entire contents from:
   `database/migrations/004_create_partner_tables.sql`
4. Paste into SQL editor
5. Click "Run"

**Expected output:**
- ✅ No errors
- ✅ Tables created: `partner_invitations`, `user_partnerships`
- ✅ RLS policies enabled

**Verify:**
```sql
-- Run this to confirm tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('partner_invitations', 'user_partnerships');

-- Should show:
-- partner_invitations
-- user_partnerships
```

---

### Step 4: Start the App

```bash
cd app
npm start
# or
expo start
```

Then:
- [ ] Open in iOS simulator / Android emulator / Web
- [ ] App loads without errors
- [ ] No console errors related to Supabase

---

## 🧪 Test Scenarios

### Test 1: Generate Invitation Code ✨

**Setup:**
- [ ] User authenticated and logged in
- [ ] On Dashboard or any tab

**Steps:**
1. Go to **Settings** tab
2. Find **"Relational Handshake"** section (or "Partner Connection")
3. Tap **"Relational Handshake"** button
4. Confirm you see two tabs: "Generate Code" and "Join Partner"
5. On "Generate Code" tab, tap **"Generate Code"** button
6. Wait 2-3 seconds

**Expected Results:**
- [ ] 6-character code appears (e.g., "ABC123", "XYZ789")
- [ ] Code is uppercase letters and numbers only
- [ ] "Share Code" button is visible
- [ ] "Generate New Code" button is visible
- [ ] Expiry date shown (tomorrow's date)
- [ ] NO error messages in console

**Console Check:**
```javascript
// In browser console (if web version)
// You should see a successful Supabase insert
// No errors related to partner_invitations table
```

**Database Verification:**
```sql
-- In Supabase SQL Editor
SELECT code, created_by_user_id, expires_at, is_used
FROM partner_invitations
ORDER BY created_at DESC
LIMIT 1;
-- Should show your newly generated code
```

---

### Test 2: Share Invitation Code 📤

**Setup:**
- [ ] Code generated from Test 1
- [ ] On code display screen

**Steps:**
1. Tap **"Share Code"** button
2. Verify native share sheet appears
3. You should see: SMS, Email, Copy, etc.
4. Cancel the share (for now)

**Expected Results:**
- [ ] Native iOS/Android share sheet appears
- [ ] Share options available
- [ ] Message includes code and app description
- [ ] Can cancel without error

**Example message:**
```
Join me on Cultivating the Fruits! Use this code to link our journey: ABC123
```

---

### Test 3: Join Partner with Code 🤝

**IMPORTANT:** You need TWO users/sessions for this test!

**Option A: Two browser windows (Web)**
```
Window 1: Generate code as User A
Window 2: (Different user) Join as User B
```

**Option B: Simulator + Device**
```
Simulator: Run as User A (generate)
Device: Run as User B (join)
```

**Option C: Two simulator instances** (Advanced)
```
Terminal 1: expo start --ios
Terminal 2: expo start --web
```

---

### Test 3a: Generate Code (User A)

**Steps:**
1. Login as User A
2. Settings → Relational Handshake → Generate Code
3. Tap "Generate Code"
4. **Note the code:** e.g., "FAITH42"
5. DON'T CLOSE THE APP YET

---

### Test 3b: Join Partner (User B)

**Steps:**
1. **In separate session/device/window**, login as User B
2. Settings → Relational Handshake
3. Click "Join Partner" tab
4. Type User A's code (e.g., "FAITH42")
5. Tap "Link Partner" button
6. Wait 2-3 seconds

**Expected Results:**
- [ ] Success alert appears
- [ ] Alert message: "You've linked with [User A's email]"
- [ ] Code field clears
- [ ] Settings now shows "1 partner(s) linked"
- [ ] NO console errors

**Database Verification:**
```sql
-- In Supabase SQL Editor
-- Check partnership was created bidirectionally
SELECT user_id, partner_id, linked_at
FROM user_partnerships
ORDER BY created_at DESC
LIMIT 2;

-- Should show TWO rows:
-- Row 1: User A → User B
-- Row 2: User B → User A
```

**Check code marked as used:**
```sql
SELECT code, is_used, expires_at
FROM partner_invitations
WHERE code = 'FAITH42';

-- Should show: is_used = true
```

---

### Test 4: Verify Partnerships ✅

**Setup:**
- [ ] Test 3 completed successfully
- [ ] Both users still in app (or restart)

**User A Steps:**
1. Go to Settings
2. Check "Partner Connection" section
3. Should show **"1 partner(s) linked"**

**User B Steps:**
1. Go to Settings
2. Check "Partner Connection" section
3. Should show **"1 partner(s) linked"**

**Expected Results:**
- [ ] Both users see partnership status
- [ ] Data persists after app reload
- [ ] NO errors on settings screen

---

### Test 5: Error Handling ❌

#### Test 5a: Invalid Code

**Setup:** User on "Join Partner" tab

**Steps:**
1. Type "INVALID"
2. Tap "Link Partner"

**Expected:**
- [ ] Error alert: "Invalid invitation code"
- [ ] NO partnership created
- [ ] User can try again

**Database Check:**
```sql
-- Should not find invalid code
SELECT * FROM partner_invitations WHERE code = 'INVALID';
-- Result: 0 rows
```

---

#### Test 5b: Empty Code

**Steps:**
1. Leave code field empty
2. Try to tap "Link Partner"

**Expected:**
- [ ] Button disabled (greyed out)
- [ ] OR error message "Please enter an invitation code"
- [ ] NO network request made

---

#### Test 5c: Expired Code (Optional - Hard)

**Setup:**
```sql
-- Manually expire a code in Supabase
UPDATE partner_invitations
SET expires_at = NOW() - INTERVAL '1 day'
WHERE code = 'TESTCODE';
```

**Steps:**
1. Try to join with expired code

**Expected:**
- [ ] Error alert: "Invitation code has expired"
- [ ] NO partnership created

---

## 📊 Completion Checklist

### All Tests Passed?

- [ ] Test 1: Generate code works ✨
- [ ] Test 2: Share code works 📤
- [ ] Test 3: Join partner works 🤝
- [ ] Test 4: Partnerships verified ✅
- [ ] Test 5: Error handling works ❌

### Database Health?

- [ ] Tables exist (partner_invitations, user_partnerships)
- [ ] RLS policies work (correct user isolation)
- [ ] Indexes working (queries fast)
- [ ] Constraints enforced (no self-partnerships)

### Code Quality?

- [ ] NO console errors
- [ ] NO TypeScript errors
- [ ] UI is responsive
- [ ] Error messages are helpful

### Performance?

- [ ] Code generation < 1 second
- [ ] Join partner < 2 seconds
- [ ] Settings loads instantly
- [ ] NO lag or freezing

---

## 🎯 Success Criteria

### Epic 4 Testing is COMPLETE when:

- ✅ Generate code works consistently
- ✅ Codes are 6 characters, unique
- ✅ Share sheet works on device
- ✅ Partners can join with codes
- ✅ Partnerships created bidirectionally
- ✅ Settings shows linked partners
- ✅ Invalid codes rejected
- ✅ Expired codes rejected
- ✅ One-time use enforced
- ✅ NO console errors
- ✅ Data persists across app restarts
- ✅ RLS prevents cross-user access

---

## 🐛 Troubleshooting During Testing

### "Supabase environment variables not set"
```bash
# Check .env.local exists and has content
cat app/.env.local

# If missing, create it with your Supabase credentials
# Then restart the app (Ctrl+C and npm start again)
```

### "relation 'partner_invitations' does not exist"
```bash
# Database migration not run
# Go to Supabase SQL Editor and execute:
# database/migrations/004_create_partner_tables.sql
```

### Code generation fails with network error
```bash
# Check Supabase credentials
# Check internet connection
# Check if tables exist in Supabase
# Check RLS policies are enabled
```

### "Invalid invitation code" but code is correct
```sql
-- Check if code exists
SELECT * FROM partner_invitations WHERE code = 'YOURCODE';

-- Check if already used
SELECT is_used FROM partner_invitations WHERE code = 'YOURCODE';

-- Check if expired
SELECT expires_at FROM partner_invitations WHERE code = 'YOURCODE';
```

### Partnership not created but no error
```sql
-- Check if partnership rows exist
SELECT * FROM user_partnerships
WHERE user_id = 'your-user-id';

-- Should show your partner
```

---

## 📝 Test Report

**Date:** _______________
**Tester:** _______________
**Environment:** [Web / iOS / Android] _______________

### Test Results

| Test | Status | Notes |
|------|--------|-------|
| Generate Code | ✅/❌ | |
| Share Code | ✅/❌ | |
| Join Partner | ✅/❌ | |
| Verify Partners | ✅/❌ | |
| Invalid Code Error | ✅/❌ | |
| Database Integrity | ✅/❌ | |
| Performance | ✅/❌ | |

### Issues Found
1. _______________
2. _______________

### Sign-Off
- [ ] All tests passed
- [ ] Ready for production
- [ ] Ready for Epic 5 integration

---

**Good luck testing! 🚀**

Questions? Check:
- `EPIC-4-TESTING.md` for detailed scenarios
- `EPIC-4-ARCHITECTURE.md` for technical details
