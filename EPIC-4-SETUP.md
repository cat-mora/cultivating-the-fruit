# Epic 4: Relational Handshake - Quick Setup Guide

## What's Been Implemented
✅ Partner linking state management (Zustand store)
✅ Partner invitation & code generation
✅ Partner joining via code
✅ Partner linking UI screens
✅ Settings integration
✅ Navigation routing
✅ Database schema & RLS policies

## 3 Steps to Activate

### Step 1: Add Supabase Credentials
Create a file `app/.env.local`:
```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from your Supabase project settings.

### Step 2: Run Database Migration
1. Go to Supabase → SQL Editor
2. Create a new query
3. Copy the entire contents of: `database/migrations/004_create_partner_tables.sql`
4. Paste and execute

This creates:
- `partner_invitations` table
- `user_partnerships` table
- RLS security policies
- Proper indexes

### Step 3: Test It Out
1. Run `npm start` (or `yarn start`)
2. Create/login with a test user
3. Go to **Settings** → **Relational Handshake**
4. Click "Generate Code" and tap "Generate Code"
5. Share the code with another user
6. Switch to another user and enter the code
7. You're now linked! ✨

## How It Works

### Generate Invitation Code
- Creates a 6-character code (e.g., `ABC123`)
- Valid for 24 hours
- Shareable via native share sheet
- One-time use only

### Join Partner via Code
- Enter the 6-character code
- System validates expiry and uniqueness
- Creates bidirectional partnership link
- Both users can now see they're connected

## File Structure
```
app/
├── features/partner/
│   ├── hooks/
│   │   └── use-partner-linking.ts        ← Core logic
│   └── components/
│       ├── invite-code-display.tsx       ← Generate UI
│       ├── join-partner-form.tsx         ← Join UI
│       └── partner-linking-screen.tsx    ← Main screen
├── store/
│   └── partner-store.ts                  ← State management
├── hooks/
│   └── use-auth.ts                       ← User authentication
├── lib/
│   └── supabase-client.ts                ← Supabase setup
└── app/
    ├── partner-linking.tsx                ← Route
    └── (tabs)/settings.tsx                ← Integration point

database/
└── migrations/
    └── 004_create_partner_tables.sql     ← Database schema
```

## Key Features

### Security
- Row Level Security (RLS) - Users can only access their data
- 24-hour expiring codes
- One-time use codes
- Bidirectional partnerships

### UX
- Clean tab-based interface
- Real-time validation
- Error messages
- Native share sheet integration
- Simple 6-character codes (no complex UUIDs)

## Database Schema

### partner_invitations
```
- id (UUID)
- code (VARCHAR 8) - Short code like "ABC123"
- created_by_user_id (UUID) - Who created it
- expires_at (TIMESTAMP) - 24 hours from creation
- is_used (BOOLEAN) - Used once, then marked true
- created_at, updated_at
```

### user_partnerships
```
- id (UUID)
- user_id (UUID) - One partner
- partner_id (UUID) - Other partner
- linked_at (TIMESTAMP) - When linked
- created_at
```

Bidirectional: If User A links with User B, both rows exist:
- (A → B)
- (B → A)

## Next Steps

1. **Test the Flow** (15 min)
   - Generate codes, share, join
   - Verify partnerships work

2. **View Linked Partners** (Optional Enhancement)
   - Add a screen to see all linked partners
   - Add ability to unlink partners

3. **Integrate with Epic 5** (Next Epic)
   - Show partner progress
   - Shared streak tracking
   - Partner activity updates

4. **Add Notifications** (Optional)
   - Notify when partner joins
   - Notify on partner activity
   - Use Supabase Realtime for live updates

## Troubleshooting

### "Invalid invitation code"
- Code expired? (24 hour limit)
- Already used? (One-time only)
- Typo in code? (Case-insensitive)

### "Supabase environment variables are not set"
- Add `.env.local` file with SUPABASE_URL and ANON_KEY
- Restart the app

### Code generation fails
- Check Supabase credentials
- Ensure migration ran successfully
- Check browser console for errors

### "No user found"
- Make sure you're authenticated with Supabase Auth
- Check that auth.users table has your user record

## Support

For more details, see: `_bmad-output/implementation-artifacts/epic-4-implementation-status.md`

---

**Status:** Ready to Test ✅
**Time to Setup:** ~10 minutes (excluding Supabase project creation)
