jest.mock('react-native-mmkv', () => ({
  createMMKV: () => ({
    getString: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
    contains: jest.fn(() => false),
    clearAll: jest.fn(),
  }),
}));

jest.mock('react-native-haptic-feedback', () => ({
  trigger: jest.fn(),
}));

jest.mock('./src/native/NativePricePolling', () => ({
  PricePolling: {
    start: jest.fn(),
    stop: jest.fn(),
  },
  PricePollingEmitter: {
    addListener: jest.fn(() => ({ remove: jest.fn() })),
  },
}));

jest.mock('@shopify/react-native-skia', () => ({
  Canvas: 'Canvas',
  Circle: 'Circle',
  Line: 'Line',
  Text: 'Text',
  matchFont: () => ({ measureText: () => ({ width: 0 }) }),
  vec: jest.fn(),
  LinearGradient: 'LinearGradient',
  DashPathEffect: 'DashPathEffect',
  RoundedRect: 'RoundedRect',
}));

jest.mock('victory-native', () => ({
  CartesianChart: 'CartesianChart',
  Line: 'Line',
  Area: 'Area',
}));

jest.mock('react-native-worklets', () => ({}));

jest.mock('react-native-reanimated', () => ({
  useSharedValue: jest.fn((v) => ({ value: v })),
  useAnimatedStyle: jest.fn(() => ({})),
  withTiming: jest.fn((v) => v),
  withSpring: jest.fn((v) => v),
  default: { addListener: jest.fn(), removeListener: jest.fn() },
}));
