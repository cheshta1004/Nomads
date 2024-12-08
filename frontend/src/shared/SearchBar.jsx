import React, { useRef, useState } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup, Row } from "reactstrap";
import DestinationCard from "../shared/DestinationCard.jsx";

const SearchBar = () => {
    const locationRef = useRef('');
    const [results, setResults] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const [searchInitiated, setSearchInitiated] = useState(false); 
    const handleInputChange = () => {
        const location = locationRef.current.value.trim();
        if (location === '') {
            setResults([]);
            setSearchInitiated(false);
        }
    };

    const searchHandler = async () => {
        const location = locationRef.current.value.trim(); 
        if (location === '') {
            alert('Please enter a location');
            return;
        }
        try {
            setSearchInitiated(true); 
            setLoading(true);
            setError(null);
            const res = await fetch(`http://localhost:5000/api/destinations/search?city=${location}`);
            if (!res.ok) throw new Error('Failed to fetch destinations');
            const result = await res.json();
            setResults(result.data); 
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Col>
            <div className="search__bar">
                <Form className="d-flex align-items-center gap-4">
                    <FormGroup className="d-flex gap-3 form__group form__group-fast">
                        <span><i className="ri-map-pin-line"></i></span>
                        <div>
                            <h6>Location</h6>
                            <input
                                type="text"
                                placeholder="Where are you going?"
                                ref={locationRef}
                                onChange={handleInputChange} 
                            />
                        </div>
                    </FormGroup>
                    <span className="search__icon" onClick={searchHandler}>
                        <i className="ri-search-line"></i>
                    </span>
                </Form>

                {loading && <p className="text-center mt-3">Loading...</p>}

                {error && <p className="text-center text-danger mt-3">{error}</p>}

                <Row className="mt-4 search__results">
                    {searchInitiated && results.length === 0 && !loading && !error ? (
                        <h5 className="no-results">No destinations found</h5>
                    ) : (
                        results.map((destination) => (
                            <Col lg="3" md="4" sm="6" key={destination._id}>
                                <div className="destination-card">
                                    <DestinationCard destination={destination} />
                                </div>
                            </Col>
                        ))
                    )}
                </Row>
            </div>
        </Col>
    );
};

export default SearchBar;

