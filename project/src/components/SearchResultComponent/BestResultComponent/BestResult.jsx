import { FaPlayCircle,FaPauseCircle } from 'react-icons/fa'

import './BestResult.css'
// import { bestResultData } from '../data/mockData'
import { Pause, Heart } from "lucide-react";
import { useNavigate} from 'react-router-dom';
  
function BestResult({result,handePlaying,Playing,currentSong,setCurrentSong}) {
  // const { image, title, type, creator } = bestResultData
  // console.log(result);
  [result]=result
  const navigate = useNavigate();
  // function handeBestResult() {
  //   if () {
      
  //   }
  // }

  const renderComponent = () => {
    if (result.type=="song") {
      if (currentSong.title==result.title) {
        if(Playing){
          return (
          <div className="best-result__overlay" onClick={handePlaying}>
            <FaPauseCircle className="best-result__play" size={48} />
          </div>
          )
        }

        else{
          return(
          <div className="best-result__overlay" onClick={handePlaying}>
            <FaPlayCircle className="best-result__play" />
          </div>
          )
        }
      }

      else{
        console.log(" - error");
        
        return(
        <div className="best-result__overlay" onClick={()=>{setCurrentSong(result)}}>
          <FaPlayCircle className="best-result__play" />
        </div>
        )
      }
       
    }
    else{
      return(
        <div className="best-result__overlay" onClick={()=>{navigate(`/playlist?id=${result.id}`)}}>
          <FaPlayCircle className="best-result__play" />
        </div>
      )    
    }
};
  return (
    
    <div className="best-result">
      <h2>Лучший результат</h2>
      <div className="best-result__card">
        {renderComponent()}
        {/* {result.type=="song"?
        
        :(currentSong.title==result.title?
        
        <div className="best-result__overlay" >
          <FaPlayCircle className="best-result__play" />
        </div>
        :
        )
        
        } */}
        
        <div className="best-result-cont">
          <div className="best-result__image-container">
            <img src={result.cover} alt={result.title} className="best-result__image" />
          </div>
          <div className="best-result__info">
            <h3 className="best-result__title">{result.title}</h3>
            <div className="best-result__meta">
              <span className="best-result__type">{result.type.toUpperCase()}</span>
                <span className="best-result__dot">•</span>
                <span className="best-result__creator">{result.artist.toUpperCase()}</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default BestResult