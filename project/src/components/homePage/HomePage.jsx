import React from 'react';
import PlaylistSection from '../PlaylistSection/PlayListSection';
import './HomePage.css'
const featuredPlaylists = [
    {
      id: 1,
      title: "Today's Top Hits",
      description: "The biggest hits right now",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80",
      size: "large"
    },
    {
      id: 2,
      title: "RapCaviar",
      description: "New rap music",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80",
      size: "large"
    },
    {
      id: 3,
      title: "All Out 2010s",
      description: "The biggest songs of the 2010s",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&q=80",
      size: "large"
    },
    {
      id: 3,
      title: "All Out 2010s",
      description: "The biggest songs of the 2010s",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&q=80",
      size: "large"
    }
  ];
  
  const madeForYou = [
    {
      id: 4,
      title: "Daily Mix 1",
      description: "Tailored for your taste",
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&q=80"
    },
    {
      id: 5,
      title: "Daily Mix 2",
      description: "Based on your recent listening",
      image: "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=500&q=80"
    },
    {
      id: 6,
      title: "Discover Weekly",
      description: "Your weekly music discovery",
      image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=500&q=80"
    },
    {
      id: 7,
      title: "Release Radar",
      description: "New releases from artists you follow",
      image: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=500&q=80"
    },
    {
      id: 8,
      title: "Your Time Capsule",
      description: "Songs from your past",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500&q=80"
    }
  ];
  
  const topGenres = [
    {
      id: 9,
      title: "Pop",
      description: "Top pop hits",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&q=80"
    },
    {
      id: 10,
      title: "Hip-Hop",
      description: "Best of hip-hop",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80"
    },
    {
      id: 11,
      title: "Rock",
      description: "Classic and modern rock",
      image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=500&q=80"
    },
    {
      id: 12,
      title: "Electronic",
      description: "Electronic music essentials",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
    }
  ];
  
  const recentlyPlayed = [
    {
      id: 13,
      title: "Your Top 2023",
      description: "Your most played tracks",
      image: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=500&q=80"
    },
    {
      id: 14,
      title: "Liked Songs",
      description: "Your favorite tracks",
      image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=500&q=80"
    },
    {
      id: 15,
      title: "Morning Coffee",
      description: "Peaceful morning playlist",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80"
    },
    {
      id: 16,
      title: "Workout Mix",
      description: "Energy boost for your workout",
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=500&q=80"
    }
  ];
  
  const newReleases = [
    {
      id: 17,
      title: "New Album Releases",
      description: "Fresh music just dropped",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
    },
    {
      id: 18,
      title: "Friday Releases",
      description: "New music this week",
      image: "https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=500&q=80"
    },
    {
      id: 19,
      title: "Global Hits",
      description: "Trending worldwide",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&q=80"
    },
    {
      id: 20,
      title: "Rising Artists",
      description: "Emerging talent",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=500&q=80"
    }
  ];


function HomePage() {
    return (
      
        <div className='home-page-wrapper'>
          <PlaylistSection title="Featured Playlists" items={featuredPlaylists} slidesPerView={3} />
          <PlaylistSection title="Made for You" items={madeForYou} />
          <PlaylistSection title="Your Top Genres" items={topGenres} slidesPerView={4} />
          <PlaylistSection title="Recently Played" items={recentlyPlayed} slidesPerView={5} />
          <PlaylistSection title="New Releases" items={newReleases} />
        </div>
      
    );
  }
  
  export default HomePage;