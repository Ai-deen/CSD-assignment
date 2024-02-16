import {
  DELIVERY_SIGNIN_SUCCESS,
  DELIVERY_REGISTER_REQUEST,
  DELIVERY_REGISTER_FAIL,
  DELIVERY_REGISTER_SUCCESS,
  DELIVERY_SIGNIN_FAIL,
  DELIVERY_SIGNIN_REQUEST,
  DELIVERY_SIGNOUT,
  DELIVERY_DETAILS_REQUEST,
  DELIVERY_DETAILS_FAIL,
  DELIVERY_DETAILS_SUCCESS,
  VENDOR_SIGNIN_SUCCESS,
  VENDOR_REGISTER_REQUEST,
  VENDOR_REGISTER_SUCCESS,
  VENDOR_REGISTER_FAIL,
  VENDOR_SIGNIN_FAIL,
  VENDOR_SIGNIN_REQUEST,
  VENDOR_DETAILS_REQUEST,
  VENDOR_DETAILS_SUCCESS,
  VENDOR_DETAILS_FAIL,
  VENDOR_SIGNOUT,
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
    shopImage,
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
        shopImage,
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

export const registerDelivery =
  (name, email, password, location, phoneNumber, vehicleInfo) =>
  async (dispatch) => {
    dispatch({
      type: DELIVERY_REGISTER_REQUEST,
      payload: { email, password },
    });
    try {
      const { data } = await axios.post(API + "/api/delivery/register", {
        name,
        email,
        password,
        location,
        phoneNumber,
        vehicleInfo,
      });
      dispatch({
        type: DELIVERY_REGISTER_SUCCESS,
        payload: data,
      });
      dispatch({
        type: DELIVERY_SIGNIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("DeliveryInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: DELIVERY_REGISTER_FAIL,
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
    localStorage.setItem("vendorInfo", JSON.stringify(data));
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

export const signinDelivery = (email, password) => async (dispatch) => {
  dispatch({
    type: DELIVERY_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await axios.post(API + "/api/delivery/signin", {
      email,
      password,
    });
    dispatch({
      type: DELIVERY_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("DeliveryInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: DELIVERY_SIGNIN_FAIL,
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

export const vendorsignout = () => (dispatch) => {
  localStorage.removeItem("vendorInfo");
  dispatch({
    type: VENDOR_SIGNOUT,
  });
};

export const Deliverysignout = () => (dispatch) => {
  localStorage.removeItem("DeliveryInfo");
  dispatch({
    type: DELIVERY_SIGNOUT,
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

export const detailsVendor = (vendorId) => async (dispatch, getState) => {
  dispatch({ type: VENDOR_DETAILS_REQUEST, payload: vendorId });
  const {
    vendorSignin: { vendorInfo },
  } = getState();
  try {
    const { data } = await axios.get(API + `/api/vendors/${vendorId}`, {
      headers: { Authorization: `Bearer ${vendorInfo?.token}` },
    });
    dispatch({ type: VENDOR_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: VENDOR_DETAILS_FAIL, payload: message });
  }
};


export const detailsDelivery = (DeliveryId) => async (dispatch, getState) => {
  dispatch({ type: DELIVERY_DETAILS_REQUEST, payload: DeliveryId });
  const {
    vendorSignin: { DeliveryInfo },
  } = getState();
  try {
    const { data } = await axios.get(API + `/api/delivery/${DeliveryId}`, {
      headers: { Authorization: `Bearer ${DeliveryInfo?.token}` },
    });
    dispatch({ type: DELIVERY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELIVERY_DETAILS_FAIL, payload: message });
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

export const updateVendorProfile = (vendor) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: vendor });
  const {
    vendorSignin: { vendorInfo },
  } = getState();
  try {
    const { data } = await axios.put(
      API + `/api/vendors/vendor-profile`,
      vendor,
      {
        headers: { Authorization: `Bearer ${vendorInfo.token}` },
      }
    );
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: VENDOR_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("vendorInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};
