import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../styles/VendorHome.css';
// import { vendorSignout } from "../actions/VendorActions";
// import { detailsVendor } from "../actions/UserAction";
import { signinVendor } from "../actions/UserAction";

const VendorHome = () => {
    const vendorSignin = useSelector((state) => state.vendorSignin);
    const { vendorInfo } = vendorSignin;
    console.log("VendorHome", vendorInfo);
//   const dispatch = useDispatch();

//   useEffect(() => {
//       dispatch(signinVendor());
//   }, [dispatch]);

  return (
    <div className="vendor-home-container">
      <div className="vendor-cardd-container"> 
      <p className="vendor-welcome-message">Welcome, {vendorInfo.name}!</p>

      <div className="vendor-smallcard-container">
      <div className="vendor-links-container">
        <p> Add a new product </p>
          <Link className="vendor-link" to="/add-product">
            ADD PRODUCTS
          </Link>
        
        </div>
        <div className="vendor-links-container">
        <p> Manage your products </p>
          <Link className="vendor-link" to="/manage-products">
            MANAGE PRODUCTS
          </Link>
        </div>
        <div className="vendor-links-container">
        <p> Manage your services </p>
          <Link className="vendor-link" to="/manage-services">
          MANAGE SERVICES
          </Link>
        
        </div>
      </div>
    </div>
    </div>
  );
};

export default VendorHome;
