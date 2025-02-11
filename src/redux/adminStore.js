// src/redux/adminStore.js
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './admin/reducers'; // Import your admin reducers

const adminStore = createStore(rootReducer, applyMiddleware(thunk));

export default adminStore;
