import React, { useState } from 'react';
import '../styles/PlacesList.css';
import paradiseInnImg from '../assets/images/tour-img07.jpg';
import kashmirHeightsImg from '../assets/images/tour-img07.jpg';
import { useNavigate } from 'react-router-dom';
import pic1 from "../assets/images/pic1.jpg";
import pic2 from "../assets/images/pic2.jpg";
import pic3 from "../assets/images/pic3.jpg";
import pic4 from "../assets/images/pic4.jpg";
import pic5 from "../assets/images/pic5.jpg";
import pic6 from "../assets/images/pic6.jpg";
import pic7 from "../assets/images/pic7.jpg";
import pic8 from "../assets/images/pic8.jpg";
import pic9 from "../assets/images/pic9.jpg";
import pic10 from "../assets/images/pic10.jpg";
import pic11 from "../assets/images/pic11.jpeg";
import pic12 from "../assets/images/pic12.jpg";
import pic13 from "../assets/images/pic13.jpg";
import pic14 from "../assets/images/pic14.jpg";
import pic15 from "../assets/images/pic15.jpg";
import pic16 from "../assets/images/pic16.jpg";
import pic17 from "../assets/images/pic17.jpg";
import pic18 from "../assets/images/pic18.jpg";
import pic19 from "../assets/images/pic19.jpg";
import pic20 from "../assets/images/pic20.jpg";
import pic21 from "../assets/images/pic21.jpg";
import pic22 from "../assets/images/pic22.jpg";
import pic23 from "../assets/images/pic23.jpg";
import pic24 from "../assets/images/pic24.jpg";
import pic25 from "../assets/images/pic25.jpg";
import pic26 from "../assets/images/pic26.jpg";
import pic27 from "../assets/images/pic27.jpg";
import pic28 from "../assets/images/pic28.jpg";
import pic29 from "../assets/images/pic29.jpg";
import pic30 from "../assets/images/pic30.jpg";

const PlacesList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const places = [
    {
      city: "Kashmir",
      cafes: [
        { name: "Mountain View Cafe", description: "Enjoy coffee with scenic mountain views.", price: 500, rating: 4.5, image: pic1 },
        { name: "Dal Lake Bistro", description: "A lakeside cafe offering local delicacies.", price: 700, rating: 4.8, image: kashmirHeightsImg }
      ],
      adventures: [
        { name: "Gulmarg Skiing", description: "Experience skiing on the snowy slopes of Gulmarg.", price: 600, rating: 5, image: pic1 },
        { name: "Houseboat Stay", description: "Stay in a traditional houseboat on Dal Lake.", price: 1500, rating: 4.7, image: pic3 }
      ]
    },
  
    {
      city: "Mussorie",
      cafes: [
        { name: "Landour Bakehouse", description: "Popular bakery with scenic views.", price: 550, rating: 4.7, image: pic4 },
        { name: "Cafe Ivy", description: "Charming cafe with a rustic vibe.", price: 700, rating: 4.8, image: pic5 }
      ],
      adventures: [
        { name: "Kempty Falls Adventure", description: "Enjoy a thrilling adventure near the famous Kempty Falls.", price: 1000, rating: 4.2, image: pic6 },
        { name: "Gun Hill Cable Ride", description: "Cable ride offering breathtaking views.", price: 1200, rating: 4.6, image: pic7 }
      ]
    },
   
    {
      city: "Shimla",
      cafes: [
        { name: "Mall Road Cafe", description: "A cozy cafe on the famous Mall Road.", price: 600, rating: 4.6, image: pic8 },
        { name: "Mountain Breeze", description: "Cafe with stunning views of the hills.", price: 650, rating: 4.4, image: pic9 }
      ],
      adventures: [
        { name: "Paragliding in Kufri", description: "An exhilarating paragliding experience.", price: 2500, rating: 5, image: pic10 },
        { name: "Trekking in Mashobra", description: "A guided trek through scenic trails.", price: 1800, rating: 4.3, image: pic11 }
      ]
    },
   
    {
      city: "Ahmedabad",
      cafes: [
        { name: "Heritage Cafe", description: "Modern cafe with a historical touch.", price: 500, rating: 4.5, image: pic12 },
        { name: "Sabarmati Chai House", description: "Charming tea house near Sabarmati Ashram.", price: 350, rating: 4.6, image: pic13  }
      ],
      adventures: [
        { name: "Heritage Walk", description: "Walk through the historic parts of the city.", price: 1000, rating: 4.9, image: pic14  },
        { name: "Riverfront Boating", description: "Enjoy a boat ride on the Sabarmati River.", price: 600, rating: 4.4, image: pic15  }
      ]
    },
    {
      city: "Mumbai",
      cafes: [
        { name: "Colaba Cafe", description: "Trendy cafe near the Gateway of India.", price: 800, rating: 4.8, image: pic16  },
        { name: "Marine Drive Coffee House", description: "Beachfront coffee shop.", price: 750, rating: 4.7, image: pic17 }
      ],
      adventures: [
        { name: "Sailing at Gateway", description: "Experience sailing near the Gateway of India.", price: 2000, rating: 4.8, image: pic18  },
        { name: "Beachside Parasailing", description: "Parasailing at Juhu Beach.", price: 1500, rating: 4.6, image: pic19  }
      ]
    },
    {
      city: "Bali",
      cafes: [
        { name: "Kuta Beach Cafe", description: "Relax with a coffee at Kuta Beach.", price: 1000, rating: 4.9, image: pic20  },
        { name: "Ubud Art Cafe", description: "A cafe surrounded by Bali's art scene.", price: 1200, rating: 4.8, image: pic21  }
      ],
      adventures: [
        { name: "Surfing in Seminyak", description: "Surf the famous waves of Seminyak.", price: 3000, rating: 5, image: pic22 },
        { name: "Bali Jungle Trek", description: "Guided trek through Bali's lush jungles.", price: 2200, rating: 4.6, image: pic23  }
      ]
    },
    {
      city: "London",
      cafes: [
        { name: "Mayfair Espresso", description: "A posh espresso bar in Mayfair.", price: 1200, rating: 4.9, image: pic24  },
        { name: "Kensington Cafe", description: "Charming cafe in Kensington.", price: 1100, rating: 4.7, image: pic25  }
      ],
      adventures: [
        { name: "Thames River Cruise", description: "Cruise along the Thames with city views.", price: 1500, rating: 4.8, image: pic26  },
        { name: "London Eye Experience", description: "View the city from the iconic London Eye.", price: 2500, rating: 4.9, image: pic27  }
      ]
    },
    {
      city: "Hong Kong",
      cafes: [
        { name: "Central Perk", description: "Cafe in the heart of Central.", price: 900, rating: 4.8, image: pic28 },
        { name: "Victoria Harbour Cafe", description: "Stunning views of Victoria Harbour.", price: 1000, rating: 4.9, image: pic29 }
      ],
      adventures: [
        { name: "Victoria Peak Tram", description: "Tram ride to the top of Victoria Peak.", price: 1800, rating: 4.7, image: pic30  },
        { name: "Big Buddha Visit", description: "A trip to the famous Big Buddha.", price: 1600, rating: 4.6, image: pic2  }
      ]
    }
  ];

const filteredPlaces = places.filter(place =>
  place.city.toLowerCase().includes(searchQuery.toLowerCase())
);

const handleBooking = (item) => {
  navigate('/booking', { state: { item } });
};

return (
  <div className="places-list">
    <h2>Explore Cafes & Adventures</h2>
    <input
      type="text"
      placeholder="Search by city..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="search-bar"
    />
    <div className="places-container">
      {filteredPlaces.map((place, index) => (
        <div key={index} className="place-card">
          <h3 className="city-name">{place.city}</h3>
          <div className="place-sections">
            <div className="adventures-section">
              <h4>Adventures</h4>
              {place.adventures.map((adventure, idx) => (
                <div key={idx} className="place-item">
                  <img src={adventure.image} alt={adventure.name} className="place-image" />
                  <div className="place-content">
                    <h4>{adventure.name}</h4>
                    <p>{adventure.description}</p>
                    <p>Price: ₹{adventure.price}</p>
                    <p>Rating: ⭐{adventure.rating}</p>
                    <button className="btn btn-primary" style={{background:"var(--secondary-color)"}} onClick={() => handleBooking(adventure)}>Book Now</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cafes-section">
              <h4>Cafes</h4>
              {place.cafes.map((cafe, idx) => (
                <div key={idx} className="place-item">
                  <img src={cafe.image} alt={cafe.name} className="place-image" />
                  <div className="place-content">
                    <h4>{cafe.name}</h4>
                    <p>{cafe.description}</p>
                    <p>Price: ₹{cafe.price}</p>
                    <p>Rating: ⭐{cafe.rating}</p>
                    <button className="btn btn-primary" style={{background:"var(--secondary-color)"}} onClick={() => handleBooking(cafe)}>Book Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default PlacesList;