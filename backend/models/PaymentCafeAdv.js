import mongoose from "mongoose";

const paymentCafeAdvSchema = new mongoose.Schema({
  paymentId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  CafeAdvId: { type: mongoose.Schema.Types.ObjectId, ref: "CafeAdv", required: true },
  amount: { type: Number, required: true },
  bookingDetails: {
    fullName: { type: String, required: true },
    date: { type: String, required: true },  
    time: { type: String, required: true },  
  },
  status: { type: String, required: true, enum: ["Success", "Failed"] },
  createdAt: { type: Date, default: Date.now },
});

const PaymentCafeAdv = mongoose.model("PaymentCafeAdv", paymentCafeAdvSchema);
export default PaymentCafeAdv;
