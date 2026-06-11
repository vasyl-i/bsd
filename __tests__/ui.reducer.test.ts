import { uiReducer } from '../src/store/reducers/ui.reducer';
import { ActionTypes } from '../src/store/types';

const initialState = {
  isTradeModalVisible: false,
};

describe('uiReducer', () => {
  it('sets modal visible on TRADE_MODAL_SHOW', () => {
    const result = uiReducer(initialState, {
      type: ActionTypes.TRADE_MODAL_SHOW,
    } as any);
    expect(result.isTradeModalVisible).toBe(true);
  });

  it('hides modal on TRADE_MODAL_HIDE', () => {
    const result = uiReducer(
      { isTradeModalVisible: true },
      { type: ActionTypes.TRADE_MODAL_HIDE } as any,
    );
    expect(result.isTradeModalVisible).toBe(false);
  });

  it('returns state for unknown action', () => {
    const result = uiReducer(initialState, {
      type: 'UNKNOWN' as any,
    } as any);
    expect(result).toEqual(initialState);
  });
});