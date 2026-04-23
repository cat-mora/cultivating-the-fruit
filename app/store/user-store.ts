import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { syncUserProfile } from '../lib/data/sync-service';
import { Platform } from 'react-native';

export type JourneyStream = 'strengthen' | 'repair' | 'family';
export type BibleTranslation = 'NIV' | 'ESV' | 'KJV' | 'NLT' | 'NKJV';

interface UserState {
  hasOnboarded: boolean;
  selectedStream: JourneyStream | null;
  selectedTranslation: BibleTranslation;
  onboardingDate: string | null; // ISO date string
  setStream: (stream: JourneyStream) => void;
  setTranslation: (translation: BibleTranslation) => void;
  completeOnboarding: () => void;
  syncToSupabase: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      hasOnboarded: false,
      selectedStream: null,
      selectedTranslation: 'NIV',
      onboardingDate: null,

      setStream: (stream) => {
        set({ selectedStream: stream });
        // Sync to Supabase after state update
        if (Platform.OS === 'web') {
          // Web: immediate sync
          get().syncToSupabase();
        }
        // Native: background sync will handle it
      },

      setTranslation: (translation) => {
        set({ selectedTranslation: translation });
        // Sync to Supabase after state update
        if (Platform.OS === 'web') {
          // Web: immediate sync
          get().syncToSupabase();
        }
        // Native: background sync will handle it
      },

      completeOnboarding: () => {
        const onboardingDate = new Date().toISOString().split('T')[0];
        set({ hasOnboarded: true, onboardingDate });
        // Sync to Supabase after state update
        if (Platform.OS === 'web') {
          // Web: immediate sync
          get().syncToSupabase();
        }
        // Native: background sync will handle it
      },

      syncToSupabase: async () => {
        const state = get();

        // Only sync if user has completed onboarding
        if (!state.hasOnboarded || !state.selectedStream || !state.onboardingDate) {
          return;
        }

        try {
          await syncUserProfile('current-user-id', {
            stream: state.selectedStream,
            translation: state.selectedTranslation,
            onboarding_date: state.onboardingDate,
            device_id: Platform.OS !== 'web' ? 'device-id' : null,
            email: null, // Will be set from auth if linked
          });
        } catch (error) {
          console.error('[UserStore] Sync failed:', error);
          // Don't throw - allow local-only operation
        }
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
