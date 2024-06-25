import React, {  useState } from 'react';
import Chatbox from './Chatbox';
import MovieCardList from './MovieCardList';
import ChatRecom from './ChatRecom';
import '../css/home.css';
import SearchComponent from './SearchComponent';

function Home() {
  const [popupMovies, setPopupMovies] = useState([]);
  const [showRecommendedMovies, setShowRecommendedMovies] = useState(false);

  return (
    <div className="home">
      <MovieCardList />
     
      <div className='sback'>
        
         <SearchComponent/>
         
      </div>
      {showRecommendedMovies && (
              <ChatRecom movieTitles = {popupMovies}/>
      )}

      <Chatbox
        setPopupMovies={setPopupMovies}
        setShowRecommendedMovies={setShowRecommendedMovies}
      />

     
      
    </div>
  );
}

export default Home;