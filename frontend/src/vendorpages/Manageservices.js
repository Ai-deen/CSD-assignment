// ManageServices.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "../styles/ServiceCard.css"; // Import or create a CSS file for styling

const API = "http://localhost:4001";

const ManageServices = () => {
  const vendorSignin = useSelector((state) => state.vendorSignin);
  const { vendorInfo } = vendorSignin;

  const [services, setServices] = useState([]);

  useEffect(() => {
    // Fetch services associated with the logged-in vendor
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${API}/vs/${vendorInfo._id}/services`
        );
        setServices(response.data);
      } catch (error) {
        console.error(
          "Error fetching services:",
          error.response.data.message || error.message
        );
      }
    };

    // Check if vendorInfo is available before making the request
    if (vendorInfo) {
      fetchServices();
    }
  }, [vendorInfo]);

  // Function to handle marking a service as completed
  const handleMarkAsCompleted = async (serviceId) => {
    try {
      // Make API call to mark the service as completed
      await axios.put(`${API}/vs/services/${serviceId}/complete`);
      // Update the service list after marking as completed
      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === serviceId ? { ...service, completed: true } : service
        )
      );
    } catch (error) {
      console.error("Error marking service as completed:", error.message);
    }
  };

  return (
    <div>
      <h1>Manage Services</h1>
      {services.map((service) => (
        <div key={service._id} className="service-card">
          <h3>{service.name}</h3>
          <p>Description: {service.description}</p>
          <p>Price: ${service.price}</p>
          <p>Status: {service.completed ? "Completed" : "Pending"}</p>
          {!service.completed && (
            <button onClick={() => handleMarkAsCompleted(service._id)}>
              Mark as Completed
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ManageServices;
