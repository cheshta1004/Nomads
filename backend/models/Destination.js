import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },  
});

const Destination = mongoose.model('Destination', destinationSchema);

export default Destination;  
