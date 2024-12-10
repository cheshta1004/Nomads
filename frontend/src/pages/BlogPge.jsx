import React, { useState } from 'react';
import '../styles/BlogPage.css'; 

const Blog = () => {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ location: '', content: '' });

  const locationsData = [
    {
      name: 'Kashmir',
      description: 'Kashmir is known for its beautiful valleys, lakes, and the majestic Himalayas. It is often called "Paradise on Earth".Kashmir Great Lakes trek is one of the most beautiful treks of India. If there’s a paradise on earth, it is definitely Kashmir. I had an intense urge to experience the beauty of this state since childhood. Against a lot of opposition from my close friends and family, I left for Kashmir alone and joined a group of trekkers in Sonamarg. I was ready to put in all the efforts it takes to capture the purest parts of Kashmir in my eyes. I chose to join a group for a trek to the Great Lakes of Kashmir. These jewelled lakes are hidden from the crowd, between the mountains.',
    },
    {
      name: 'New York',
      description: 'New York City is known as "The Big Apple". It is a global center for business, culture, and fashion.New York City can be a little confusing since there are boroughs and neighborhoods. NYC Is made up of 5 boroughs. Manhattan, Brooklyn, the Bronx, Staten Island, and Queens. But within each borough are loads of great neighborhoods. Here are some of my favorites because they’re full of great restaurants, are charming and are where I’d like to live one day.There is so much to see & do in New York that planning your first trip can be super overwhelming, simply because there is SO much to do and so many neighbourhoods to see.',
    },
    {
      name: 'Paris',
      description: 'Paris, the capital of France, is famous for its rich history, art, and landmarks such as the Eiffel Tower and the Louvre.The first leg of our Europe trip began in Paris, France. During this trip, we spent most of the duration in Paris. For four days, we managed to see many famous spots and eateries! From the Eiffel Tower to Notre Dame, or Versailles and the Louvre, just to name a few, there are extravagant tourist sites to see. Now, with a short amount of time, we’ll show you how you can squeeze everything in just four days, in this city of love and romance. Paris is the place for romantics. Those who envision mornings with flaky croissants and a delicate demitasse of espresso.',
    },
    {
      name: 'London',
      description: 'London, the capital of England, is known for its iconic landmarks like Big Ben, the Tower of London, and Buckingham Palace. Of course while it is free to see many of the famous sights such as Buckingham Palace, Westminster Abbey, the Tower of London and the Houses of Parliament.the iconic ‘Big Ben’ clock tower and Westminster Abbey, site of British monarch coronations. Across the Thames River, the London Eye observation wheel provides panoramic views of the South Bank cultural complex, and the entire city.Tourist Places in London: Big Ben, Tower of London, Tower Bridge, London Eye, Buckingham Palace, Hyde Park, St Paul etc.',
    },
  ];

  // Filter locations based on search input
  const filteredLocations = locationsData.filter((location) =>
    location.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle creating a new blog post
  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.location && newPost.content) {
      setPosts([...posts, newPost]);
      setNewPost({ location: '', content: '' }); // Clear the form
    } else {
      alert('Please provide both location and content');
    }
  };

  return (
    <div className="blog-container">
      {/* Add Blog and Search Section (on the same line, reversed positions) */}
      <div className="top-section">
        <div className="search-container">
          <h1>Blog Locations</h1>
          <input
            type="text"
            placeholder="Search locations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="blog-post-form">
          <h2>Write Your Blog Post</h2>
          <form onSubmit={handlePostSubmit}>
            <input
              type="text"
              placeholder="Location"
              value={newPost.location}
              onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
              className="post-input"
            />
            <textarea
              placeholder="Your post content..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              className="post-textarea"
            />
            <button type="submit" className="post-submit">Submit</button>
          </form>
        </div>
      </div>

      <div className="blog-posts">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="location-box"> {/* Reuse location-box styling for blog posts */}
              <div className="location-name">{post.location}</div>
              <div className="location-description">{post.content}</div>
            </div>
          ))
        ) : (
          <p>No blog posts yet.</p>
        )}
      </div>

      {/* Location Boxes (horizontal layout) */}
      <div className="locations-container">
        {filteredLocations.length > 0 ? (
          filteredLocations.map((location, index) => (
            <div key={index} className="location-box">
              <div className="location-name">{location.name}</div>
              <div className="location-description">{location.description}</div>
            </div>
          ))
        ) : (
          <p>No locations found</p>
        )}
      </div>
    </div>
  );
};

export default Blog;