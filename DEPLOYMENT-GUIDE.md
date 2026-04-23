# Deployment Guide - Cultivating the Fruits

## Prerequisites

### Web Deployment (Vercel)
1. **Vercel CLI:** `npm i -g vercel`
2. **Vercel Account:** Sign up at https://vercel.com
3. **Environment Variables:** Supabase URL and Anon Key

### Native Deployment (EAS)
1. **EAS CLI:** `npm i -g eas-cli`
2. **Expo Account:** Sign up at https://expo.dev
3. **Apple Developer Account:** ($99/year) for iOS
4. **Google Play Console Account:** ($25 one-time) for Android

---

## Web Deployment (Vercel)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Set Environment Variables in Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Create new project or select existing
3. Go to Settings → Environment Variables
4. Add the following variables:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_WEB_URL=https://app.cultivatingthefruits.com
EXPO_PUBLIC_ENABLE_SUPABASE=true
EXPO_PUBLIC_ENABLE_WEB_PLATFORM=true
EXPO_PUBLIC_ENABLE_PARTNER_SHARING=true
```

### Step 4: Deploy to Production
```bash
cd D:\client-projects\cultivating-the-fruits\app
vercel --prod
```

### Step 5: Configure Custom Domain (Optional)
1. In Vercel Dashboard → Domains
2. Add domain: `app.cultivatingthefruits.com`
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### Step 6: Verify Deployment
1. Visit your production URL
2. Test sign-up flow
3. Test dashboard, progress, journal, settings
4. Check browser console for errors
5. Run Lighthouse audit (target: >90)

**Expected Result:**
- Web app loads in < 1.5s
- All pages functional
- Data syncs to Supabase
- Partner linking works

---

## Native Deployment (iOS & Android)

### Setup EAS

#### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

#### Step 2: Login to Expo
```bash
eas login
```

#### Step 3: Configure EAS
```bash
cd D:\client-projects\cultivating-the-fruits\app
eas build:configure
```

### iOS Deployment

#### Step 1: Update `eas.json` with Apple Info
Edit `app/eas.json`:
```json
{
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-email@example.com",
        "ascAppId": "1234567890",
        "appleTeamId": "TEAM12345"
      }
    }
  }
}
```

**Find your Apple Team ID:**
1. Go to https://developer.apple.com/account
2. Click "Membership" in sidebar
3. Copy "Team ID"

**Find your App Store Connect App ID:**
1. Go to https://appstoreconnect.apple.com
2. My Apps → Your App
3. Copy number from URL (e.g., `https://appstoreconnect.apple.com/apps/1234567890`)

#### Step 2: Build for iOS
```bash
# Development build (for testing)
eas build --platform ios --profile development

# Preview build (TestFlight internal)
eas build --platform ios --profile preview

# Production build (App Store)
eas build --platform ios --profile production
```

#### Step 3: Submit to TestFlight
```bash
eas submit --platform ios --latest
```

#### Step 4: Test on TestFlight
1. Open TestFlight app on iPhone
2. Find "Cultivating the Fruits"
3. Install and test all features
4. Check data sync with web

### Android Deployment

#### Step 1: Create Google Service Account
1. Go to https://play.google.com/console
2. Setup → API Access
3. Create new service account
4. Download JSON key
5. Save as `google-service-account.json` in `app/` directory

#### Step 2: Update `eas.json` with Service Account Path
Already configured in `eas.json`:
```json
{
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "internal"
      }
    }
  }
}
```

#### Step 3: Build for Android
```bash
# Development build (APK for testing)
eas build --platform android --profile development

# Preview build (Internal Testing)
eas build --platform android --profile preview

# Production build (Google Play)
eas build --platform android --profile production
```

#### Step 4: Submit to Google Play
```bash
eas submit --platform android --latest
```

#### Step 5: Test Internal Release
1. Go to Google Play Console
2. Testing → Internal Testing
3. Add testers via email
4. Test all features
5. Verify data sync with web

---

## Environment Variables Reference

### Web (.env for local, Vercel dashboard for production)
```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
EXPO_PUBLIC_WEB_URL=https://app.cultivatingthefruits.com
EXPO_PUBLIC_ENABLE_SUPABASE=true
EXPO_PUBLIC_ENABLE_WEB_PLATFORM=true
EXPO_PUBLIC_ENABLE_PARTNER_SHARING=true
EXPO_PUBLIC_DEBUG_MODE=false
EXPO_PUBLIC_SYNC_INTERVAL_MS=300000
```

### Native (EAS Secrets)
```bash
# Set EAS secrets
eas secret:create --name EXPO_PUBLIC_SUPABASE_URL --value "https://your-project.supabase.co" --scope project
eas secret:create --name EXPO_PUBLIC_SUPABASE_ANON_KEY --value "your-anon-key" --scope project
eas secret:create --name EXPO_PUBLIC_WEB_URL --value "https://app.cultivatingthefruits.com" --scope project
```

---

## Deployment Checklist

### Pre-Deployment
- [ ] Supabase project created and configured
- [ ] Database schema applied (`supabase/schema.sql`)
- [ ] Row Level Security (RLS) policies enabled
- [ ] Environment variables configured
- [ ] `.env.example` updated with all required vars
- [ ] All tests passing locally
- [ ] Lighthouse score > 90 (web)
- [ ] WCAG 2.1 AA compliance verified (web)

### Web Deployment
- [ ] Vercel project created
- [ ] Environment variables added to Vercel
- [ ] Deploy command runs successfully
- [ ] Production URL accessible
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Sign-up/sign-in works
- [ ] Data syncs to Supabase
- [ ] Partner linking functional
- [ ] All pages render correctly
- [ ] No console errors
- [ ] Mobile responsive (test 375px, 768px, 1024px)

### iOS Deployment
- [ ] Apple Developer account active
- [ ] App Store Connect app created
- [ ] Bundle identifier configured
- [ ] EAS build completes successfully
- [ ] TestFlight upload successful
- [ ] Internal testers invited
- [ ] All features tested on device
- [ ] Biometric auth works
- [ ] Data syncs with web
- [ ] Partner linking works
- [ ] No crashes or errors

### Android Deployment
- [ ] Google Play Console account active
- [ ] App created in Play Console
- [ ] Service account JSON configured
- [ ] EAS build completes successfully
- [ ] Internal testing track configured
- [ ] Testers added
- [ ] All features tested on device
- [ ] Biometric auth works
- [ ] Data syncs with web
- [ ] Partner linking works
- [ ] No crashes or errors

### Post-Deployment
- [ ] Monitor error rates (< 0.1%)
- [ ] Check sync success rate (> 99.9%)
- [ ] Gather user feedback
- [ ] Analytics configured (optional)
- [ ] Crashlytics/Sentry configured (optional)
- [ ] Update documentation
- [ ] Create backup plan

---

## Troubleshooting

### Web Build Fails
**Error:** `Failed to compile`
**Solution:** Check Metro bundler logs, ensure all imports are correct

**Error:** `MIME type 'application/json' is not executable`
**Solution:** Fix Metro config, ensure web platform configured correctly

### EAS Build Fails
**Error:** `Gradle build failed`
**Solution:** Check Android dependencies, ensure all native modules compatible

**Error:** `No provisioning profile found`
**Solution:** Configure Apple Developer credentials in EAS dashboard

### Deployment Fails
**Error:** `Environment variable not found`
**Solution:** Add missing variables to Vercel/EAS Secrets

**Error:** `Supabase connection failed`
**Solution:** Verify Supabase URL and anon key are correct

---

## Rollback Plan

### Web Rollback
```bash
# Revert to previous deployment
vercel rollback
```

### Native Rollback
1. Go to App Store Connect / Google Play Console
2. Remove current version from review
3. Resubmit previous version
4. Notify users of update

### Feature Flag Rollback
```bash
# Disable Supabase sync
vercel env add EXPO_PUBLIC_ENABLE_SUPABASE false
vercel --prod
```

---

## Support

**Documentation:** https://docs.expo.dev/eas/
**Vercel Docs:** https://vercel.com/docs
**Supabase Docs:** https://supabase.com/docs

**Issues:** https://github.com/your-repo/issues
