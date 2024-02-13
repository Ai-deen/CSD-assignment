import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerDelivery, deliverySignin } from "../actions/UserAction"; // Adjust the action import
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import "../styles/Register.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const RegisterDelivery = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState(""); // New state for vehicle information

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/deliveryhome";

  // const deliveryRegister = useSelector(
  //   (state) => state.deliveryRegister
  // ); // Adjust the selector
  // const { deliveryInfo, loading, error } = deliveryRegister;

  const deliverySignin = useSelector((state) => state.deliverySignin);
  const { deliveryInfo, loading, error } = deliverySignin;

  const dispatch = useDispatch();
  const history = useHistory();

  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password does not match.");
    } else {
      dispatch(
        registerDelivery(
          name,
          email,
          password,
          location,
          phoneNumber,
          vehicleInfo,
        )
      ); // Adjust the dispatch
    }
  };


  useEffect(() => {
    if (deliveryInfo) {
      console.log(deliveryInfo);
      history.push("/deliveryhome");
    }
  }, [props.history, redirect, deliveryInfo, dispatch]);

  return (
    <div className="register-container">
      <form className="form" onSubmit={registerHandler}>
        <div>
          <h1>Register Delivery Personnel</h1>
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
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            placeholder="Enter your location"
            required
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-ip-sec">
          <label htmlFor="vehicleInfo">Vehicle Information:</label>
          <input
            type="text"
            id="vehicleInfo"
            placeholder="Enter vehicle information"
            required
            onChange={(e) => setVehicleInfo(e.target.value)}
          />
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
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
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

export default RegisterDelivery;
