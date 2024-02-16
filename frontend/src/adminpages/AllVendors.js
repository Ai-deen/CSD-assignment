import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../Axios';

const API = "http://localhost:4001";

const VendorList_a = () => {
    const vendorInfo = useSelector(state => state.vendorSignin);
    console.log("Here: ",vendorInfo);

    const [vendors, setvendors] = useState([]);

    useEffect(() => {
        fetchData();
    }, [vendorInfo]); // Reload data when vendorInfo changes

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API}/as/vendors`);
            console.log('Response data:', response.data);
            setvendors(response.data);
        } catch (error) {
            console.error('Error fetching vendors:', error);
        }
    };

    const handleDeletevendor = async (vendorId) => {
        console.log(vendorId);
        try {
            const response = await axios.delete(`${API}/as/vendors/${vendorId}`);
            if (response.status === 200) {
                setvendors(vendors.filter(vendor => vendor._id !== vendorId));
            } else {
                console.error('Failed to delete vendor:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting vendor:', error);
        }
    };

    return (
        <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <h2>vendor List</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid black', textAlign: 'center' }}>
                    <thead>
                        <tr style={{ border: '1px solid black' }}>
                            <th style={{ border: '1px solid black' }}>Serial No</th>
                            <th style={{ border: '1px solid black' }}>Name</th>
                            <th style={{ border: '1px solid black' }}>Email</th>
                            <th style={{ border: '1px solid black' }}>ID</th>
                            <th style={{ border: '1px solid black' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map((vendor, index) => (
                            <tr key={vendor._id} style={{ border: '1px solid black' }}>
                                <td style={{ border: '1px solid black' }}>{index + 1}</td>
                                <td style={{ border: '1px solid black' }}>{vendor.name}</td>
                                <td style={{ border: '1px solid black' }}>{vendor.email}</td>
                                <td style={{ border: '1px solid black' }}>{vendor._id}</td>
                                <td style={{ border: '1px solid black' }}>
                                    <button onClick={() => handleDeletevendor(vendor._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default VendorList_a;
