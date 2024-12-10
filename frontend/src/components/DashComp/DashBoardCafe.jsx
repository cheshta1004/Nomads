import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "../DashComp/DashBoardTour.css";
import { API_URL } from '../../config.js';
const DashboardCafe = ({ booking }) => {
  const [cafeName, setCafeName] = useState("");
  
  const fetchName = async (cafeId) => {
    try {
      const response = await fetch(`${API_URL}/api/CafeAdv/${cafeId}`);
      
      if (!response.ok) {
        
        setCafeName("Cafe"); // Default value in case of an error
        return;
      }

      const data = await response.json();
      if (data && data.name) {
        setCafeName(data.name);
      } else {
        
        setCafeName("Cafe");
      }
    } catch (error) {
      
      setCafeName("Cafe"); // Default value in case of an error
    }
  };

  useEffect(() => {
    if (booking?.CafeAdvId) {
      fetchName(booking.CafeAdvId);
    } 
  }, [booking]);

  return (
    <Card className="booking-card">
      <CardBody>
        <CardTitle tag="h5"></CardTitle>
        <CardText>
          <strong>Payment ID:</strong> {booking.paymentId}
        </CardText>
        <CardText>
          <strong>Booking For:</strong> {cafeName}
        </CardText>
        <CardText>
          <strong>Full Name:</strong> {booking.bookingDetails.fullName}
        </CardText>
        <CardText>
          <strong>Date:</strong> {booking.bookingDetails.date}
        </CardText>
        <CardText>
          <strong>Time:</strong> {booking.bookingDetails.time}
        </CardText>
        <CardText>
          <strong>Amount:</strong> ₹{booking.amount.toFixed(2)}
        </CardText>
        <CardText>
          <strong>Status:</strong> {booking.status}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default DashboardCafe;
