module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['./jest.setup.ts'],
  forceExit: true,
  transformIgnorePatterns: [
    'node_modules/(?!(react-redux|@react-native|react-native|react-native-safe-area-context|react-native-mmkv|react-native-reanimated|react-native-gesture-handler|react-native-haptic-feedback|react-native-svg|redux-persist|@shopify/react-native-skia|victory-native|react-native-worklets)/)',
  ],
};
