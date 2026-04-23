import { useState, useEffect } from 'react';
import { Text, View, Pressable, ScrollView, Alert as RNAlert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useDailyContent } from '../../features/content/hooks/use-daily-content';
import { useStreak } from '../../features/progress/hooks/use-streak';
import { useUserStore } from '../../store/user-store';
import { Activity } from '../../features/content/data/journey-content';
import { Alert as WebAlert } from '../../lib/alert-web';

const Alert = Platform.OS === 'web' ? WebAlert : RNAlert;

const timeTiers = [5, 15, 30, 60, 120];

export default function DashboardScreen() {
  const router = useRouter();
  const content = useDailyContent();
  const { completeActivityToday, hasCompletedToday, getStreakInfo } = useStreak();
  const [selectedTier, setSelectedTier] = useState<number>(15);
  const [isCompleting, setIsCompleting] = useState(false);

  const streak = getStreakInfo();
  const completedToday = hasCompletedToday();

  const handleMarkComplete = async () => {
    if (!content || completedToday) return;

    try {
      setIsCompleting(true);
      await completeActivityToday(
        content.fruit_theme.toLowerCase() as any,
        content.day_number
      );

      Alert.alert(
        '🎉 Activity Complete!',
        `Great work! Your streak is now ${streak.currentStreak + 1} days. Keep it going!`,
        [{ text: 'Awesome', onPress: () => {} }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to record completion. Please try again.');
    } finally {
      setIsCompleting(false);
    }
  };

  if (!content) {
    return (
      <View className="flex-1 items-center justify-center bg-cream">
        <Text className="text-charcoal/60">Loading your daily ritual...</Text>
      </View>
    );
  }

  const selectedActivity = content.activities.find(a => a.duration_minutes === selectedTier);

  return (
    <ScrollView className="flex-1 bg-cream p-6" contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Header */}
      <View className="mt-14 mb-6">
        <View className="flex-row items-center gap-3 mb-1">
          <Text className="text-3xl">🍇</Text>
          <Text className="text-3xl font-serif text-wine">{content.fruit_theme}</Text>
        </View>
        <Text className="text-charcoal/50 text-sm font-semibold ml-1">Day {content.day_number}</Text>
      </View>

      {/* Streak Badge */}
      {streak.currentStreak > 0 && (
        <View className="mb-5 flex-row items-center gap-2 self-start bg-gold/15 px-4 py-2 rounded-full">
          <Text className="text-lg">🔥</Text>
          <Text className="text-gold font-bold text-sm">
            {streak.currentStreak} Day Streak
          </Text>
        </View>
      )}

      {/* Scripture Card */}
      <View className="bg-rose-dark p-7 rounded-[28px] shadow-lg mb-5">
        <Text className="text-white/40 text-5xl font-serif absolute top-4 left-5">"</Text>
        <Text className="text-white text-xl font-serif text-center leading-8 mt-6 mb-4">
          {content.scriptureText}
        </Text>
        <Text className="text-white/70 text-center font-bold text-sm">{content.bible_reference}</Text>
      </View>

      {/* Time Tier Selector */}
      <View className="flex-row items-center justify-center gap-2 mb-5 py-3">
        {timeTiers.map((tier) => (
          <Pressable
            key={tier}
            onPress={() => setSelectedTier(tier)}
            className={`px-4 py-2 rounded-full ${
              selectedTier === tier ? 'bg-wine' : 'bg-cream-dark'
            }`}
          >
            <Text className={`text-xs font-bold ${selectedTier === tier ? 'text-white' : 'text-charcoal/40'}`}>
              {tier > 60 ? `${tier / 60}h` : `${tier}m`}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Activity Card */}
      {selectedActivity && (
        <View className="bg-blush p-6 rounded-[28px] mb-6">
          <View className="flex-row items-center mb-3 gap-2">
            <View className="bg-wine/10 px-3 py-1 rounded-full">
              <Text className="text-wine font-bold text-xs uppercase">{selectedActivity.category.replace(/-/g, ' ')}</Text>
            </View>
            <Text className="text-charcoal/40 text-xs font-bold uppercase">{selectedTier} min</Text>
          </View>

          <Text className="text-2xl font-serif text-wine mb-2">{selectedActivity.title}</Text>
          <Text className="text-charcoal/70 text-base leading-relaxed mb-6">
            {selectedActivity.description}
          </Text>

          <Pressable
            onPress={handleMarkComplete}
            disabled={isCompleting || completedToday}
            className={`p-4 rounded-full items-center shadow-md ${
              completedToday
                ? 'bg-sage/50'
                : isCompleting
                ? 'bg-sage/70'
                : 'bg-sage'
            }`}
          >
            <Text className="text-white text-lg font-bold">
              {completedToday
                ? '✓ Completed Today'
                : isCompleting
                ? 'Recording...'
                : 'Mark Complete'}
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
