// redux/admin/actions/adminActions.js
import axios from 'axios';
import { ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAILURE } from '../contsants/adminConstants';

export const adminLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });

    // Make the login request
    const { data } = await axios.post('/api/admin/login', { email, password });

    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });

    // Save admin info to session storage
    sessionStorage.setItem('adminInfo', JSON.stringify(data));

    // Configure axios to send the token in headers for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
