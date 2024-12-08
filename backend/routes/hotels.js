
import express from 'express';
import { getHotelsByLocation,getHotelsById } from '../controllers/hotelController.js'; // Adjust the path as needed

const router = express.Router();

router.get('/', getHotelsByLocation);
router.get('/:hotelId',getHotelsById);

export default router;
