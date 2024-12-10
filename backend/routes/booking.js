import express from "express";
import Booking from "../models/Booking.js"; 
const router = express.Router();

router.get("/bookings/user/:userId", async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        console.error(`Error fetching bookings for user ${userId}:`, error.message);
        res.status(500).json({ message: "Failed to fetch bookings. Please try again later." });
    }
});

router.get("/bookings/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "Booking ID is required." });
    }

    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found." });
        }
        res.status(200).json(booking);
    } catch (error) {
        console.error(`Error fetching booking with ID ${id}:`, error.message);
        res.status(500).json({ message: "Failed to fetch booking details. Please try again later." });
    }
});

export default router;
