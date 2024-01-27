import {
  VENDOR_SIGNIN_SUCCESS,
  VENDOR_REGISTER_REQUEST,
  VENDOR_REGISTER_SUCCESS,
  VENDOR_REGISTER_FAIL,
  VENDOR_SIGNIN_FAIL,
  VENDOR_SIGNIN_REQUEST,

  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/UserConstant";
import axios from "../Axios";

// import dotenv from 'dotenv'
// dotenv.config();
// const API = process.env.API ;

const API = "http://localhost:4001";

export const register =
  (name, email, password, address, location, phoneNumber) =>
  async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { email, password },
    });
    try {
      const { data } = await axios.post(API + "/api/users/register", {
        name,
        email,
        password,
        address,
        location,
        phoneNumber,
      });
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const registerVendor =
  (
    name,
    email,
    password,
    address,
    phoneNumber,
    shopName,
    shopAddress,
    shopLocation,
    businessTypes
  ) =>
  async (dispatch) => {
    dispatch({
      type: VENDOR_REGISTER_REQUEST,
      payload: { email, password },
    });

    try {
      const { data } = await axios.post(API + "/api/vendors/registerVendor", {
        name,
        email,
        password,
        address,
        phoneNumber,
        shopName,
        shopAddress,
        shopLocation,
        businessTypes,
      });

      dispatch({
        type: VENDOR_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: VENDOR_SIGNIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("vendorInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: VENDOR_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await axios.post(API + "/api/users/signin", {
      email,
      password,
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signinVendor = (email, password) => async (dispatch) => {
  dispatch({
    type: VENDOR_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await axios.post(API + "/api/vendors/signin", {
      email,
      password,
    });
    dispatch({
      type: VENDOR_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: VENDOR_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({
    type: USER_SIGNOUT,
  });
};

export const detailsUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(API + `/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(API + `/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};
