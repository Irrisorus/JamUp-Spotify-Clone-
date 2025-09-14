import React from 'react'
import './PlaylistHeader.css'

function PlaylistHeader({ title, description, owner,cover, trackCount }) {
  return (
    <div className="playlist-header">
      <div className="playlist-header-cover">
        
          <img className="current-playlist-header-cover" src={cover} alt="" />
        
      </div>
      <div className="playlist-info">
        <span className="playlist-label">{description}</span>
        <h1 className="playlist-header-title">{title}</h1>
        <div className="playlist-meta">
          <div className="user-avatar">
            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" alt={owner} />
          </div>
          <span className="playlist-owner">{owner}</span>
          <span className="playlist-tracks">• {trackCount} треков</span>
        </div>
      </div>
    </div>
  )
}

export default PlaylistHeader