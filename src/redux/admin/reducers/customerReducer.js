// src/redux/admin/reducers/customerReducer.js

import {
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_SUCCESS,
  CUSTOMER_CREATE_FAIL,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_DELETE_REQUEST,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_DELETE_FAIL,
} from '../contsants/customerConstants';

const initialState = {
  customers: [],
  loading: false,
  error: null,
  success: false, // For tracking success of create/update/delete actions
};

// Reducer for listing customers
export const customerListReducer = (state = initialState, action) => {
  switch (action.type) {
      case CUSTOMER_LIST_REQUEST:
          return { ...state, loading: true };
      case CUSTOMER_LIST_SUCCESS:
          return { ...state, loading: false, customers: action.payload, error: null };
      case CUSTOMER_LIST_FAIL:
          return { ...state, loading: false, error: action.payload };
      default:
          return state;
  }
};


// Reducer for deleting customers
export const customerDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
      case CUSTOMER_DELETE_REQUEST:
          return { ...state, loading: true, success: false };
      case CUSTOMER_DELETE_SUCCESS:
          return { ...state, loading: false, success: true, error: null };
      case CUSTOMER_DELETE_FAIL:
          return { ...state, loading: false, error: action.payload };
      default:
          return state;
  }
};
