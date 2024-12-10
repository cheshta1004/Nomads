import mongoose from 'mongoose';
import CafeAndAdv from './models/CafeAdv.js'; 

const seedCafeAdv = async () => {
  await mongoose.connect('mongodb+srv://cheshtakharbanda27:cheshta1A@signupdb.1m9ou.mongodb.net/?retryWrites=true&w=majority&appName=signupDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Array of city data
  const CafeAdv = [
    {
      city: 'Paris',
      cafes: [
        {
          name: 'Café de Flore',
          description: 'Historic cafe serving coffee and French pastries.',
          price: 2500,
          image: 'https://images.pexels.com/photos/9789495/pexels-photo-9789495.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
      ],
      adventures: [
        {
          name: 'Eiffel Tower Visit',
          description: 'Explore the iconic Eiffel Tower with guided tours.',
          price: 500,
          image: 'https://images.pexels.com/photos/25559827/pexels-photo-25559827/free-photo-of-eiffel-tower-in-paris.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
      ],
    },
    {
      city: 'New York City',
      cafes: [
        {
          name: 'Blue Bottle Coffee',
          description: 'Trendy coffee shop known for its freshly brewed coffee.',
          price: 1000,
          image: 'https://images.pexels.com/photos/8979148/pexels-photo-8979148.jpeg?auto=compress&cs=tinysrgb&w=600',
        },
      ],
      adventures: [
        {
          name: 'Statue of Liberty Tour',
          description: 'Guided boat tours to the Statue of Liberty.',
          price: 3000,
          image: 'https://images.pexels.com/photos/13937499/pexels-photo-13937499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        },
      ],
    },
    // Add similar objects for other cities with their cafes and adventures
    {
        city: 'Tokyo',
        cafes: [
          {
            name: 'Shibuya Coffee',
            description: 'Modern cafe offering a mix of Japanese and Western drinks.',
            price: 1200,
            image: 'https://images.pexels.com/photos/11264123/pexels-photo-11264123.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Mount Fuji Tour',
            description: 'Visit Japan’s iconic mountain and surrounding trails.',
            price: 600,
            image: 'https://images.pexels.com/photos/28496657/pexels-photo-28496657/free-photo-of-majestic-fuji-view-from-chureito-pagoda.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Dubai',
        cafes: [
          {
            name: 'The Arabian Tea House',
            description: 'Traditional Emirati cafe with a variety of teas and snacks.',
            price: 1800,
            image: 'https://images.pexels.com/photos/28406952/pexels-photo-28406952/free-photo-of-historic-mosque-entrance-in-shindagha-dubai.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Desert Safari',
            description: 'Experience the beauty of the desert with dune bashing and camel rides.',
            price: 7000,
            image: 'https://images.pexels.com/photos/10794644/pexels-photo-10794644.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Rome',
        cafes: [
          {
            name: 'Sant’Eustachio Il Caffè',
            description: 'Renowned for its expertly brewed Italian coffee.',
            price: 1500,
            image: 'https://images.pexels.com/photos/3342739/pexels-photo-3342739.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Colosseum Tour',
            description: 'Walk through the ancient ruins of the Roman Empire.',
            price: 4000,
            image: 'https://images.pexels.com/photos/4624570/pexels-photo-4624570.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'London',
        cafes: [
          {
            name: 'The Attendant',
            description: 'Quirky cafe built in a former Victorian restroom.',
            price: 2000,
            image: 'https://images.pexels.com/photos/12810639/pexels-photo-12810639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
        ],
        adventures: [
          {
            name: 'London Eye Experience',
            description: 'Enjoy panoramic views of the city from the famous Ferris wheel.',
            price: 3500,
            image: 'https://images.pexels.com/photos/2934283/pexels-photo-2934283.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Kashmir',
        cafes: [
          {
            name: 'Chai Jaai',
            description: 'A cozy cafe offering authentic Kashmiri tea and snacks.',
            price: 800,
            image: 'https://images.pexels.com/photos/16852712/pexels-photo-16852712/free-photo-of-person-pouring-coffee.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Dal Lake Shikara Ride',
            description: 'Peaceful boat rides on the stunning Dal Lake.',
            price: 2000,
            image: 'https://images.pexels.com/photos/26110235/pexels-photo-26110235/free-photo-of-man-on-boat-on-dal-lake-in-india.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Shimla',
        cafes: [
          {
            name: 'Cafe Simla Times',
            description: 'Rustic cafe offering views of the mountains and delicious food.',
            price: 1200,
            image: 'https://images.pexels.com/photos/16113014/pexels-photo-16113014/free-photo-of-a-sign-that-says-you-to-live-in-front-of-a-black-and-white-wall.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Jakhu Temple Trek',
            description: 'Hike to the temple with panoramic views of the city.',
            price: 1500,
            image: 'https://images.pexels.com/photos/27941934/pexels-photo-27941934/free-photo-of-ancient-city-bangkok.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Bali',
        cafes: [
          {
            name: 'Sisterfields',
            description: 'Trendy spot serving Australian-style brunch.',
            price: 2000,
            image: 'https://images.pexels.com/photos/6762493/pexels-photo-6762493.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Ubud Monkey Forest',
            description: 'Walk through a sanctuary filled with playful monkeys.',
            price: 2500,
            image: 'https://images.pexels.com/photos/5769312/pexels-photo-5769312.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Bangkok',
        cafes: [
          {
            name: 'After You Dessert Cafe',
            description: 'Famous for its Thai-inspired desserts and drinks.',
            price: 1500,
            image: 'https://images.pexels.com/photos/19202781/pexels-photo-19202781/free-photo-of-cake-with-fruits-on-plate.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Grand Palace Visit',
            description: 'Explore the majestic Grand Palace and its ornate architecture.',
            price: 3500,
            image: 'https://images.pexels.com/photos/20843357/pexels-photo-20843357/free-photo-of-ceiling-in-dolmabahce-palace-in-istanbul-turkey.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Phuket',
        cafes: [
          {
            name: 'Gallery Cafe',
            description: 'Charming cafe with art displays and amazing coffee.',
            price: 1000,
            image: 'https://images.pexels.com/photos/3024995/pexels-photo-3024995.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Island Hopping',
            description: 'Visit stunning islands like Phi Phi and James Bond Island.',
            price: 5000,
            image: 'https://images.pexels.com/photos/2867731/pexels-photo-2867731.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Delhi',
        cafes: [
          {
            name: 'Indian Coffee House',
            description: 'Classic spot for coffee and Indian snacks.',
            price: 800,
            image: 'https://images.pexels.com/photos/27287003/pexels-photo-27287003/free-photo-of-a-plate-of-food-with-a-drink-on-it.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Red Fort Exploration',
            description: 'Walk through one of the most famous Mughal-era structures.',
            price: 1000,
            image: 'https://images.pexels.com/photos/14864101/pexels-photo-14864101.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Mumbai',
        cafes: [
          {
            name: 'Leopold Cafe',
            description: 'Iconic cafe known for its rich history and vibrant atmosphere.',
            price: 1500,
            image: 'https://images.pexels.com/photos/9789495/pexels-photo-9789495.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Gateway of India Boat Ride',
            description: 'Enjoy a scenic boat ride with views of the Taj Hotel and Arabian Sea.',
            price: 2500,
            image: 'https://images.pexels.com/photos/28762051/pexels-photo-28762051/free-photo-of-majestic-entrance-of-the-taj-mahal-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Ahmedabad',
        cafes: [
          {
            name: 'Zen Cafe',
            description: 'A serene spot known for its coffee and artistic vibe.',
            price: 1000,
            image: 'https://images.pexels.com/photos/4552130/pexels-photo-4552130.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Sabarmati Ashram Tour',
            description: 'Explore the life and legacy of Mahatma Gandhi.',
            price: 500,
            image: 'https://images.pexels.com/photos/18347328/pexels-photo-18347328/free-photo-of-lake-in-front-of-the-central-secretariat-at-the-raisina-hill.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Varanasi',
        cafes: [
          {
            name: 'Brown Bread Bakery',
            description: 'Popular organic bakery with a rooftop view of the Ganges.',
            price: 800,
            image: 'https://images.pexels.com/photos/3256810/pexels-photo-3256810.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Ganga Aarti Experience',
            description: 'Witness the mesmerizing evening prayer ceremony on the ghats.',
            price: 1500,
            image: 'https://images.pexels.com/photos/27937923/pexels-photo-27937923/free-photo-of-awakening-your-spirits.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Sylhet',
        cafes: [
          {
            name: 'Panshi Restaurant',
            description: 'A local favorite offering authentic Sylheti cuisine.',
            price: 1200,
            image: 'https://images.pexels.com/photos/2067564/pexels-photo-2067564.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
        ],
        adventures: [
          {
            name: 'Tea Garden Walk',
            description: 'Stroll through the lush tea gardens of Sylhet.',
            price: 1000,
            image: 'https://images.pexels.com/photos/6876715/pexels-photo-6876715.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Chittagong',
        cafes: [
          {
            name: 'Heritage Cafe',
            description: 'Charming cafe with a mix of modern and traditional flavors.',
            price: 1000,
            image: 'https://images.pexels.com/photos/16015394/pexels-photo-16015394/free-photo-of-a-red-and-white-trolley-sitting-in-front-of-a-building.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Patenga Beach Adventure',
            description: 'Relax at the beach or enjoy a camel ride along the shore.',
            price: 1500,
            image: 'https://images.pexels.com/photos/19977694/pexels-photo-19977694/free-photo-of-haystack-rock-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Mussorie',
        cafes: [
          {
            name: 'Cafe Ivy',
            description: 'Cozy cafe offering Himalayan views and tasty snacks.',
            price: 1200,
            image: 'https://images.pexels.com/photos/9789495/pexels-photo-9789495.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Camel’s Back Road Trek',
            description: 'Scenic trek with stunning views of the surrounding hills.',
            price: 1000,
            image: 'https://images.pexels.com/photos/5700399/pexels-photo-5700399.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Pune',
        cafes: [
          {
            name: 'Vohuman Cafe',
            description: 'Legendary cafe known for its chai and cheese omelets.',
            price: 800,
            image: 'https://images.pexels.com/photos/5559657/pexels-photo-5559657.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Sinhagad Fort Trek',
            description: 'Trek up to this historic fort for breathtaking views.',
            price: 1000,
            image: 'https://images.pexels.com/photos/4306174/pexels-photo-4306174.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
      {
        city: 'Hong Kong',
        cafes: [
          {
            name: 'Cafe Deadend',
            description: 'Hidden gem serving unique coffee blends and baked goods.',
            price: 1500,
            image: 'https://images.pexels.com/photos/8753146/pexels-photo-8753146.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
        adventures: [
          {
            name: 'Victoria Peak',
            description: 'Enjoy a tram ride to the peak for stunning city views.',
            price: 2000,
            image: 'https://images.pexels.com/photos/3038813/pexels-photo-3038813.jpeg?auto=compress&cs=tinysrgb&w=600',
          },
        ],
      },
  ];

  try {
    await CafeAndAdv.deleteMany(); 
    await CafeAndAdv.insertMany(CafeAdv); 
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close(); 
  }
};

seedCafeAdv();