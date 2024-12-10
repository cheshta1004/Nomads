
import React, { useState, useEffect } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext.js";
import { API_URL } from '../../config';
const Booking = ({ hotel }) => {
  const { name, city, address, price, image, propertyClass } = hotel; // `price` is now per day
  const navigate = useNavigate();
  const { username } = useUserContext();
  const [credentials, setCredentials] = useState({
    userId: username?._id || "",
    userEmail: username?.email || "",
    fullName: "",
    phone: "",
    guestSize: 2,
    bookOn: "",
    bookTill: "",
    pickupTime: "12:00",
    pickupLocation: "",
    transportMode: "cab",
  });

  const [travelFare, setTravelFare] = useState(0); // Travel fare state
  const [numDays, setNumDays] = useState(1); // Default number of days is 1
  const serviceFee = 10; // Fixed service fee
  const hotelFee = Number(price) * Math.ceil(credentials.guestSize / 2) * numDays; // Fee increases per 2 guests
  const totalAmount = parseFloat((hotelFee + serviceFee + travelFare).toFixed(2));
 // Total amount calculation

  const today = new Date().toISOString().split("T")[0]; // Restrict booking date to today or future
  // Helper Functions
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const haversineDistance = (coords1, coords2) => {
    const R = 6371; // Earth's radius in km
    const lat1 = toRadians(coords1.lat);
    const lon1 = toRadians(coords1.lon);
    const lat2 = toRadians(coords2.lat);
    const lon2 = toRadians(coords2.lon);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in km
  };
  const calculateTravelFare = async (pickupLocation, dropoffLocation, mode) => {
    const getCoordinates = async (location) => {
      const encodedLocation = encodeURIComponent(location);
      const url = `https://nominatim.openstreetmap.org/search?q=${encodedLocation}&format=json`;
      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0",
          },
        });
        const data = await response.json();

        if (data.length > 0) {
          return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
        } else {
          throw new Error("Location not found");
        }
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    };

    try {
      const pickupCoords = await getCoordinates(pickupLocation);
      const dropoffCoords = await getCoordinates(dropoffLocation);
      const distance = haversineDistance(pickupCoords, dropoffCoords);

      let fare = 0;
      if (mode === "cab") {
        fare = distance * 15 * Math.ceil(credentials.guestSize / 2); // ₹15 per km per 2 guests for cab
      } else if (mode === "bus") {
        fare = distance * 5 * Math.ceil(credentials.guestSize / 2); // ₹5 per km per 2 guests for bus
      }

      return fare;
    } catch (error) {
      console.error("Failed to calculate fare:", error);
      return 0;
    }
  };
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.max(end - start, 0); // Prevent negative difference
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Default to 1 day
  };
  useEffect(() => {
    // Recalculate `numDays` whenever dates change
    if (credentials.bookOn && credentials.bookTill) {
      const days = calculateDays(credentials.bookOn, credentials.bookTill);
      setNumDays(days);
    } else {
      setNumDays(1); // Reset to 1 day if dates are incomplete
    }
  }, [credentials.bookOn, credentials.bookTill]);
  const isCalculating = travelFare === 0 || !credentials.pickupLocation;
  console.log(isCalculating);

  useEffect(() => {
    const fetchFare = async () => {
      if (credentials.pickupLocation) {
        try {
          const fare = await calculateTravelFare(
            credentials.pickupLocation,
            `${address}, ${city}`,
            credentials.transportMode
          );
          console.log("Calculated Fare:", fare); // Debugging log
          setTravelFare(fare);
        } catch (error) {
          console.error("Error calculating fare:", error);
          setTravelFare(0);
        }
      } else {
        setTravelFare(0);
      }
    };
  
    fetchFare();
    //eslint-disable-next-line
  }, [credentials.pickupLocation, credentials.transportMode, credentials.guestSize]);
  
  
  
  // Payment Handler
  const handlePayment = () => {
    if (!validateInputs()) return;

    const options = {
      key: 'rzp_test_XTFM1u04BWkyBy', // Replace with your Razorpay API key
      amount: totalAmount * 100, // Convert to smallest currency unit
      currency: "INR",
      name: "Hotel Booking",
      description: `Booking for ${name}`,
      image: "/logo.png", // Optional company logo
      handler: async (response) =>{
        try{
        console.log("Payment ID:", response.razorpay_payment_id);
        const paymentDetails = {
          paymentId: response.razorpay_payment_id,
          userId: credentials.userId,  // User ID for who made the payment
          hotelId: hotel._id,         // Hotel ID for the booked hotel
          amount: totalAmount,        // Total amount paid
          bookingDetails: {
            fullName: credentials.fullName,
            phone: credentials.phone,
            pickupLocation: credentials.pickupLocation,
            transportMode: credentials.transportMode,
            bookOn: credentials.bookOn,
            bookTill: credentials.bookTill,
          },
        };
        console.log("Payment Details Sent to API:", paymentDetails);
        const res = await fetch(`${API_URL}/api/payment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentDetails),
        });

        const data = await res.json();

        if (data.success) {
          console.log("Payment saved successfully:", data.message);
          navigate("/dashboard"); // Redirect to dashboard
        } else {
          alert("Payment recorded but failed to save in the database. Please try again.");
        }
      } catch (error) {
        console.error("Error saving payment details:", error);
        alert("Payment successful but there was an error saving it.");
      }
      },
      prefill: {
        name: credentials.fullName,
        email: credentials.userEmail,
        contact: credentials.phone,
      },
      notes: {
        address: `${address}, ${city}`,
      },
      theme: {
        color: "#3399cc", // Optional theme color
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", function (response) {
      console.error("Payment Failed:", response.error);
      alert("Payment failed. Please try again.");
    });
    razorpay.open();
  };

  // Input change handler
  const handleChange = (e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Validation
  const validateInputs = () => {
    const { fullName, phone, pickupLocation, bookOn, bookTill } = credentials;
    if (!fullName || !phone || !pickupLocation || !bookOn || !bookTill) {
      alert("Please fill in all required fields.");
      return false;
    }
    if (new Date(bookTill) < new Date(bookOn)) {
      alert("End date cannot be earlier than start date.");
      return false;
    }
    return true;
  };

  return (
    <div className="booking">
      {/* Hotel Details */}
      <div className="hotel-details">
        <img src={image} alt={name} className="hotel-image" />
        <h4>{name}</h4>
        <p>
          {address}, {city}
        </p>
        <p>Property Class: {propertyClass} stars</p>
      </div>
      {/* Price Section */}
       <div className="booking__top d-flex align-items-center justify-content-between">
         <h3>
           ₹{price} <span>/per day for 2 guests</span>
         </h3>
     </div>
      {/* Booking Form */}
       <div className="booking__form">
         <h5>Information</h5>
         <Form className="booking__info-form">
           <FormGroup>
             <label htmlFor="fullName">Full Name</label>
             <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              value={credentials.fullName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="phone">Phone</label>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              value={credentials.phone}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="pickupLocation">Pickup Location</label>
            <input
              type="text"
              placeholder="Pickup Location"
              id="pickupLocation"
              value={credentials.pickupLocation}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="pickupTime">Pickup Time</label>
            <select
              id="pickupTime"
              value={credentials.pickupTime}
              onChange={handleChange}
              required
            >
              {Array.from({ length: 24 }, (_, hour) =>
                ["00", "30"].map((minute) => {
                  const time = `${hour.toString().padStart(2, "0")}:${minute}`;
                  return (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  );
                })
              )}
            </select>
          </FormGroup>
          <FormGroup>
            <label htmlFor="guestSize">Number of Guests</label>
            <select
              id="guestSize"
              value={credentials.guestSize}
              onChange={handleChange}
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </FormGroup>
          <FormGroup>
            <label htmlFor="transportMode">Transport Mode</label>
            <select
              id="transportMode"
              value={credentials.transportMode}
              onChange={handleChange}
              required
            >
              <option value="cab">Cab</option>
              <option value="bus">Bus</option>
            </select>
          </FormGroup>
          <FormGroup>
            <label htmlFor="bookOn">Start Date</label>
            <input
              type="date"
              id="bookOn"
              value={credentials.bookOn}
              onChange={handleChange}
              min={today}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="bookTill">End Date</label>
            <input
              type="date"
              id="bookTill"
              value={credentials.bookTill}
              onChange={handleChange}
              min={credentials.bookOn || today}
              required
            />
          </FormGroup>
        </Form>
      </div>
      {/* Booking Summary */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5>Hotel Fee</h5>
            <span>₹{hotelFee.toFixed(2)}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service Charge</h5>
            <span>₹{serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Travel Fare</h5>
            <span>₹{travelFare.toFixed(2)}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>₹{totalAmount.toFixed(2)}</span>
          </ListGroupItem>
        </ListGroup>
        <Button
          className="btn btn-primary"
           style={{background:"var(--secondary-color)"}}
          onClick={() => {
            if (!username) {
              navigate("/login"); // Redirect to login page if not logged in
            } else {
              handlePayment(); // Proceed with payment if logged in
            }
          }}
        >
          {username ? "Book Now" : "Login to Book"}
        </Button>

      </div>
    </div>
  );
};

export default Booking;


