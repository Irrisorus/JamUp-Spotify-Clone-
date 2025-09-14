import { FaPlayCircle } from 'react-icons/fa'
import './Playlists.css'
import { playlistsData } from '../data/mockData'
import { useNavigate} from 'react-router-dom';
function Playlists({result}) {
   const navigate = useNavigate();
  return (
    <div className="playlists-result">
      <h2>Плейлисты</h2>
      <div className="playlists__grid">
        {result.map((playlist, index) => (
          <div key={index} className="playlist-card"  onClick={()=>{navigate(`/playlist?id=${playlist.id}`)}}>
            <div className="playlist-card__image-container">
              <img src={playlist.cover} alt={playlist.title} className="playlist-card__image" />
              <div className="playlist-card__overlay">
                <FaPlayCircle className="playlist-card__play" />
              </div>
            </div>
            <div className="playlist-card__info">
              <h3 className="playlist-card__title">{playlist.title}</h3>
              <p className="playlist-card__creator">{playlist.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Playlists