import { ActionTypes, PortfolioState, SetCurrentPriceAction, TradeAction } from '../types.ts';

const initialState: PortfolioState = {
  status: "Available",
  btcAmount: 0.12345678,
  currencyAmount: 224.01,
  currentPrice: 53256.12,
};

export function portfolioReducer(
  state: PortfolioState = initialState,
  action: TradeAction | SetCurrentPriceAction,
): PortfolioState {
  if (
    action.type === ActionTypes.BTC_SELL &&
    !!action.payload.btcAmount &&
    !!action.payload.currencyAmount
  ) {
    return {
      ...state,
      btcAmount: state.btcAmount - action.payload.btcAmount,
      currencyAmount: state.currencyAmount + action.payload.currencyAmount,
    };
  } else if (
    action.type === ActionTypes.BTC_BUY &&
    !!action.payload.btcAmount &&
    !!action.payload.currencyAmount
  ) {
    return {
      ...state,
      btcAmount: state.btcAmount + action.payload.btcAmount,
      currencyAmount: state.currencyAmount - action.payload.currencyAmount,
    };
  } else if (action.type === ActionTypes.SET_CURRENT_PRICE) {
    return {
      ...state,
      currentPrice: action.payload,
    };
  }
  return state;
}
