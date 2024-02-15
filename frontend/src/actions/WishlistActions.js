import axios from '../Axios';
import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM } from '../constants/WishlistConstant';

const API = 'http://localhost:4001'; // Replace with your actual API endpoint

export const addToWishlist = (productId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API}/api/products/${productId}`);

    dispatch({
      type: WISHLIST_ADD_ITEM,
      payload: {
        _id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
      },
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
  }
};

export const removeFromWishlist = (productId) => (dispatch) => {
  dispatch({
    type: WISHLIST_REMOVE_ITEM,
    payload: productId,
  });

};
