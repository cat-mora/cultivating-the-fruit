import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { syncPartnerLink } from '../lib/data/sync-service';
import { Platform } from 'react-native';

export interface PartnerLink {
  id: string;
  partnerId: string;
  partnerEmail: string;
  linkedAt: string;
}

interface PartnerState {
  linkedPartners: PartnerLink[];
  currentInviteCode: string | null;
  inviteCodeExpiry: string | null;
  addPartner: (partner: PartnerLink) => void;
  removePartner: (partnerId: string) => void;
  setInviteCode: (code: string, expiry: string) => void;
  clearInviteCode: () => void;
  getLinkedPartners: () => PartnerLink[];
  syncToSupabase: () => Promise<void>;
}

export const usePartnerStore = create<PartnerState>()(
  persist(
    (set, get) => ({
      linkedPartners: [],
      currentInviteCode: null,
      inviteCodeExpiry: null,
      addPartner: (partner) => {
        set((state) => ({
          linkedPartners: [...state.linkedPartners, partner],
        }));

        // Sync to Supabase after state update
        if (Platform.OS === 'web') {
          get().syncToSupabase();
        }
      },

      removePartner: (partnerId) => {
        set((state) => ({
          linkedPartners: state.linkedPartners.filter(
            (p) => p.partnerId !== partnerId
          ),
        }));

        // Sync to Supabase after state update
        if (Platform.OS === 'web') {
          get().syncToSupabase();
        }
      },

      setInviteCode: (code, expiry) => {
        set({ currentInviteCode: code, inviteCodeExpiry: expiry });

        // Sync to Supabase after state update
        if (Platform.OS === 'web') {
          get().syncToSupabase();
        }
      },

      clearInviteCode: () =>
        set({ currentInviteCode: null, inviteCodeExpiry: null }),

      getLinkedPartners: () => get().linkedPartners,

      syncToSupabase: async () => {
        const state = get();

        try {
          // Sync current invite code if exists
          if (state.currentInviteCode && state.inviteCodeExpiry) {
            await syncPartnerLink({
              invite_code: state.currentInviteCode,
              creator_id: 'current-user-id', // TODO: Get from auth
              partner_id: null,
              status: 'pending',
              expires_at: state.inviteCodeExpiry,
              accepted_at: null,
            });
          }

          // Note: Linked partners are synced when they accept invites
          // No need to sync linkedPartners array separately
        } catch (error) {
          console.error('[PartnerStore] Sync failed:', error);
          // Don't throw - allow local-only operation
        }
      },
    }),
    {
      name: 'partner-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
