import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/BookingPage.css';
import { useUserContext } from "../context/userContext";
import { Button } from "reactstrap";
import { API_URL } from '../config';
const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || {};
  const { username } = useUserContext();

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateInputs = () => {
    if (!formData.name || !formData.date || !formData.time) {
      alert("Please fill out all fields before proceeding.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please try again.");
      return;
    }

    const totalAmount = item.price;

    const options = {
      key: "rzp_test_XTFM1u04BWkyBy",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Cafe and Adventure Booking",
      description: `Payment for ${item.name}`,
      handler: async (response) => {
        try {
          const paymentDetails = {
            paymentId: response.razorpay_payment_id,
            userId: username._id,
            CafeAdvId: item._id,
            amount: totalAmount,
            bookingDetails: {
              fullName: formData.name,
              date: formData.date,
              time: formData.time,
            },
          };

          const res = await fetch(`${API_URL}/api/paymentCafeAdv`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentDetails),
          });

          if (!res.ok) {
            throw new Error("Failed to save payment details to the server.");
          }

          const data = await res.json();

          if (data.success) {
            navigate("/dashboard");
          } else {
            alert("Payment saved but failed to save to the database.");
          }
        } catch (error) {
          alert("Payment successful but there was an error saving it.");
        }
      },
      prefill: {
        name: formData.name,
        email: username?.email,
      },
      theme: { color: "#3399cc" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  if (!item) {
    return <p className="error-message">No booking item selected.</p>;
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-form-card">
          <h2> {item.name}</h2>
          <img src={item.image} alt={item.name} className="item-image" />
          <form>
            <label>
              Your Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
              type="button"
              onClick={() => (!username ? navigate("/login") : handleSubmit())}
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

