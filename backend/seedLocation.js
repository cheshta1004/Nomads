import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Location from './models/Location.js';

dotenv.config();

const sampleLocations = [
  
            {
                city: "Kashmir",
                cafes: [
                    { name: "Mountain View Cafe", description: "Enjoy coffee with scenic mountain views.", price: 500, rating: 4.5 },
                    { name: "Dal Lake Bistro", description: "A lakeside cafe offering local delicacies.", price: 700, rating: 4.8 }
                ],
                adventures: [
                    { name: "Gulmarg Skiing", description: "Experience skiing on the snowy slopes of Gulmarg.", price: 2000, rating: 5 },
                    { name: "Houseboat Stay", description: "Stay in a traditional houseboat on Dal Lake.", price: 1500, rating: 4.7 }
                ]
            },
            // Shimla
            {
                city: "Shimla",
                cafes: [
                    { name: "Mall Road Cafe", description: "A cozy cafe on the famous Mall Road.", price: 600, rating: 4.6 },
                    { name: "Mountain Breeze", description: "Cafe with stunning views of the hills.", price: 650, rating: 4.4 }
                ],
                adventures: [
                    { name: "Paragliding in Kufri", description: "An exhilarating paragliding experience.", price: 2500, rating: 5 },
                    { name: "Trekking in Mashobra", description: "A guided trek through scenic trails.", price: 1800, rating: 4.3 }
                ]
            },
            // Mussorie
            {
                city: "Mussorie",
                cafes: [
                    { name: "Landour Bakehouse", description: "Popular bakery with scenic views.", price: 550, rating: 4.7 },
                    { name: "Cafe Ivy", description: "Charming cafe with a rustic vibe.", price: 700, rating: 4.8 }
                ],
                adventures: [
                    { name: "Kempty Falls Adventure", description: "Enjoy a thrilling adventure near the famous Kempty Falls.", price: 1000, rating: 4.2 },
                    { name: "Gun Hill Cable Ride", description: "Cable ride offering breathtaking views.", price: 1200, rating: 4.6 }
                ]
            },
            // Kashi
            {
                city: "Kashi",
                cafes: [
                    { name: "Assi Ghat Cafe", description: "Enjoy local flavors with views of the Ganges.", price: 400, rating: 4.4 },
                    { name: "Tulsi Tea House", description: "Popular tea house with a peaceful atmosphere.", price: 300, rating: 4.5 }
                ],
                adventures: [
                    { name: "Ganges Boat Ride", description: "Boat ride along the holy river.", price: 800, rating: 4.8 },
                    { name: "Temple Walk Tour", description: "Explore the famous temples in Kashi.", price: 1000, rating: 4.7 }
                ]
            },
            // Ahmedabad
            {
                city: "Ahmedabad",
                cafes: [
                    { name: "Heritage Cafe", description: "Modern cafe with a historical touch.", price: 500, rating: 4.5 },
                    { name: "Sabarmati Chai House", description: "Charming tea house near Sabarmati Ashram.", price: 350, rating: 4.6 }
                ],
                adventures: [
                    { name: "Heritage Walk", description: "Walk through the historic parts of the city.", price: 1000, rating: 4.9 },
                    { name: "Riverfront Boating", description: "Enjoy a boat ride on the Sabarmati River.", price: 600, rating: 4.4 }
                ]
            },
            // Mumbai
            {
                city: "Mumbai",
                cafes: [
                    { name: "Colaba Cafe", description: "Trendy cafe near the Gateway of India.", price: 800, rating: 4.8 },
                    { name: "Marine Drive Coffee House", description: "Beachfront coffee shop.", price: 750, rating: 4.7 }
                ],
                adventures: [
                    { name: "Sailing at Gateway", description: "Experience sailing near the Gateway of India.", price: 2000, rating: 4.8 },
                    { name: "Beachside Parasailing", description: "Parasailing at Juhu Beach.", price: 1500, rating: 4.6 }
                ]
            },
            // Bali
            {
                city: "Bali",
                cafes: [
                    { name: "Kuta Beach Cafe", description: "Relax with a coffee at Kuta Beach.", price: 1000, rating: 4.9 },
                    { name: "Ubud Art Cafe", description: "A cafe surrounded by Bali's art scene.", price: 1200, rating: 4.8 }
                ],
                adventures: [
                    { name: "Surfing in Seminyak", description: "Surf the famous waves of Seminyak.", price: 3000, rating: 5 },
                    { name: "Bali Jungle Trek", description: "Guided trek through Bali's lush jungles.", price: 2200, rating: 4.6 }
                ]
            },
            // London
            {
                city: "London",
                cafes: [
                    { name: "Mayfair Espresso", description: "A posh espresso bar in Mayfair.", price: 1200, rating: 4.9 },
                    { name: "Kensington Cafe", description: "Charming cafe in Kensington.", price: 1100, rating: 4.7 }
                ],
                adventures: [
                    { name: "Thames River Cruise", description: "Cruise along the Thames with city views.", price: 1500, rating: 4.8 },
                    { name: "London Eye Experience", description: "View the city from the iconic London Eye.", price: 2500, rating: 4.9 }
                ]
            },
            // Hong Kong
            {
                city: "Hong Kong",
                cafes: [
                    { name: "Central Perk", description: "Cafe in the heart of Central.", price: 900, rating: 4.8 },
                    { name: "Victoria Harbour Cafe", description: "Stunning views of Victoria Harbour.", price: 1000, rating: 4.9 }
                ],
                adventures: [
                    { name: "Victoria Peak Tram", description: "Tram ride to the top of Victoria Peak.", price: 1800, rating: 4.7 },
                    { name: "Big Buddha Visit", description: "A trip to the famous Big Buddha.", price: 1600, rating: 4.6 }
                ]
            },
            // Paris
            {
                city: "Paris",
                cafes: [
                    { name: "Champs-Élysées Cafe", description: "Elegant cafe on the famous avenue.", price: 1500, rating: 4.9 },
                    { name: "Montmartre Coffee House", description: "Historic cafe in Montmartre.", price: 1400, rating: 4.8 }
                ],
                adventures: [
                    { name: "Eiffel Tower Visit", description: "A trip to the top of the Eiffel Tower.", price: 2000, rating: 5 },
                    { name: "Seine River Cruise", description: "Romantic cruise on the Seine.", price: 1800, rating: 4.8 }
                ]
            },
            // Sylhet
            {
                city: "Sylhet",
                cafes: [
                    { name: "Zindabazar Lounge", description: "Cozy cafe with views of the hills.", price: 500, rating: 4.4 },
                    { name: "Khadimnagar Coffee Spot", description: "Cafe near the scenic Khadimnagar forests.", price: 450, rating: 4.3 }
                ],
                adventures: [
                    { name: "Ratargul Swamp Forest Tour", description: "Guided tour of the swamp forest.", price: 1200, rating: 4.7 },
                    { name: "Bisnakandi Hiking", description: "Hiking trail through Bisnakandi.", price: 1000, rating: 4.5 }
                ]
            },
            // Chittagong
            {
                city: "Chittagong",
                cafes: [
                    { name: "GEC Circle Cafe", description: "Popular cafe at GEC Circle.", price: 600, rating: 4.5 },
                    { name: "Patenga Beachfront Coffee", description: "Cafe near the beach with sea views.", price: 700, rating: 4.6 }
                ],
                adventures: [
                    { name: "Foy's Lake Boating", description: "Enjoy a boat ride at Foy's Lake.", price: 900, rating: 4.5 },
                    { name: "Patenga Beach Jet Ski", description: "Jet skiing adventure at Patenga Beach.", price: 1300, rating: 4.7 }
                ]
            }
        ];
        

const seedDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/abcd", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await Location.deleteMany(); // Clear existing locations
        await Location.insertMany(sampleLocations); // Insert sample locations

        console.log("Database seeded with sample cafes and adventures!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding database:", error);
        mongoose.connection.close();
    }
};

seedDB();
