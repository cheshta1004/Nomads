import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import "../styles/hotels.css";
import Booking from '../components/Booking/Booking';
import Weather from '../components/Weather/weather';
const Hotels = () => {
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null); // State to track selected hotel
    const location = useLocation();
    const city = new URLSearchParams(location?.search).get('city');

    useEffect(() => {
        const fetchHotels = async () => {
            if (!city) return;

            try {
                console.log(`Fetching hotels for city: ${city}`);
                const response = await axios.get(`http://localhost:5000/api/hotels?city=${city}`);
                console.log('Fetched hotels:', response.data);
                setHotels(response.data);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            }
        };

        fetchHotels();
    }, [city]);

    if (!city) {
        return <p>No city specified</p>;
    }

    const handleBookNow = (hotel) => {
        setSelectedHotel(hotel); 
    };

    return (
        <div>
            <h1 className="hotels-title">Hotels in {city}</h1>
            <Weather city={city}/>
            {selectedHotel ? (
                // If a hotel is selected, show the Booking component
                <Booking hotel={selectedHotel} />
            ) : (
                <div className="hotels-container">
                    {hotels.length > 0 ? (
                        hotels.map(hotel => (
                            <div key={hotel._id} className="hotel-card">
                                <img src={hotel.image} alt={hotel.name} className="hotel-image" />
                                <h2>{hotel.name}</h2>
                                <p>{hotel.address}</p>
                                <p className="price">Price: ₹{hotel.price}</p>
                                <p className="property-class">Class: {hotel.propertyClass || "N/A"} stars</p>
                                <button onClick={() => handleBookNow(hotel)} className="btn btn-primary" style={{background:"var(--secondary-color)"}}>Book Now</button>

                            </div>
                        ))
                    ) : (
                        <p>No hotels found in {city}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Hotels;

