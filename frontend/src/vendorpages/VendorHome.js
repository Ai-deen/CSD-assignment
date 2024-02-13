import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "../styles/VendorHome.css";
// import { vendorSignout } from "../actions/VendorActions";
// import { detailsVendor } from "../actions/UserAction";
import { signinVendor } from "../actions/UserAction";

import VendorHeader from "./VendorHeader";
const VendorHome = () => {
  const history = useHistory();
  const vendorSignin = useSelector((state) => state.vendorSignin);
  const { vendorInfo } = vendorSignin;
  console.log("VendorHome", vendorInfo);
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //       dispatch(signinVendor());
  //   }, [dispatch]);

  return (
    <div className="vendor-home-container">
      <div className="vendor-menu">
        <div className="vendor-menu-items">
          <div
            className="vendor-item"
            onClick={() => history.push("/add-product")}
          >
            Add Products
          </div>
          <div
            className="vendor-item"
            onClick={() => history.push("/manage-products")}
          >
            Manage Products
          </div>
          <div
            className="vendor-item"
            onClick={() => history.push("/manage-services")}
          >
            Manage Services
          </div>
          <div className="vendor-item">Add Services</div>
        </div>
        <div className="graphs">you are yet to get this</div>
        <div className="graphs">you are yet to get this</div>
      </div>
    </div>
  );
};

export default VendorHome;
