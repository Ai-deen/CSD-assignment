import { vendorsignout } from "../actions/UserAction";
import {
  CART_ADD_ITEM,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/CartConstant";
import {
  SERVICE_CART_ADD_ITEM,
  SERVICE_CART_EMPTY,
  SERVICE_CART_REMOVE_ITEM,
  SERVICE_CART_SAVE_PAYMENT_METHOD,
  SERVICE_CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/ServiceConstant";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existitem = state.cartItems.find((x) => x.product === item.product);
      if (existitem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existitem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product != action.payload),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_EMPTY:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export const servicecartReducer = (
  state = { servicecartItems: [], vendor: null },
  action
) => {
  switch (action.type) {
    case SERVICE_CART_ADD_ITEM:
      const item = action.payload;

      return {
        ...state,
        servicecartItems: [...state.servicecartItems, item],
        vendor:item.vendor,
      };

    case SERVICE_CART_REMOVE_ITEM:
      return {
        ...state,
        servicecartItems: state.servicecartItems.filter(
          (x) => x.product != action.payload
        ),
      };

    case SERVICE_CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        serviceshippingAddress: action.payload,
      };

    case SERVICE_CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case SERVICE_CART_EMPTY:
      return {
        ...state,
        servicecartItems: [],
      };

    default:
      return state;
  }
};
