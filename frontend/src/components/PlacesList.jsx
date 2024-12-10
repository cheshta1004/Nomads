import React, { useState, useEffect } from 'react';
import '../styles/PlacesList.css';
import axios from 'axios';
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const PlacesList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [CafeAdv, setCafeAdv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCafeAdv = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_URL}/api/CafeAdv`);
        setCafeAdv(response.data.CafeAdv);
      } catch (error) {
        setError('Failed to load data. Please try again later.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCafeAdv();
  }, []);

  const handleBooking = (item) => {
    navigate('/booking', { state: { item } });
  };

  const filteredPlaces = CafeAdv.filter(place =>
    place.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <h4 className="text-center pt-5">Loading..........</h4>;
  }

  if (error) {
    return <h4 className="text-center pt-5">{error}</h4>;
  }

  return (
    <div className="places-list">
      <h2>Explore Cafes & Adventures</h2>
      <input
        type="text"
        placeholder="Search by city..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <div className="places-container">
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place, index) => (
            <div key={index} className="place-card">
              <h2 className="city-name">{place.city}</h2>
              <div className="place-sections">
                <div className="adventures-section">
                  <h4>Adventures</h4>
                  {place.adventures.map((adventure, idx) => (
                    <div key={idx} className="place-item">
                      <img
                        src={adventure.image}
                        alt={adventure.name}
                        className="place-image"
                      />
                      <div className="place-content">
                        <h4>{adventure.name}</h4>
                        <p>{adventure.description}</p>
                        <p>Price: ₹{adventure.price}</p>
                        <p>Rating: ⭐{adventure.rating}</p>
                        <button
                          className="btn btn-primary"
                          style={{ background: 'var(--secondary-color)' }}
                          onClick={() => handleBooking(adventure)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cafes-section">
                  <h4>Cafes</h4>
                  {place.cafes.map((cafe, idx) => (
                    <div key={idx} className="place-item">
                      <img
                        src={cafe.image}
                        alt={cafe.name}
                        className="place-image"
                      />
                      <div className="place-content">
                        <h4>{cafe.name}</h4>
                        <p>{cafe.description}</p>
                        <p>Price: ₹{cafe.price}</p>
                        <p>Rating: ⭐{cafe.rating}</p>
                        <button
                          className="btn btn-primary"
                          style={{ background: 'var(--secondary-color)' }}
                          onClick={() => handleBooking(cafe)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4>No places found matching your search.</h4>
        )}
      </div>
    </div>
  );
};

export default PlacesList;
