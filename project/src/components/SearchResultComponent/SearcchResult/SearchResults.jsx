import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BestResult from '../BestResultComponent/BestResult'
import Tracks from '../TracksComponent/Tracks'
import Artists from '../ArtistsComponent/Artists'
import Albums from '../AlbumsComponent/Albums'
import Playlists from '../PlaylistsComponent/Playlists'
import './SearchResults.css'
import axios from 'axios';

function SearchResults({searchResult,handePlaying,Playing,currentSong,
  setCurrentSong,playlists,handePlaylists}) {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  // console.log(name);
  return (
    <>{searchResult.bestResult.length>0?
    <div className="search-results">
        <div className="search-results__top">
          <div className="search-results__best">
            <BestResult result={searchResult.bestResult}
                        handePlaying={handePlaying}
                        Playing={Playing}
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong} />
          </div>
          {searchResult.songsResult?
          <div className="search-results__tracks">
            <Tracks result={searchResult.songsResult}
                    handePlaying={handePlaying}
                    Playing={Playing}
                    playlists={playlists}
                    currentSong={currentSong}
                    setCurrentSong={setCurrentSong}
                    handePlaylists={handePlaylists} />
          </div>:<h1>нет треков</h1>}
          
        </div>

        {/* <Artists /> */}

        {searchResult.albumsResult?
         <Albums result={searchResult.albumsResult}/>
         :
         <><h2>Нет таких альбомов</h2></>
         }
       {searchResult.playlistsResult?
       <Playlists result={searchResult.playlistsResult}/>:<><h2>Нет таких плейлистов</h2></>}
        
      </div>

    :<h1>нет результатов</h1>}
      
    </>
  )
}

export default SearchResults