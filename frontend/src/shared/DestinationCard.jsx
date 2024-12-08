

// src/components/DestinationCard.js
import React from 'react';
import {  Button } from "react-bootstrap";
import { useNavigate} from 'react-router-dom';
import "../styles/DestiCard.css"
const DestinationCard = ({ destination }) => {
    const { name } = destination;
    const navigate=useNavigate();
    const handleBookingClick = () => {
        navigate(`/hotels?city=${name}`); 
    };
    return (
        <div className="destination-card">
            <img src={destination.image} alt={destination.name} />
            <h3>{destination.name}</h3>
            <p>{destination.description}</p>
            
            {/* Book Now Button */}
            <div className="book-now-btn">
                {/* <Link to={`/book/${destination._id}`} className="btn btn-primary">
                    Book Now
                </Link> */}
                <Button className="btn btn-primary" style={{background:"var(--secondary-color)"}}
                        onClick={handleBookingClick}>
                            View Hotels
                </Button>
            </div>
        </div>
    );
};

export default DestinationCard;
