import { useState, useEffect } from 'react'
import PlaylistHeader from '../Header/PlaylistHeader';
import Controls from '../Controls/Controls';
import TrackList from '../TrackList/TrackList';
import PlayerService from '../../../services/PlayerService';
import { useSearchParams } from 'react-router-dom';
import './SelectedPlaylistPage.css'



const apiService = new PlayerService();
function SelectedPlaylist({currentPlaylist,handleCurrentPlaylist,songs, onSongSelect,currentSong, handePlaying, Playing}) {
  // const [isPlaying, setIsPlaying] = useState(Playing)
  const [currentTrackId, setCurrentTrackId] = useState(currentSong.id)
  const [searchParams, setSearchParams] = useSearchParams();
  const [playlistInfo,setPlaylistInfo]=useState({
        id:0,
        title:"Любимые треки", 
        type:"Playlist",
        cover:"/favourites.PNG", 
        owner:"user", 
        trackCount: 0
  })
  const [playlistSongs,setPlaylistSongs]=useState(songs)
  // const [tracks] = useState(songs)
  
  
  // const togglePlay = () => {
  //   handePlaying(!isPlaying)
  // }


  
  useEffect(()=>{
  
    apiService.getSongsForPlaylist(searchParams.get("userId"),searchParams.get("playlistId"))
              .then((response)=>{
                const fetchedPlaylists=response.data
                
                setPlaylistInfo(fetchedPlaylists.playlist)
                setPlaylistSongs(fetchedPlaylists.songs)
              })
              .catch((error) => {
                console.error("Error fetching playlists:", error);
              });
  },[searchParams])

  useEffect(()=>{
  
    apiService.getSongsForPlaylist(searchParams.get("userId"),searchParams.get("playlistId"))
              .then((response)=>{
                const fetchedPlaylists=response.data
                console.log(fetchedPlaylists.user);
                console.log(fetchedPlaylists.playlist);
                console.log(fetchedPlaylists.songs);
                setPlaylistInfo(fetchedPlaylists.playlist)
                setPlaylistSongs(fetchedPlaylists.songs)
              })
              .catch((error) => {
                console.error("Error fetching playlists:", error);
              });
  },[])

  function handlePlayerSongs() {
    if (currentPlaylist.id!=playlistInfo.id) {
      console.log();
      handleCurrentPlaylist({...playlistInfo,playlistSongs})
    }
  }

  const playTrack = (id) => {
     const selectedTrack = songs.find(track => track.id === id);
    if (selectedTrack) {
      onSongSelect(selectedTrack);
      handePlaying()
      
          //  setIsPlaying(true);
    }
  }
  

   useEffect(() => {
    if (currentSong) {
      setCurrentTrackId(currentSong.id);
    }
  }, [currentSong]);

  // useEffect(() => {
  //   setIsPlaying(!isPlaying)
  // }, [Playing]);

  return (
    <div className="selected-playlist-container">
      <div className="playlist-background"></div>
      <div className="playlist-container">
        <PlaylistHeader 
          title={playlistInfo.title} 
          description={playlistInfo.type} 
          owner={playlistInfo.owner}
          cover={playlistInfo.cover} 
          trackCount={playlistInfo.trackCount} 
        />
        <Controls isPlaying={Playing} togglePlay={handePlaying} />
        <TrackList
          handlePlayerSongs={handlePlayerSongs}
          tracks={playlistSongs} 
          currentTrackId={currentTrackId} 
          isPlaying={Playing}
          onPlayTrack={playTrack}
        />
      </div>
    </div>
  )
}

export default SelectedPlaylist