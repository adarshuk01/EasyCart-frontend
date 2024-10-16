import axios from 'axios';
import { 
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS, 
  PRODUCT_LIST_FAIL, 
  PRODUCT_DELETE_REQUEST, 
  PRODUCT_DELETE_SUCCESS, 
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET

} from '../contsants/productConstants';

// Fetch all products
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/api/products');
    console.log(data);
    
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Delete a product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    console.log(id);
    
    dispatch({ type: PRODUCT_DELETE_REQUEST });
    // const { userLogin: { userInfo } } = getState();
    await axios.delete(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createProduct = (formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });
  
    //   const {
    //     userLogin: { userInfo },
    //   } = getState();
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
  
      const { data } = await axios.post('/api/products/add', formData, config);
  
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  // Update product action
export const updateProduct = (productId, productData) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
  
      const { data } = await axios.put(`/api/products/${productId}`, productData);
  
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

  export const listProductsBySubcategory = (subcategoryId) => async (dispatch) => {
    console.log(subcategoryId);
    
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
       const body='hello'
      const { data } = await axios.get(`/api/products/subcategory/${subcategoryId}`,body);
      console.log(data);
   
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response.data.message || error.message });
    }
  };

  export const resetProductUpdate = () => (dispatch) => {
    dispatch({ type: PRODUCT_UPDATE_RESET });
  };


