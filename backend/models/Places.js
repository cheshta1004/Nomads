
import express from 'express';
import Place from '../models/Places.js'; 

const router = express.Router();

router.get('/places', async (req, res) => {
  try {
    const places = await Place.find(); 
    res.json(places);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching places' });
  }
});

export default router;
