import React from 'react';
import './Controls.css';
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
function Controls({ isPlaying, isShuffling, repeatMode, onPlay, onPrevious, onNext, onShuffle, onRepeat }) {
  return (
    <div className="player-controls">
      <button 
        className={`control-button shuffle ${isShuffling ? 'active' : ''}`} 
        onClick={onShuffle}
        title="Shuffle"
      >
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path d="M17 2.5L21 6.5 17 10.5V7.5H14.5C12.7 7.5 11.4 8.8 10.5 9.9 9.3 11.4 8 13 5.5 13H3V11H5.5C6.9 11 7.9 9.7 8.7 8.7 10.2 6.8 12.1 5.5 14.5 5.5H17V2.5M3 15H5.5C8 15 9.3 16.6 10.5 18.1 11.4 19.2 12.7 20.5 14.5 20.5H17V17.5L21 21.5 17 25.5V22.5H14.5C12.1 22.5 10.2 21.2 8.7 19.3 7.9 18.3 6.9 17 5.5 17H3V15Z" fill="currentColor" />
        </svg>
      </button>
      
      <button 
        className="control-button previous" 
        onClick={onPrevious}
        title="Previous"
      >
       <MdSkipPrevious size={20}/>
      </button>
      
      <button 
        className="control-button play-pause" 
        onClick={onPlay}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        )}
      </button>
      
      <button 
        className="control-button next" 
        onClick={onNext}
        title="Next"
      >
       <MdSkipNext size={20}/>
      </button>
      
      <button 
        className={`control-button repeat ${repeatMode > 0 ? 'active' : ''} ${repeatMode === 2 ? 'repeat-one' : ''}`} 
        onClick={onRepeat}
        title={repeatMode === 0 ? "Repeat" : repeatMode === 1 ? "Repeat All" : "Repeat One"}
      >
        {repeatMode !== 2 ? (
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M17 17H7v-3l-4 4 4 4v-3h12v-6h-2M7 7h10v3l4-4-4-4v3H5v6h2V7z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M17 17H7v-3l-4 4 4 4v-3h12v-6h-2M7 7h10v3l4-4-4-4v3H5v6h2V7zm5 4v6h-2v-6h2z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default Controls;