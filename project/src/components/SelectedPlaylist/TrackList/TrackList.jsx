import React from 'react'
import './TrackList.css'
import TrackItem from '../TrackItem/TrackItem'

function TrackList({ handlePlayerSongs,tracks, currentTrackId, isPlaying, onPlayTrack }) {
  return (
    <div className="tracklist-container">
      <table className="tracklist">
        <thead>
          <tr>
            <th className="track-number">#</th>
            <th className="track-title">Название</th>
            <th className="track-album">Альбом</th>
            <th className="track-date">Дата добавления</th>
            <th className="track-duration">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 3.5v5l3 2M8 1C4.14 1 1 4.14 1 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <TrackItem 
              
              key={track.id}
              track={track}
              index={index + 1}
              isPlaying={isPlaying && currentTrackId === track.id}
              isActive={currentTrackId === track.id}
              onPlay={() => {onPlayTrack(track.id)
                            handlePlayerSongs()
              } }
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TrackList