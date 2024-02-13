import axios from "../Axios";
import {
  SERVICE_CART_ADD_ITEM,
  SERVICE_CART_REMOVE_ITEM,
  SERVICE_CART_SAVE_PAYMENT_METHOD,
  SERVICE_CART_SAVE_SHIPPING_ADDRESS,
  SERVICE_CART_EMPTY,
} from "../constants/ServiceConstant";

import {
  SERVICE_CREATE_FAIL,
  SERVICE_CREATE_REQUEST,
  SERVICE_CREATE_SUCCESS,
  SERVICE_DETAILS_FAIL,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_MINE_FAIL,
  SERVICE_MINE_REQUEST,
  SERVICE_MINE_SUCCESS,
  SERVICE_PAY_FAIL,
  SERVICE_PAY_REQUEST,
  SERVICE_PAY_SUCCESS,
} from "../constants/ServiceConstant";
// import dotenv from 'dotenv'
// dotenv.config();

// const API = process.env.API ;
const API = "http://localhost:4001";

export const addToServiceCart = (serviceData) => (dispatch, getState)=>{
    // (productID, qty) => async (dispatch, getState) => {
    // const { data } = await axios.get(API + `/api/products/${productID}`);

    dispatch({
      type: SERVICE_CART_ADD_ITEM,
      payload: {
        ...serviceData,
      },
    });

    localStorage.setItem(
      "servicecartItems",
      JSON.stringify(getState().cart.servicecartItems)
    );
  };

export const removeFromServiceCart = (serviceID) => (dispatch, getState) => {
  dispatch({
    type: SERVICE_CART_REMOVE_ITEM,
    payload: serviceID,
  });
  localStorage.setItem("servicecartItems", JSON.stringify(getState().cart.servicecartItems));
};

export const saveServiceShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: SERVICE_CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("serviceshippingAddress", JSON.stringify(data));
};

export const saveServicePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: SERVICE_CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
};




export const createdService = (service) => async (dispatch, getState) => {
  dispatch({
    type: SERVICE_CREATE_REQUEST,
    payload: service,
  });

  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post(API + "/api/services/place", service, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({
      type: SERVICE_CREATE_SUCCESS,
      payload: data.service,
    });
    dispatch({
      type: SERVICE_CART_EMPTY,
    });

    localStorage.removeItem("servicecartItems");
  } catch (error) {
    dispatch({
      type: SERVICE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsService = (serviceId) => async (dispatch, getState) => {
  dispatch({ type: SERVICE_DETAILS_REQUEST, payload: serviceId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(API + `/api/services/${serviceId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: SERVICE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SERVICE_DETAILS_FAIL, payload: message });
  }
};

export const payService =
  (service, paymentResult) => async (dispatch, getState) => {
    dispatch({
      type: SERVICE_PAY_REQUEST,
      payload: { service, paymentResult },
    });

    const {
      userSignin: { userInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        API + `/api/services/${service._id}/pay`,
        paymentResult,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: SERVICE_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: SERVICE_PAY_FAIL, payload: message });
    }
  };

export const listServiceMine = () => async (dispatch, getState) => {
  dispatch({
    type: SERVICE_MINE_REQUEST,
  });
  const {
    userSignin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get(API + "/api/services/mine", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: SERVICE_MINE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: SERVICE_MINE_FAIL, payload: message });
  }
};
