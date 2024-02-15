import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM, WISHLIST_CLEAR } from "../constants/WishlistConstant";

export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
    switch(action.type) {
        case WISHLIST_ADD_ITEM:
            const item = action.payload;
            const existItem = state.wishlistItems.find(x => x.product === item.product);
            if (existItem) {
                return {
                    ...state,
                    wishlistItems: state.wishlistItems.map(x =>
                        x.product === existItem.product ? item : x
                    )
                };
            } else {
                return {
                    ...state,
                    wishlistItems: [...state.wishlistItems, item]
                };
            }

        case WISHLIST_REMOVE_ITEM:
            return {
                ...state,
                wishlistItems: state.wishlistItems.filter(x => x.product !== action.payload)
            };

        case WISHLIST_CLEAR:
            return {
                ...state,
                wishlistItems: []
            };

        default:
            return state;
    }
};

export default wishlistReducer;
