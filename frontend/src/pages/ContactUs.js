import React from 'react';
import '../styles/AboutUs.css';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div>
            <div className="contact-container">
                <div className="about-container">
                    <h1 className="about-heading">Contact Us</h1>
                    <p className="about-description">
                        For queries contact:
                        <ul className="email-list">
                            <li><a href="mailto:ankitakumari@iitbhilai.ac.in">ankitakumari@iitbhilai.ac.in</a></li>
                            <li><a href="mailto:tallapakalahari@iitbhilai.ac.in">tallapakalahari@iitbhilai.ac.in</a></li>
                            <li><a href="mailto:mundrusrinidhi@iitbhilai.ac.in">mundrusrinidhi@iitbhilai.ac.in</a></li>
                            <li><a href="mailto:boddepallisai@iitbhilai.ac.in">boddepallisai@iitbhilai.ac.in</a></li>
                        </ul>
                    </p>
                </div>
            </div>
            <Link to="/" className="back-link">Back to Home</Link>
        </div>
    );
}

export default Contact;
