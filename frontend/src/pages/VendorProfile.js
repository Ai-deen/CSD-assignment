import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsVendor, updateVendorProfile } from '../actions/UserAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { VENDOR_UPDATE_PROFILE_RESET } from '../constants/UserConstant';
import '../styles/UserProfile.css';

const VendorProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [shopName, setShopName] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [shopLocation, setShopLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const vendorSignin = useSelector((state) => state.vendorSignin);
  const vendorDetails = useSelector((state) => state.vendorDetails);
  const vendorUpdateProfile = useSelector((state) => state.vendorUpdateProfile);

  const { vendorInfo } = vendorSignin || {};
  const { loading, error, vendor } = vendorDetails;
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate
  } = vendorUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!vendor) {
      dispatch({
        type: VENDOR_UPDATE_PROFILE_RESET
      });
      dispatch(detailsVendor(vendorInfo._id));
    } else {
      setName(vendor.name);
      setEmail(vendor.email);
      setShopName(vendor.shopName);
      setShopAddress(vendor.shopAddress);
      setShopLocation(vendor.shopLocation);
      setPhoneNumber(vendor.phoneNumber);
    }
  }, [dispatch, vendorInfo._id, vendor]);

  const updateDetails = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Password does not match.');
    } else {
      dispatch(
        updateVendorProfile({
          vendorId: vendor._id,
          name,
          email,
          password,
          shopName,
          shopAddress,
          shopLocation,
          phoneNumber
        })
      );
    }
  };

  return (
    <div className="user-dets-container">
      <form className="form" onSubmit={updateDetails}>
        <h1>Vendor Profile</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile updated successfully.
              </MessageBox>
            )}
            <div className="form-ip-sec">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-ip-sec">
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-ip-sec">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-ip-sec">
              <label htmlFor="confirmPassword">Confirm password:</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="form-ip-sec">
              <label htmlFor="shopName">Shop Name:</label>
              <input
                type="text"
                id="shopName"
                placeholder="Enter shop name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>

            <div className="form-ip-sec">
              <label htmlFor="shopAddress">Shop Address:</label>
              <input
                type="text"
                id="shopAddress"
                placeholder="Enter shop address"
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
              />
            </div>

            <div className="form-ip-sec">
              <label htmlFor="shopLocation">Shop Location:</label>
              <input
                type="text"
                id="shopLocation"
                placeholder="Enter shop location"
                value={shopLocation}
                onChange={(e) => setShopLocation(e.target.value)}
              />
            </div>

            <div className="form-ip-sec">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div>
              <label />
              <button className="update-btn" type="submit">
                Update Details
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default VendorProfile;
