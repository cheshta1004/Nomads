import React, { useEffect, useRef, useState } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import useFetch from "./../hooks/useFetch.js";
import { BASE_URL } from "./../utils/config.js";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews = [],
    city,
    distance,
    maxGroupSize,
  } = tour || {}; // Default to an empty object if tour is undefined
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const options = { day: "numeric", month: "long", year: "numeric" };

  // Submit request to server
  const submitHandler = (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    const reviewData = {
      reviewText,
      rating: tourRating,
      tourId: id,
    };

    console.log(reviewData); // Add logic to POST review data to the server
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [tour]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading........</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="" />
                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i
                          className="ri-star-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? null : avgRating}
                        {totalRating === 0 ? (
                          "Not Rated"
                        ) : (
                          <span>({reviews.length})</span>
                        )}
                      </span>
                      <span>
                        <i className="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span>
                        <i className="ri-map-pin-2-line"></i> {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i> ${price}{" "}
                        /per person
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i> {distance} k/m
                      </span>
                      <span>
                        <i className="ri-group-line"></i> {maxGroupSize} people
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  {/*====tour review section */}
                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length || 0} reviews)</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-item-center gap-3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          1 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(2)}>
                          2 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(3)}>
                          3 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(4)}>
                          4 <i className="ri-star-s-fill"></i>
                        </span>
                        <span onClick={() => setTourRating(5)}>
                          5 <i className="ri-star-s-fill"></i>
                        </span>
                      </div>
                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {reviews?.map((review, index) => (
                        <div className="review__item" key={index}>
                          <img src={avatar} alt="" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>bhavya</h5>
                                <p>
                                  {new Date("01-18-2024").toLocaleDateString(
                                    "en-US",
                                    options
                                  )}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                5<i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>Amazing tour</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/*====tour review section end */}
                </div>
              </Col>
              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default TourDetails;
