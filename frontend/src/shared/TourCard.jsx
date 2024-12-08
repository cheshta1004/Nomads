import React from "react";
import { Card, CardBody, CardTitle, Button } from "react-bootstrap";
import { Link ,useNavigate} from 'react-router-dom';
import calculateAvgRating from "../utils/avgRating";
import "./tour-card.css";

const TourCard = ({ tour }) => {
    const { _id, title, city, photo, price, featured, reviews } = tour;
    const { totalRating, avgRating } = calculateAvgRating(reviews);
    const navigate=useNavigate();
    const handleBookingClick = () => {
        navigate(`/hotels?city=${city}`); 
    };
    return (
        <div className="tour__card hover-pop">
            <Card>
                <div className="tour__img">
                    <img src={photo} alt="tour-img" />
                    {featured && <span>Featured</span>}
                </div>
                <CardBody>
                    <div className="card__top d-flex align-items-center justify-content-between">
                        <span className="tour__location d-flex align-items-center gap-1">
                            <i className="ri-map-pin-line"></i>{city}
                        </span>
                        <span className="tour__rating d-flex align-items-center gap-1">
                            <i className="ri-star-fill"></i>{avgRating === 0 ? null : avgRating}
                            {totalRating === 0 ? (
                                "Not Rated"
                            ) : (
                                <span>({reviews.length})</span>
                            )}
                        </span>
                    </div>
                    <CardTitle className="tour__title">
                        <Link to={`/tours/${_id}`}>{title}</Link>
                    </CardTitle>
                    <div className="card__bottom d-flex align-items-center justify-content-between mt-2">
                        <h5>${price}<span>/per person</span></h5>
                        <Button className="booking__btn" style={{background:"var(--secondary-color)"}}
                        onClick={handleBookingClick}>
                            View Destination
                        </Button>
                        
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default TourCard;

