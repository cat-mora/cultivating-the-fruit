import { useCallback, useState } from 'react';
import { useProgressStore, FruitType } from '../../../store/progress-store';

/**
 * Hook for managing streak updates and celebrations
 * Handles incrementing streaks, tracking daily completions, and fruit progress
 */
export function useStreak() {
  const { incrementStreak, updateFruitProgress, getStreakStatus, getAllFruitProgress } =
    useProgressStore();
  const [isAnimating, setIsAnimating] = useState(false);

  /**
   * Complete today's activity and increment streak
   * Triggers celebration animation
   */
  const completeActivityToday = useCallback(async (fruit: FruitType, dayNumber: number) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    // Trigger animations
    setIsAnimating(true);

    // Update stores
    incrementStreak(today);
    updateFruitProgress(fruit, dayNumber);

    // Animation plays for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnimating(false);

    return { success: true, timestamp: today };
  }, [incrementStreak, updateFruitProgress]);

  /**
   * Get current streak info
   */
  const getStreakInfo = useCallback(() => {
    return getStreakStatus();
  }, [getStreakStatus]);

  /**
   * Check if user already completed today
   */
  const hasCompletedToday = useCallback(() => {
    const streak = getStreakStatus();
    const today = new Date().toISOString().split('T')[0];
    return streak.lastCompletedDate === today;
  }, [getStreakStatus]);

  /**
   * Get fruit progress overview
   */
  const getFruitProgressOverview = useCallback(() => {
    const fruits = getAllFruitProgress();
    const completed = fruits.filter(f => f.isCompleted).length;
    const total = fruits.length;

    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100),
      fruits,
    };
  }, [getAllFruitProgress]);

  /**
   * Get days until streak is lost (without completion)
   */
  const getDaysUntilStreakLost = useCallback(() => {
    const streak = getStreakStatus();
    if (!streak.lastCompletedDate) return null;

    const lastDate = new Date(streak.lastCompletedDate);
    const tomorrow = new Date(lastDate);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const now = new Date();
    const hoursRemaining = Math.max(0, (tomorrow.getTime() - now.getTime()) / (1000 * 60 * 60));

    return {
      hoursRemaining: Math.ceil(hoursRemaining),
      daysRemaining: hoursRemaining > 24 ? 1 : 0,
    };
  }, [getStreakStatus]);

  return {
    completeActivityToday,
    getStreakInfo,
    hasCompletedToday,
    getFruitProgressOverview,
    getDaysUntilStreakLost,
    isAnimating,
  };
}
