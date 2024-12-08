import mongoose from 'mongoose';
import Destination from './models/Destination.js'; // Adjust the path as needed

// Sample data to seed into the database
const sampleDestinations = [
    { name: 'Paris', description: 'The city of light, known for its iconic landmarks such as the Eiffel Tower and Louvre Museum.', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFyaXN8ZW58MHx8MHx8fDA%3D' },
    { name: 'New York City', description: 'A bustling metropolis known for the Statue of Liberty, Central Park, and Times Square.', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmV3JTIweW9ya3xlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Tokyo', description: 'The capital of Japan, a city that blends tradition with modern technology.', image: 'https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9reW98ZW58MHx8MHx8fDA%3D' },
    { name: 'Dubai', description: 'A luxurious city in the desert, famous for its modern architecture, shopping, and nightlife.', image: 'https://plus.unsplash.com/premium_photo-1697729914552-368899dc4757?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZHViYWl8ZW58MHx8MHx8fDA%3D' },
    { name: 'Rome', description: 'The Eternal City, with its rich history, ancient ruins, and iconic landmarks like the Colosseum.', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9tZXxlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'London', description: 'The capital of the UK, known for its history, landmarks like the Big Ben, and vibrant culture.', image: 'https://plus.unsplash.com/premium_photo-1682056762907-23d08f913805?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bG9uZG9ufGVufDB8fDB8fHww' },
    { name: 'Kashmir', description: 'A beautiful region in northern India known for its stunning landscapes, lakes, and valleys.', image: 'https://images.unsplash.com/photo-1720593445198-f27b3ca8b4e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGthc2htaXJ8ZW58MHx8MHx8fDA%3D' },
    { name: 'Shimla', description: 'A hill station in India, known for its colonial architecture, pleasant climate, and scenic views.', image: 'https://images.unsplash.com/photo-1586881141091-1014c7c2cb79?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hpbWxhfGVufDB8fDB8fHww' },
    { name: 'Mussorie', description: 'A popular hill station near Dehradun, famous for its views of the Himalayan range and vibrant markets.', image: 'https://images.unsplash.com/photo-1655916312035-3e72cecef11b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bXVzc29yaWV8ZW58MHx8MHx8fDA%3D' },
    { name: 'Varanasi', description: 'An ancient city on the banks of the Ganges, known for its ghats, temples, and spiritual significance.', image: 'https://images.unsplash.com/photo-1665413791167-6718dcf36773?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8a2FzaGl8ZW58MHx8MHx8fDA%3D' },
    { name: 'Ahmedabad', description: 'A major city in India known for its rich history, culture, and textiles, including the Sabarmati Ashram.', image: 'https://images.unsplash.com/photo-1575994532957-773da2f83eb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y2l0eSUyMHBhbGFjZXxlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Mumbai', description: 'The financial capital of India, known for Bollywood, bustling markets, and iconic landmarks like the Gateway of India.', image: 'https://plus.unsplash.com/premium_photo-1669018130044-1a5c168d20ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8anVodSUyMGJlYWNofGVufDB8fDB8fHww' },
    { name: 'Pune', description: 'A cultural hub known for its educational institutions, vibrant nightlife, and historical sites.', image: 'https://images.unsplash.com/photo-1567260905670-b11760f6a11a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHVuZXxlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Bali', description: 'An Indonesian island paradise known for its beaches, temples, rice terraces, and vibrant culture.', image: 'https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Hong Kong', description: 'A vibrant city known for its skyline, shopping, and unique fusion of Eastern and Western cultures.', image: 'https://plus.unsplash.com/premium_photo-1720442410336-e02bdf318c9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9uZ2tvbmd8ZW58MHx8MHx8fDA%3D' },
    { name: 'Bangkok', description: 'Thailand’s capital city, known for its lively street life, temples, and grand palaces.', image: 'https://plus.unsplash.com/premium_photo-1661963188068-1bac46e28727?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFuZ2tva3xlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Phuket', description: 'A tropical island in Thailand famous for its beautiful beaches, nightlife, and water activities.', image: 'https://images.unsplash.com/photo-1597246217838-bfc44d6ac746?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGh1a2V0fGVufDB8fDB8fHww' },
    { name: 'Sylhet', description: 'A picturesque region in Bangladesh known for its tea gardens, hills, and lush landscapes.', image: 'https://images.unsplash.com/photo-1686651452430-09d14e313868?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3lsaGV0fGVufDB8fDB8fHww' },
    { name: 'Chittagong', description: 'A port city in Bangladesh, known for its beaches, hills, and vibrant local culture.', image: 'https://images.unsplash.com/photo-1716388781968-e807f87fe910?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFuZ2xhZGVzaHxlbnwwfHwwfHx8MA%3D%3D' },
    {name: 'Delhi',description: 'The capital city of India, Delhi is a vibrant mix of modernity and history, with landmarks like the Red Fort, India Gate, and Qutub Minar.',image: 'https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVsaGl8ZW58MHx8MHx8fDA%3D'  // Replace with an actual image URL
    }
    
];

const seedDestinations = async () => {
    try {
        // Connect to the MongoDB database
        await mongoose.connect("mongodb://127.0.0.1:27017/signupDB", { useNewUrlParser: true, useUnifiedTopology: true });

        console.log('Connected to MongoDB');

        // Clear existing data (optional)
        await Destination.deleteMany();

        // Insert new destinations data
        await Destination.insertMany(sampleDestinations);

        console.log('Destinations seeded successfully');

        // Close the database connection
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding destinations:', err);
    }
};

// Run the seeding function
seedDestinations();

// import mongoose from 'mongoose';
// import Destination from './models/Destination.js'; // Adjust the path as needed

// // Sample data to seed into the database
// const sampleDestinations = [
//     {
//         name: 'Paris',
//         description: 'The city of light, known for its iconic landmarks such as the Eiffel Tower and Louvre Museum.',
//         image: 'https://example.com/images/paris.jpg', // Replace with actual image URL
//     },
//     {
//         name: 'New York City',
//         description: 'A bustling metropolis known for the Statue of Liberty, Central Park, and Times Square.',
//         image: 'https://example.com/images/newyork.jpg',
//     },
//     {
//         name: 'Tokyo',
//         description: 'The capital of Japan, a city that blends tradition with modern technology.',
//         image: 'https://example.com/images/tokyo.jpg',
//     },
//     {
//         name: 'Dubai',
//         description: 'A luxurious city in the desert, famous for its modern architecture, shopping, and nightlife.',
//         image: 'https://example.com/images/dubai.jpg',
//     },
//     {
//         name: 'Rome',
//         description: 'The Eternal City, with its rich history, ancient ruins, and iconic landmarks like the Colosseum.',
//         image: 'https://example.com/images/rome.jpg',
//     },
//     {
//         name: 'London',
//         description: 'The capital of the UK, known for its history, landmarks like the Big Ben, and vibrant culture.',
//         image: 'https://example.com/images/london.jpg',
//     }
// ];

// const seedDestinations = async () => {
//     try {
//         // Connect to the MongoDB database
//         await mongoose.connect("mongodb://127.0.0.1:27017/signupDB", { useNewUrlParser: true, useUnifiedTopology: true });

//         console.log('Connected to MongoDB');

//         // Clear existing data (optional)
//         await Destination.deleteMany();

//         // Insert new destinations data
//         await Destination.insertMany(sampleDestinations);

//         console.log('Destinations seeded successfully');

//         // Close the database connection
//         mongoose.connection.close();
//     } catch (err) {
//         console.error('Error seeding destinations:', err);
//     }
// };

// // Run the seeding function
// seedDestinations();
