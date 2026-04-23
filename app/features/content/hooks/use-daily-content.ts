import { useUserStore } from '../../../store/user-store';
import { JOURNEY_CONTENT, DailyContent } from '../data/journey-content';

/**
 * Calculates the current day number in the 90-day journey based on onboarding date
 * Returns 1 if onboarding date is not set (fallback for backward compatibility)
 */
const calculateDayNumber = (onboardingDate: string | null): number => {
  if (!onboardingDate) return 1; // Fallback for users who haven't completed onboarding

  const onboarding = new Date(onboardingDate);
  const today = new Date();

  // Set both to start of day (UTC) for consistent calculation
  onboarding.setUTCHours(0, 0, 0, 0);
  today.setUTCHours(0, 0, 0, 0);

  const daysDifference = Math.floor((today.getTime() - onboarding.getTime()) / (1000 * 60 * 60 * 24));

  // Day 1 is the onboarding day, so if 0 days have passed, it's day 1
  return Math.max(1, daysDifference + 1);
};

export const useDailyContent = () => {
  const selectedStream = useUserStore((state) => state.selectedStream);
  const selectedTranslation = useUserStore((state) => state.selectedTranslation);
  const onboardingDate = useUserStore((state) => state.onboardingDate);

  // Calculate the current day number based on onboarding date
  const dayNumber = calculateDayNumber(onboardingDate);

  const contentList = selectedStream ? JOURNEY_CONTENT[selectedStream] : null;
  const todayContent = contentList?.find((c) => c.day_number === dayNumber) || null;

  if (!todayContent) return null;

  // Extract the specific translation text
  const scriptureText = todayContent.bible_text[selectedTranslation] || todayContent.bible_text['NIV'];

  return {
    ...todayContent,
    scriptureText,
  };
};
