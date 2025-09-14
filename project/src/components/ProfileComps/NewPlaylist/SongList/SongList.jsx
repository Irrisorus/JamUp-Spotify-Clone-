import { useState } from 'react';
import SongItem from '../SongItem/SongItem';
import './SongList.css';

function SongList({ songs, onAddSong, onUpdateSong, onRemoveSong }) {
  const [expandedSongId, setExpandedSongId] = useState(null);

  const handleToggleExpand = (songId) => {
    setExpandedSongId(expandedSongId === songId ? null : songId);
  };

  return (
    <div className="song-list-container">
      <div className="song-list-header">
        <h2>Songs in Album</h2>
        <button className="add-song-btn" onClick={onAddSong}>
          Add Song
        </button>
      </div>

      {songs.length === 0 ? (
        <div className="empty-songs-message">
          <p>No songs added yet. Click "Add Song" to get started.</p>
        </div>
      ) : (
        <div className="song-list">
          {songs.map((song) => (
            <SongItem
              key={song.id}
              song={song}
              isExpanded={expandedSongId === song.id}
              onToggleExpand={() => handleToggleExpand(song.id)}
              onUpdateSong={onUpdateSong}
              onRemoveSong={onRemoveSong}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SongList;