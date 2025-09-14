import React from 'react';
import { X, PlusCircle, Music, User } from 'lucide-react';
import './ArtistPopup.css';

const ArtistPopup = ({ track,artist, onClose, onAddToPlaylist }) => {
  return (
    <div className="artist-popup-overlay">
      <div className="artist-popup">
        <button className="close-button" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="popup-header">
          <img 
            src={track.cover} 
            alt={`${track.artist} - ${track.title}`} 
            className="popup-cover"
          />
          <div className="popup-track-info">
            <h2>{track.title}</h2>
            <h3>{track.artist}</h3>
            <p className="popup-album">{track.album}</p>
            
            <button 
              className="add-to-playlist-button"
              onClick={onAddToPlaylist}
            >
              <PlusCircle size={16} />
              <span>Add to playlist</span>
            </button>
          </div>
        </div>
        
        <div className="popup-content">
          <div className="section-title">About the Artist</div>
          <p className="artist-bio">{artist.artistInfo}</p>
          
          <div className="section-title">Details</div>
          <div className="details-section">
            <div className="detail-item">
              <div className="detail-label">
                <User size={16} />
                <span>Main Artist</span>
              </div>
              <div className="detail-value">{track.artist}</div>
            </div>
            
            <div className="detail-item">
              <div className="detail-label">
                <Music size={16} />
                <span>Composer</span>
              </div>
              <div className="detail-value">{artist.composerInfo}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistPopup;