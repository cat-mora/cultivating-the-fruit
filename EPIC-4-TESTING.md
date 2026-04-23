# Epic 4: Testing & Troubleshooting Guide

## Pre-Test Checklist

- [ ] `.env.local` created with Supabase credentials
- [ ] Database migration (`004_create_partner_tables.sql`) executed
- [ ] App running with `npm start` (or equivalent)
- [ ] Able to login/authenticate with Supabase
- [ ] No console errors on app load

## Test Scenarios

### Test 1: Generate Invitation Code ✨

**Objective:** Verify code generation works end-to-end

**Steps:**
1. Login with a test user
2. Go to Settings tab
3. Find "Partner Connection" section
4. Tap "Relational Handshake"
5. Confirm you're on "Generate Code" tab
6. Tap "Generate Code" button
7. Wait for code to appear

**Expected Results:**
- ✅ Code appears (e.g., "ABC123", "XYZ789")
- ✅ Code is exactly 6 characters
- ✅ Code contains only letters and numbers
- ✅ "Share Code" button appears
- ✅ "Generate New Code" button appears
- ✅ Expiry date shows (tomorrow)

**Console Checks:**
- No errors in browser/terminal console
- Supabase logs show INSERT to partner_invitations

---

### Test 2: Share Invitation Code 📤

**Objective:** Verify code sharing works

**Steps:**
1. From the code display screen
2. Tap "Share Code" button
3. Verify native share sheet appears
4. Check that message includes code and app description
5. Cancel the share (for testing)

**Expected Results:**
- ✅ Native share sheet appears
- ✅ Message format: "Join me on Cultivating the Fruits! Use this code to link our journey: ABC123"
- ✅ Can share via SMS, email, etc.

---

### Test 3: Join Partner with Code 🤝

**Objective:** Verify partner joining works correctly

**Steps:**
1. From the code display, note the generated code (e.g., "ABC123")
2. **Switch to a different user/device/session**
3. Go to Settings → Relational Handshake
4. Click "Join Partner" tab
5. Type the code (case-insensitive, e.g., "abc123" or "ABC123")
6. Tap "Link Partner" button
7. Wait for response

**Expected Results:**
- ✅ Success alert appears
- ✅ Alert says "You've linked with [email]"
- ✅ Code field clears
- ✅ Settings now shows "1 partner(s) linked"

**Console Checks:**
- SELECT query finds the invitation
- INSERT queries create two partnership rows
- UPDATE marks invitation as used

---

### Test 4: Code Validation Errors ❌

**Objective:** Test error handling

#### Test 4a: Invalid Code
**Steps:**
1. Go to Join Partner tab
2. Enter "INVALID" (or non-existent code)
3. Tap "Link Partner"

**Expected Result:**
- ✅ Error alert: "Invalid invitation code"
- ✅ No partnership created

#### Test 4b: Empty Code
**Steps:**
1. Go to Join Partner tab
2. Leave field empty
3. Tap "Link Partner"

**Expected Result:**
- ✅ Error message: "Please enter an invitation code"
- ✅ Button disabled until input provided

#### Test 4c: Reuse Code (One-Time Use)
**Steps:**
1. Generate code "SHARE1"
2. Partner A joins with "SHARE1" (success)
3. Partner B tries to join with "SHARE1"
4. Tap "Link Partner"

**Expected Result:**
- ✅ Error alert: "Invalid invitation code"
- ✅ Code marked as used after first join
- ✅ Cannot be reused

---

### Test 5: Verify Partners Linked 📋

**Objective:** Confirm partnership appears in both accounts

**Steps:**
1. User A checks Settings → Relational Handshake
2. User B checks Settings → Relational Handshake
3. Both should see each other as linked

**Expected Results:**
- ✅ User A sees "1 partner(s) linked"
- ✅ User B sees "1 partner(s) linked"
- ✅ Supabase has two rows in user_partnerships:
  - (User A → User B)
  - (User B → User A)

---

### Test 6: Code Expiry ⏰

**Objective:** Verify 24-hour expiry (optional long test)

**Steps:**
1. Generate code "EXPIRE1"
2. Note expiry time (should be now + 24h)
3. Wait 24 hours (or manually test in Supabase)
4. Try to join with "EXPIRE1"

**Expected Result:**
- ✅ Error alert: "Invitation code has expired"
- ✅ Cannot join with expired code

**Quick Test Alternative:**
- Manually UPDATE the expires_at in Supabase to past time
- Try to join → Error expected

---

### Test 7: Data Persistence 💾

**Objective:** Verify data persists across app restarts

**Steps:**
1. Generate code and join as partners
2. Close app completely
3. Reopen app
4. Go to Settings
5. Check partner connection status

**Expected Results:**
- ✅ Partner link persists
- ✅ Settings still shows "1 partner(s) linked"
- ✅ Data loaded from AsyncStorage

---

### Test 8: Multiple Partners (Future Enhancement) 👥

**Objective:** Verify multiple partnerships work

**Steps:**
1. User A generates code "CODE1"
2. User B joins with "CODE1"
3. User A generates new code "CODE2"
4. User C joins with "CODE2"

**Expected Results:**
- ✅ User A linked to User B and User C
- ✅ User B linked to User A only
- ✅ User C linked to User A only
- ✅ Settings shows "2 partner(s) linked" for User A

---

## Load Testing

### Code Generation Under Load

**Objective:** Ensure rapid code generation works

**Steps:**
1. Rapidly tap "Generate New Code" 10 times
2. Monitor network tab for requests
3. Check database for duplicate codes

**Expected Results:**
- ✅ All codes generate successfully
- ✅ All codes are unique
- ✅ No database errors
- ✅ No slowdown

---

## RLS Security Testing

### Test 1: Cross-User Access Prevention

**Objective:** Verify RLS prevents users from seeing others' data

**Steps:**
1. Directly query Supabase with User A's auth token
2. Try to SELECT from user_partnerships for User B
3. Query: `SELECT * FROM user_partnerships WHERE user_id = 'User-B-ID'`

**Expected Result:**
- ✅ Query returns 0 rows (User A sees nothing)
- ✅ RLS prevents cross-user access

---

### Test 2: Code Data Isolation

**Objective:** Verify codes are only visible to creator

**Steps:**
1. User A generates code
2. User B tries to query partner_invitations
3. Query: `SELECT * FROM partner_invitations`

**Expected Result:**
- ✅ User B sees no codes
- ✅ Only User A can see their own invitations

---

## Performance Testing

### Response Time Tests

**Metric:** All operations should complete within 500ms

**Tests:**
1. Generate code: < 500ms
2. Validate + join: < 800ms
3. Fetch partners: < 300ms

**Command to Measure:**
```javascript
const start = Date.now();
await generateInviteCode(userId);
const duration = Date.now() - start;
console.log(`Code generation: ${duration}ms`);
```

---

## Common Issues & Solutions

### Issue 1: "Supabase environment variables are not set"

**Cause:** Missing `.env.local` file

**Solution:**
```bash
# Create app/.env.local
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Then restart the app (Metro may need refresh).

---

### Issue 2: "Error: relation 'partner_invitations' does not exist"

**Cause:** Database migration not executed

**Solution:**
1. Go to Supabase SQL Editor
2. Create new query
3. Copy `database/migrations/004_create_partner_tables.sql`
4. Execute
5. Refresh app

---

### Issue 3: "Invalid invitation code" when code is correct

**Possible Causes:**

**a) Code is expired:**
```sql
SELECT code, expires_at, NOW()
FROM partner_invitations
WHERE code = 'ABC123';
-- Check if expires_at < NOW()
```

**b) Code already used:**
```sql
SELECT code, is_used
FROM partner_invitations
WHERE code = 'ABC123';
-- Check if is_used = true
```

**c) Code doesn't exist:**
```sql
SELECT COUNT(*) FROM partner_invitations;
-- Verify codes were created
```

**d) Case sensitivity issue:**
- Try entering in all caps or all lowercase
- The code query uses `.toUpperCase()`, so should be case-insensitive

---

### Issue 4: "User not authenticated"

**Cause:** Not logged in or auth session expired

**Solution:**
1. Login first through Supabase Auth
2. Use `useAuth()` hook to verify userId exists
3. Check Supabase console for auth issues

---

### Issue 5: Settings shows "0 partner(s) linked" after joining

**Cause:** Store not synced with database

**Debugging:**
```javascript
// In console after joining
import { usePartnerStore } from './store/partner-store';
const partners = usePartnerStore.getState().linkedPartners;
console.log('Linked partners:', partners);

// Also check Supabase
SELECT * FROM user_partnerships WHERE user_id = 'your-user-id';
```

**Solution:**
1. Refresh app (full reload)
2. Verify partnership was created in Supabase
3. Check RLS policies are correct

---

### Issue 6: "Navigation failed" when opening partner-linking screen

**Cause:** Route not properly configured

**Solution:**
1. Verify `app/partner-linking.tsx` exists
2. Verify root `_layout.tsx` includes the route:
```tsx
<Stack.Screen
  name="partner-linking"
  options={{ title: 'Relational Handshake' }}
/>
```
3. Restart Expo server

---

### Issue 7: Duplicate partnerships created

**Cause:** Race condition during rapid clicking

**Solution:**
1. Add `disabled={isLoading}` to button
2. Verify in code - already implemented
3. Ensure UUID uniqueness constraint:
```sql
CONSTRAINT unique_partnership UNIQUE (user_id, partner_id)
-- This prevents duplicates at database level
```

---

## Debugging Checklist

When tests fail:

1. **Check Console Logs**
   ```bash
   # Terminal for Expo
   # Check for error messages
   ```

2. **Verify Supabase Queries**
   - Go to Supabase SQL Editor
   - Run: `SELECT COUNT(*) FROM partner_invitations;`
   - Run: `SELECT COUNT(*) FROM user_partnerships;`

3. **Check RLS Policies**
   ```sql
   -- List all policies
   SELECT * FROM pg_policies WHERE tablename = 'partner_invitations';
   SELECT * FROM pg_policies WHERE tablename = 'user_partnerships';
   ```

4. **Monitor Network**
   - Use browser DevTools (if web)
   - Check Supabase request logs
   - Verify auth headers present

5. **Test Auth**
   ```javascript
   const user = await supabase.auth.getUser();
   console.log('Current user:', user);
   ```

---

## Test Report Template

```markdown
# Epic 4 Testing Report

**Date:** [Date]
**Tester:** [Name]
**Environment:** [Expo/Web/Device]

## Test Results

| Test | Status | Notes |
|------|--------|-------|
| Generate Code | ✅/❌ | |
| Share Code | ✅/❌ | |
| Join Partner | ✅/❌ | |
| Invalid Code | ✅/❌ | |
| Code Reuse | ✅/❌ | |
| Verify Partners | ✅/❌ | |
| Data Persistence | ✅/❌ | |

## Issues Found

1. [Issue description]
   - Steps to reproduce
   - Expected vs actual
   - Severity (Critical/High/Medium/Low)

## Sign-Off

- [ ] All tests passed
- [ ] RLS security verified
- [ ] Performance acceptable
- [ ] Ready for Epic 5 integration
```

---

## Success Criteria

You can mark Epic 4 as **COMPLETE** when:

- ✅ Code generation works consistently
- ✅ Code sharing uses native sheet
- ✅ Partner joining validates correctly
- ✅ Invalid codes rejected with proper errors
- ✅ Partnerships created bidirectionally
- ✅ Settings shows linked partners
- ✅ Data persists across app restarts
- ✅ RLS policies prevent cross-user access
- ✅ No console errors in happy path
- ✅ Performance < 800ms for join operation

---

**Status:** Ready for Testing 🚀
**Estimated Testing Time:** 30-45 minutes
