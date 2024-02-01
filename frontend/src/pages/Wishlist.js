// components/WishlistPage.js
import React, { useState } from 'react';
import '../styles/WishlistPage.css'; // Import the CSS file

const WishlistPage = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Dummy data for wishlist items
  const wishlistItems = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
    // Add more wishlist items as needed
  ];

  // Handle item selection
  const handleItemSelection = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedItems(selectedIds);
  };

  // Handle removing selected items
  const handleRemoveItems = () => {
    // Logic to remove selected items from the wishlist
    console.log('Removing items:', selectedItems);
    // You can update the state or perform other actions based on selected items
    setSelectedItems([]);
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      <select className="wishlist-select" multiple onChange={handleItemSelection} value={selectedItems}>
        {wishlistItems.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {selectedItems.length > 0 && (
        <button className="remove-button" onClick={handleRemoveItems}>Remove Selected Items</button>
      )}
    </div>
  );
};

export default WishlistPage;
