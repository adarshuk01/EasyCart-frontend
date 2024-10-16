// src/reducers/index.js
import { combineReducers } from 'redux';
import { productListReducer, productDeleteReducer, productCreateReducer, productUpdateReducer } from './productReducer'; 
import { orderListReducer, orderDeleteReducer } from './orderReducers'; // Import your order reducers
import { customerListReducer, customerDeleteReducer } from './customerReducer';
import { categoryListReducer, categoryAddReducer } from './categoryReducer'; // Separate category reducers if needed
import { adminLoginReducer } from './adminReducer';

const rootReducer = combineReducers({
    productList: productListReducer,  // Handles product listing
    productDelete: productDeleteReducer,  // Handles product deletion
    productCreate: productCreateReducer,  // Handles product creation
    productUpdate: productUpdateReducer,  // Handles product updates

    orderList: orderListReducer, // Use the orderListReducer for listing orders
    orderDelete: orderDeleteReducer, // Use the orderDeleteReducer for order deletion

    customerList: customerListReducer, // Use the customerListReducer for listing customers
    customerDelete: customerDeleteReducer, // Use the customerDeleteReducer for deleting customers

    categoryList: categoryListReducer, // Use the categoryListReducer for listing categories
    addCategory: categoryListReducer ,// Use a separate reducer for adding categories if applicable

    adminLogin:adminLoginReducer
});

export default rootReducer;
