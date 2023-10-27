import {
    SELLER_PAYMENT_METHODS_ERROR,
    SELLER_PAYMENT_METHODS_LOADING,
    SELLER_PAYMENT_METHODS_SUCCESS
  } from '../../constants/action-types';
  
  const initialState = {
    loading: false,
    success: false,
    error: false,
    responseData: {}
  };
  
  export default function sellerPaymentMethodsReducer(state = initialState, action) {
    switch (action.type) {
      case SELLER_PAYMENT_METHODS_LOADING:
        return {
          ...initialState,
          loading: true,
          error: false,
          success: false
        };
      case SELLER_PAYMENT_METHODS_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          success: true,
          responseData: action.value
        };
      case SELLER_PAYMENT_METHODS_ERROR:
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
  