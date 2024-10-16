import { 
    ADD_TO_CART, 
    REMOVE_FROM_CART, 
    UPDATE_CART_ITEM, 
    GET_CART 
  } from '../constants/cartConstants';
  
  const initialState = {
    items: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CART:
        return {
          ...state,
          items: action.payload, // Ensure this is the correct structure
        };
      case ADD_TO_CART:
        return {
          ...state,
          items: action.payload.cartItems, // Assuming this contains the new cart items
        };
      case REMOVE_FROM_CART:
        return {
            ...state,
            items: state.items.filter(item => 
                item.product._id !== action.payload), // Assuming item.product._id is the unique identifier
          };
      case UPDATE_CART_ITEM:
        return {
          ...state,
          items: action.payload.cartItems, // Assuming this contains the updated cart items
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  