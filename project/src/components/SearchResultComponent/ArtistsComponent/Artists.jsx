import './Artists.css'
import { artistsData } from '../data/mockData'

function Artists() {
  return (
    <div className="artists">
      <h2>Исполнители</h2>
      <div className="artists__grid">
        {artistsData.map((artist, index) => (
          <div key={index} className="artist-card">
            <div className="artist-card__image-container">
              <img src={artist.image} alt={artist.name} className="artist-card__image" />
            </div>
            <div className="artist-card__info">
              <h3 className="artist-card__name">{artist.name}</h3>
              <p className="artist-card__type">Исполнитель</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Artists