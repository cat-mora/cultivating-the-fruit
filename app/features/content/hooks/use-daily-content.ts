import { useUserStore } from '../../../store/user-store';
import { JOURNEY_CONTENT, DailyContent } from '../data/journey-content';

/**
 * Get daily content based on activity completion, not calendar dates
 * Users progress through days by completing activities, preventing lost content from missed days
 */
export const useDailyContent = () => {
  const selectedStream = useUserStore((state) => state.selectedStream);
  const selectedTranslation = useUserStore((state) => state.selectedTranslation);
  const currentDay = useUserStore((state) => state.currentDay);

  // Use activity-based day progression instead of calendar dates
  const dayNumber = currentDay;

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
