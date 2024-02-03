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
      <p className="vendor-welcome-message">Welcome, {vendorInfo.name}!</p>

      <div className="vendor-links-container">
        <p>
          Add a new product{" "}
          <Link className="vendor-link" to="/add-product">
            ADD PRODUCTS
          </Link>
          .
        </p>
        <p>
          Manage your products{" "}
          <Link className="vendor-link" to="/manage-products">
            here
          </Link>
          .
        </p>
        <p>
          Manage your services{" "}
          <Link className="vendor-link" to="/manage-services">
            here
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default VendorHome;
