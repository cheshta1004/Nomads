import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  guestSize: {
    type: Number,
    required: true,
    min: 1, 
  },
  bookOn: {
    type: Date,
    required: true,
  },
  bookTill: {
    type: Date,
    required: true,
  },
  pickupTime: {
    type: String,
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  transportMode: {
    type: String,
    required: true,
    enum: ["cab", "bus"], 
  },
  travelFare: {
    type: Number,
    required: false,
    default: 0,
  },
  hotelFee: {
    type: Number,
    required: true,
  },
  serviceFee: {
    type: Number,
    required: true,
    default: 10, 
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  hotelName: {
    type: String,
    required: true,
  },
  hotelCity: {
    type: String,
    required: true,
  },
  hotelAddress: {
    type: String,
    required: true,
  },
  propertyClass: {
    type: Number,
    required: true,
    min: 1,
    max: 5, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;