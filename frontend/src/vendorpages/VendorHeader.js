import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/VendorHome.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import logo from "../images/kasslogo.png";
import { useHistory } from "react-router-dom";
import { vendorsignout } from "../actions/UserAction";
const VendorHeader = () => {
  const vendorSignin = useSelector((state) => state.vendorSignin);
  const { vendorInfo } = vendorSignin;
  const history = useHistory();
  if (vendorInfo === null) {
    history.push("/");
  }
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dispatch = useDispatch();
  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };
  const vendorsignOutHandler = () => {
    dispatch(vendorsignout());
  };
  return (
    <div>
      <div className="vendor-header">
        <div className="vendor-home-brand">
          <img
            src={logo}
            width={30}
            height={30}
            class="pl-2 m-3"
            onClick={() => history.push("/vendorhome")}
          />
          <p style={{ fontSize: "15px" }} onClick={() => history.push("/")}>
            KASS Electronics
          </p>
        </div>
        {/* <img className="img" src={logo} /> */}

        <div
          className="header-account-dropdown"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p>
            {vendorInfo.name.charAt(0).toUpperCase() +
              vendorInfo.name.slice(1).toLowerCase()}
          </p>
          <AccountCircleIcon style={{ fontSize: "40px", color: "white" }} />
          {dropdownVisible && (
            <div className="dropdown-menu">
              {/* Your dropdown menu content here */}
              <Link to="/profile">Profile</Link>
              <Link to="/settings">Settings</Link>
              <button
                className="drop-down-button"
                onClick={() => {
                  vendorsignOutHandler();
                  history.push("/");
                }}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;
