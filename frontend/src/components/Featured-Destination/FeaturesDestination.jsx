import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../config.js';
import DestinationCard from "../../shared/DestinationCard"; 
import { Container, Row, Col } from 'reactstrap';  
const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const TOP_DESTINATIONS = 8; 

    useEffect(() => {
        const fetchDestinations = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_URL}/api/destinations`);
                setDestinations(response.data.destinations);
            } catch (err) {
                console.error("Error fetching destinations:", err);
                setError('Failed to load destinations.');
            } finally {
                setLoading(false);
            }
        };
        fetchDestinations();
    }, []);  
    if (loading) {
        return <h4 className="text-center pt-5">Loading..........</h4>;
    }
    if (error) {
        return <h4 className="text-center pt-5">{error}</h4>;
    }
    return (
        <Container>
            <Row>
                {destinations.length > 0 ? (
                    destinations
                        .slice(0, TOP_DESTINATIONS)  
                        .map(destination => (
                            <Col sm="12" md="6" lg="3" key={destination._id} className="mb-4">
                                <DestinationCard destination={destination} />
                            </Col>
                        ))
                ) : (
                    <p>No destinations found</p>
                )}
            </Row>
        </Container>
    );
};

export default Destinations;