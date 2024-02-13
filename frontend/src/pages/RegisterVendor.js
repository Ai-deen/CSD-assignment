import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerVendor } from '../actions/UserAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import '../styles/Register.css';
import { useHistory } from "react-router-dom";

const RegisterVendor = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVendor, setIsVendor] = useState(true); // Set as true for vendor registration
  const [shopImage, setShopImage] = useState("");
  const [shopName, setShopName] = useState('');
  const [shopAddress, setShopAddress] = useState('');
  const [shopLocation, setShopLocation] = useState('');
  const [businessTypes, setBusinessTypes] = useState([]); // Use an array for multiple business types
  const history = useHistory();
  const businessTypeOptions = ['sell', 'rent', 'service'];

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/vendorhome';

  // const redirectp = props.location.search
  //   ? props.location.search.split('=')[1]
  //   : '/vendor-profile';
    

  // const vendorRegister = useSelector((state) => state.vendorSignin);
  // const { vendorInfo, loading, error } = vendorRegister;
  const vendorSignin = useSelector((state) => state.vendorSignin);
  const { vendorInfo, loading, error } = vendorSignin;
  const dispatch = useDispatch();

  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password does not match.');
    } else {
      dispatch(
        registerVendor(
          name,
          email,
          password,
          address,
          phoneNumber,
          shopImage,
          shopName,
          shopAddress,
          shopLocation,
          businessTypes
        )
      );
    }
  };

  useEffect(() => {
    console.log("reg",vendorInfo)
    if (vendorInfo) {
      console.log(vendorInfo);
      history.push("/vendorhome");
    }
    // else{
    //   props.history.push(redirectp);
    // }
  }, [props.history, redirect, vendorInfo,dispatch]);
  const handleBusinessTypeChange = (type) => {
    // Toggle the selected business type
    setBusinessTypes((prevTypes) => {
      if (prevTypes.includes(type)) {
        return prevTypes.filter((prevType) => prevType !== type);
      } else {
        return [...prevTypes, type];
      }
    });
  };

  return (
    <div className="register-container">
      <form className="form" onSubmit={registerHandler}>
        <div>
          <h1>Vendor Registration</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

        <div className="form-ip-sec">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            placeholder="Enter full name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-ip-sec">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-ip-sec">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address"
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-ip-sec">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="Enter phone number"
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="form-ip-sec">
          <label htmlFor="shopImage">Shop Image:</label>
          <input
            type="text"
            id="shopImage"
            placeholder="Shop Image"
            required
            onChange={(e) => setShopImage(e.target.value)}
          />
        </div>

        <div className="form-ip-sec">
          <label htmlFor="shopName">Shop Name:</label>
          <input
            type="text"
            id="shopName"
            placeholder="Enter shop name"
            required
            onChange={(e) => setShopName(e.target.value)}
          />
        </div>

        <div className="form-ip-sec">
          <label htmlFor="shopAddress">Shop Address:</label>
          <input
            type="text"
            id="shopAddress"
            placeholder="Enter shop address"
            required
            onChange={(e) => setShopAddress(e.target.value)}
          />
        </div>

        <div className="form-ip-sec">
          <label htmlFor="shopLocation">Shop Location:</label>
          <input
            type="text"
            id="shopLocation"
            placeholder="Enter shop Location"
            required
            onChange={(e) => setShopLocation(e.target.value)}
          />
        </div>

        <div className="form-ip-sec">
          <label>Business Types:</label>
          {businessTypeOptions.map((type) => (
            <div key={type} className="checkbox">
              <input
                type="checkbox"
                id={type}
                checked={businessTypes.includes(type)}
                onChange={() => handleBusinessTypeChange(type)}
              />
              <label htmlFor={type}>{type}</label>
            </div>
          ))}
        </div>

        <div className="form-ip-sec">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-ip-sec">
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmpassword"
            placeholder="Confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div>
          <label />
          <button className="submit-btn" type="submit">
            Register
          </button>
        </div>
        <div className="new-user-register">
          <label />
          <div>
            Already have an account?
            <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterVendor;
