// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import "../styles/ServicerList.css";
const API = "https://kass.onrender.com";

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
      <h2 className='Main-heading'>Vendors Providing Services</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {vendors.map((vendor) => (
          <div key={vendor._id} className='Servicer'>
            <p>Name: {vendor.name}</p>
            <p>Shop Name: {vendor.shopName}</p>
            <p>Shop Address: {vendor.shopAddress}</p>
            
            <Link to={`/services/${vendor._id}`} className="ServicerLink">
              <button className="NavigateButton">View Services</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorList;
