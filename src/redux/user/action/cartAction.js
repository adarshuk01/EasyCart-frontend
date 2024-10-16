import axios from 'axios';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  GET_CART,
} from '../constants/cartConstants';

// Action to get the cart items
export const getCart = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/cart'); // Adjust the API endpoint if needed
    console.log(data);
    
    dispatch({ type: GET_CART, payload: data });
  } catch (error) {
    console.error(error);
  }
};

// Action to add item to cart
export const addToCart = (productId, quantity) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/cart', { productId, quantity }); // Adjust the API endpoint if needed
    dispatch({ type: ADD_TO_CART, payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
    try {
      // Make API call to remove the item from the cart
      await axios.delete(`/api/cart`, { data: { productId } }); // Adjust the endpoint based on your API design
  
      // Dispatch the remove action
      dispatch({
        type: REMOVE_FROM_CART,
        payload: productId,
      });
  
      // Optionally, update the local storage if you're using it
      localStorage.setItem('cart', JSON.stringify(getState().user.cart.items));
    } catch (error) {
      console.error("Error removing item from cart:", error);
      // Optionally handle the error or dispatch a failure action
      // dispatch({ type: CART_GET_ITEMS_FAIL, payload: error.message });
    }
  };

// Action to update the quantity of a cart item
export const updateCartItem = (productId, quantity) => async (dispatch) => {
  try {
    const { data } = await axios.put('/api/cart', { productId, quantity }); // Adjust the API endpoint if needed
    dispatch({ type: UPDATE_CART_ITEM, payload: data });
  } catch (error) {
    console.error(error);
  }
};
