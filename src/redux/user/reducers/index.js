import { combineReducers } from 'redux';
import {
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userRegisterReducer,
  userProfileReducer
  
} from './userReducer';
import cartReducer from './cartReducer'
import { checkoutReducer,myOrdersReducer } from './checkoutReducer';
import { productDetailsReducer,productReviewReducer,filterProductsReducer } from './productReducer';

const rootReducerUser = combineReducers({
  userLogin: userLoginReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userRegister:userRegisterReducer,
  userProfile: userProfileReducer,
  // other reducers can be added here
  cart: cartReducer,
  checkout:checkoutReducer,
  myOrders: myOrdersReducer,
  productDetails:productDetailsReducer,
  productReview: productReviewReducer,
  filterProducts:filterProductsReducer

});

export default rootReducerUser;
