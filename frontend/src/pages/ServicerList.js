// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios';

const API = "http://localhost:4001";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API + "/vs/getVendorsByService");
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <div>
      <h2>Vendors Providing Services</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {vendors.map((vendor) => (
          <Link
            key={vendor._id}
            to={`/services/${vendor._id}`} // Use Link to navigate
            style={{
              textDecoration: 'none',
              color: 'inherit',
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px',
              width: '200px',
            }}
          >
            <div>
              <p>Name: {vendor.name}</p>
              <p>Shop Name: {vendor.shopName}</p>
              <p>Shop Address: {vendor.shopAddress}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VendorList;
