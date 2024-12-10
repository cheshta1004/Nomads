import express from 'express';
import CafeAndAdv from '../models/CafeAdv.js';  
const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const CafeAdv = await CafeAndAdv.find();
        res.json({ CafeAdv });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch Cafes and Adventure' });
    }
});


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const cafeAdv = await CafeAndAdv.findOne({
            $or: [
                { "cafes._id": id }, // Search in cafes array
                { "adventures._id": id } // Search in adventures array
            ]
        });

        if (!cafeAdv) {
            return res.status(404).json({ message: "Not Found" });
        }

        // Find the exact item in the matched array
        const matchedCafe = cafeAdv.cafes.find(cafe => cafe._id.toString() === id);
        const matchedAdventure = cafeAdv.adventures.find(adv => adv._id.toString() === id);

        const result = matchedCafe || matchedAdventure;

        if (result) {
            console.log(result.name);
            return res.status(200).json({ name: result.name });
        } else {
            return res.status(404).json({ message: "Not Found" });
        }
    } catch (error) {
        console.error("Error fetching cafe or adventure:", error);
        res.status(500).json({ message: "Error fetching details", error });
    }
});


export default router;  


