import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { Spinner } from "reactstrap";
import DashboardDetails from "../components/DashComp/DashBoardTour";
import DashboardCafe from "../components/DashComp/DashBoardCafe";
import "../styles/DashBoard.css"

const Dashboard = () => {
  const { username } = useUserContext();
  const [bookings, setBookings] = useState([]);
  const [cafeBooking, setCafeBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/login");
      return;
    }
    const fetchCafeBookings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/paymentCafeAdv/${username._id}`);
        if (res.ok) {
          const data = await res.json();
          console.log(data.userRecord);
          setCafeBooking(data.userRecord);
        } else {
          console.log("Failed to Fetch");
        }
      } catch (error) {
        console.log("Error Fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCafeBookings();

    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/payment/${username._id}`);
        if (res.ok) {
          const data = await res.json();
          console.log(data.userRecord);
          setBookings(data.userRecord); // Assuming `userRecord` contains the array of bookings
        } else {
          console.error("Failed to fetch bookings");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [username, navigate]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Spinner color="primary" />
        <p>Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="Hotels">
        <h2>My Hotel Bookings</h2>
        {bookings.length > 0 ? (
          <div className="cards-container">
            {bookings.map((booking) => (
              <DashboardDetails key={booking.paymentId} booking={booking} />
            ))}
          </div>
        ) : (
          <h2>No bookings found. Plan your trip today!</h2>
        )}
      </div>
      <div className="CafeAdv">
        <h2>My Cafe And Adventure Bookings</h2>
        {cafeBooking.length > 0 ? (
          <div className="cards-container">
            {cafeBooking.map((booking) => (
              <DashboardCafe key={booking.paymentId} booking={booking} />
            ))}
          </div>
        ) : (
          <h2>No bookings found.</h2>
        )}
      </div>
    </div>
  );
};

export default Dashboard