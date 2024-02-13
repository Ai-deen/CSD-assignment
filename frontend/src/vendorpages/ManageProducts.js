import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../styles/VendorProductCard.css";
import VendorHeader from "./VendorHeader";

const API = "http://localhost:4001";

const ManageProducts = () => {
  const vendorSignin = useSelector((state) => state.vendorSignin);
  const { vendorInfo } = vendorSignin;

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    rating: 0,
    numRev: 0,
    image: "", // Assuming image is a URL (string)
  });

  useEffect(() => {
    // Fetch products associated with the logged-in vendor
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          API + `/vs/${vendorInfo._id}/products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error.response?.data?.message || error.message
        );
      }
    };

    // Check if vendorInfo is available before making the request
    if (vendorInfo) {
      fetchProducts();
    }
  }, [vendorInfo]);

  // Function to handle delete product
  const handleDelete = async (productId) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    // If user confirms, proceed with deletion
    if (confirmDelete) {
      try {
        // Make API call to delete the product
        await axios.delete(API + `/vs/${vendorInfo._id}/products/${productId}`);
        // Update the product list after deletion
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } catch (error) {
        console.error("Error deleting product:", error.message);
      }
    }
  };

  // Function to handle edit product
  const handleEdit = (product) => {
    // Set the selected product and pre-fill the form data
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      category: product.category,
      description: product.description,
      price: product.price,
      stock: product.stock,
      rating: product.rating,
      numRev: product.numRev,
      image: product.image,
    });
  };

  // Function to handle update product
  const handleUpdate = async () => {
    try {
      // Make API call to update the product
      await axios.put(
        API + `/vs/${vendorInfo._id}/products/${selectedProduct._id}`,
        formData
      );

      // Clear the selected product and form data
      setSelectedProduct(null);
      setFormData({
        name: "",
        brand: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        rating: 0,
        numRev: 0,
        image: "",
      });

      // Fetch updated products list
      const response = await axios.get(API + `/vs/${vendorInfo._id}/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error updating product:", error.message);
    }
  };

  return (
    <div>
    
      <h1>Manage Products</h1>
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stock}</p>
          <div className="actions">
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        </div>
      ))}

      {selectedProduct && (
        <div className="modal">
          <h2>Edit Product</h2>
          <form>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <label>Image: </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <label>Brand: </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            {/* Add other input fields as needed */}
            <label>Category: </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <label>Price: </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <label>Stock: </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <label>Description: </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          </form>
          <button onClick={() => setSelectedProduct(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
