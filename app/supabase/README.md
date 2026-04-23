# Supabase Setup Guide

This guide walks you through setting up Supabase for the Cultivating the Fruits app.

## Prerequisites

- A Supabase account (free tier works): https://supabase.com
- Node.js 18+ installed
- Basic understanding of SQL

## Step 1: Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Choose your organization (or create a new one)
4. Fill in project details:
   - **Name:** cultivating-the-fruits
   - **Database Password:** Choose a strong password (save this!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free (sufficient for MVP)
5. Click "Create new project"
6. Wait 2-3 minutes for provisioning

## Step 2: Get API Credentials

1. Go to **Settings → API** in your project dashboard
2. Copy the following values:
   - **Project URL** (e.g., `https://abcdefg.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 3: Configure Environment Variables

1. In the `app` directory, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and update:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

3. Keep other defaults for now

## Step 4: Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL Editor
5. Click "Run" (bottom right)
6. Wait for success message: "Success. No rows returned"

## Step 5: Verify Setup

Run the following query in SQL Editor to verify tables were created:

```sql
SELECT
  schemaname,
  tablename,
  tableowner
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

You should see 5 tables:
- `profiles`
- `progress`
- `fruit_progress`
- `journal_entries`
- `partner_links`

## Step 6: Enable Row Level Security Policies

Policies are automatically created by `schema.sql`. Verify them:

1. Go to **Authentication → Policies**
2. You should see policies for all 5 tables
3. Green checkmarks = enabled ✅

## Step 7: Test Connection (Optional)

Run a simple query to test:

```sql
SELECT * FROM profiles LIMIT 1;
```

Should return empty (no error = success).

## Step 8: (Optional) Setup Email Authentication

For web authentication to work:

1. Go to **Authentication → Providers**
2. Enable **Email** provider (should be enabled by default)
3. Configure email templates if desired (**Authentication → Email Templates**)

## Step 9: Deploy Settings (Production)

When deploying to production:

### Vercel (Web)

1. Go to your Vercel project settings
2. Add environment variables:
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
   - `EXPO_PUBLIC_WEB_URL` (your production URL)

### EAS (Native)

1. Add to `eas.json` secrets:
   ```bash
   eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_URL --value https://...
   eas secret:create --scope project --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value eyJ...
   ```

## Troubleshooting

### "No tables created" error

- Check SQL Editor for errors (red text)
- UUID extension may need manual enabling: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
- Try running schema in smaller chunks

### Connection errors in app

- Verify `.env` file exists and has correct values
- Check Supabase project is not paused (free tier auto-pauses after inactivity)
- Restart Expo dev server: `npm start` (then press `r` to reload)

### RLS policy errors

- Ensure user is authenticated (check `auth.users` table)
- Verify policies are enabled (green checkmarks)
- Check policy conditions match your use case

## Database Maintenance

### Expire old partner links

Run this manually or set up with pg_cron:

```sql
SELECT expire_old_partner_links();
```

### Check database size

```sql
SELECT
  pg_size_pretty(pg_database_size(current_database())) as db_size;
```

Free tier limit: 500 MB

## Next Steps

- ✅ Supabase configured
- ✅ Database schema created
- ✅ Environment variables set
- ⏭️ Test authentication in app
- ⏭️ Test data sync
- ⏭️ Deploy to production

## Resources

- [Supabase Docs](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Expo + Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
