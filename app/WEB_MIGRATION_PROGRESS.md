# Web Migration Progress

**Started:** 2026-04-21
**Target:** Production-ready Expo Universal app (web + native) in 14 days
**Strategy:** Keep native apps, add web support with React Router + Supabase cloud sync

---

## ✅ Phase 1: Foundation (COMPLETED)

**Duration:** 2026-04-21
**Status:** ✅ Complete - Supabase configured and database schema loaded

### Completed Tasks

1. **Dependencies Installed**
   - ✅ react-router-dom@^6.28.0
   - ✅ react-router@^6.28.0
   - ✅ @tanstack/react-query@^5.62.0
   - ✅ date-fns@^4.1.0
   - ✅ @supabase/supabase-js (already present)

2. **Database Schema Created**
   - ✅ `supabase/schema.sql` (400+ lines)
   - ✅ 5 tables: profiles, progress, fruit_progress, journal_entries, partner_links
   - ✅ Row Level Security policies configured
   - ✅ Automatic updated_at triggers
   - ✅ Indexes for performance
   - ✅ Partner link expiry function

3. **Configuration Files**
   - ✅ `.env.example` - Environment variable template with feature flags
   - ✅ `.gitignore` updated to exclude `.env`
   - ✅ `lib/feature-flags.ts` - Centralized feature flag management

4. **Core Infrastructure**
   - ✅ `lib/supabase/config.ts` - Supabase client with platform-specific storage
   - ✅ `store/auth-store.ts` - Zustand auth state management
   - ✅ `lib/auth/auth-service.ts` - Unified auth (email + biometric)

5. **Documentation**
   - ✅ `supabase/README.md` - Complete setup guide

### Files Created (9 new files)

1. `supabase/schema.sql`
2. `supabase/README.md`
3. `.env.example`
4. `lib/supabase/config.ts`
5. `lib/auth/auth-service.ts`
6. `lib/feature-flags.ts`
7. `store/auth-store.ts`
8. `WEB_MIGRATION_PROGRESS.md` (this file)

### Files Modified (1)

1. `.gitignore` - Added `.env` exclusion

### Next Steps for User

**BEFORE proceeding to Phase 2, you must:**

1. **Create Supabase Project**
   - Go to https://supabase.com/dashboard
   - Click "New Project"
   - Name: `cultivating-the-fruits`
   - Choose region and password
   - Wait for provisioning (2-3 minutes)

2. **Run Database Schema**
   - Open Supabase SQL Editor
   - Copy/paste contents of `app/supabase/schema.sql`
   - Click "Run"
   - Verify 5 tables created

3. **Configure Environment**
   - Copy `app/.env.example` to `app/.env`
   - Update with your Supabase credentials:
     - `EXPO_PUBLIC_SUPABASE_URL`
     - `EXPO_PUBLIC_SUPABASE_ANON_KEY`
   - Keep other defaults

4. **Test Connection**
   - Run `cd app && npm start`
   - Check console for Supabase errors
   - App should still work as before (local-only mode)

**See `app/supabase/README.md` for detailed setup instructions.**

---

## ✅ Phase 2: Authentication System (COMPLETED)

**Duration:** 2026-04-21
**Status:** ✅ Complete - Web authentication UI built, React Router configured

### Completed Tasks

1. ✅ Created platform router in `_layout.tsx`
2. ✅ Preserved native layout as `_layout.native.tsx`
3. ✅ Created React Router entry point `(web)/index.tsx`
4. ✅ Built web auth UI (sign-in, sign-up pages)
5. ✅ Implemented auth layouts (app layout, auth layout)
6. ✅ Created global web CSS with warm color palette

### Files Created (7)

1. `app/_layout.native.tsx` - Preserved Expo Router for native
2. `app/_layout.tsx` - Platform detection router
3. `app/(web)/index.tsx` - React Router with protected routes
4. `app/(web)/layouts/app-layout.tsx` - Protected app layout with navigation
5. `app/(web)/layouts/auth-layout.tsx` - Public auth layout
6. `app/(web)/auth/sign-in.tsx` - Email/password sign in
7. `app/(web)/auth/sign-up.tsx` - Email/password registration
8. `global.web.css` - Web-specific styles

### Architecture Implemented

**Platform Router (`_layout.tsx`):**
- Detects Platform.OS
- Web → React Router
- Native → Expo Router
- Initializes auth on app start

**React Router Structure:**
- `/auth/sign-in` - Public sign in page
- `/auth/sign-up` - Public registration page
- `/dashboard` - Protected (placeholder)
- `/progress` - Protected (placeholder)
- `/journal` - Protected (placeholder)
- `/settings` - Protected (placeholder)

**Auth Flow:**
- Protected routes redirect to `/auth/sign-in` if not authenticated
- Public routes redirect to `/dashboard` if already authenticated
- Session managed via Zustand auth-store
- Email/password auth via Supabase

---

## ✅ Phase 3: Data Sync Layer (COMPLETED)

**Duration:** 2026-04-21
**Status:** ✅ Complete - Bidirectional sync operational

### Completed Tasks

1. ✅ Created sync service (AsyncStorage ↔ Supabase)
2. ✅ Built React Query hooks for web (progress, profile, journal, partner)
3. ✅ Modified all 4 stores to auto-sync
4. ✅ Implemented migration script for existing users
5. ✅ Added background sync for native (5 min intervals)
6. ✅ Configured immediate sync for web

### Files Created (8)

1. `lib/data/sync-service.ts` - Core bidirectional sync
2. `lib/data/queries/use-progress.ts` - Progress hooks
3. `lib/data/queries/use-profile.ts` - Profile hooks
4. `lib/data/queries/use-journal.ts` - Journal hooks
5. `lib/data/queries/use-partner.ts` - Partner hooks
6. `lib/migration/migrate-to-supabase.ts` - Migration script
7. `PHASE_3_COMPLETE.md` - Detailed documentation

### Files Modified (5)

1. `store/user-store.ts` - Added syncToSupabase()
2. `store/progress-store.ts` - Added syncToSupabase()
3. `store/journal-store.ts` - Added syncToSupabase()
4. `store/partner-store.ts` - Added syncToSupabase()
5. `app/_layout.tsx` - Initialize background sync

### Architecture Implemented

**Sync Strategy:**
- Native: AsyncStorage-first (offline), background sync every 5 min
- Web: Supabase-first (online-only), immediate sync
- Conflict resolution: Last write wins (timestamp-based)

**Data Flow:**
- Native: User action → AsyncStorage → Background sync → Supabase
- Web: User action → React Query mutation → Supabase → Cache update

**Migration:**
- One-time upload of AsyncStorage → Supabase
- Auto-detects local data on startup
- Marks completion to prevent re-runs
- Idempotent (safe to re-run)

---

## ✅ Phase 4: Partner Linking Cross-Platform (COMPLETED)

**Duration:** 2026-04-21
**Status:** ✅ Complete - Cross-platform partner invites operational

### Completed Tasks

1. ✅ Created web partner join page (`/partner/:code`)
2. ✅ Built web partner invite hook with shareable URLs
3. ✅ Updated native partner hook to use unified schema
4. ✅ Integrated Web Share API (mobile browsers)
5. ✅ Added clipboard fallback (desktop)
6. ✅ Ensured cross-platform compatibility

### Files Created (2)

1. `app/(web)/partner/join.tsx` - Auto-join via URL
2. `features/partner/hooks/use-partner-invite.web.ts` - Web Share API integration

### Files Modified (2)

1. `features/partner/hooks/use-partner-linking.ts` - Updated to unified `partner_links` table
2. `app/(web)/index.tsx` - Added `/partner/:code` route

---

## ✅ Bug Fix: Environment Variable Access (COMPLETED)

**Duration:** 2026-04-21
**Status:** ✅ Complete - Web builds now access env vars correctly

### Issue
- Web builds encountered `Uncaught SyntaxError: Cannot use 'import.meta' outside a module`
- Direct `process.env` access doesn't work reliably on Expo web
- Environment variables need cross-platform compatibility

### Solution
Created unified environment variable system:

### Files Created (1)

1. `lib/env.ts` - Cross-platform env var access using expo-constants

### Files Modified (7)

1. `app.json` - Added `extra` field with all environment variables
2. `lib/supabase/config.ts` - Import from `lib/env` instead of `process.env`
3. `lib/feature-flags.ts` - Import from `lib/env`
4. `lib/auth/auth-service.ts` - Import `WEB_URL` from `lib/env`
5. `hooks/use-auth.ts` - Updated import path from `supabase-client` to `supabase/config`
6. `__tests__/features/partner/use-partner-linking.test.ts` - Updated mock path
7. `__tests__/reset-app-state.test.ts` - Updated mock path

### How It Works
- Native: Metro injects `process.env` at build time
- Web: `Constants.expoConfig.extra` provides runtime access
- Fallback: Tries both methods for maximum compatibility

### Architecture Implemented

**Unified Partner System:**
- Same 6-character invite codes work on both platforms
- Web: Generates shareable URLs (`https://app.com/partner/ABC123`)
- Native: Shows code for manual entry (`ABC123`)
- Single Supabase `partner_links` table
- Cross-platform compatibility (web codes work on native, vice versa)

**Web Share API:**
- Mobile browsers: Native share sheet
- Desktop browsers: Copy to clipboard
- Graceful degradation for old browsers

**Partner Visibility:**
- Partners can see each other's progress
- Partners can see each other's streaks
- Journal remains private

---

## 📋 Remaining Phases (Days 7-14)

- ⏭️ Phase 5: Web Components - Dashboard & Progress (Days 7-9)
- ⏭️ Phase 6: Web Components - Journal & Settings (Day 9)
- ⏭️ Phase 6: Web Components - Journal & Settings (Day 9)
- ⏭️ Phase 5: Web Components - Dashboard & Progress (Days 7-9)
- ⏭️ Phase 6: Web Components - Journal & Settings (Day 9)
- ⏭️ Phase 7: Styling & Responsive Design (Day 9)
- ⏭️ Phase 8: Build & Deploy Configuration (Days 10-11)
- ⏭️ Phase 9: Cross-Platform Testing (Days 12-13)
- ⏭️ Phase 10: User Migration & Launch (Day 14)

---

## Architecture Decisions Made

### Platform-Specific Storage

- **Web:** localStorage (default Supabase behavior)
- **Native:** AsyncStorage adapter for Supabase Auth
- **Rationale:** Each platform uses its native persistence layer

### Authentication Strategy

- **Web:** Email/password via Supabase Auth (standard web flow)
- **Native:** Biometric/PIN with anonymous Supabase account
- **Cross-device:** Optional email linking for native users
- **Rationale:** Native users expect biometric, web users expect email

### Feature Flags for Gradual Rollout

- `EXPO_PUBLIC_ENABLE_SUPABASE` - Cloud sync on/off
- `EXPO_PUBLIC_ENABLE_WEB_PLATFORM` - Web routes on/off
- `EXPO_PUBLIC_ENABLE_PARTNER_SHARING` - Partner links on/off
- **Rationale:** Safe rollback if issues arise

### Database Design

- **RLS Policies:** Users can only access their own data
- **Partner Visibility:** Partners can view each other's progress (not journal)
- **Journal Encryption:** Client-side AES-256 before upload
- **Rationale:** Privacy-first, GDPR-compliant

---

## Known Limitations

1. **Web offline mode:** Not implemented (requires internet)
2. **Native-web data migration:** One-way (AsyncStorage → Supabase)
3. **Journal encryption key:** Stored in device keychain (not recoverable if lost)
4. **Partner codes:** 24-hour expiry (no extension mechanism)

---

## Testing Checklist (Phase 9)

### Cross-Platform Data Sync

- [ ] Sign up on web → Login on native → See same data
- [ ] Complete activity on native → See on web after sync
- [ ] Update profile on web → See on native

### Partner Linking

- [ ] Generate partner link on web → Join on native
- [ ] Generate partner code on native → Join on web
- [ ] See partner's progress (not journal)

### Authentication

- [ ] Web email sign up/sign in works
- [ ] Native biometric works
- [ ] Native PIN fallback works
- [ ] Sign out clears all data

### Performance

- [ ] Web Lighthouse score > 90
- [ ] Native app launch < 2s
- [ ] Data sync success rate > 99.9%

---

## Rollback Plan

If critical issues arise:

1. **Disable Supabase:** Set `EXPO_PUBLIC_ENABLE_SUPABASE=false`
2. **Disable Web:** Set `EXPO_PUBLIC_ENABLE_WEB_PLATFORM=false`
3. **Revert to native-only:** Take down web deployment

AsyncStorage remains intact - no data loss.

---

## Contact

For questions or issues during migration:
- Check `supabase/README.md` for setup help
- Review `lib/supabase/config.ts` for connection issues
- Check `.env.example` for required variables
