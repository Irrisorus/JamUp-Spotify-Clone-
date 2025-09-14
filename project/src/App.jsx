import { useState, useEffect } from 'react'
// import SideBar from './components/SideBar/SideBar'
// import Header from './components/header/header'
// import HomePage from './components/homePage/HomePage'
// import NowPlayingSection from './components/NowPlayingComponents/NowPlayingSection/NowPlayingSection'
// import SearchResults from './components/SearchResultComponent/SearcchResult/SearchResults'
// import SelectedPlaylist from './components/SelectedPlaylist/SelectedPlaylistPage/SelectedPlaylistPage'
// import Player from './components/Player/Player'
import EmailVerification from './components/authorisationComps/mailValidation/EmailVerification'
import RegistrationForm from './components/authorisationComps/LogInComp/RegistrationForm/RegistrationForm'
import NewAccountForm from './components/authorisationComps/RegisterComp/RegistrationForm/NewAccountForm'
import UserSettings from './components/ProfileComps/UserSettings/UserSettings.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import MainPage from './mainPage.jsx'
import AlbumCreator from './components/ProfileComps/NewPlaylist/AlbumCreator/AlbumCreator.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import axios from "axios";
import './App.css'

function App() {



  return (

    <div className='wrapper'>
      <Router>
        <Routes>
          <Route exact path='/*' element={<MainPage/>}/>
          <Route exact path='/login' element={<RegistrationForm/>}/>
          <Route exact path='/registration' element={<NewAccountForm/>}/>
          <Route exact path='/user' element={<UserSettings/> }/>
          <Route exact path='/varification' element={<EmailVerification/>}/>
          <Route exact path='/:username/newsong' element={<AlbumCreator/>}/>
          <Route exact path='*' element={<NotFound/>}/>
        </Routes>
      </Router>

    
    </div>
  )
}

export default App
