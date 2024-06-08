import React, { useState } from 'react';
import Chatbox from './Chatbox';
import MovieCardList from './MovieCardList';
import Reviews from './Reviews';
import PopupList from './PopupList';
import '../css/home.css';

function Home() {
  const [popupMovies, setPopupMovies] = useState([]);
  const [showRecommendedMovies, setShowRecommendedMovies] = useState(false);

  return (
    <div className="home">
      <MovieCardList />
      <Chatbox
        setPopupMovies={setPopupMovies}
        setShowRecommendedMovies={setShowRecommendedMovies}
      />
      {showRecommendedMovies && (
        <PopupList movieTitles={popupMovies} />
      )}
      <Reviews />
    </div>
  );
}

export default Home;