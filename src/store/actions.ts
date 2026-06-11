import { ActionTypes, TradePayload } from './types.ts';

export const btcSell = ({ btcAmount, currencyAmount }: TradePayload) => {
  return {
    type: ActionTypes.BTC_SELL,
    payload: { btcAmount, currencyAmount, timestamp: new Date().toISOString() },
  };
};

export const btcBuy = ({ btcAmount, currencyAmount }: TradePayload) => {
  return {
    type: ActionTypes.BTC_BUY,
    payload: { btcAmount, currencyAmount, timestamp: new Date().toISOString() },
  };
};

export const showTradeModal = () => {
  return {
    type: ActionTypes.TRADE_MODAL_SHOW,
  };
}

export const hideTradeModal = () => {
  return {
    type: ActionTypes.TRADE_MODAL_HIDE,
  }
}

export const setCurrentPrice = (payload: number) => {
  return {
    type: ActionTypes.SET_CURRENT_PRICE,
    payload,
  }
}
