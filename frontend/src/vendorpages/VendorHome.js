import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

//     const signinVendor = useSelector((state) => state.signinVendor); // Assuming you have a vendorInfo slice in your Redux store
//     const { loading, error, vendorInfo } = signinVendor;
//     console.log("Hello", vendorInfo)

  //   const handleLogout = () => {
  //     dispatch(vendorSignout());
  //   };

  return (
    <div>
      {/* <h1>Welcome, {vendorInfo}!</h1> */}
      <p>Your vendor dashboard and information will be displayed here.</p>

      {/* Example link to a product management page */}
      <p>
        Manage your products <a href="/manage-products">here</a>.
      </p>

      {/* Add more links or components for different vendor-related actions or information */}

      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default VendorHome;
