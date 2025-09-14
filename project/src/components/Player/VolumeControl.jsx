import React, { useRef } from 'react';
import './VolumeControl.css';

function VolumeControl({ volume, isMuted, onVolumeChange, onToggleMute }) {
  const volumeBarRef = useRef(null);
  
  const handleVolumeClick = (e) => {
    const volumeBar = volumeBarRef.current;
    const rect = volumeBar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, ratio));
    
    onVolumeChange(newVolume);
  };
  
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return (
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path d="M12 4L6 10H1v4h5l6 6V4zm7.5 4A4.5 4.5 0 0 1 17 16.76v2.04A6.5 6.5 0 0 0 23 12c0-3.12-2.18-5.73-5.1-6.36l-.4 1.83c2.03.49 3.5 2.28 3.5 4.43zm-4 0c0 1.29-.79 2.4-1.5 2.88v-5.76c.85.62 1.5 1.64 1.5 2.88z" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="23" y1="4" x2="4" y2="23" stroke="currentColor" strokeWidth="2" />
        </svg>
      );
    } else if (volume < 0.5) {
      return (
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path d="M12 4L6 10H1v4h5l6 6V4zm5 8c0-1.29-.79-2.4-1.5-2.88v5.76c.71-.48 1.5-1.59 1.5-2.88z" fill="currentColor" />
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path d="M12 4L6 10H1v4h5l6 6V4zm7.5 4A4.5 4.5 0 0 1 22 12a4.5 4.5 0 0 1-2.5 4v-8zm-4 0c0 1.29-.79 2.4-1.5 2.88v-5.76c.85.62 1.5 1.64 1.5 2.88z" fill="currentColor" />
        </svg>
      );
    }
  };
  
  return (
    <div className="volume-control">
      <button 
        className="volume-button" 
        onClick={onToggleMute}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {getVolumeIcon()}
      </button>
      
      <div 
        className="volume-bar" 
        ref={volumeBarRef}
        onClick={handleVolumeClick}
      >
        <div className="volume-background">
          <div 
            className="volume-foreground" 
            style={{ width: `${isMuted ? 0 : volume * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default VolumeControl;