// reducers/wishlistReducer.js
import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM } from "../constants/WishlistConstant";

export const wishlistReducer = (state = [], action) => {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      const productToAdd = action.payload;
      const existingProduct = state.find((item) => item._id === productToAdd._id);

      if (existingProduct) {
        return state; 
      }

      return [...state, productToAdd]; 

    case WISHLIST_REMOVE_ITEM:
      const productIdToRemove = action.payload;
      return state.filter((item) => item._id !== productIdToRemove); 
    default:
      return state;
  }
};

export default wishlistReducer;
