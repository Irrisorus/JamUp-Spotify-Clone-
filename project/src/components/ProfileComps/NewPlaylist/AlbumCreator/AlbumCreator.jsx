import { useState } from 'react';
import './AlbumCreator.css';
import SongList from '../SongList/SongList';
import AlbumInfo from '../AlbumInfo/AlbumInfo';

function AlbumCreator() {
  const [albumTitle, setAlbumTitle] = useState('');
  const [albumCover, setAlbumCover] = useState(null);
  const [songs, setSongs] = useState([]);
  const [albumCoverPreview, setAlbumCoverPreview] = useState('');

  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setAlbumCover(file);
    const previewUrl = URL.createObjectURL(file);
    setAlbumCoverPreview(previewUrl);
  };

  const handleAddSong = () => {
    const newSong = {
      id: Date.now(),
      title: '',
      featuredArtists: '',
      audioFile: null,
      audioFileName: ''
    };
    setSongs([...songs, newSong]);
  };

  const handleUpdateSong = (updatedSong) => {
    setSongs(songs.map(song => song.id === updatedSong.id ? updatedSong : song));
  };

  const handleRemoveSong = (songId) => {
    setSongs(songs.filter(song => song.id !== songId));
  };

  const handleSaveAlbum = () => {
    if (!albumTitle) {
      alert('Please enter an album title');
      return;
    }

    if (!albumCover) {
      alert('Please upload an album cover');
      return;
    }

    if (songs.length === 0) {
      alert('Please add at least one song to the album');
      return;
    }

    const incompleteSongs = songs.filter(song => !song.title || !song.audioFile);
    if (incompleteSongs.length > 0) {
      alert('Please complete all song details before saving');
      return;
    }

    const coverFileName = `${Date.now()}-${albumCover.name}`;
    const coverFilePath = `/album-covers/${coverFileName}`;
    
    //сохранение альбома

    console.log('Album saved:', {
      title: albumTitle,
      coverFile: albumCover,
      coverPath: coverFilePath,
      songs: songs.map(song => ({
        title: song.title,
        featuredArtists: song.featuredArtists,
        audioFile: song.audioFile,
        audioPath: `/songs/${Date.now()}-${song.audioFile.name}`
      }))
    });

    alert('Album saved successfully!');
    setAlbumTitle('');
    setAlbumCover(null);
    setAlbumCoverPreview('');
    setSongs([]);
  };

  return (
    <div className="album-creator">
      <h1>Create New Album</h1>
      
      <AlbumInfo 
        albumTitle={albumTitle}
        onTitleChange={setAlbumTitle}
        albumCoverPreview={albumCoverPreview}
        onCoverChange={handleCoverChange}
      />
      
      <SongList 
        songs={songs}
        onAddSong={handleAddSong}
        onUpdateSong={handleUpdateSong}
        onRemoveSong={handleRemoveSong}
      />
      
      <div className="album-actions">
        <button 
          className="save-album-btn"
          onClick={handleSaveAlbum}
          disabled={songs.length === 0 || !albumTitle || !albumCover}
        >
          Save Album
        </button>
      </div>
    </div>
  );
}

export default AlbumCreator;