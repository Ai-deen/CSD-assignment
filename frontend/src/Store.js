import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/CartReducer';
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
} from "./reducers/UserReducer";
import { serviceReducer} from './reducers/ServiceReducer';
import { wishlistReducer } from './reducers/WishlistReducer';
import { serviceReducer } from './reducers/ServiceReducer';

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingAddress: localStorage.getItem('shippingAddress')
            ? JSON.parse(localStorage.getItem('shippingAddress'))
            : {},
        paymentMethod: 'PayPal',
    },
    userSignin: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    vendorSignin: {
        vendorInfo: localStorage.getItem("vendorInfo")
            ? JSON.parse(localStorage.getItem("vendorInfo"))
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
  vendorDetails:vendorDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  vendorRegister: vendorRegisterReducer,
  vendorSignin: vendorSigninReducer,
  vendorRegister: vendorDetailsReducer,
  vendorUpdateProfile: vendorUpdateProfileReducer,
  service: serviceReducer,
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
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(loggingThunk, thunk)),
);

export default store;
