import mongoose from 'mongoose';

const cafeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // URL or file reference
});

const adventureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // URL or file reference
});

const CafeAdv = new mongoose.Schema({
  city: { type: String, required: true },
  cafes: [cafeSchema], // Embedded array of cafes
  adventures: [adventureSchema], // Embedded array of adventures
});

const CafeAndAdv = mongoose.model('CafeAndAdv', CafeAdv);

export default CafeAndAdv ;
