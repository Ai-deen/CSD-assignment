import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/UserAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import '../styles/Register.css';

const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password does not match.');
    } else {
      dispatch(register(name, email, password, address, location, phoneNumber));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div className="register-container">
      <form className="form" onSubmit={registerHandler}>
        <div>
          <h1>Register</h1>
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

export default Register;
