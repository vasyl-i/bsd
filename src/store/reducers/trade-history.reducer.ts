import { ActionTypes, TradeAction, TradeHistoryItem, TradeHistoryState } from '../types.ts';

export const initialState: TradeHistoryState = {
  data: []
};

const getCurrentTime = () => new Date().toTimeString().slice(0, 8);

export function tradeHistoryReducer(
  state: TradeHistoryState = initialState,
  action: TradeAction,
): TradeHistoryState {
  if (action.type === ActionTypes.BTC_BUY) {
    const { btcAmount, currencyAmount } = action.payload;
    const item: TradeHistoryItem = {
      id: Date.now(),
      actionName: 'Buy',
      btc: btcAmount,
      eur: -currencyAmount,
      actionInfo: `+${btcAmount} BTC / -${currencyAmount.toFixed(2)} €`,
      timestamp: getCurrentTime(),
    };
    return {
      ...state,
      data: [...state.data, item],
    };
  }
  if (action.type === ActionTypes.BTC_SELL) {
    const { btcAmount, currencyAmount } = action.payload;
    const item: TradeHistoryItem = {
      id: Date.now(),
      actionName: 'Sell',
      btc: -btcAmount,
      eur: currencyAmount,
      actionInfo: `-${btcAmount} BTC / +${currencyAmount.toFixed(2)} €`,
      timestamp: getCurrentTime(),
    };
    return {
      ...state,
      data: [...state.data, item],
    };
  }
  return state;
}
