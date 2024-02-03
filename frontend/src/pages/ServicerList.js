// VendorList.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/ServicerList.css"; // Import CSS file

const API = "http://localhost:4001";

const VendorList = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API + "/vs/getVendorsByService");
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(vendors);

  return (
    <div className="Serviceslist">
      <h2>Vendors Providing Services</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {vendors.map((vendor) => (
          <Link
            key={vendor._id}
            to={`/services/${vendor._id}`}
            className="card"
          >
            <div className="vendor-service">
              <img src={vendor.shopImage} alt={vendor.name} />
              {/* <p>Name: {vendor.name}</p> */}
              <div className="shopinfo">
                <p>Shop Name: {vendor.shopName}</p>
                <p>Shop Address: {vendor.shopAddress}</p>
              </div>
              <button className="service-button">Service</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VendorList;
