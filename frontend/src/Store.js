import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer, servicecartReducer } from './reducers/CartReducer';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer } from './reducers/OrderReducer';
import { prodcutDetailsReducer, prodcutListReducer } from './reducers/ProductReducer';
import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
  vendorRegisterReducer,
  vendorSigninReducer,
  vendorDetailsReducer,
  vendorUpdateProfileReducer,
  deliveryRegisterReducer,
  deliverySigninReducer,
  deliveryDetailsReducer,
  deliveryUpdateProfileReducer,
} from "./reducers/UserReducer";
import { serviceCreateReducer, serviceDetailsReducer, serviceMineListReducer, servicePayReducer, serviceReducer} from './reducers/ServiceReducer';
import { wishlistReducer } from './reducers/WishlistReducer';

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  vendorSignin: {
    vendorInfo: localStorage.getItem("vendorInfo")
      ? JSON.parse(localStorage.getItem("vendorInfo"))
      : null,
  },
  deliverySignin: {
    vendorInfo: localStorage.getItem("deliveryInfo")
      ? JSON.parse(localStorage.getItem("deliveryInfo"))
      : null,
  },
};

const reducer = combineReducers({
  productList: prodcutListReducer,
  productDetails: prodcutDetailsReducer,
  cart: cartReducer,
  userRegister: userRegisterReducer,
  userSignin: userSigninReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  vendorDetails: vendorDetailsReducer,
  vendorDetails: vendorDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  vendorRegister: vendorRegisterReducer,
  vendorSignin: vendorSigninReducer,
  vendorUpdateProfile: vendorUpdateProfileReducer,
  deliveryRegister: deliveryRegisterReducer,
  deliverySignin: deliverySigninReducer,
  deliveryDetails: deliveryDetailsReducer,
  deliveryUpdateProfile: deliveryUpdateProfileReducer,
  servicecart: servicecartReducer,
  serviceCreate: serviceCreateReducer,
  serviceDetails: serviceDetailsReducer,
  servicePay: servicePayReducer,
  serviceMineList: serviceMineListReducer,
  // service: serviceReducer,
  wishlist:wishlistReducer
});

// Add logging to the thunk middleware
const originalThunk = thunk;
const loggingThunk = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
        console.log('Thunk function:', action);
    } else {
        console.log('Dispatching action:', action);
    }
    return originalThunk({ dispatch, getState })(next)(action);
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
