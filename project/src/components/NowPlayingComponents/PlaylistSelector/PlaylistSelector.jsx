import React from 'react';
import { X, Plus, Check } from 'lucide-react';
import { useState,useEffect } from 'react';
import './PlaylistSelector.css';
import PlayerService from '../../../services/PlayerService';
const PlaylistSelector = ({ chosenSong,playlists,handePlaylists,track, onClose }) => {
 
  
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [playlistsWithEditPermition,setPlaylistsWithEditPermition]=useState(playlists)
  const [addedSuccess, setAddedSuccess] = useState(false);

  
  const apiService= new PlayerService()
  let user={//-------------edit user
        id:1,
        username:"testUser",
        password:"123456789Aa!",
        email:"kitsunyaroslav@gmail.com",
        likedSongsId:[1,2,3],
        likedPlaylistsId:[1,2,3,4,5],
        likedAlbumsId:[1,2,3]
  }

  useEffect(()=>{
  
      const reqPlaylistsWithEditPerm=playlists.filter((playlist)=>{
          return playlist.artist.toLowerCase()==user.username.toLowerCase()// --------edit user
      })
      setPlaylistsWithEditPermition(reqPlaylistsWithEditPerm)
      const reqPlaylists=reqPlaylistsWithEditPerm.filter((playlist)=>{
          return playlist.songIds.includes(chosenSong.id)
      })   
      const ids = reqPlaylists.map(obj=> obj.id)
      // console.log(ids);
      setSelectedPlaylists(ids)
      console.log(selectedPlaylists);
      
    
      
      
  },[])
 
  function changePlaylist(song,selectedPlaylists,otherPlaylists,userId) {
    apiService.changeSongsInUserPlaylists({song,selectedPlaylists,otherPlaylists,userId})
              .then((responce)=>{
                let fetchedData=responce.data
                console.log(fetchedData);
                console.log(playlists);
                console.log(typeof handePlaylists);
                
                handePlaylists([playlists[0],...fetchedData]);
                
              })
              .catch((error) => {
                console.error("Error fetching songs:", error);
              })
    
  }

  const togglePlaylist = (playlistId) => {
    if (selectedPlaylists.includes(playlistId)) {
      setSelectedPlaylists(selectedPlaylists.filter(id => id !== playlistId));
    } else {
      setSelectedPlaylists([...selectedPlaylists, playlistId]);
    }
  };
  
  const handleAddToPlaylists = (song,playlist,userId) => {
    
   
    // edit lower
    const otherIds=playlistsWithEditPermition.filter((obj)=>!playlist.includes(obj.id))
    console.log(playlist);
    
    console.log(otherIds);
    
        changePlaylist(song,playlist,otherIds,userId)

   
      setAddedSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    
  };
  
  return (
    <div className="playlist-selector-overlay">
      <div className="playlist-selector">
        <button className="close-button" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="selector-header">
          <h2>Add to playlist</h2>
          <p className="track-name">{track.title} • {track.artist}</p>
        </div>
        
        {addedSuccess ? (
          <div className="success-message">
            <Check size={40} color="#1DB954" />
            <p>Added to playlists!</p>
          </div>
        ) : (
          <>
            <div className="playlists-container">
              {playlistsWithEditPermition.map(playlist => (
                <div 
                  key={playlist.id} 
                  className={`playlist-item ${selectedPlaylists.includes(playlist.id) ? 'selected' : ''}`}
                  onClick={() => togglePlaylist(playlist.id)}
                >
                  {playlist.id==0?
                  <div className="playlist-info">
                    <span className="playlist-name">{playlist.title}</span>
                    <span className="playlist-count">{12} Songs</span>
                  </div>
                  :
                  <div className="playlist-info">
                    <span className="playlist-name">{playlist.title}</span>
                    <span className="playlist-count">{playlist.songIds.length} Songs</span>
                  </div>
                  }
                  
                  <div className="selection-indicator">
                    {selectedPlaylists.includes(playlist.id) ? (
                      <Check size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="action-footer">
              <button 
                className="add-button" 
                // disabled={selectedPlaylists.length === 0}//----------edit снизу
                onClick={()=>{handleAddToPlaylists(chosenSong,selectedPlaylists,user.id)}}
              >
                {/* Add to {selectedPlaylists.length} playlist{selectedPlaylists.length !== 1 ? 's' : ''} */}
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlaylistSelector;