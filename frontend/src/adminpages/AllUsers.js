import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link from React Router
import axios from '../Axios';

const API = "http://localhost:4001";

const UserList = () => {
    const userInfo = useSelector(state => state.userSignin);
    console.log("Here: ",userInfo);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, [userInfo]); // Reload data when userInfo changes

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API}/as/users`);
            console.log('Response data:', response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDeleteUser = async (userId) => {
        console.log(userId);
        try {
            const response = await axios.delete(`${API}/as/users/${userId}`);
            if (response.status === 200) {
                setUsers(users.filter(user => user._id !== userId));
            } else {
                console.error('Failed to delete user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <h2>User List</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid black', textAlign: 'center' }}>
                    <thead>
                        <tr style={{ border: '1px solid black' }}>
                            <th style={{ border: '1px solid black' }}>Serial No</th>
                            <th style={{ border: '1px solid black' }}>ID</th>
                            <th style={{ border: '1px solid black' }}>Name</th>
                            <th style={{ border: '1px solid black' }}>Email</th>
                            <th style={{ border: '1px solid black' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} style={{ border: '1px solid black' }}>
                                <td style={{ border: '1px solid black' }}>{index + 1}</td>
                                <td style={{ border: '1px solid black' }}>{user._id}</td>
                                <td style={{ border: '1px solid black' }}>{user.name}</td>
                                <td style={{ border: '1px solid black' }}>{user.email}</td>
                                <td style={{ border: '1px solid black' }}>
                                    <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                                    <Link className="vendor-link" to={`/users_a/${user._id}`} style={{ marginLeft: '10px' }}>View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default UserList;
