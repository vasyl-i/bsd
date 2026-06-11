import { NativeModules, NativeEventEmitter } from 'react-native';

const { PricePollingModule } = NativeModules;

export const PricePollingEmitter = new NativeEventEmitter(PricePollingModule);

export const PricePolling = {
  start(intervalMs: number = 2000) {
    PricePollingModule.startPolling(intervalMs);
  },
  stop() {
    PricePollingModule.stopPolling();
  },
};