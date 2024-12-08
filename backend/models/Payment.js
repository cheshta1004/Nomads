import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  amount: { type: Number, required: true },
  bookingDetails: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    transportMode: { type: String, required: true },
    bookOn: { type: String, required: true },
    bookTill: { type: String, required: true },
  },
  status: { type: String, required: true, enum: ["Success", "Failed"] },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
