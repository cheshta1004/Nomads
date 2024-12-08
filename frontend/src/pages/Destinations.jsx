import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DestinationCard from "../shared/DestinationCard";
import { Container, Row, Col } from 'reactstrap';  
import '../styles/Destination.css';
import SearchBar from "../shared/SearchBar.jsx"
const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchDestinations = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('http://localhost:5000/api/destinations');
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
            <h1 className="destinations-title text-center"></h1>
            <SearchBar/>
            <Row>
                {destinations.length > 0 ? (
                    destinations.map(destination => (
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
