import React from 'react';
import MoviePoster from './Poster';
import MovieVideo from './Video';
import '../css/cardlist.css';
function PopupList({ movieTitles }) {
  const renderMovieCards = () => {
    return movieTitles.map((title, index) => (
      <div className="popup-card" key={index}>
        <div className="card-contentb">
          <MoviePoster title={title} />
          <div className="card-textb">
            <h3>{title}</h3>
            {/* Placeholder text, replace with actual movie details */}
            <p>Overview: Placeholder overview for {title}</p>
            <p>Release Date: Placeholder release date</p>
            <MovieVideo title={title} />
          </div>
        </div>
        <div className="row">
          <button type="button">Reviews</button>
          <button type="button">IMDB</button>
          <button type="button">Ratings</button>
          <button type="button">Find Something Similar</button>
        </div>
      </div>
    ));
  };

  function toggleClosed(){
    let popdiv = document.getElementsByClassName('movie-card-list');
    popdiv.style.display = 'none';

  }

  return (
    <div className="popup movie-card-list">
      <button type='button' onClick={() => toggleClosed}>Close</button>
      
      <div className="popholder">
      <h1>Recommended Movies</h1>
        <div className="cards-containerb">
          {renderMovieCards()}
        </div>
      </div>
    </div>
  );
}

export default PopupList;
