import axios from "../Axios";
import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM } from "../constants/WishlistConstant";

const API = 'http://localhost:4001';

export const addToWishlist = (productID) => async(dispatch, getState) => {
    try {
      console.log("WE ARE HEREEE!!!!!")
        const { data } = await axios.get(`${API}/api/products/${productID}`);

        dispatch({
            type: WISHLIST_ADD_ITEM,
            payload: {
                name: data.name,
                image: data.image,
                price: data.price,
                product: data._id
            }
        });

        localStorage.setItem(
            'wishlistItems',
            JSON.stringify(getState().wishlist.wishlistItems)
        );
    } catch (error) {
        console.error('Error adding item to wishlist:', error);
    }
};

export const removeFromWishlist = (productID) => (dispatch, getState) => {
    dispatch({
        type: WISHLIST_REMOVE_ITEM,
        payload: productID
    });

    localStorage.setItem(
        'wishlistItems',
        JSON.stringify(getState().wishlist.wishlistItems)
    );
};
