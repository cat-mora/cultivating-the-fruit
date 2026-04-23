/**
 * Environment Variable Access Module
 *
 * Provides cross-platform access to environment variables
 * Metro bundler automatically injects EXPO_PUBLIC_* variables at build time
 * for both native and web platforms.
 */

// Helper to safely access environment variables
function getEnvVar(key: string, defaultValue: string = ''): string {
  // Metro injects process.env at build time for both web and native
  // TypeScript doesn't know about the injected vars, so we need to cast
  const value = (process.env as any)[key];
  return value !== undefined ? String(value) : defaultValue;
}

// Supabase Configuration
export const SUPABASE_URL = getEnvVar('EXPO_PUBLIC_SUPABASE_URL');
export const SUPABASE_ANON_KEY = getEnvVar('EXPO_PUBLIC_SUPABASE_ANON_KEY');

// Web Deployment
export const WEB_URL = getEnvVar('EXPO_PUBLIC_WEB_URL', 'http://localhost:8081');

// Feature Flags
export const ENABLE_SUPABASE = getEnvVar('EXPO_PUBLIC_ENABLE_SUPABASE', 'true') !== 'false';
export const ENABLE_WEB_PLATFORM = getEnvVar('EXPO_PUBLIC_ENABLE_WEB_PLATFORM', 'true') !== 'false';
export const ENABLE_PARTNER_SHARING = getEnvVar('EXPO_PUBLIC_ENABLE_PARTNER_SHARING', 'true') !== 'false';

// Development/Debugging
export const DEBUG_MODE = getEnvVar('EXPO_PUBLIC_DEBUG_MODE', 'false') === 'true';
export const SYNC_INTERVAL_MS = parseInt(getEnvVar('EXPO_PUBLIC_SYNC_INTERVAL_MS', '300000'), 10);

// Validation warnings
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    '⚠️  Supabase credentials not configured. Add EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to .env file and app.json.'
  );
}
