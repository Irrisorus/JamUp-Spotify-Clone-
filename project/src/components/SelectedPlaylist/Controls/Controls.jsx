import React from 'react'
import './Controls.css'
import { Play } from 'lucide-react'
function Controls({ isPlaying, togglePlay }) {
  return (
    <div className="playlist-controls">
      <button className="play-button" onClick={togglePlay}>
        {isPlaying ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7-11-7z" fill="currentColor"/>
          </svg>
        )}
      </button>
      <div className="view-options">
        <button className="list-view-button">
          Список
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Controls