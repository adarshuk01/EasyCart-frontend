// src/redux/admin/action/customerActions.js

import axios from 'axios';
import {
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_DELETE_REQUEST,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_DELETE_FAIL,
} from '../contsants/customerConstants';

// Fetch all customers
export const listCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LIST_REQUEST });

    const { data } = await axios.get('/api/customer'); // API endpoint for customers

    dispatch({
      type: CUSTOMER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Delete customer
export const deleteCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_DELETE_REQUEST });

    await axios.delete(`/api/customer/${id}`); // API endpoint for deleting customer

    dispatch({
      type: CUSTOMER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CUSTOMER_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
