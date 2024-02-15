import React, { useState } from 'react';
import Rating from './Rating';
import "../styles/Product.css";
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom'; // Import useHistory
import { addToWishlist } from '../actions/WishlistActions';
const Product = ({ product}) => {
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const dispatch = useDispatch(); // Initialize useHistory

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product._id));
    setIsAddedToWishlist(true);
  };

  return (
    <div className="product-card">
      <Link to={`/products/product/${product._id}`}>
        <div className="product-image">
          <img src={product.image} alt="" />
        </div>
        <h2>{product.name}</h2>
        <h4>from {product.brand}</h4>
        <Rating rating={product.rating} numRev={product.numRev} />
        <p>${product.price}</p>
      </Link>
      {!isAddedToWishlist ? (
        <button
          style={{
            width: '120px',
            border: 'none',
            textAlign: 'center',
            fontSize: '12px',
            cursor: 'pointer',
          }}
          onClick={handleAddToWishlist}
        >
            Add to Wishlist
        </button>
      ) : (
        <p>Added to Wishlist</p>
      )}
    </div>
  );
};

export default Product;
