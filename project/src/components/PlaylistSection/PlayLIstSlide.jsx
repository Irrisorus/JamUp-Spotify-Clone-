import React from 'react';
import { Play} from 'lucide-react';
import 'swiper/css';
import "./PlayListSection";

function PlaylistSlide({ image, title, description, size = 'normal' }) {
  return (
    <div className={`playlist-slide ${size}`}>
      <div className="play-icon">
        <Play size={24} />
      </div>
      <img 
        src={image} 
        alt={title} 
        className={`playlist-image ${size === 'large' ? 'large' : ''}`}
      />
      <h3 className="playlist-title">{title}</h3>
      <p className="playlist-description">{description}</p>
    </div>
  );
}

export default PlaylistSlide