import express from "express"
import { createbooking, getAllBooking, getBooking}  from "../controllers/bookingController.js";
const router=express.Router();

router.post('/',createbooking);
router.get('/:id',getBooking);
router.get('/',getAllBooking);
export default router