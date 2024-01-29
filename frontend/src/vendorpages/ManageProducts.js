import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ManageProducts = () => {
  const vendorSignin = useSelector((state) => state.vendorSignin);
  const { vendorInfo } = vendorSignin;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products associated with the logged-in vendor
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `/api/products/vendor/${vendorInfo._id}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error(
          "Error fetching products:",
          error.response.data.message || error.message
        );
      }
    };

    // Check if vendorInfo is available before making the request
    if (vendorInfo) {
      fetchProducts();
    }
  }, [vendorInfo]);

  // Implement CRUD operations (delete, update, etc.)

  return (
    <div>
      <h1>Manage Products</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                {/* Add buttons for CRUD operations */}
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
