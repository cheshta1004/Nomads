
import hotel from '../models/hotel.js';
import Hotel from '../models/hotel.js';

export const getHotelsByLocation = async (req, res) => {
  const { city } = req.query;

  try {
    const hotels = await Hotel.find({ city: new RegExp(`^${city}$`, 'i') }); 
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getHotelsById=async(req,res)=>{
  const {hotelId}=req.params;
  try{
    const hotelRecord=await hotel.findById(hotelId);
    if (!hotelRecord) {
      return res.status(404).json({ error: "Hotel not found." });
    }
    res.json({  hotelRecord });
  }catch(error){
    console.error("Error retrieving hotel:", error.message);
        res.status(500).json({ error: "Server error." });
  }
}