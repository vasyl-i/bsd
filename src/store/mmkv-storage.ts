import { createMMKV } from 'react-native-mmkv';
import { Storage } from 'redux-persist';

const mmkv = createMMKV({ id: 'redux-persist' });

export const mmkvStorage: Storage = {
  setItem: (key, value) => {
    mmkv.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = mmkv.getString(key);
    return Promise.resolve(value ?? null);
  },
  removeItem: key => {
    mmkv.remove(key);
    return Promise.resolve();
  },
};

