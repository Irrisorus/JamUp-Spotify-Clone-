
import { useState, useRef, useEffect } from "react";
import TrackInfo from "./TrackInfo";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";
import "./Player.css";

function Player({ currentPlaylist,songs, onSongSelect, currentSong, handePlaying, Playing }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(currentSong.id);
  // const [isPlaying, setIsPlaying] = useState(Playing);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5); //!
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);


  const currentTrack = currentSong;

  const [tracks, setTracks] = useState(songs);
  
  console.log(songs);
  
  useEffect(() => {
    setTracks(currentPlaylist.songIds);
  }, [currentPlaylist.songIds]);
  console.log(tracks);
  
  // время в минуты
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // играет?не играет
  const togglePlay = () => {
    handePlaying();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (Playing) {
        // пытаемся воспроизвести play() b  возвращает Promise.
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Playback failed:", error);
          });
        }
      } else {
        audio.pause();
      }
    }
  }, [Playing]);

  //
  const playPreviousTrack = () => {
    let prevIndex;

    // if (isShuffling) {
    //   // рандомный трек
    //   let randomIndex;
    //   do {
    //     randomIndex = Math.floor(Math.random() * tracks.length);
    //   } while (randomIndex === currentTrackIndex && tracks.length > 1);
    //   prevIndex = randomIndex;
    // } else {
    prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    // }
    console.log("----------------------");
    
    console.log(tracks[prevIndex]);
    
    onSongSelect(tracks[prevIndex]); //!
    setCurrentTrackIndex(prevIndex);

    setCurrentTime(0);
    if (Playing) {
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
  };

  // следующий трек
  const playNextTrack = () => {
    let nextIndex;

    if (isShuffling) {
      // рандомный трек
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * tracks.length);
      } while (randomIndex === currentTrackIndex && tracks.length > 1);
      nextIndex = randomIndex;
    } else {
      nextIndex = (currentTrackIndex + 1) % tracks.length;
    }
    onSongSelect(tracks[nextIndex]); //!

    setCurrentTrackIndex(nextIndex);
    setCurrentTime(0);
    if (Playing) {
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
  };

  // режим в разнобой
  const toggleShuffle = () => {
    setIsShuffling(!isShuffling);
  };

  //управление повтором
  const toggleRepeat = () => {
    //режимы потвора
    setRepeatMode((repeatMode + 1) % 3);
  };

  // звук
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    audioRef.current.volume = isMuted ? 0 : newVolume;
  };

  // мут
  const toggleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.volume = !isMuted ? 0 : volume;
  };

  const handleSeek = (e) => {
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const seekPos = (e.clientX - rect.left) / rect.width;
    const seekTime = seekPos * currentTrack.duration;

    setCurrentTime(seekTime);
    audioRef.current.currentTime = seekTime;
  };

  // обновление времени вопсроизведения трека
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleTrackEnd = () => {
      if (repeatMode === 2) {
        // повтор трек
        audio.currentTime = 0;
        audio.play();
      } else if (repeatMode === 1) {
        // следующий трек
        playNextTrack();
      } else if (currentTrackIndex < tracks.length - 1) {
        // без повтора
        playNextTrack();
      } else {
        //конец плейлиста
        handePlaying();
        setCurrentTime(0);
        audio.currentTime = 0;
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleTrackEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleTrackEnd);
    };
  }, [currentTrackIndex, repeatMode, tracks.length]);

  // загрузка нового трека по окончанию прошлого
  useEffect(() => {
    const audio = audioRef.current;
    audio.load();
    if (Playing) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // прекращени авто воспроизведения
          handePlaying();
        });
      }
    }
  }, [currentTrackIndex]);

  //установка звука
  useEffect(() => {
    audioRef.current.volume = volume;
  }, []);

  return (
    <div className="player">
      <audio ref={audioRef} src={currentTrack.audioSrc} preload="metadata" />

      <div className="player-left">
        <TrackInfo
          title={currentTrack.title}
          artist={currentTrack.artist}
          cover={currentTrack.cover}
        />
      </div>

      <div className="player-center">
        <div className="controls-wrapper">
          <Controls
            isPlaying={Playing}
            isShuffling={isShuffling}
            repeatMode={repeatMode}
            onPlay={togglePlay}
            onPrevious={playPreviousTrack}
            onNext={playNextTrack}
            onShuffle={toggleShuffle}
            onRepeat={toggleRepeat}
          />
        </div>

        <div className="progress-wrapper">
          <span className="time-current">{formatTime(currentTime)}</span>
          <ProgressBar
            ref={progressBarRef}
            currentTime={currentTime}
            duration={currentTrack.duration}
            onSeek={handleSeek}
          />
          <span className="time-total">
            {formatTime(currentTrack.duration)}
          </span>
        </div>
      </div>

      <div className="player-right">
        <VolumeControl
          volume={volume}
          isMuted={isMuted}
          onVolumeChange={handleVolumeChange}
          onToggleMute={toggleMute}
        />
      </div>
    </div>
  );
}

export default Player;

