import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { vendorSignout } from "../actions/VendorActions";
// import { detailsVendor } from "../actions/UserAction";
import { signinVendor } from "../actions/UserAction";

const VendorHome = () => {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    console.log(userInfo);
//   const dispatch = useDispatch();

//   useEffect(() => {
//       dispatch(signinVendor());
//   }, [dispatch]);

  return (
    <div>
      {/* <h1>Welcome, {vendorInfo}!</h1> */}
      <p>Your vendor dashboard and information will be displayed here.</p>

      {/* Example link to a product management page */}
      <p>
        Add a new product <Link to="/add-product">ADD PRODUCTS</Link>.
      </p>
      <p>
        Manage your products <Link to="/manage-products">here</Link>.
      </p>


      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default VendorHome;
