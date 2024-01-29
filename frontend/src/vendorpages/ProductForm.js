// ProductForm.js

import React, { useState } from "react";
import axios from "axios";
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
        formData, // Send the form data as JSON in the request body
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
      console.error("Error creating product:", error.response.data.message || error.message);
    }
  };



  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Render your form inputs here */}
        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label>Image: </label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          required
        />

        <label>Brand: </label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleInputChange}
          required
        />

        {/* Add other input fields as needed */}
        <label>Category: </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
        />

        <label>Price: </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />

        <label>Stock: </label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          required
        />

        <label>Description: </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductForm;
