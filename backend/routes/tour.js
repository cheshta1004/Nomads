import express from "express";
import { createTour, getAllTour, getSingleTour, updateTour , deleteTour, getTourBySearch, getFeaturedTour, getTourCount} from "../controllers/tourController.js";
const router=express.Router();
   
router.post('/',createTour);
router.put('/:id',updateTour);
router.delete('/:id',deleteTour);
router.get('/:id',getSingleTour);
router.get('/',getAllTour);
router.get('/search/getTourBySearch',getTourBySearch);
router.get('/search/getFeaturedTours',getFeaturedTour);
router.get('/search/getTourCount',getTourCount);

export default router;