
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/BookingPage.css';
import { useUserContext } from "../context/userContext";
import {  Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {}; // Retrieve passed data
  const { username, setUsername } = useUserContext();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
  });
  const today = new Date().toISOString().split("T")[0];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.time) {
      alert('Please fill out all the fields before proceeding.');
      return;
    }

    // Call the payment gateway function after form submission
    initiatePayment(item);
  };

  const initiatePayment = (item) => {
    const options = {
      key: 'rzp_test_XTFM1u04BWkyBy', // Replace with your Razorpay key
      amount: item.price * 100, // Price in paise
      currency: 'INR',
      name: 'Tour and Travel Booking',
      description:` Payment for ${item.name}`,
      image: 'https://your-logo-url.com/logo.png', // Replace with your logo URL
      handler: (response) => {
        alert(`🎉 Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: formData.name, // Use name from form
        email: 'customer@example.com', // You can customize this
        contact: '1234567890', // Add user contact if available
      },
      notes: {
        address: `Booking for ${item.name}`,
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!item) {
    return <p className="error-message">No booking item selected.</p>;
  }

  return (
    <div className="booking-page">
      <div className="hero-section"></div>

      <div className="booking-container">
        <div className="booking-form-card">
          <h2>Book: {item.name}</h2>
          <img src={item.image} alt={item.name} className="item-image" />
          <p>{item.description}</p>
          <p className="item-price" >Price: ₹{item.price}</p>
          <form onSubmit={handleSubmit}>
            <label>
              Your Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </label>
            <label>
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                min={today}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Time:
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </label>
            <Button
  type={username ? "submit" : "button"} // Dynamically set type
  className="btn btn-primary submit-button"
  style={{ background: "var(--secondary-color)" }}
  onClick={() => {
    if (!username) {
      navigate("/login"); // Redirect to login page if not logged in
    }
  }}
>
  {username ? "Confirm and Pay" : "Login to Book"}
</Button>


          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;