import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { portfolioReducer, tradeHistoryReducer, uiReducer } from './reducers';
import { mmkvStorage } from './mmkv-storage.ts';

const portfolioPersistConfig = {
  key: 'portfolio',
  storage: mmkvStorage,
};

const tradeHistoryPersistConfig = {
  key: 'tradeHistory',
  storage: mmkvStorage,
};

const rootReducer = combineReducers({
  portfolio: persistReducer(portfolioPersistConfig, portfolioReducer),
  tradeHistory: persistReducer(tradeHistoryPersistConfig, tradeHistoryReducer),
  ui: uiReducer,
});

const store = createStore(rootReducer, undefined, applyMiddleware(thunk));

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
