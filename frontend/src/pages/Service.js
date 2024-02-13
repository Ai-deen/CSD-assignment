import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToServiceCart } from "../actions/ServiceAction";
import { useHistory, useParams } from "react-router-dom"; // Import useHistory for redirection
import "../styles/Service.css";

const ServicePage = () => {
  const [userInput, setUserInput] = useState({
    gadgetName: "",
    gadgetBrand: "",
    gadgetImage: "",
    issueDescription: "",
    serialNumber: "",
    // Add more fields as needed
  });

  const dispatch = useDispatch();
  const history = useHistory(); // Initialize history object for redirection
  const { vendorId } = useParams(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addToServiceCart({...userInput, vendor : vendorId,})); // Dispatch to addToServiceCart action
    setUserInput({
      // Clear form fields after submission
      gadgetName: "",
      gadgetBrand: "",
      gadgetImage: "",
      issueDescription: "",
      serialNumber: "",
    });
    // Redirect to the next page if needed
    history.push("/serviceshipping");
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
        <div className="col-4">
          <h1>Service Page</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              {/* Add input fields for service details */}
              <label>
                Gadget Name:
                <input
                  type="text"
                  name="gadgetName"
                  value={userInput.gadgetName}
                  onChange={handleChange}
                />
              </label>

              <label>
                Gadget Brand:
                <input
                  type="text"
                  name="gadgetBrand"
                  value={userInput.gadgetBrand}
                  onChange={handleChange}
                />
              </label>

              <label>
                Gadget Image:
                <input
                  type="text"
                  name="gadgetImage"
                  value={userInput.gadgetImage}
                  onChange={handleChange}
                />
              </label>

              <label>
                issue Description:
                <input
                  type="text"
                  name="issueDescription"
                  value={userInput.issueDescription}
                  onChange={handleChange}
                />
              </label>

              <label>
                serial Number:
                <input
                  type="text"
                  name="serialNumber"
                  value={userInput.serialNumber}
                  onChange={handleChange}
                />
              </label>

              {/* Add more input fields for other service details */}

              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
