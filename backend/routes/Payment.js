import express from "express";
import Payment from "../models/Payment.js"; // Assuming you have a Payment model

const router = express.Router();

// POST route to save payment details
router.post("/", async (req, res) => {
  try {
    const {
      paymentId,
      userId,
      hotelId,
      amount,
      bookingDetails,
    } = req.body;

    // Create new payment document in database
    const newPayment = new Payment({
      paymentId,
      userId,
      hotelId,
      amount,
      bookingDetails,
      status: "Success", // Assuming the payment is successful
      createdAt: new Date(),
    });

    // Save the payment details in the database
    await newPayment.save();

    res.status(200).json({ success: true, message: "Payment saved successfully" });
  } catch (error) {
    console.error("Error saving payment:", error);
    res.status(500).json({ success: false, message: "Failed to save payment" });
  }
});

export default router;
