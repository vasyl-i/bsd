export const ActionTypes = {
  BTC_BUY: 'BTC_BUY',
  BTC_SELL: 'BTC_SELL',
  TRADE_MODAL_SHOW: 'TRADE_MODAL_SHOW',
  TRADE_MODAL_HIDE: 'TRADE_MODAL_HIDE',
  SET_CURRENT_PRICE: 'SET_CURRENT_PRICE',
} as const;


export interface PortfolioState {
  status: string;
  btcAmount: number;
  currencyAmount: number;
  currentPrice: number;
}

export type TradePayload = { btcAmount: number; currencyAmount: number };

export type TradeAction = {
  type: typeof ActionTypes.BTC_BUY | typeof ActionTypes.BTC_SELL;
  payload: TradePayload;
};

export type SetCurrentPriceAction = {
  type: typeof ActionTypes.SET_CURRENT_PRICE;
  payload: number;
}

export interface UIState {
  isTradeModalVisible: boolean;
}

export type UIAction = {
  type: typeof ActionTypes.TRADE_MODAL_SHOW | typeof ActionTypes.TRADE_MODAL_HIDE;
  payload: boolean;
};

export type TradeHistoryItem = {
  id: number;
  actionName: 'Buy' | 'Sell';
  actionInfo: string;
  timestamp: string;
  btc: number;
  eur: number;
};

export type TradeHistoryState = { data: TradeHistoryItem[] };

