import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveServiceShippingAddress } from "../actions/ServiceAction";
import CheckoutSteps from "../components/CheckoutSteps";
import "../styles/ShippingAddress.css";

const ServiceShippingAddress = (props) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const servicecart = useSelector((state) => state.servicecart);
  const { serviceShippingAddress } = servicecart;

  if (!userInfo) {
    props.history.push("/signin");
  }

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveServiceShippingAddress({
        fullName,
        address,
        city,
        postalcode,
        country,
      })
    );

    props.history.push("/payment");
  };

  return (
    <div>
      {/* <CheckoutSteps step1 step2></CheckoutSteps> */}

      <div className="shipping-form-container">
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Shipping Address</h1>
          </div>

          <div className="form-ip-sec">
            <label htmlFor="fullName">Full name:</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></input>
          </div>

          <div className="form-ip-sec">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></input>
          </div>

          <div className="form-ip-sec">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></input>
          </div>

          <div className="form-ip-sec">
            <label htmlFor="postalcode">Postal Code:</label>
            <input
              type="text"
              id="postalcode"
              placeholder="Enter postalcode"
              value={postalcode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></input>
          </div>

          <div className="form-ip-sec">
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></input>
          </div>

          <div>
            <label />
            <button type="submit" className="continue-btn">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceShippingAddress;
