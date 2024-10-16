import axios from 'axios';
import {
    PLACE_ORDER_REQUEST,
    PLACE_ORDER_SUCCESS,
    PLACE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    RESET_ORDER
  } from '../constants/checkoutConstants';



// No changes needed here, but ensure orderData contains the full address details.
export const placeOrder = (orderData) => async (dispatch) => {
    try {
      dispatch({ type: PLACE_ORDER_REQUEST });
  
      const { data } = await axios.post('/api/order', orderData); // Adjust the endpoint as needed
  
      dispatch({
        type: PLACE_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PLACE_ORDER_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };

  export const getMyOrders = () => async (dispatch, getState) => {
    try {
      dispatch({ type: MY_ORDERS_REQUEST });
  
      const { data } = await axios.get('/api/order/myorders');
      console.log(data);
  
      dispatch({
        type: MY_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MY_ORDERS_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };

  export const resetOrder = () => ({
    type: RESET_ORDER,
  });