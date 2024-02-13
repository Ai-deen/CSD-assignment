import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin, signinVendor, signinDelivery } from '../actions/UserAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import "../styles/SignIn.css";

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('user'); // Default to 'user' sign-in

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';
    const redirect1 = props.location.search
      ? props.location.search.split("=")[1]
        : "/vendorhome";
    const redirect2 = props.location.search
      ? props.location.search.split("=")[1]
      : "/delivery";

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;
    const vendorSignin = useSelector((state) => state.vendorSignin);
    const { vendorInfo, loadin, eror } = vendorSignin;
    const deliverySignin = useSelector((state) => state.deliverySignin);
    const { deliveryInfo, loadi, eor } = deliverySignin;
    const dispatch = useDispatch();

    const signInHandler = (e) => {
        e.preventDefault();

        // Dispatch the appropriate sign-in action based on userType
        console.log(userInfo)
        console.log(vendorInfo)
        console.log(deliveryInfo)
        if (userType ==="vendor"){
            dispatch(signinVendor(email, password, userType));
        }
        else if (userType === "delivery") {
            dispatch(signinDelivery(email, password, userType));
    }
        else {
            dispatch(signin(email, password, userType));
    }
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
        if (vendorInfo) {
            props.history.push(redirect1)
        }
        if (deliveryInfo) {
            props.history.push(redirect2)
        }
    }, [props.history, redirect, userInfo,vendorInfo, deliveryInfo, dispatch]);

    return (
      <div className="signin-container">
        <form className="form" onSubmit={signInHandler}>
          <div>
            <h1>Sign In</h1>
          </div>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}

          {/* Two-column layout for user and vendor sign-in */}
          <div className="form-ip-sec">
            <label htmlFor="user-type">Sign In As:</label>
            <select
              id="user-type"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
              <option value="delivery">Delivery</option>
            </select>
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
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label />
            <button className="submit-btn" type="submit">
              Sign In
            </button>
          </div>

          {/* Links for user and vendor registration */}
          <div className="new-user-register">
            <label />
            {userType === "user" ? (
              <>
                New user? <Link to="/register">Create Account</Link>
              </>
            ) : userType === "vendor" ? (
              <>
                New Vendor? <Link to="/registerVendor">Create Account</Link>
              </>
            ) : (
              <>
                New Delivery Personnel?{" "}
                <Link to="/registerDelivery">Create Account</Link>
              </>
            )}
          </div>
        </form>
      </div>
    );
};

export default SignIn;
