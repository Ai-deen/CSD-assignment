// ManageServices.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import '../styles/Manageservices.css';

const API = "https://kass.onrender.com";

const ManageServices = () => {
  const vendorSignin = useSelector((state) => state.vendorSignin);
  const { vendorInfo } = vendorSignin;

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          API + `/api/vendors/${vendorInfo._id}/services`
        );
        setServices(response.data);
      } catch (error) {
        console.error(
          "Error fetching services:",
          error.response.data.message || error.message
        );
      }
    };

    if (vendorInfo) {
      fetchServices();
    }
  }, [vendorInfo]);

  const handleMarkAsCompleted = async (serviceId) => {
    try {
      await axios.put(API + `/api/services/${serviceId}/complete`);
      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === serviceId ? { ...service, isDone: true } : service
        )
      );
    } catch (error) {
      console.error("Error marking service as completed:", error.message);
    }
  };

  console.log(services);

  return (
    <div className="services-container">
      <h1>Manage Services</h1>
      <div className="services-list">
        {services.map((service) => (
          <div key={service._id} className="service-card">
            <div className="service-details">
              <h3>Service ID: {service._id}</h3>
              <p>Total Price: ${service.totalPrice}</p>
            </div>
            <div className="button-container">
              <Link to={`/service/${service._id}`} className="service-link">
                View Details
              </Link>
              {!service.isDone && (
                <button
                  onClick={() => handleMarkAsCompleted(service._id)}
                  className="mark-done-btn"
                >
                  Mark as Done
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageServices;
