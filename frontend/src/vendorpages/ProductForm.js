// ProductForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import VendorHome from "./VendorHome";
import VendorHeader from "./VendorHeader";
import "../styles/ProductForm.css";
const API = "http://localhost:4001";

const initialFormData = {
  name: "",
  image: "", // Use null for file input
  brand: "",
  category: "",
  description: "",
  price: "",
  stock: "",
  rating: 0,
  numRev: 0,
};

const ProductForm = () => {
  const vendorSignin = useSelector((state) => state.vendorSignin);
  const { vendorInfo } = vendorSignin;
  console.log("Product form", vendorInfo);
  const vendorId = vendorInfo._id;

  const [formData, setFormData] = useState({
    name: "",
    image: "", // Use null for file input
    brand: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    rating: 0,
    numRev: 0,
  });

  const handleInputChange = (e) => {
    if (e.target.type === "file") {
      // Check if a file is selected before updating the state
      if (e.target.files.length > 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [e.target.name]: e.target.files[0],
        }));
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API}/vs/postProduct`,
        {
          ...formData,
          vendorId,
        }, // Send the form data as JSON in the request body
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );

      console.log("Product created successfully:", response.data);
      // Reset the form after successful submission
      setFormData(initialFormData);
    } catch (error) {
      console.error(
        "Error creating product:",
        error.response.data.message || error.message
      );
    }
  };

  // Ensure vendorInfo is available
  if (!vendorInfo) {
    // Handle the case when vendorInfo is not available (redirect, show a message, etc.)
    return <p>Please sign in as a vendor to add products.</p>;
  }

  return (
    <div>
      <div className="product-form-container">
        <h2 style={{ padding: "10px 10px 10px 0" }}>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Render your form inputs here */}
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-input"
            required
          />

          <label className="form-label">Image: </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="form-input"
            required
          />

          <label className="form-label">Brand: </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            className="form-input"
            required
          />

          {/* Add other input fields as needed */}
          <label className="form-label">Category: </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="form-input"
            required
          />

          <label className="form-label">Price: </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="form-input"
            required
          />

          <label className="form-label">Stock: </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="form-input"
            required
          />

          <label className="form-label">Description: </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-input"
            required
          />

          <button type="submit" className="form-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
