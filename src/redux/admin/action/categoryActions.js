// src/redux/actions/categoryActions.js
import axios from 'axios';
import { CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAIL } from '../contsants/categoryConstants';
import { CATEGORY_ADD_REQUEST, CATEGORY_ADD_SUCCESS, CATEGORY_ADD_FAIL } from '../contsants/categoryConstants';

// Fetch categories (already exists)
export const listCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    const { data } = await axios.get('/api/categories');

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Add a new category
export const addCategory = (category) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_ADD_REQUEST });
    
        const { data } = await axios.post('/api/categories', category);
    
        dispatch({
          type: CATEGORY_ADD_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: CATEGORY_ADD_FAIL,
          payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message,
        });
      }
};

