import { useRef } from 'react';
import './SongItem.css';

function SongItem({ song, isExpanded, onToggleExpand, onUpdateSong, onRemoveSong }) {
  const audioInputRef = useRef(null);

  const handleTitleChange = (e) => {
    onUpdateSong({
      ...song,
      title: e.target.value
    });
  };

  const handleFeaturedArtistsChange = (e) => {
    onUpdateSong({
      ...song,
      featuredArtists: e.target.value
    });
  };

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('audio/')) {
      alert('Please upload an audio file');
      return;
    }

    onUpdateSong({
      ...song,
      audioFile: file,
      audioFileName: file.name
    });
  };

  const triggerFileInput = () => {
    audioInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('dragging');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragging');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragging');
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('audio/')) {
        onUpdateSong({
          ...song,
          audioFile: file,
          audioFileName: file.name
        });
      } else {
        alert('Please drop an audio file');
      }
    }
  };

  return (
    <div className={`song-item ${isExpanded ? 'expanded' : ''}`}>
      <div className="song-header" onClick={onToggleExpand}>
        <div className="song-title-preview">
          {song.title ? song.title : 'Untitled Song'}
          {song.featuredArtists && <span className="featured-preview"> (feat. {song.featuredArtists})</span>}
        </div>
        <div className="song-controls">
          <button 
            className="remove-song-btn"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveSong(song.id);
            }}
          >
            &times;
          </button>
          <div className="expand-indicator">{isExpanded ? '▼' : '▶'}</div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="song-details">
          <div className="form-group">
            <label htmlFor={`song-title-${song.id}`}>Song Title</label>
            <input
              type="text"
              id={`song-title-${song.id}`}
              value={song.title}
              onChange={handleTitleChange}
              placeholder="Enter song title"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor={`featured-artists-${song.id}`}>Featured Artists</label>
            <input
              type="text"
              id={`featured-artists-${song.id}`}
              value={song.featuredArtists}
              onChange={handleFeaturedArtistsChange}
              placeholder="Featured artists (optional)"
            />
          </div>
          
          <div className="form-group">
            <label>Song File</label>
            <div 
              className={`audio-upload-area ${song.audioFile ? 'has-file' : ''}`}
              onClick={triggerFileInput}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {song.audioFile ? (
                <div className="audio-file-info">
                  <span className="file-name">{song.audioFileName}</span>
                  <span className="file-size">({(song.audioFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <span className="upload-icon">+</span>
                  <p>Click or drag to upload song file</p>
                  <p className="file-hint">(MP3, WAV, FLAC)</p>
                </div>
              )}
              <input
                type="file"
                ref={audioInputRef}
                accept="audio/*"
                onChange={handleAudioFileChange}
                className="file-input"
              />
            </div>
          </div>
          
          {song.audioFile && (
            <div className="audio-preview">
              <audio controls src={URL.createObjectURL(song.audioFile)}>
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SongItem;