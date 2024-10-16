import axios from 'axios';
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_REVIEW_REQUEST, PRODUCT_REVIEW_SUCCESS, PRODUCT_REVIEW_FAIL,
  FILTER_PRODUCTS_REQUEST,
  FILTER_PRODUCTS_SUCCESS,
  FILTER_PRODUCTS_FAILURE,
} from '../constants/productConstant';

export const getProductDetails = (id) => async (dispatch) => {
    console.log(id);
    
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);
console.log(data);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Action to submit a review
export const submitReview = (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_REVIEW_REQUEST });

  
      const { data } = await axios.post(`/api/review/add/${productId}`, review);
  
      dispatch({
        type: PRODUCT_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_REVIEW_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };



  export const listProductsByFilter = (filterCriteria) => async (dispatch) => {
    try {
      console.log(filterCriteria);
      
      dispatch({ type: FILTER_PRODUCTS_REQUEST });
  
      // Send the filter criteria in the request body
      const { data } = await axios.post('/api/products/filter', filterCriteria);
      console.log(data);
  
      dispatch({ type:  FILTER_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: FILTER_PRODUCTS_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
  
