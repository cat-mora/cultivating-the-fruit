/**
 * Web mock for react-native-worklets
 * Worklets don't run on web, so we provide no-op implementations
 */

// Export empty/no-op versions of worklets APIs
module.exports = {
  createWorklet: () => () => {},
  createSerializable: (value) => value,
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,
  useSharedValue: (initial) => ({ value: initial }),
  useDerivedValue: (fn) => ({ value: fn() }),
  useAnimatedStyle: (fn) => fn(),
  withTiming: (value) => value,
  withSpring: (value) => value,
  withDelay: (delay, animation) => animation,
  withSequence: (...animations) => animations[animations.length - 1],
  cancelAnimation: () => {},
  makeMutable: (value) => ({ value }),
};
