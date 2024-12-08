import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import "../DashComp/DashBoardTour.css";
const DashboardDetails = ({ booking }) => {
  return (
    <Card className="booking-card">
      <CardBody>
        <CardTitle tag="h5"></CardTitle>
        <CardText>
          <strong>Payment ID:</strong> {booking.paymentId}
        </CardText>
        <CardText>
          <strong>Full Name:</strong> {booking.bookingDetails.fullName}
        </CardText>
        <CardText>
          <strong>Phone:</strong> {booking.bookingDetails.phone}
        </CardText>
        <CardText>
          <strong>Pickup Location:</strong> {booking.bookingDetails.pickupLocation}
        </CardText>
        <CardText>
          <strong>Transport Mode:</strong> {booking.bookingDetails.transportMode}
        </CardText>
        <CardText>
          <strong>Start Date:</strong>{" "}
          {new Date(booking.bookingDetails.bookOn).toLocaleDateString()}
        </CardText>
        <CardText>
          <strong>End Date:</strong>{" "}
          {new Date(booking.bookingDetails.bookTill).toLocaleDateString()}
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

export default DashboardDetails;
