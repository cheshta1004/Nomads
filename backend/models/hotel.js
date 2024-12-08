import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, 
  propertyClass:{type:Number,default:0}
});

export default mongoose.model('Hotel', hotelSchema);