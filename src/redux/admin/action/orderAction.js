import axios from 'axios';
import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
} from '../contsants/orderConstants';

// Fetch all orders
export const listOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    
    const { data } = await axios.get('/api/order');
    console.log(data);
    
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Delete order by ID
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST });
    
    await axios.delete(`/api/order/${id}`);
    
    dispatch({ type: ORDER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
