import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { syncProgress, syncFruitProgress } from '../lib/data/sync-service';
import { Platform } from 'react-native';

export type FruitType =
  | 'love' | 'joy' | 'peace' | 'patience' | 'kindness'
  | 'goodness' | 'faithfulness' | 'gentleness' | 'self-control';

export interface FruitProgress {
  fruitTheme: FruitType;
  completedDays: number[];
  isCompleted: boolean;
  firstCompletedDate: string;
  lastCompletedDate: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalDaysCompleted: number;
  lastCompletedDate: string | null;
  completedDates: string[];
}

interface ProgressState {
  streakData: StreakData;
  fruitProgress: Map<FruitType, FruitProgress>;

  // Actions
  incrementStreak: (today: string) => void;
  updateFruitProgress: (fruit: FruitType, dayNumber: number) => void;
  recordActivityCompletion: (date: string) => void;
  getStreakStatus: () => StreakData;
  getFruitProgress: (fruit: FruitType) => FruitProgress | undefined;
  getAllFruitProgress: () => FruitProgress[];
  syncToSupabase: () => Promise<void>;
}

const defaultStreakData: StreakData = {
  currentStreak: 0,
  longestStreak: 0,
  totalDaysCompleted: 0,
  lastCompletedDate: null,
  completedDates: [],
};

const defaultFruits: FruitType[] = [
  'love', 'joy', 'peace', 'patience', 'kindness',
  'goodness', 'faithfulness', 'gentleness', 'self-control',
];

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      streakData: defaultStreakData,
      fruitProgress: new Map(
        defaultFruits.map(fruit => [
          fruit,
          {
            fruitTheme: fruit,
            completedDays: [],
            isCompleted: false,
            firstCompletedDate: '',
            lastCompletedDate: '',
          },
        ])
      ),

      incrementStreak: (today: string) => {
        set((state) => {
          const lastCompleted = state.streakData.lastCompletedDate;
          const lastDate = lastCompleted ? new Date(lastCompleted) : null;
          const todayDate = new Date(today);

          // Check if user completed today already
          if (lastCompleted === today) {
            return state;
          }

          // Calculate if streak continues
          let newStreak = state.streakData.currentStreak;
          if (lastDate) {
            const daysDiff = Math.floor(
              (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (daysDiff === 1) {
              // Streak continues
              newStreak = state.streakData.currentStreak + 1;
            } else if (daysDiff > 1) {
              // Streak broken, restart
              newStreak = 1;
            }
          } else {
            // First completion
            newStreak = 1;
          }

          const longestStreak = Math.max(
            state.streakData.longestStreak,
            newStreak
          );

          return {
            streakData: {
              currentStreak: newStreak,
              longestStreak,
              totalDaysCompleted: state.streakData.totalDaysCompleted + 1,
              lastCompletedDate: today,
              completedDates: [...state.streakData.completedDates, today],
            },
          };
        });

        // Sync to Supabase after state update
        if (Platform.OS === 'web') {
          // Web: immediate sync
          get().syncToSupabase();
        }
        // Native: background sync will handle it
      },

      updateFruitProgress: (fruit: FruitType, dayNumber: number) => {
        set((state) => {
          const fruitMap = new Map(state.fruitProgress);
          const current = fruitMap.get(fruit) || {
            fruitTheme: fruit,
            completedDays: [],
            isCompleted: false,
            firstCompletedDate: '',
            lastCompletedDate: '',
          };

          if (!current.completedDays.includes(dayNumber)) {
            current.completedDays.push(dayNumber);
            current.completedDays.sort((a, b) => a - b);
            current.lastCompletedDate = new Date().toISOString();

            if (!current.firstCompletedDate) {
              current.firstCompletedDate = new Date().toISOString();
            }

            // Check if all 90 days of this fruit are completed (or majority)
            // Fruits appear multiple times in the 90-day cycle
            if (current.completedDays.length >= 10) {
              current.isCompleted = true;
            }
          }

          fruitMap.set(fruit, current);
          return { fruitProgress: fruitMap };
        });

        // Sync to Supabase after state update
        if (Platform.OS === 'web') {
          // Web: immediate sync
          get().syncToSupabase();
        }
        // Native: background sync will handle it
      },

      recordActivityCompletion: (date: string) => {
        get().incrementStreak(date);
      },

      getStreakStatus: () => get().streakData,

      getFruitProgress: (fruit: FruitType) => get().fruitProgress.get(fruit),

      getAllFruitProgress: () => Array.from(get().fruitProgress.values()),

      syncToSupabase: async () => {
        const state = get();

        try {
          // Sync streak data
          await syncProgress({
            current_streak: state.streakData.currentStreak,
            longest_streak: state.streakData.longestStreak,
            last_completed_date: state.streakData.lastCompletedDate,
            completed_dates: state.streakData.completedDates,
          });

          // Sync fruit progress
          const fruitProgressArray = Array.from(state.fruitProgress.values()).flatMap(fruit => {
            return fruit.completedDays.map(day => ({
              fruit_type: fruit.fruitTheme,
              entry_date: new Date().toISOString().split('T')[0], // TODO: Use actual date from day number
              day_number: day,
              completed: true,
              completed_at: fruit.lastCompletedDate,
            }));
          });

          if (fruitProgressArray.length > 0) {
            await syncFruitProgress(fruitProgressArray);
          }
        } catch (error) {
          console.error('[ProgressStore] Sync failed:', error);
          // Don't throw - allow local-only operation
        }
      },
    }),
    {
      name: 'progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        streakData: state.streakData,
        fruitProgress: Array.from(state.fruitProgress.entries()),
      }),
      merge: (persistedState, currentState) => {
        if (
          persistedState &&
          typeof persistedState === 'object' &&
          'fruitProgress' in persistedState
        ) {
          const fruitMap = new Map(
            (persistedState as any).fruitProgress || []
          );
          return {
            ...currentState,
            ...persistedState,
            fruitProgress: fruitMap,
          };
        }
        return currentState;
      },
    }
  )
);
