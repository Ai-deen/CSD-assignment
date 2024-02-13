import {
  SERVICE_CREATE_FAIL,
  SERVICE_CREATE_REQUEST,
  SERVICE_CREATE_RESET,
  SERVICE_CREATE_SUCCESS,
  SERVICE_DETAILS_FAIL,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_MINE_FAIL,
  SERVICE_MINE_REQUEST,
  SERVICE_MINE_SUCCESS,
  SERVICE_PAY_FAIL,
  SERVICE_PAY_REQUEST,
  SERVICE_PAY_RESET,
  SERVICE_PAY_SUCCESS,
} from "../constants/ServiceConstant";

export const serviceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_CREATE_REQUEST:
      return { loading: true };

    case SERVICE_CREATE_SUCCESS:
      return { loading: true, success: true, service: action.payload };

    case SERVICE_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case SERVICE_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const serviceDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SERVICE_DETAILS_REQUEST:
      return { loading: true };

    case SERVICE_DETAILS_SUCCESS:
      return { loading: false, service: action.payload };

    case SERVICE_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const servicePayReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_PAY_REQUEST:
      return { loading: true };
    case SERVICE_PAY_SUCCESS:
      return { loading: false, success: true };
    case SERVICE_PAY_FAIL:
      return { loading: false, error: action.payload };
    case SERVICE_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const serviceMineListReducer = (state = { services: [] }, action) => {
  switch (action.type) {
    case SERVICE_MINE_REQUEST:
      return { loading: true };
    case SERVICE_MINE_SUCCESS:
      return { loading: false, services: action.payload };
    case SERVICE_MINE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
