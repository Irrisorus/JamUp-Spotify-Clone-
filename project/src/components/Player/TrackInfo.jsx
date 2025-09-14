import React from 'react';
import './TrackInfo.css';

function TrackInfo({ title, artist, cover }) {
  return (
    <div className="player-track-info">
      <div className="player-track-cover">
        <img src={cover} alt={`${title} by ${artist}`} />
        <div className="verified-badge">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <circle cx="12" cy="12" r="12" fill="#1DB954" />
            <path d="M10.5 15.5L7 12l1.4-1.4 2.1 2.1 5.1-5.1 1.4 1.4z" fill="white" />
          </svg>
        </div>
      </div>
      <div className="player-track-details">
        <div className="player-track-title">{title}</div>
        <div className="player-track-artist">{artist}</div>
      </div>
    </div>
  );
}

export default TrackInfo;