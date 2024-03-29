// ServicePage.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addService } from '../actions/ServiceAction';
import "../styles/Service.css"

const ServicePage = () => {
  const [userInput, setUserInput] = useState({
    description: '',
    type: '',
    location: '',
  });

  const dispatch = useDispatch();
  const services = useSelector((state) => state.service.services) || [];
  ;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addService(userInput));
    setUserInput({ description: '', type: '', location: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="row-container">
      <Link to="/" className="back-res">
        Back to home
      </Link>

      
        <div className="col-4">
          <h1>Service Page</h1>
          <form onSubmit={handleSubmit}>
          <div className="input-group">
          
            {/* Image upload input */}
            <label>
              Upload Image:
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
            </label>


          <label class="resizable-input-container">
            Description:
            <input
              type="text"
              name="description"
              value={userInput.description}
              onChange={handleChange}
              class="resizable-input"
            />
            <div class="resize-handle"></div>
          </label>



            <label class="resizable-input-container">
              Type:
              <input
                type="text"
                name="type"
                value={userInput.type}
                onChange={handleChange}
              />
            </label>

            <label class="resizable-input-container">
              Location:
              <input
                type="text"
                name="location"
                value={userInput.location}
                onChange={handleChange}
              />
            </label>

            </div>

            <button className="service-submit-button" type="submit">Submit</button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default ServicePage;
