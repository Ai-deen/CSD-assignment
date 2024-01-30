import {ADD_SERVICE_REQUEST, ADD_SERVICE_SUCCESS, ADD_SERVICE_FAILURE } from "../constants/ServiceConstant";
import axios from "../Axios"
import { SERVICE_EMPTY} from "../constants/ServiceConstant";

const API = 'http://localhost:4001';

export const addService = (serviceData) => async (dispatch, getState) => {
    dispatch({
      type: ADD_SERVICE_REQUEST,
      payload: serviceData,
    });
  
    try {
      const { userSignin: { userInfo } } = getState();
  
      // You might want to adjust the endpoint and headers based on your actual API
      const { data } = await axios.post(API + '/api/services', serviceData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
  
      dispatch({
        type: ADD_SERVICE_SUCCESS,
        payload: data.service,
      });
  
      dispatch({
        type: SERVICE_EMPTY,
      });

    } catch (error) {
      dispatch({
        type: ADD_SERVICE_FAILURE,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };