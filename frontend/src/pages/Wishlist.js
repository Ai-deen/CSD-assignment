import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../actions/WishlistActions';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import '../styles/WishlistPage.css';
import CancelIcon from '@material-ui/icons/Cancel';

const Wishlist = (props) => {
    const productID = props.match.params.id;

    const wishlist = useSelector((state) => state.wishlist);
    const { wishlistItems, error } = wishlist;

    console.log(productID);

    const dispatch = useDispatch();

    useEffect(() => {
        if (productID) {
            dispatch(addToWishlist(productID));
        }
    }, [dispatch, productID]);

    const removeProduct = (id) => {
        dispatch(removeFromWishlist(id));
    };

    return (
        <div>
            <Link to="/" className="back">
                Back to home
            </Link>

            <div className="row-container">
                <div className="col-4">
                    <h1>Wishlist</h1>
                    {wishlistItems.length === 0 ? (
                        <MessageBox>
                            Wishlist is empty. <Link to="/">Go Shopping</Link>
                        </MessageBox>
                    ) : (
                        <ul>
                            {wishlistItems.map((item) => (
                                <li key={item.product}>
                                    <div className="row1">
                                        <div className="small">
                                            <img src={item.image} alt="" />
                                        </div>

                                        <div className="min-30">
                                            <Link to={`/products/product/${item.product}`}>{item.name}</Link>
                                        </div>

                                        <div className="remove-btn">
                                            <button type="button" onClick={() => removeProduct(item.product)}>
                                                <CancelIcon />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
