import React from 'react';
import { View, Text } from 'react-native';
import { useStreak } from '../hooks/use-streak';
import { FruitType } from '../../../store/progress-store';

const fruitEmojis: Record<FruitType, string> = {
  love: '❤️',
  joy: '😊',
  peace: '☮️',
  patience: '⏳',
  kindness: '🤝',
  goodness: '✨',
  faithfulness: '🙏',
  gentleness: '🕊️',
  'self-control': '🧘',
};

const fruitColors: Record<FruitType, string> = {
  love: 'bg-red-100 border-red-300',
  joy: 'bg-yellow-100 border-yellow-300',
  peace: 'bg-blue-100 border-blue-300',
  patience: 'bg-purple-100 border-purple-300',
  kindness: 'bg-pink-100 border-pink-300',
  goodness: 'bg-green-100 border-green-300',
  faithfulness: 'bg-orange-100 border-orange-300',
  gentleness: 'bg-cyan-100 border-cyan-300',
  'self-control': 'bg-indigo-100 border-indigo-300',
};

const fruitLabels: Record<FruitType, string> = {
  love: 'Love',
  joy: 'Joy',
  peace: 'Peace',
  patience: 'Patience',
  kindness: 'Kindness',
  goodness: 'Goodness',
  faithfulness: 'Faithfulness',
  gentleness: 'Gentleness',
  'self-control': 'Self-Control',
};

/**
 * Displays an interactive fruit map showing user's spiritual progress
 * Each fruit represents a theme cultivated throughout the 90-day journey
 * Completed fruits glow and transition states
 */
export function FruitMap() {
  const { getFruitProgressOverview } = useStreak();
  const overview = getFruitProgressOverview();

  return (
    <View className="gap-6">
      {/* Progress Header */}
      <View className="bg-parchment border border-cream-dark p-4 rounded-[16px]">
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-charcoal font-semibold">
              Fruits Cultivated
            </Text>
            <Text className="text-2xl font-bold text-wine">
              {overview.completed}/{overview.total}
            </Text>
          </View>
          <View className="flex-1 h-3 bg-cream-dark rounded-full ml-4 overflow-hidden">
            <View
              className="h-full bg-sage"
              style={{ width: `${overview.percentage}%` }}
            />
          </View>
          <Text className="text-charcoal/60 font-bold ml-3">
            {overview.percentage}%
          </Text>
        </View>
      </View>

      {/* Fruits Grid */}
      <View className="flex-row flex-wrap gap-3">
        {overview.fruits.map((fruit) => {
          const emoji = fruitEmojis[fruit.fruitTheme];
          const label = fruitLabels[fruit.fruitTheme];
          const colorClass =
            fruit.isCompleted ?
              `${fruitColors[fruit.fruitTheme]} shadow-md scale-105` :
              'bg-cream-dark border-charcoal/10';
          const borderClass = fruit.isCompleted
            ? `border-2 ${fruitColors[fruit.fruitTheme]}`
            : 'border border-charcoal/10';

          return (
            <View
              key={fruit.fruitTheme}
              className={`flex-1 min-w-[30%] p-4 rounded-[16px] items-center justify-center aspect-square transition-all ${borderClass} ${colorClass}`}
            >
              <Text className="text-4xl mb-2">{emoji}</Text>
              <Text
                className={`text-xs font-semibold text-center ${
                  fruit.isCompleted
                    ? 'text-charcoal'
                    : 'text-charcoal/40'
                }`}
              >
                {label}
              </Text>
              {fruit.isCompleted && (
                <Text className="text-2xl mt-1">✓</Text>
              )}
            </View>
          );
        })}
      </View>

      {/* Journey Overview */}
      <View className="bg-mint-light p-4 rounded-[16px] border border-mint">
        <Text className="text-charcoal font-semibold mb-2">
          🌿 Your Spiritual Journey
        </Text>
        <Text className="text-charcoal/60 text-sm leading-5">
          {overview.completed === 0
            ? "Begin cultivating the fruits of the spirit on your 90-day journey. Each completed theme represents growth in love, joy, peace, and more."
            : overview.completed < 5
            ? `You've started cultivating ${overview.completed} fruits. Keep going to complete your spiritual growth journey!`
            : overview.completed < 9
            ? `Beautiful progress! You're cultivating ${overview.completed} of 9 fruits. Nearly complete!`
            : "🌟 Remarkable! You've cultivated all 9 spiritual fruits. Your transformation is complete!"}
        </Text>
      </View>

      {/* Detailed Progress */}
      <View className="bg-parchment border border-cream-dark p-4 rounded-[16px]">
        <Text className="text-wine font-semibold mb-3">Completion Timeline</Text>
        <View className="gap-2">
          {overview.fruits.map((fruit) => (
            <View key={fruit.fruitTheme} className="flex-row items-center justify-between">
              <Text className="text-charcoal/60 text-sm flex-1">
                {fruitLabels[fruit.fruitTheme]}
              </Text>
              <View className="flex-1 h-2 bg-cream-dark rounded-full mx-2 overflow-hidden">
                <View
                  className={`h-full ${
                    fruit.isCompleted ? 'bg-sage' : 'bg-charcoal/10'
                  }`}
                  style={{
                    width: fruit.isCompleted ? '100%' : '0%',
                  }}
                />
              </View>
              <Text className="text-charcoal/60 font-semibold text-xs w-8 text-right">
                {fruit.completedDays.length}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
