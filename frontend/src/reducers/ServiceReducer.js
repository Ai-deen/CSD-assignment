import {ADD_SERVICE_REQUEST, ADD_SERVICE_SUCCESS, ADD_SERVICE_FAILURE } from "../constants/ServiceConstant";

export const serviceReducer = (state = {}, action) => {
    switch(action.type){
        case ADD_SERVICE_REQUEST:
            return {loading: true};
        
        case ADD_SERVICE_SUCCESS:
            return {loading: true, success: true, order: action.payload};

        case ADD_SERVICE_FAILURE:
            return {loading: false, error: action.payload};

        default:
            return state;
    }
}
