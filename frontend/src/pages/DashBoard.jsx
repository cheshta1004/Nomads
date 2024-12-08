import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { Spinner } from "reactstrap";
import DashboardDetails from "../components/DashComp/DashBoardTour";

const Dashboard = () => {
  const { username } = useUserContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/payment/${username._id}`);
        if (res.ok) {
          const data = await res.json();
          console.log(data.userRecord)
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
      <h2>My Bookings</h2>
      {bookings.length > 0 ? (
        <div className="cards-container">
          {bookings.map((booking) => (
            
            <DashboardDetails key={booking.paymentId} booking={booking} />
          ))}
        </div>
      ) : (
        <h1>No bookings found. Plan your trip today!</h1>
      )}
    </div>
  );
};

export default Dashboard;



// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUserContext } from "../context/userContext";
// import { Card, CardBody, CardTitle, CardText, Spinner, Button } from "reactstrap";
// import "../styles/DashBoard.css"
// const Dashboard = () => {
//   const { username, setUsername } = useUserContext();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch user bookings
//     const fetchBookings = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/payment/${username._id}`);
//         if (res.ok) {
//           const data = await res.json();
//           setBookings(data.userRecord); // Assuming `userRecord` contains the array of bookings
//         } else {
//           console.error("Failed to fetch bookings");
//         }
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   if (loading) {
//     return (
//       <div className="dashboard-loading">
//         <Spinner color="primary" />
//         <p>Loading your bookings...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard">
//       <h2>My Bookings</h2>
//       {bookings.length > 0 ? (
//         <div className="cards-container">
//           {bookings.map((booking) => (
//             <Card key={booking.paymentId} className="booking-card">
//               <CardBody>
//                 <CardTitle tag="h5">Booking Details</CardTitle>
//                 <CardText>
//                   <strong>Payment ID:</strong> {booking.paymentId}
//                 </CardText>
//                 <CardText>
//                   <strong>Full Name:</strong> {booking.bookingDetails.fullName}
//                 </CardText>
//                 <CardText>
//                   <strong>Phone:</strong> {booking.bookingDetails.phone}
//                 </CardText>
//                 <CardText>
//                   <strong>Pickup Location:</strong> {booking.bookingDetails.pickupLocation}
//                 </CardText>
//                 <CardText>
//                   <strong>Transport Mode:</strong> {booking.bookingDetails.transportMode}
//                 </CardText>
//                 <CardText>
//                   <strong>Start Date:</strong>{" "}
//                   {new Date(booking.bookingDetails.bookOn).toLocaleDateString()}
//                 </CardText>
//                 <CardText>
//                   <strong>End Date:</strong>{" "}
//                   {new Date(booking.bookingDetails.bookTill).toLocaleDateString()}
//                 </CardText>
//                 <CardText>
//                   <strong>Amount:</strong> ₹{booking.amount.toFixed(2)}
//                 </CardText>
//                 <CardText>
//                   <strong>Status:</strong> {booking.status}
//                 </CardText>
            
//               </CardBody>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <h1>No bookings found. Plan your trip today!</h1>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
