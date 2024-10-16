import axios from 'axios';
import {
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAILURE,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    // Make the API call to log in
    const { data } = await axios.post('/api/users/login', { email, password });

    console.log(data);
    
    // Store the token in sessionStorage
    sessionStorage.setItem('token', data.token); // Assuming the token is returned in the response

    // Set the token in axios headers for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

    // Store user info in sessionStorage as an object
    sessionStorage.setItem('userInfo', JSON.stringify(data.user)); // Assuming user data is returned in the response

    // Dispatch login success
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Logout action
export const logout = () => (dispatch) => {
  sessionStorage.removeItem('token'); // Remove token from session storage
  sessionStorage.removeItem('userInfo'); // Remove user info from session storage
  dispatch({ type: USER_LOGOUT });
};

// Register User Action
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const response = await axios.post('/api/users/register', userData);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: response.data,
    });

    return response.data; // Return the response data for chaining
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: USER_REGISTER_FAIL,
      payload: errorMessage,
    });

    return Promise.reject(errorMessage); // Return the error message for chaining
  }
};


export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

   

    const { data } = await axios.get('/api/users/profile');

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};