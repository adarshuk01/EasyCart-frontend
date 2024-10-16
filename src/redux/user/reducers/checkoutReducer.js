import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    RESET_ORDER
  } from '../constants/checkoutConstants';
  
  const initialState = {
    loading: false,
    success: false,
    error: null,
  };
  
  export const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
      case PLACE_ORDER_REQUEST:
        return { ...state, loading: true };
      case PLACE_ORDER_SUCCESS:
        return { loading: false, success: true };
      case PLACE_ORDER_FAIL:
        return { loading: false, error: action.payload };
        case RESET_ORDER:
          return initialState; // Reset to the initial state
      default:
        return state;
    }
  };

  export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case MY_ORDERS_REQUEST:
        return { loading: true };
      case MY_ORDERS_SUCCESS:
        return { loading: false, orders: action.payload };
      case MY_ORDERS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  