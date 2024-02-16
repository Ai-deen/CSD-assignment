import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import "../styles/VendorHome.css";

const AdminHome = () => {
    return (
        <div>
            <h2>Welcome to Admin Page!</h2>
            <ul>
                <li><Link className="vendor-link" to="/admin/users">Users</Link></li>
                <li><Link className="vendor-link" to="/admin/vendors">Vendors</Link></li>
                <li><Link className="vendor-link" to="/admin/deliverypeople">Delivery People</Link></li>
            </ul>
        </div>
    );
}

export default AdminHome;
