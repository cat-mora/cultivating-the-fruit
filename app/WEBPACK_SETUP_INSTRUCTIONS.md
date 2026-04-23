# Webpack Setup Instructions

## Issue Resolved
The `import.meta` error was caused by using Metro bundler for web builds. Expo web traditionally uses Webpack, which handles ESM modules better.

## Changes Made

1. **`app.json`** - Changed web bundler from `"metro"` to `"webpack"`
2. **`webpack.config.js`** - Created custom webpack config for Expo web
3. **`lib/env.ts`** - Simplified to use process.env directly (works with both Metro and Webpack)
4. **`metro.config.js`** - Added sourceExts for better module resolution

---

## Required: Install Webpack Dependencies

Run these commands to install the necessary webpack packages:

```bash
cd D:\client-projects\cultivating-the-fruits\app

# Install webpack config for Expo SDK 54
npm install --save-dev @expo/webpack-config@~21.0.0

# Install webpack dependencies if not present
npm install --save-dev webpack webpack-dev-server
```

---

## After Installation

Once the packages are installed:

```bash
# Clear cache and restart
npx expo start -c

# Press 'w' for web when Expo DevTools appears
```

---

## What Changed

### Before (Metro)
- Metro bundler for web was encountering ESM modules (import.meta)
- Metro on web doesn't handle certain modern packages well
- Process.env injection wasn't working correctly

### After (Webpack)
- Webpack bundler for web (industry standard for Expo web)
- Better ESM module support
- Proper environment variable injection via DefinePlugin
- Compatible with React Router and React Query

---

## Expected Results

After installing and restarting:
- ✅ No `import.meta` errors
- ✅ Web app loads at http://localhost:8081
- ✅ Can navigate to /auth/sign-in
- ✅ Supabase connection works
- ✅ All EXPO_PUBLIC_* variables accessible

---

## If Issues Persist

If you still see errors after installation:

1. **Delete node_modules and reinstall:**
   ```bash
   cd app
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

2. **Clear all caches:**
   ```bash
   npx expo start -c --clear
   ```

3. **Check webpack is installed:**
   ```bash
   npm list @expo/webpack-config
   ```

---

## Native Builds Unchanged

This change **only affects web builds**. Native iOS/Android builds still use Metro bundler and are unaffected.

---

Run the npm install command above, then restart the dev server!
