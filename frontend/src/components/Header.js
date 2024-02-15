// components/Header.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { useSelector, useDispatch } from "react-redux";
import { signout, vendorsignout } from "../actions/UserAction";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import FavoriteIcon from '@material-ui/icons/Favorite';

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import SearchIcon from "@material-ui/icons/Search";
import logo from "../images/kasslogo.png";
// import { vendorUpdateProfileReducer } from "../reducers/UserReducer";

const Header = (props) => {
  const dispatch = useDispatch();

  const [dropdown, setDropDown] = useState(false);
  const [secondDropdown, setSecondDropdown] = useState(false);

  const showDropDown = () => {
    if (dropdown) setDropDown(false);
    else setDropDown(true);
  };

  const showSecondDropDown = () => {
    if (secondDropdown) setSecondDropdown(false);
    else setSecondDropdown(true);
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const vendorSignin = useSelector((state) => state.vendorSignin);
  const { vendorInfo, loading, error } = vendorSignin;

  const usersignOutHandler = () => {
    dispatch(signout());
  };

  const vendorsignOutHandler = () => {
    dispatch(vendorsignout())
  }

  const [query, setQuery] = useState("");

  console.log("header user", userInfo);
  console.log("header vendor", vendorInfo);

  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/">
              <div className="mr-2">
              <img src={logo} width={40} height={40} className="pl-2 m-3" />
                KASS Electronics
              </div>
            </Link>
          </div>

          <div className="search-bar">
            <input
              className="search-input"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              value={query}
            ></input>

            <div className="search-btn">
              <Link to={`/searchresults/${query}`}>
                <SearchIcon />
              </Link>
            </div>
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/cart">
                <ShoppingCartIcon />
                {cartItems.length > 0 && (
                  <p className="badge">{cartItems.length}</p>
                )}
              </Link>
            </li>
            <li>
            <Link to="/wishlist">
                <FavoriteIcon />
                {wishlistItems.length > 0 && (
                  <p className="badge">{wishlistItems.length}</p>
                )}
              </Link>
            </li>
            <li>
              <Link to="/servicerList"><PhonelinkSetupIcon/>

              </Link>
            </li>

            <li>
              {vendorInfo ? (
                <div className="header-dropdown">
                  <p onClick={showDropDown}>
                    {vendorInfo.name}
                    <ArrowDropDownIcon />
                  </p>
                  <ul
                    className={
                      dropdown ? "dropdown-content show" : "dropdown-content"
                    }
                  >
                    <li>
                      <Link to="/vendorhome">
                        Vendor Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/vendor-profile">
                        Vendor Profile
                      </Link>
                    </li>
                    {/* Add other vendor-related links */}
                    <li>
                      <Link to="/" onClick={vendorsignOutHandler}>
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : userInfo ? (
                <div className="header-dropdown">
                  <p onClick={showDropDown}>
                    {userInfo.name}
                    <ArrowDropDownIcon />
                  </p>
                  <ul
                    className={
                      dropdown ? "dropdown-content show" : "dropdown-content"
                    }
                  >
                    <li>
                      <Link to="/profile">Account</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">Order History</Link>
                    </li>
                    <li>
                      <Link to="/" onClick={usersignOutHandler}>
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">
                  <AccountCircleIcon />
                </Link>
              )}
            </li>

            {userInfo && userInfo.isAdmin && (
              <li>
                <div className="header-dropdown">
                  <p onClick={showSecondDropDown}>
                    Admin
                    <ArrowDropDownIcon />
                  </p>

                  <ul
                    className={
                      secondDropdown
                        ? "dropdown-content show"
                        : "dropdown-content"
                    }
                  >
                    <li>
                      <Link to="/productlist">Products</Link>
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </div>

        <div className="category-container">
          <ul>
            <li>
              <Link to="/category/mobile">Mobile</Link>
            </li>
            <li>
              <Link to="/category/laptop">Laptop</Link>
            </li>
            <li>
              <Link to="/category/monitor">Monitor</Link>
            </li>
            <li>
              <Link to="/category/accessories">Computer Accessories</Link>
            </li>
            <li>
              <Link to="/category/earphones">Earphones</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
