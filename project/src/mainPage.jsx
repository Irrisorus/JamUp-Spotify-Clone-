import Header from "./components/header/header";
import SideBar from "./components/SideBar/SideBar";
import SearchResults from "./components/SearchResultComponent/SearcchResult/SearchResults";
import HomePage from "./components/homePage/HomePage";
import SelectedPlaylist from "./components/SelectedPlaylist/SelectedPlaylistPage/SelectedPlaylistPage";
import NowPlayingSection from "./components/NowPlayingComponents/NowPlayingSection/NowPlayingSection";
import Player from "./components/Player/Player";
import PlayerService from "./services/PlayerService";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";


const apiService = new PlayerService();

function MainPage() {
  const [currentSong, setCurrentSong] = useState({
    id: 3,
    title: "Black Dog",
    artist: "Samurai",
    album: "Black Dog - Editional",
    cover: "https://zf.muzyet.com/images/cover/samurai/samurai-black-dog.jpg",
    audioSrc: "/music/Samurai Black Dog.mp3",
    duration: 264,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);
  const [currentPlaylist,setCurrentPlaylist]=useState(
      {
        id: 3,
        title: 'trap',
        author: 'CAQR',
        cover: 'https://zf.muzyet.com/images/cover/samurai/samurai-black-dog.jpg',
        songIds: [ 1, 2 ],
        type: 'playlist'
      })
  const [userPlaylists,setPlaylists]=useState([{
    id:0,
    title: 'Любимые треки',
    type: 'playlist',
    cover: '/favourites.PNG',
    songIds:[],
    artist:"testUser"//-----------------------edit artist
    // collection:true
  }])
  const [searchResult,setSearchResult]=useState({
      bestResult:{
        id: 3,
        title: 'trap',
        author: 'CAQR',
        cover: 'https://zf.muzyet.com/images/cover/samurai/samurai-black-dog.jpg',
        songIds: [ 1, 2 ],
        type: 'playlist'
      },
      songsResult:(null),
      albumsResult:(null),
      playlistsResult:(null)
  });

console.log(currentPlaylist);

  
  //
  useEffect(() => {
    apiService
      .getSongs()
      .then((response) => {
        const fetchedSongs = response.data;
        console.log(fetchedSongs);
        setSongs(fetchedSongs);

        if (fetchedSongs.length > 0) {
          //   setIsPlaying(false);
          setCurrentSong(fetchedSongs[0]);
          console.log(currentSong);
          //   setIsPlaying(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  }, []);

  // apiService.getTrack(currentSong.id).then((response)=>{
  //   let res=response.data

  //   console.log(res);

  //   currentSong.audioSrc=`/music/${res}`
  // }).catch((err)=>{
  //   console.error("Error:", error);
  // })

  function handleCurrentSong(song) {
    setCurrentSong(song);
    setIsPlaying(true);
  }

  function handeCurrentSearch(obj) {
    setSearchResult(obj)
  }
  function handePlaying() {
    setIsPlaying(!isPlaying);
  }
  function handePlaylists(playlist) {
    setPlaylists(playlist)
  }
  function handleCurrentPlaylist(playlist) {
    setCurrentPlaylist(playlist)
  }

  return (
    <>
      <Header  handeCurrentSearch={handeCurrentSearch}/>
      <main>
        <div className="main-wrapper">
          <SideBar handePlaylists={handePlaylists} userPlaylists={userPlaylists}/>
          <div className="main-container">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/search" element={<SearchResults 
              searchResult={searchResult}
              handePlaying={handePlaying}
              Playing={isPlaying}
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              playlists={userPlaylists}
              handePlaylists={handePlaylists}
              />} />
              <Route
                exact
                path="/playlist"
                element={
                  <SelectedPlaylist
                    currentPlaylist={currentPlaylist}
                    handleCurrentPlaylist={handleCurrentPlaylist}
                    songs={songs}
                    onSongSelect={handleCurrentSong}
                    currentSong={currentSong}
                    handePlaying={handePlaying}
                    Playing={isPlaying}
                    
                  />
                }
              />
            </Routes>
          </div>

          <NowPlayingSection
            handePlaying={handePlaying}
            Playing={isPlaying}
            currentSong={currentSong}
            userPlaylists={userPlaylists}
            handePlaylists={handePlaylists}
          />
        </div>
      </main>
      <Player
        currentPlaylist={currentPlaylist}
        songs={songs}
        onSongSelect={handleCurrentSong}
        currentSong={currentSong}
        handePlaying={handePlaying}
        Playing={isPlaying}
        
      />
    </>
  );
}

export default MainPage;