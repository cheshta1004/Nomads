import React from 'react';
import '../styles/About.css';
import aboutImage from '../assets/images/tour.jpg'; // Import an image for the about section
import teamImage from '../assets/images/gallery-01.jpg'; // Import an image for the team section
import missionImage from '../assets/images/gallery-03.jpg'; // Import an image for the mission section

const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>About Us</h1>
                <p>Your Trusted Travel Partner</p>
            </div>

            <div className="about-section">
                <img src={aboutImage} alt="About Us" className="about-image"/>
                <div className="about-text">
                    <h2>Who We Are</h2>
                    <p>
                        We are a leading travel company dedicated to making your travel experiences unforgettable.
                        With years of expertise and a passion for exploration, we offer curated tours that cater to
                        your every need.
                    </p>
                </div>
            </div>

            <div className="about-section reverse">
                <div className="about-text">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to connect you with the world's most beautiful destinations, providing 
                        exceptional service and creating memories that last a lifetime. Whether you're seeking
                        adventure, relaxation, or cultural immersion, we have the perfect tour for you.
                    </p>
                </div>
                <img src={missionImage} alt="Our Mission" className="about-image"/>
            </div>

            <div className="about-section">
                <img src={teamImage} alt="Our Team" className="about-image"/>
                <div className="about-text">
                    <h2>Why Choose Us</h2>
                    <ul>
                        <li>Expertly Curated Tours</li>
                        <li>24/7 Customer Support</li>
                        <li>Experienced Guides</li>
                        <li>Customizable Itineraries</li>
                        <li>Competitive Pricing</li>
                    </ul>
                </div>
            </div>

            <div className="about-contact">
                <h2>Contact Us</h2>
                <p>
                    Have questions or need assistance? Reach out to our friendly team at
                    <a href="mailto:info@travelcompany.com"> info@travelcompany.com</a>.
                    We're here to help!
                </p>
            </div>
        </div>
    );
};

export default About; 