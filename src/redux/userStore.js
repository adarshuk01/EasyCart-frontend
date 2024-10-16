// src/redux/userStore.js
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducerUser from './user/reducers'; // Adjust the path if necessary

const userStore = createStore(rootReducerUser, applyMiddleware(thunk));

export default userStore;
