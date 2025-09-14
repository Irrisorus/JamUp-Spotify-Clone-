import { useRef } from 'react';
import './AlbumInfo.css';

function AlbumInfo({ albumTitle, onTitleChange, albumCoverPreview, onCoverChange }) {
  const fileInputRef = useRef(null);

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
      if (file.type.startsWith('image/')) {
        const syntheticEvent = { target: { files: [file] } };
        onCoverChange(syntheticEvent);
      } else {
        alert('Please drop an image file for album cover');
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="album-info">
      <div className="album-title-container">
        <label htmlFor="album-title">Album Title</label>
        <input
          type="text"
          id="album-title"
          value={albumTitle}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Enter album title"
          className="album-title-input"
        />
      </div>

      <div className="album-cover-container">
        <label>Album Cover</label>
        <div
          className={`cover-upload-area ${albumCoverPreview ? 'has-preview' : ''}`}
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {albumCoverPreview ? (
            <img src={albumCoverPreview} alt="Album Cover Preview" className="cover-preview" />
          ) : (
            <div className="upload-placeholder">
              <span className="upload-icon">+</span>
              <p>Click or drag to upload album cover</p>
              <p className="file-hint">(JPEG, PNG, WebP)</p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={onCoverChange}
            className="file-input"
          />
        </div>
      </div>
    </div>
  );
}

export default AlbumInfo;