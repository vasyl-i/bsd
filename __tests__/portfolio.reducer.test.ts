import { portfolioReducer } from '../src/store/reducers/portfolio.reducer';
import { ActionTypes } from '../src/store/types';

const initialState = {
  status: 'Available',
  btcAmount: 1,
  currencyAmount: 1000,
  currentPrice: 50000,
};

describe('portfolioReducer', () => {
  it('handles BTC_BUY', () => {
    const result = portfolioReducer(initialState, {
      type: ActionTypes.BTC_BUY,
      payload: { btcAmount: 0.5, currencyAmount: 250 },
    });
    expect(result.btcAmount).toBe(1.5);
    expect(result.currencyAmount).toBe(750);
  });

  it('handles BTC_SELL', () => {
    const result = portfolioReducer(initialState, {
      type: ActionTypes.BTC_SELL,
      payload: { btcAmount: 0.5, currencyAmount: 250 },
    });
    expect(result.btcAmount).toBe(0.5);
    expect(result.currencyAmount).toBe(1250);
  });

  it('ignores buy with zero amounts', () => {
    const result = portfolioReducer(initialState, {
      type: ActionTypes.BTC_BUY,
      payload: { btcAmount: 0, currencyAmount: 0 },
    });
    expect(result).toEqual(initialState);
  });

  it('handles SET_CURRENT_PRICE', () => {
    const result = portfolioReducer(initialState, {
      type: ActionTypes.SET_CURRENT_PRICE,
      payload: 60000,
    });
    expect(result.currentPrice).toBe(60000);
  });

  it('returns state for unknown action', () => {
    const result = portfolioReducer(initialState, {
      type: 'UNKNOWN' as any,
      payload: {} as any,
    });
    expect(result).toEqual(initialState);
  });
});