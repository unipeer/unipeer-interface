import {
    INACTIVE_SELL_ORDER_ERROR,
    INACTIVE_SELL_ORDER_LOADING,
    INACTIVE_SELL_ORDER_SUCCESS
  } from '../../constants/action-types';
  
  const initialState = {
    loading: false,
    success: false,
    error: false,
    responseData: {}
  };
  
  export default function activeBuyOrderReducer(state = initialState, action) {
    switch (action.type) {
      case INACTIVE_SELL_ORDER_LOADING:
        return {
          ...initialState,
          loading: true,
          error: false,
          success: false
        };
      case INACTIVE_SELL_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          success: true,
          responseData: action.value
        };
      case INACTIVE_SELL_ORDER_ERROR:
        return {
          ...state,
          loading: false,
          error: action.error,
          success: false
        };
      default:
        return state;
    }
  }
  