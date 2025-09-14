import { useState, useRef, useEffect } from 'react';
import { Library, Search, Plus, ChevronDown, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PlayerService from '../../services/PlayerService';

import './Sidebar.css';


const playlists = [
  {
    name: 'Любимые треки',
    type: 'Плейлист',
    cover: '/favourites.PNG'
  },
  {
    name: 'Поп-музыка 2024',
    type: 'Плейлист',
    cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80'
  },
  {
    name: 'Рок классика',
    type: 'Плейлист',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80'
  },
  {
    name: 'Для тренировки',
    type: 'Плейлист',
    cover: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=300&q=80'
  },
  {
    name: 'Расслабляющая музыка',
    type: 'Плейлист',
    cover: 'https://images.unsplash.com/photo-1507032336878-13f159192baa?w=300&q=80'
  },
  {
    name: 'Вечеринка',
    type: 'Плейлист',
    cover: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=300&q=80'
  }
];

const apiService = new PlayerService();

function SideBar({handePlaylists,userPlaylists}){

    const navigate = useNavigate();
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Недавно добавленные');
    // const [isResizing, setIsResizing] = useState(false);
    // const [sidebarWidth, setSidebarWidth] = useState(300);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(()=>{
    apiService.getPlaylists(1)//---------------------------------- поменять id
              .then((response)=>{
                 const fetchedData = response.data;
                 const fetchedPlaylist=fetchedData.playlists
             
                 
                 let arr=userPlaylists
                 arr.songIds=fetchedData.userFavouriteSongs
                 handePlaylists([...arr,...fetchedPlaylist]);
                 
              }).catch((error) => {
                console.error("Error fetching playlists:", error);
              });
  },[])
    // const handleMouseDown = (e) => {
    //   setIsResizing(true);
    //   e.preventDefault();
    // };
  
    // useEffect(() => {
    //   const handleMouseMove = (e) => {
    //     if (!isResizing) return;
  
    //     const newWidth = e.clientX;
    //     if (newWidth >= 200 && newWidth <= 500) {
    //       setSidebarWidth(newWidth);
    //     }
    //   };
  
    //   const handleMouseUp = () => {
    //     setIsResizing(false);
    //   };
  
    //   if (isResizing) {
    //     document.addEventListener('mousemove', handleMouseMove);
    //     document.addEventListener('mouseup', handleMouseUp);
    //   }
  
    //   return () => {
    //     document.removeEventListener('mousemove', handleMouseMove);
    //     document.removeEventListener('mouseup', handleMouseUp);
    //   };
    // }, [isResizing]);
  
    // const isCollapsed = sidebarWidth <= 200;
  
    const toggleSearch = () => {
      setIsSearchVisible(!isSearchVisible);
      if (!isSearchVisible) {
     
        setTimeout(() => {
          const input = document.querySelector('.track-list-input');
          if (input) input.focus();
        }, 100);
      }
    };
  
    return (
      <div 
       
        className={`sidebar`}
      
      >
        <div className="sidebar-header">
          <div className="menu-item active">
            <Library size={24} />
            <span>Моя медиатека</span>
          </div>
          
          <div className="menu-item" onClick={toggleSearch}>
            <Search size={24} />
            <span>Поиск</span>
          </div>
  
          <div className={`track-list-container ${!isSearchVisible ? 'hidden' : ''}`}>
            {/* <Search size={20} className="track-list-icon" /> */}
            <input
              type="text"
              className="track-list-input"
              placeholder="Поиск в медиатеке"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
  
          <button className="create-button">
            <Plus size={20} />
            <span>Создать плейлист</span>
          </button>
  
          <div className="select-container">
            <button 
              className="select-button"
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <span>{selectedOption}</span>
              <ChevronDown size={20} />
            </button>
            
            {isSelectOpen && (
              <div className="select-options">
                <div 
                  className="select-option"
                  onClick={() => {
                    setSelectedOption('Недавно добавленные');
                    setIsSelectOpen(false);
                  }}
                >
                  Недавно добавленные
                </div>
                <div 
                  className="select-option"
                  onClick={() => {
                    setSelectedOption('Недавно прослушанные');
                    setIsSelectOpen(false);
                  }}
                >
                  Недавно прослушанные
                </div>
              </div>
            )}
          </div>
        </div>
  
        <div className="playlists">
          <div className="playlists-list">
            {userPlaylists.map((playlist, index) => (//--------------------------изменить userID
              <div key={index} className="playlist-item" onClick={()=>{navigate(`/playlist?userId=${1}&playlistId=${playlist.id}`)}}>
                <div className="playlist-cover">
                  <img src={playlist.cover} alt={playlist.title} />
                  <div className="play-icon">
                    <Play size={16} fill="white" color="white" />
                  </div>
                </div>
                <div className="playlist-info">
                  <div className="playlist-name">{playlist.title}</div>
                  {playlist.type=="playlist"?
                  <div className="playlist-type">Плейлист</div>
                  :
                  <div className="playlist-type">Альбом</div>
                  }
                  
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* <div className="resize-handle" onMouseDown={handleMouseDown} /> */}
      </div>
    );
}

export default SideBar