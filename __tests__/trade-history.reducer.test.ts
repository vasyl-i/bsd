import { tradeHistoryReducer, initialState } from '../src/store/reducers/trade-history.reducer';
import { ActionTypes } from '../src/store/types';

describe('tradeHistoryReducer', () => {
  it('appends a Buy entry', () => {
    const result = tradeHistoryReducer(initialState, {
      type: ActionTypes.BTC_BUY,
      payload: { btcAmount: 0.1, currencyAmount: 500 },
    });
    expect(result.data).toHaveLength(1);
    expect(result.data[0].actionName).toBe('Buy');
    expect(result.data[0].btc).toBe(0.1);
    expect(result.data[0].eur).toBe(-500);
    expect(result.data[0].actionInfo).toContain('+0.1 BTC');
  });

  it('appends a Sell entry', () => {
    const result = tradeHistoryReducer(initialState, {
      type: ActionTypes.BTC_SELL,
      payload: { btcAmount: 0.2, currencyAmount: 1000 },
    });
    expect(result.data).toHaveLength(1);
    expect(result.data[0].actionName).toBe('Sell');
    expect(result.data[0].btc).toBe(-0.2);
    expect(result.data[0].eur).toBe(1000);
  });

  it('accumulates multiple trades', () => {
    let state = initialState;
    state = tradeHistoryReducer(state, {
      type: ActionTypes.BTC_BUY,
      payload: { btcAmount: 0.1, currencyAmount: 500 },
    });
    state = tradeHistoryReducer(state, {
      type: ActionTypes.BTC_SELL,
      payload: { btcAmount: 0.05, currencyAmount: 300 },
    });
    expect(state.data).toHaveLength(2);
  });

  it('returns state for unknown action', () => {
    const result = tradeHistoryReducer(initialState, {
      type: 'UNKNOWN' as any,
      payload: {} as any,
    });
    expect(result).toEqual(initialState);
  });
});