// src/reducers/orderReducers.js
import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
} from '../contsants/orderConstants';

const initialState = {
    orders: [],
    loading: false,
    error: null,
};

// Reducer for listing orders
export const orderListReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { ...state, loading: true };
        case ORDER_LIST_SUCCESS:
            return { loading: false, orders: action.payload, error: null };
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Reducer for deleting orders
export const orderDeleteReducer = (state = { success: false }, action) => {
    switch (action.type) {
        case ORDER_DELETE_REQUEST:
            return { loading: true };
        case ORDER_DELETE_SUCCESS:
            return { loading: false, success: true };
        case ORDER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
