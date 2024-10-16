import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  FILTER_PRODUCTS_REQUEST,
  FILTER_PRODUCTS_SUCCESS,
  FILTER_PRODUCTS_FAILURE,

  } from '../constants/productConstant';
  
  export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return { loading: true, ...state };
      case PRODUCT_DETAILS_SUCCESS:
        return { loading: false, product: action.payload };
      case PRODUCT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const productReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_REVIEW_REQUEST:
        return { loading: true };
      case PRODUCT_REVIEW_SUCCESS:
        return { loading: false, success: true, review: action.payload };
      case PRODUCT_REVIEW_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const filterProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case FILTER_PRODUCTS_REQUEST:
        return { loading: true, products: [] };
      case FILTER_PRODUCTS_SUCCESS:
        return { loading: false, products: action.payload };
      case FILTER_PRODUCTS_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };