import React, { useState } from "react";
import { Play, Pause, Heart } from "lucide-react";
import "./NowPlayingSection.css";
import ArtistPopup from "../ArtistPopup/ArtistPopup";
import PlaylistSelector from "../PlaylistSelector/PlaylistSelector";

const NowPlayingSection = ({ handePlaying, Playing, currentSong, userPlaylists,handePlaylists}) => {
  // const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showArtistPopup, setShowArtistPopup] = useState(false);
  const [showPlaylistSelector, setShowPlaylistSelector] = useState(false);
 
  console.log(currentSong);
  
  // console.log("currentSong");
  // console.log(currentSong);
  const artists = [
    {
      artist: "The Weeknd",
      artistInfo:
        "Abel Makkonen Tesfaye, known professionally as the Weeknd, is a Canadian singer, songwriter, and record producer. He is known for his sonic versatility and dark lyricism.",
      composerInfo:
        "Abel Tesfaye, Ahmad Balshe, Jason Quenneville, Max Martin, Oscar Holter",
    },
    {
      artist: "Dua Lipa",
      artistInfo:
        "Dua Lipa wsedfhsjfhjfhdjlskd dfk;asdfklafkakdjakfghaj klasjfka kfghak djkasj dkasj koaljd ",
      composerInfo: "Label",
    },
    {
      artist: "Иван Дорн",
      artistInfo:
        "Иван Дорн wsedfhsjfhjfhdjlskd dfk;asdfklafkakdjakfghaj klasjfka kfghak djkasj dkasj koaljd ",
      composerInfo: "Барабара",
    },
    {
      artist: "Samurai",
      artistInfo:
        "Samurai wsedfhsjfhjfhdjlskd dfk;asdfklafkakdjakfghaj klasjfka kfghak djkasj dkasj koaljd ",
      composerInfo: "Cuberpunk",
    },
  ];

  function findArtist(name) {
    // console.log(name + " req");
    
    
    console.log(name + "artist name");
    
    let reqArtist = artists.find((el) => el.artist == name);
    // console.log(reqArtist.artistInfo + " --------------- artist");
    // console.log(reqArtist);
    console.log(reqArtist + "result artist");
    
    return reqArtist;
  }

  
  const toggleLike = () => setIsLiked(!isLiked);
  const toggleArtistPopup = () => setShowArtistPopup(!showArtistPopup);
  const togglePlaylistSelector = () => {
    setShowPlaylistSelector(!showPlaylistSelector);
    if (showArtistPopup && !showPlaylistSelector) {
      setShowArtistPopup(false);
    }
  };

  return (
    <div className="now-playing-section">
      <div className="now-playing-header">
        <h2>Сейчас играет</h2>
      </div>

      <div className="now-playing-content">
        <div className="cover-container">
          <img
            src={currentSong.cover}
            alt={`${currentSong.artist} - ${currentSong.title}`}
            className="artist-cover"
          />
          <div className="cover-overlay">
            <button
              className={`play-button ${Playing ? "playing" : ""}`}
              onClick={() => handePlaying()}
            >
              {Playing ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>
        </div>

        <div className="track-info">
          <div className="track-info-container">
            <h3 className="track-title">{currentSong.title}</h3>
            <p className="track-artist">{currentSong.artist}</p>
            <p className="track-album">{currentSong.album}</p>
          </div>

          <button
            className={`like-button ${isLiked ? "liked" : ""}`}
            onClick={toggleLike}
          >
            <Heart size={20} fill={isLiked ? "#1DB954" : "none"} />
          </button>
        </div>

        <div className="artist-description" onClick={toggleArtistPopup}>
          <p>
            {findArtist(currentSong.artist).artistInfo.substring(0, 100)}...
          </p>
          <span className="read-more">Читать далее</span>
        </div>

        <div className="action-buttons">
          <button className="subscribe-button">Подписаться</button>
        </div>
      </div>

      {showArtistPopup && (
        <ArtistPopup
          track={currentSong}
          artist={findArtist(currentSong.artist)}
          onClose={toggleArtistPopup}
          onAddToPlaylist={togglePlaylistSelector}
        />
      )}

      {showPlaylistSelector && (
        <PlaylistSelector
          chosenSong={currentSong}
          playlists={userPlaylists}
          handePlaylists={handePlaylists}
          track={currentSong}
          onClose={() => setShowPlaylistSelector(false)}
        />
      )}
    </div>
  );
};

export default NowPlayingSection;
