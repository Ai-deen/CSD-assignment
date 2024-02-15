import React, { useState } from 'react';
import Rating from './Rating';
import "../styles/Product.css";
import { Link } from 'react-router-dom';
const Product = ({ product, addToWishlist }) => {
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  const handleAddToWishlist = () => {
    addToWishlist(product);
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
