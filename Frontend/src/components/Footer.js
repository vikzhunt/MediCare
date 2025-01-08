import React from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h2 className="footer-logo">MediCare</h2>
                    <p>Subscribe</p>
                    <div className="subscribe">
                        <input type="email" placeholder="Your Email" />
                        <button className="subscribe-btn">→</button>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Social</h3>
                    <ul>
                        <li>LinkedIn</li>
                        <li>Instagram</li>
                        <li>Facebook</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Updet Link</h3>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/service">Service</Link></li>
                        <li><Link to="/app">Our App</Link></li>
                        <li><Link to="/blog">News Blog</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Location & Contact</h3>
                    <p>211B Thornridge Cir, Syracuse, Connecticut 35624</p>
                    <p>(704) 555-0127</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 The Copyright Company</p>
            </div>
        </footer>
    );
};

export default Footer;
