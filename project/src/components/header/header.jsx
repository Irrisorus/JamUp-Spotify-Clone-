import React, { useState,useEffect } from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes,Link} from "react-router-dom";
import PlayerService from '../../services/PlayerService';
import './header.css';

function Header({handeCurrentSearch}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  
  const navigate = useNavigate();

  const apiService = new PlayerService();
  
  useEffect(()=>{
    if(searchQuery){
       navigate(`/search?name=${searchQuery}`)
       console.log(searchQuery);

       apiService
      .getSearchResult(searchQuery)
      .then((response) => {
        const fetchedResult = response.data;
        console.log(fetchedResult);
        handeCurrentSearch(fetchedResult)
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
    }
  },[searchQuery])

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);

    
  };

  return (
    <header className="header">
     
      <div className="header-left">
         <Link to="/">
         <img src="/JamUp logo-white.png" className='search-logo' />
         </Link>
        
      </div>
      

      <div className="header-center">
        <div className="search-container">
          <img src="/search.png" className='search-icon' />
          <input
            type="text"
            className="search-input"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="header-right">
        <div className="auth-buttons">
          <button className="sign-up-button">Sign up</button>
          <button className="login-button">Log in</button>
        </div>
      </div>
    </header>
  );
};

export default Header;