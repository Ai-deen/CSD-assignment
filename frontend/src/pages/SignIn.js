import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/UserAction';
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

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();

    const signInHandler = (e) => {
        e.preventDefault();

        // Dispatch the appropriate sign-in action based on userType
        dispatch(signin(email, password, userType));
    }

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userInfo]);

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
                    <div>
                        {userType === 'user' ? (
                            <>
                                New user?{' '}
                                <Link to={`/register?redirect=${redirect}`}>
                                    Create Account
                                </Link>
                            </>
                        ) : 
                        (
                            <>
                                New Vendor?{' '}
                                <Link to={`/registerVendor?redirect=${redirect}`}>
                                    Create Account
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
