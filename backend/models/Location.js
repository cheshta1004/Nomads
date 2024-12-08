import mongoose from 'mongoose';

const cafeAdventureSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    rating: Number
});

const locationSchema = new mongoose.Schema({
    city: String,
    cafes: [cafeAdventureSchema],
    adventures: [cafeAdventureSchema]
});

const Location = mongoose.model('Location', locationSchema);
export default Location;
