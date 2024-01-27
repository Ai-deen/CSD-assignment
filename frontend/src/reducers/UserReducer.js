import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS,
    VENDOR_DETAILS_FAIL, VENDOR_DETAILS_REQUEST, VENDOR_DETAILS_SUCCESS, VENDOR_REGISTER_FAIL, VENDOR_REGISTER_REQUEST, VENDOR_REGISTER_SUCCESS, VENDOR_SIGNIN_FAIL, VENDOR_SIGNIN_REQUEST, VENDOR_SIGNIN_SUCCESS, VENDOR_SIGNOUT, VENDOR_UPDATE_PROFILE_FAIL, VENDOR_UPDATE_PROFILE_REQUEST, VENDOR_UPDATE_PROFILE_RESET, VENDOR_UPDATE_PROFILE_SUCCESS
 } from "../constants/UserConstant";


export const userRegisterReducer = (state ={}, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST: 
            return {loading: true};
        case USER_REGISTER_SUCCESS: 
            return {loading: false, userInfo: action.payload};
        case USER_REGISTER_FAIL: 
            return {loading: false, error: action.payload};
        default: 
            return state;
    }
}



export const userSigninReducer = (state ={}, action) => {
    switch(action.type){
        case USER_SIGNIN_REQUEST: 
            return {loading: true};
        case USER_SIGNIN_SUCCESS: 
            return {loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAIL: 
            return {loading: false, error: action.payload};
        case USER_SIGNOUT: 
            return {};
        default: 
            return state;
    }
}


export const userDetailsReducer = (state ={loading: true}, action) =>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {loading: true};
        case USER_DETAILS_SUCCESS:
            return {loading: false, user: action.payload};
        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}


export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};





export const vendorRegisterReducer = (state ={}, action) => {
    switch(action.type){
        case VENDOR_REGISTER_REQUEST: 
            return {loading: true};
        case VENDOR_REGISTER_SUCCESS: 
            return {loading: false, vendorInfo: action.payload};
        case VENDOR_REGISTER_FAIL: 
            return {loading: false, error: action.payload};
        default: 
            return state;
    }
}



export const vendorSigninReducer = (state ={}, action) => {
    switch(action.type){
        case VENDOR_SIGNIN_REQUEST: 
            return {loading: true};
        case VENDOR_SIGNIN_SUCCESS: 
            return {loading: false, vendorInfo: action.payload};
        case VENDOR_SIGNIN_FAIL: 
            return {loading: false, error: action.payload};
        case VENDOR_SIGNOUT: 
            return {};
        default: 
            return state;
    }
}


export const vendorDetailsReducer = (state ={loading: true}, action) =>{
    switch(action.type){
        case VENDOR_DETAILS_REQUEST:
            return {loading: true};
        case VENDOR_DETAILS_SUCCESS:
            return {loading: false, vendor: action.payload};
        case VENDOR_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}


export const vendorUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case VENDOR_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case VENDOR_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case VENDOR_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case VENDOR_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};