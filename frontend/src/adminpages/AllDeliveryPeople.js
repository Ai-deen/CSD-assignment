import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../Axios';

const API = "http://localhost:4001";

const DeliveryPersons_a = () => {
    const deliveryPersonInfo = useSelector(state => state.deliverySignin);
    console.log("Here: ",deliveryPersonInfo);

    const [deliveryPersons, setdeliveryPersons] = useState([]);

    useEffect(() => {
        fetchData();
    }, [deliveryPersonInfo]); // Reload data when deliveryPersonInfo changes

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API}/as/deliverypeople`);
            console.log('Response data:', response.data);
            setdeliveryPersons(response.data);
        } catch (error) {
            console.error('Error fetching deliveryPersons:', error);
        }
    };

    const handleDeletedeliveryPerson = async (deliveryPersonId) => {
        console.log(deliveryPersonId);
        try {
            const response = await axios.delete(`${API}/as/deliverypeople/${deliveryPersonId}`);
            if (response.status === 200) {
                setdeliveryPersons(deliveryPersons.filter(deliveryPerson => deliveryPerson._id !== deliveryPersonId));
            } else {
                console.error('Failed to delete deliveryPerson:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting deliveryPerson:', error);
        }
    };

    return (
        <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <h2>deliveryPerson List</h2>
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
                        {deliveryPersons.map((deliveryPerson, index) => (
                            <tr key={deliveryPerson._id} style={{ border: '1px solid black' }}>
                                <td style={{ border: '1px solid black' }}>{index + 1}</td>
                                <td style={{ border: '1px solid black' }}>{deliveryPerson.name}</td>
                                <td style={{ border: '1px solid black' }}>{deliveryPerson.email}</td>
                                <td style={{ border: '1px solid black' }}>{deliveryPerson._id}</td>
                                <td style={{ border: '1px solid black' }}>
                                    <button onClick={() => handleDeletedeliveryPerson(deliveryPerson._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default DeliveryPersons_a;
