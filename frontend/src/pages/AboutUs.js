import React from 'react';
import '../styles/AboutUs.css'
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div>
            <div className="square-container">
                <div className="about-container">
                    <h1 className="about-heading">About Us</h1>
                    <p className="about-description">Welcome to our electronic marketplace! Our web app is designed to provide a seamless shopping experience similar to popular platforms like Amazon or Flipkart. Whether you're a user looking to make a purchase or a vendor interested in registering your shop, our platform caters to both your needs. Vendors can easily register their shops and provide services such as selling, renting, or buying electronic products. Join us today and explore the endless possibilities! </p>
                    <p className="about-description">Only for IIT Bhilai students use.</p>
                </div>
            </div>
            <Link to="/" className="back-link">Back to Home</Link>
        </div>
    );
}

export default About;
