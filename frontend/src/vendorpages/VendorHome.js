import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const VendorHome = () => {
  const vendorInfo = useSelector((state) => state.vendorInfo); // Assuming you have a vendorInfo slice in your Redux store

  useEffect(() => {
    // You can add any additional logic or data fetching for the vendor home page here
  }, []);

  return (
    <div>
      <h1>Welcome, {vendorInfo.name}!</h1>
      <p>Your vendor dashboard and information will be displayed here.</p>

      {/* Example link to a product management page */}
      <Link to="/manage-products">Manage Products</Link>

      {/* Add more links or components for different vendor-related actions or information */}
    </div>
  );
};

export default VendorHome;
