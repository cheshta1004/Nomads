import express from 'express';
import Destination from '../models/Destination.js';  
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        
        const destinations = await Destination.find();

        res.json({ destinations });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch destinations' });
    }
});

router.get('/search', async (req, res) => {
    try {
        const city = req.query.city ? new RegExp(req.query.city, 'i') : null;
        const query = {};
        if (city) query.name = city;
        console.log("Constructed Query:", query); 
        const destinations = await Destination.find(query);
        if (destinations.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No destinations found for the given query.",
                data: [],
            });
        }
        res.status(200).json({
            success: true,
            message: "Search successful",
            data: destinations,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error. Unable to perform search.",
        });
    }
});

export default router;  


