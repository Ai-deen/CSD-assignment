import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsVendor, updateVendorProfile } from '../actions/VendorActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { VENDOR_UPDATE_PROFILE_RESET } from '../constants/UserConstants';
import '../styles/UserProfile.css';

const VendorProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const vendorSignIn = useSelector((state) => state.vendorSignIn);
  const vendorDetails = useSelector((state) => state.vendorDetails);
  const vendorUpdateProfile = useSelector((state) => state.vendorUpdateProfile);

  const { vendorInfo } = vendorSignIn;
  const { loading, error, vendor } = vendorDetails;
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = vendorUpdateProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!vendor) {
      dispatch({
        type: VENDOR_UPDATE_PROFILE_RESET,
      });
      dispatch(detailsVendor(vendorInfo._id));
    } else {
      setName(vendor.name);
      setEmail(vendor.email);
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
        })
      );
    }
  };

  return (
    <div className="vendor-dets-container">
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
