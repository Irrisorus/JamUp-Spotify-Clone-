import { FaPlayCircle,FaPauseCircle } from 'react-icons/fa'
import { IoMdAdd } from "react-icons/io";
import './Tracks.css'
import { useState } from 'react';

import PlaylistSelector from '../../NowPlayingComponents/PlaylistSelector/PlaylistSelector';
function Tracks({result,handePlaying,Playing,playlists,currentSong,setCurrentSong,handePlaylists}) {
  console.log(playlists);
  
   const [showPlaylistSelector, setShowPlaylistSelector] = useState(false);
   const togglePlaylistSelector = () => {
    setShowPlaylistSelector(!showPlaylistSelector);
    
  };



   const renderComponent = (track,index) => {
     if (currentSong.title==track.title) {
      if (Playing) {
        return(
          <div key={index} className="track" onClick={handePlaying}>
            <div className="track__left">
              <div className="track__image-container">
                <img src={track.cover} alt={track.title} className="track__image" />
                <div className="track__play-overlay">
                  <FaPauseCircle className="track__play-icon" />
                </div>
              </div>
              <div className="track__info">
                <div className="track__title track__title_active">{track.title}</div>
                <div className="track__artist">{track.artist}</div>
              </div>
            </div>
            <div className="track__duration">{formatTime(track.duration)}</div>
            <div className='add-to-playlist-btn' onClick={togglePlaylistSelector}>
              <IoMdAdd className='add-to-playlist-icon'/>
            </div>
          </div>
        )
      }
      else{
        return(
          <div key={index} className="track" onClick={handePlaying}>
            <div className="track__left">
              <div className="track__image-container">
                <img src={track.cover} alt={track.title} className="track__image" />
                <div className="track__play-overlay">
                  <FaPlayCircle className="track__play-icon" />
                </div>
              </div>
              <div className="track__info">
                <div className="track__title track__title_active">{track.title}</div>
                <div className="track__artist">{track.artist}</div>
              </div>
            </div>
            <div className="track__duration">{formatTime(track.duration)}</div>
            <div className='add-to-playlist-btn' onClick={togglePlaylistSelector}>
              <IoMdAdd className='add-to-playlist-icon'/>
            </div>
          </div>
        )
      }

     }
     else{
      return(
          <div key={index} className="track" onClick={()=>{setCurrentSong(track)}}>
            <div className="track__left">
              <div className="track__image-container">
                <img src={track.cover} alt={track.title} className="track__image" />
                <div className="track__play-overlay">
                  <FaPlayCircle className="track__play-icon" />
                </div>
              </div>
              <div className="track__info">
                <div className="track__title ">{track.title}</div>
                <div className="track__artist">{track.artist}</div>
              </div>
            </div>
            <div className="track__duration">{formatTime(track.duration)}</div>
            <div className='add-to-playlist-btn' onClick={togglePlaylistSelector}>
              <IoMdAdd className='add-to-playlist-icon'/>
            </div>
          </div>
        )
     }
  };

  


   const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };


  return (
    <div className="tracks">
      <h2>Треки</h2>
      <div className="tracks__list">
        {result.map((track, index) => (
          renderComponent(track,index)
        ))}
      </div>
      {showPlaylistSelector && (
        <PlaylistSelector
          chosenSong={currentSong } 
          playlists={playlists} 
          handePlaylists={handePlaylists}
          track={currentSong}
          onClose={() => setShowPlaylistSelector(false)}
        />
      )}
    </div>
  )
}

export default Tracks