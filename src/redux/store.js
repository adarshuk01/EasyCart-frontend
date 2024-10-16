// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk'; // Import thunk as a named import
import rootReducer from './admin/reducers'; // Adjust the path if necessary
import rootReducerUser from './user/reducers'; // Adjust the path if necessary

// Combine the reducers
const rootReducers = combineReducers({
    admin: rootReducer, // Use admin reducers under 'admin' key
    user: rootReducerUser // Use user reducers under 'user' key
});

// Create the store with combined reducers
const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
