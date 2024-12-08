import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Hotel from './models/hotel.js'; // Adjust the path as needed

dotenv.config();

const sampleHotels = [
  // Paris
  { name: 'Hotel Parisian Elegance', city: 'Paris', address: '140 Avenue des Champs-Élysées, Paris, France', price: 1500, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 5 },
  { name: 'Eiffel View Suites', city: 'Paris', address: '5 Avenue Anatole France, Paris, France', price: 1750, image: 'https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 4 },
  { name: 'Louvre Luxury Hotel', city: 'Paris', address: 'Rue de Rivoli, Paris, France', price: 1800, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 5 },
  { name: 'Seine Riverside Inn', city: 'Paris', address: '36 Quai des Orfèvres, Paris, France', price: 1620, image: 'https://plus.unsplash.com/premium_photo-1661879252375-7c1db1932572?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 3 },

  // New York City
  { name: 'Manhattan Majesty', city: 'New York City', address: 'New York, NY 10024, USA', price: 1500, image: 'https://plus.unsplash.com/premium_photo-1689609949898-5f7a10649fef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 5 },
  { name: 'Central Park Retreat', city: 'New York City', address: 'New York, NY 10038, USA', price: 8000, image: 'https://plus.unsplash.com/premium_photo-1661875135365-16aab794632f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 4 },
  { name: 'Broadway Boutique Hotel', city: 'New York City', address: 'New York, NY 10005, USA', price: 2000, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 4 },
  { name: 'Hudson River Hotel', city: 'New York City', address: 'New York, NY 10007, USA', price: 1400, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 3 },

  // Tokyo
  { name: 'Tokyo Tower Hotel', city: 'Tokyo', address: 'Tokyo 105-0011', price: 2000, image: 'https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 5 },
  { name: 'Shibuya Stay', city: 'Tokyo', address: 'Shinjuku Gyoen National Garden, Tokyo', price: 1600, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 4 },
  { name: 'Asakusa Serenity', city: 'Tokyo', address: 'Senso-ji Temple, Asakusa, Tokyo', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1689609949898-5f7a10649fef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 3 },
  { name: 'Ginza Grand', city: 'Tokyo', address: 'Tokyo Skytree, Sumida City, Tokyo', price: 1300, image: 'https://plus.unsplash.com/premium_photo-1661875135365-16aab794632f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 5 },

  // Dubai
  { name: 'Burj Khalifa View', city: 'Dubai', address: 'Burj Khalifa, Downtown Dubai, Dubai', price: 1500, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 5 },
  { name: 'Palm Paradise', city: 'Dubai', address: 'The Dubai Mall, Downtown Dubai, Dubai', price: 1500, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 4 },
  { name: 'Desert Dunes Hotel', city: 'Dubai', address: 'Palm Jumeirah, Dubai', price: 1800, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 3 },
  { name: 'Marina Bay Stay', city: 'Dubai', address: 'Dubai Marina, Dubai', price: 1800, image: '.https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 4 },

  //Rome
  { name: 'Colosseum Grand Hotel', city: 'Rome', address: 'Colosseum, Piazza del Colosseo, Rome', price: 1500, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 5 },
{ name: 'Vatican View Hotel', city: 'Rome', address: 'Trevi Fountain, Piazza di Trevi, Rome', price: 1800, image: 'https://plus.unsplash.com/premium_photo-1689609949898-5f7a10649fef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 4 },
{ name: 'Roman Holiday Inn', city: 'Rome', address: 'St. Peter Basilica, Piazza San Pietro, Rome', price: 1400, image: 'https://plus.unsplash.com/premium_photo-1661875135365-16aab794632f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 3 },
{ name: 'Trevi Fountain Suites', city: 'Rome', address: 'Pantheon, Piazza della Rotonda, Rome', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 4 },

//London
{ name: 'Big Ben Luxury Hotel', city: 'London', address: 'Big Ben, Westminster, London', price: 1500, image: 'https://plus.unsplash.com/premium_photo-1689609949898-5f7a10649fef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 5 },
{ name: 'Tower Bridge Suites', city: 'London', address: 'British Museum, Great Russell St, London', price: 1800, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 4 },
{ name: 'Buckingham Palace Inn', city: 'London', address: 'Tower of London, St Katharines & Wapping, London', price: 1300, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 5 },
{ name: 'Thames View Inn', city: 'London', address: 'London Eye, Riverside Building, County Hall, London', price: 1500, image: 'https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 3 },
//Kashmir
{ name: 'Dal Lake Resort', city: 'Kashmir', address: 'Srinagar, Jammu and Kashmir, India', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 4 },
{ name: 'Heaven Valley Retreat', city: 'Kashmir', address: 'Sonmarg, Jammu and Kashmir, India', price: 1800, image: 'https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 5 },
{ name: 'Pahalgam Paradise Hotel', city: 'Kashmir', address: 'Pahalgam, Jammu and Kashmir, India', price: 1300, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 3 },
{ name: 'Shikara Heritage Stay', city: 'Kashmir', address: 'Srinagar, Jammu and Kashmir, India', price: 1400, image: 'https://plus.unsplash.com/premium_photo-1661879252375-7c1db1932572?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 4 },

//Shimla
{ name: 'Hilltop Heights Hotel', city: 'Shimla', address: 'The Ridge, Shimla', price:1500, image: 'https://plus.unsplash.com/premium_photo-1689609949898-5f7a10649fef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 4 },
{ name: 'Snow View Resort', city: 'Shimla', address: 'Mall Road, Kasumpati, Sniwoan, Shimla', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1661875135365-16aab794632f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 5 },
{ name: 'Colonial Comfort Stay', city: 'Shimla', address: 'Jakhoo Temple', price: 1700, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 3 },
{ name: 'Ridge Top Inn', city: 'Shimla', address: 'Kufri, Halog, Shimla ( Rural ), Shimla', price: 1700, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 4 },
//Mussorie
{ name: 'Mountain Bliss Hotel', city: 'Mussorie', address: 'Mall Road, Library Bazaar, Dehradun, Uttarakhand', price: 1300, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 3 },
{ name: 'Himalayan Heights Resort', city: 'Mussorie', address: 'Gun Hill, Mussoorie, Uttarakhand, India', price: 800, image: 'https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 4 },
{ name: 'Cloud’s End Stay', city: 'Mussorie', address: 'Mall Road, Library Bazaar, Dehradun, Uttarakhand', price: 600, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 4 },
{ name: 'Valley View Lodge', city: 'Mussorie', address: 'Gun Hill, Mussoorie, Uttarakhand, India', price: 400, image: 'https://plus.unsplash.com/premium_photo-1661879252375-7c1db1932572?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 3 },
//kashi 
{ name: 'Ganges View Hotel', city: 'Varanasi', address: 'Kashi Vishwanath Temple, Tripura Bhairwi, Varanasi, Sadar, Varanasi, Uttar Pradesh', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1689609949898-5f7a10649fef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 4 },
{ name: 'Spiritual Stay Inn', city: 'Varanasi', address: 'Assi Ghat', price: 1300, image: 'https://plus.unsplash.com/premium_photo-1661875135365-16aab794632f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 3 },
{ name: 'Heritage Ganga Retreat', city: 'Varanasi', address: 'Kashi Vishwanath Temple, Tripura Bhairwi, Varanasi, Sadar, Varanasi, Uttar Pradesh', price: 500, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 4 },
{ name: 'Holy City Resort', city: 'Varanasi', address: 'Assi Ghat', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 5 },
//Ahemdabad
{ name: 'Sabarmati Serenity Hotel', city: 'Ahmedabad', address: 'Sarkhej Roza', price: 1400, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 4 },
{ name: 'Heritage Haveli Inn', city: 'Ahmedabad', address: 'Gandhi Ashram, Sabarmati Riverfront Promenade, Akhbar nagar', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 3 },
{ name: 'Textile City Suites', city: 'Ahmedabad', address: 'Manek Chowk', price: 1600, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 4 },
{ name: 'Gujarat Grande', city: 'Ahmedabad', address: 'Kankaria Lake', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1661879252375-7c1db1932572?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 5 },
//Mumbai
{ name: 'Bollywood Bliss Hotel', city: 'Mumbai', address: 'Gateway of India, Mumbai', price: 1500, image: 'https://plus.unsplash.com/premium_photo-1689609949898-5f7a10649fef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 5 },
{ name: 'Gateway of India Suites', city: 'Mumbai', address: 'Chhatrapati Shivaji Maharaj Terminus, Mumbaia', price: 1800, image: 'https://plus.unsplash.com/premium_photo-1661875135365-16aab794632f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 4 },
{ name: 'Mumbai Marina Inn', city: 'Mumbai', address: 'Marine Drive, Mumbai, Marine Drive, Navjeevan Wadi, A Ward, Zone 1', price: 1200, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 4 },
{ name: 'Financial District Lodge', city: 'Mumbai', address: 'Rajiv Gandhi Sea Link, G/S Ward, Zone 2, Mumbai, Maharashtra, 400030, India', price: 1300, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 5 },
//Pune 
{ name: 'Cultural Retreat Hotel', city: 'Pune', address: 'Shaniwar Wada', price: 1600, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 4 },
{ name: 'Deccan Heritage Inn', city: 'Pune', address: 'Aga Khan Palace ', price: 1400, image: 'https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 3 },
{ name: 'Educational Haven Suites', city: 'Pune', address: 'Sinhagad Fort', price: 800, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 4 },
{ name: 'Peshwa Grande', city: 'Pune', address: 'Pune Railway Station', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1661879252375-7c1db1932572?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 5 },
//Bali
{ name: 'Beachfront Bliss Hotel', city: 'Bali', address: 'Uluwatu Temple', price: 1300, image: 'https://plus.unsplash.com/premium_photo-1689609949898-5f7a10649fef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 5 },
{ name: 'Ubud Jungle Retreat', city: 'Bali', address: 'Tegallalang Rice Terrace', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1661875135365-16aab794632f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 4 },
{ name: 'Rice Terrace Resort', city: 'Bali', address: 'TTanah Loti', price: 1200, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 4 },
{ name: 'Island Paradise Inn', city: 'Bali', address: 'Mount Batur', price: 1500, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 3 },
//Hong Kong 
{ name: 'Skyline Luxury Hotel', city: 'Hong Kong', address: 'Victoria Peak', price: 1500, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 5 },
{ name: 'Fusion City Suites', city: 'Hong Kong', address: 'Tsim Sha Tsui Promenade', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 4 },
{ name: 'Harbour View Inn', city: 'Hong Kong', address: 'Hong Kong Disneyland', price: 1800, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 3 },
{ name: 'Eastern Charm Retreat', city: 'Hong Kong', address: 'Repulse Bay', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1661879252375-7c1db1932572?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 4 },
//bangkok
{ name: 'Grand Palace Hotel', city: 'Bangkok', address: 'Rattanakosin Road, Bangkok, Thailand', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1689609949898-5f7a10649fef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 4 },
{ name: 'Temple View Inn', city: 'Bangkok', address: 'Wat Pho Lane, Bangkok, Thailand', price: 1000, image: 'https://plus.unsplash.com/premium_photo-1661875135365-16aab794632f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 3 },
{ name: 'Lively Street Suites', city: 'Bangkok', address: 'Sukhumvit Avenue, Bangkok, Thailand', price: 1500, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 4 },
{ name: 'City Lights Retreat', city: 'Bangkok', address: 'Chao Phraya Boulevard, Bangkok, Thailand', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 5 },
//Phuket
{ name: 'Beach Paradise Resort', city: 'Phuket', address: 'Patong Beach Road, Phuket, Thailand', price: 1800, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 4 },
{ name: 'Island Serenity Hotel', city: 'Phuket', address: 'Kata Bay Avenue, Phuket, Thailand', price: 1400, image: 'https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 3 },
{ name: 'Tropical Haven Suites', city: 'Phuket', address: 'Kamala Lane, Phuket, Thailand', price: 1200, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 4 },
{ name: 'Lagoon View Retreat', city: 'Phuket', address: 'Nai Harn Road, Phuket, Thailand', price: 1500, image: 'https://plus.unsplash.com/premium_photo-1661879252375-7c1db1932572?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 5 },
//Shylhet
{ name: 'Tea Garden Inn', city: 'Sylhet', address: 'Hazrat Shah Jalal Mazar Sharif', price: 900, image: 'https://plus.unsplash.com/premium_photo-1689609949898-5f7a10649fef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 3 },
{ name: 'Lush Landscape Resort', city: 'Sylhet', address: 'Ali Amjad Clock Towerh', price: 1100, image: 'https://plus.unsplash.com/premium_photo-1661875135365-16aab794632f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 4 },
{ name: 'Hilltop Retreat', city: 'Sylhet', address: 'Ratargul Swamp Forest', price: 1400, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 4 },
{ name: 'Serene Stay Hotel', city: 'Sylhet', address: 'Lawachara National Park', price: 1700, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 5 },
//Chittakong
{ name: 'Port City Hotel', city: 'Chittagong', address: 'Patenga Beach', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 4 },
{ name: 'Beachfront Bliss Inn', city: 'Chittagong', address: 'Foy’s Lakeh', price: 1500, image: 'https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 4 },
{ name: 'Hillside Serenity Suites', city: 'Chittagong', address: 'Kaptai Lake', price: 1800, image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 5 },
{ name: 'Cultural Retreat', city: 'Chittagong', address: 'Chittagong War Cemetery', price: 1000, image: 'https://plus.unsplash.com/premium_photo-1661879252375-7c1db1932572?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww', propertyClass: 3 },
//delhi
{ name: 'Heritage City Inn', city: 'Delhi', address: 'India Gate', price: 1000, image: 'https://plus.unsplash.com/premium_photo-1689609949898-5f7a10649fef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 3 },
{ name: 'Capital Grande Suites', city: 'Delhi', address: 'Lotus Temple', price: 1500, image: 'https://plus.unsplash.com/premium_photo-1661875135365-16aab794632f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 4 },
{ name: 'Luxury Gateway Hotel', city: 'Delhi', address: 'Red Fort', price: 1000, image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGhvdGVsJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D', propertyClass: 5 },
{ name: 'Cultural Retreat Lodge', city: 'Delhi', address: 'Qutub Minar', price: 1200, image: 'https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdGVsfGVufDB8fDB8fHww', propertyClass: 4 },

];

const seedDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/signupDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Hotel.deleteMany(); // Clear existing hotels
    await Hotel.insertMany(sampleHotels); // Insert sample hotels

    console.log("Database seeded with sample hotels!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

seedDB();

