import { FaPlayCircle } from 'react-icons/fa'
import './Albums.css'
import { albumsData } from '../data/mockData'//
import { useNavigate} from 'react-router-dom';

function Albums({result}) {
  const navigate = useNavigate();
 
  
  return (
    <div className="albums">
      <h2>Альбомы</h2>
      <div className="albums__grid">
        {result.map((album, index) => (
          <div key={index} className="album-card" onClick={()=>{navigate(`/playlist?id=${album.id}`)}}>
            <div className="album-card__image-container">
              <img src={album.cover} alt={album.title} className="album-card__image" />
              <div className="album-card__overlay">
                <FaPlayCircle className="album-card__play" />
              </div>
            </div>
            <div className="album-card__info">
              <h3 className="album-card__title">{album.title}</h3>
              <p className="album-card__meta">
                {album.year} • {album.artist}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Albums