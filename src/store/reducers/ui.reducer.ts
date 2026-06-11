import { ActionTypes, UIAction, UIState } from '../types.ts';

const initialState: UIState = {
  isTradeModalVisible: false,
};

export function uiReducer(state = initialState, action: UIAction) {
  switch (action.type) {
    case ActionTypes.TRADE_MODAL_SHOW: {
      return {
        ...state,
        isTradeModalVisible: true,
      };
    }
    case ActionTypes.TRADE_MODAL_HIDE: {
      return {
        ...state,
        isTradeModalVisible: false,
      };
    }
    default: {
      return state;
    }
  }
}
