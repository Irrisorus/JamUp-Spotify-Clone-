import React, { useState } from 'react'
import './TrackItem.css'
import { Play } from 'lucide-react'
import { IoIosPause } from "react-icons/io";
function TrackItem({ track, index, isPlaying, isActive, onPlay }) {
  const [isHovered, setIsHovered] = useState(false)
  
  const handleMouseEnter = () => {
    setIsHovered(true)
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    
    
    <tr 
      className={`track-item ${isActive ? 'active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onPlay}
    >
      <td className="track-number">
     
        {isHovered ? (
          <button className="play-track-button">
              {isPlaying  ?  (<IoIosPause size={14}/>):(<Play size={14}/>)}
            
          </button>
        ) : isPlaying ? (
          <div className="playing-icon">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        ) : (
          index
        )}
      </td>
      <td className="playlist-track-title">
        <div className="playlist-track-info">
          <div className="playlist-track-image">
            <img src={track.cover} alt={track.album} />
          </div>
          <div className="track-name-artist">
            <div className="playlist-track-name">
              {track.title}
              {track.explicit && <span className="explicit-badge">E</span>}
            </div>
            <div className="playlist-track-artist">{track.artist}</div>
          </div>
        </div>
      </td>
      <td className="playlist-track-album">{track.album}</td>
      <td className="playlist-track-date">{track.timeAdded}</td>
      <td className="playlist-track-duration">
        {isHovered ? (
          <button className="more-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM9.5 14a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" fill="currentColor"/>
            </svg>
          </button>
        ) : (
          formatTime(track.duration)
        )}
      </td>
    </tr>
  )
}

export default TrackItem