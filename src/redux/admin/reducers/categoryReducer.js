
import { CATEGORY_LIST_REQUEST, 
  CATEGORY_LIST_SUCCESS, 
  CATEGORY_LIST_FAIL,
   CATEGORY_ADD_REQUEST, 
   CATEGORY_ADD_SUCCESS, 
   CATEGORY_ADD_FAIL } from '../contsants/categoryConstants';

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };

    case CATEGORY_ADD_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_ADD_SUCCESS:
      return { ...state, loading: false, categories: [...state.categories, action.payload],success:true };
    case CATEGORY_ADD_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};