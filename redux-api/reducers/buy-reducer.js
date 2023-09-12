import {
    BUY_LOADING,
    BUY_SUCCESS,
    BUY_ERROR
  } from '../../constants/action-types';
  
  const initialState = {
    loading: false,
    success: false,
    error: false,
    responseData: {}
  };
  
  export default function buyReducer(state = initialState, action) {
    switch (action.type) {
      case BUY_LOADING:
        return {
          ...initialState,
          loading: true,
          error: false,
          success: false
        };
      case BUY_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          success: true,
          responseData: action.value
        };
      case BUY_ERROR:
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
  