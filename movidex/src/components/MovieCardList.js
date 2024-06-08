import React, { useState, useEffect } from 'react';
import '../css/cardlist.css';
import genresData from '../json/genres.json';
import MoviePoster from './Poster';
import MovieVideo from './Video';
import CustomDropdown from './Dropdown';
import {clearSelection} from '../js/dropdown.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';

function MovieCardList() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('inTheaters');
  const [moviesInTheaters, setTheaterMovies] = useState([]);
  const [moviesTopRated, setTopRatedMovies] = useState([]);
  const [moviesPopular, setPopularMovies] = useState([]);
  const [moviesUpcoming, setUpcomingMovies] = useState([]);


  const years = ['2000', '2001', '2002', '2003', '2004', '2005', '2006' , '2007', '2008', 
                '2009', '2010', '2011', '2012', '2013', '2014', '2015' , '2016', '2017',
                '2018', '2019', '2020', '2021', '2022', '2023', '2024'
                ]
  const languages = ['English', 'Spanish', 'French', 'Italian', 'Russian', 'Chinese', 'Japanese' , 'Portuguese', 'Arabic', 
                'Korean', 'Vietnamese'
                ]

  const toggleDropdown = () => {
    clearSelection();
    setDropdownOpen(!dropdownOpen);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);
    setDropdownOpen(false);
  };

  function findGenreById(id) {
    return genresData.genres.find(genre => genre.id === id);
  }

  useEffect(() => {
    async function fetchTheaterMovies() {
      try {
        const response = await fetch('http://localhost:5000/api/inTheaters');
        const data = await response.json();
        setTheaterMovies(data.results || []);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    }
    fetchTheaterMovies();
  }, []);

  useEffect(() => {
    async function fetchTopRatedMovies() {
      try {
        const response = await fetch('http://localhost:5000/api/topRated');
        console.log(response);
        const data = await response.json();
        setTopRatedMovies(data.results || []);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    }
    fetchTopRatedMovies();
  }, []);

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const response = await fetch('http://localhost:5000/api/popular');
        const data = await response.json();
        setPopularMovies(data.results || []);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    }
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    async function fetchUpcomingMovies() {
      try {
        const response = await fetch('http://localhost:5000/api/upcoming');
        const data = await response.json();
        setUpcomingMovies(data.results || []);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    }
    fetchUpcomingMovies();
  }, []);

  const getMoviesToDisplay = () => {
    switch (currentFilter) {
      case 'topRated':
        return moviesTopRated;
      case 'popular':
        return moviesPopular;
      case 'upcoming':
        return moviesUpcoming;
      case 'inTheaters':
      default:
        return moviesInTheaters;
    }
  };
useEffect(() => {
      const cardholder = document.querySelector('.cardholder');

      function checkCards() {
        const cards = document.querySelectorAll('.card');
        const triggerBottom = window.innerHeight / 5 * 2;

        cards.forEach((card) => { 
            const cardTop = card.getBoundingClientRect().top;
            if(cardTop < triggerBottom) {
                card.classList.add('enlarge');
            } else {
                card.classList.remove('enlarge');
            }
        });
    }

    if(cardholder){
        cardholder.addEventListener('scroll', checkCards);
        checkCards();
      

      return () => {
        cardholder.removeEventListener('scroll', checkCards);
      };
    }
  
}, [moviesInTheaters, moviesTopRated, moviesPopular, moviesUpcoming]);

  return (
    <div className="movie-card-list">
      <h2>MOVIDEX</h2>
      <div className="cardholder">
        <div className="cardholder-header">
          <div className="dropdown">
            <div className='row'>
              <button
                type="button"
                onClick={() => toggleDropdown()}
              >
                Category
              </button>
              <div >
                <div className='row searchbar' style={{alignItems: 'center'}}>
                    <div className='col'>
                      Search:
                      
                    </div>
                    <div className='col'>
                        <input type='text' style={{padding: '5px', maxWidth: '100px'}}></input>
                    </div>
                   <div className='col'>
                    <button style={{padding: '0', position: 'relative'}}>
                      <FontAwesomeIcon icon={faCircleChevronRight} size="2x" />
                    </button>
                   </div>
                   <div className='col'>
                   
                   </div>
                    
                    
                    
                </div>
                <div className='row'>
                <CustomDropdown title='Release Year' options={years}/>
                <CustomDropdown title='Language' options={languages}/>
                </div>
                
              </div>
            </div>
            <div className={'dropdown-menu'} style={{ display: dropdownOpen ? 'block' : 'none' }}>
              <button className="dropdown-item" onClick={() => handleFilterChange('inTheaters')}>Now Playing</button>
              <button className="dropdown-item" onClick={() => handleFilterChange('topRated')}>Top Rated</button>
              <button className="dropdown-item" onClick={() => handleFilterChange('popular')}>Popular</button>
              <button className="dropdown-item" onClick={() => handleFilterChange('upcoming')}>Upcoming</button>
            </div>
          </div>
        </div>
        <h1 style={{ color: 'white', fontFamily:'showtime', fontSize: '60px' }}>
          {currentFilter === 'inTheaters'
            ? 'In Theaters Now'
            : currentFilter === 'topRated'
            ? 'Top Rated Movies'
            : currentFilter === 'popular'
            ? 'Popular Movies'
            : 'Upcoming Movies'}
        </h1>
        <div className="cards-container">
         
        {getMoviesToDisplay().map((movie) => (
            <div className="card" key={movie.id}>
              <div className="card-content">
                <MoviePoster movie={movie} />
                <div className="card-text">
                  <h3>{movie.title}</h3>
                  <p>{movie.overview}</p>
                  <div className='row'>
                    <div className='col' >
                             
                             Scored: 
                    </div>
                    <div className='cl1' style={{textAlign:'center'}} >
                     
                
                      <p>
                        {movie.vote_count > 0 ? movie.vote_average : '-'}
                      </p>
                     <div style={{backgroundColor: 'white', height: '2px'}}></div>
                      <p>
                        10
                      </p>
                     

                    </div>
                    <div className='cl0' style={{textAlign:'center'}}>
                        <p>({movie.vote_count} votes)</p>
                    </div>
                    <div className='col'></div>
                  </div>
                  <p>Release Date: {movie.release_date}</p>
                  <div className='row'>
                      {movie.genre_ids.map((genre_id) => {
                        const genre = findGenreById(genre_id);
                        return <div style={{padding:'5px'}}><p key={genre_id}>{genre ? genre.name : 'Unknown Genre'}</p></div>;
                      })}
                  </div>
                  <MovieVideo movie={movie}/>
                  
                </div>
                
              </div>
              <div className='row'>
                <button type="button">
                    Reviews
                </button>
                <button type="button">
                    IMDB
                </button>
                <button type="button">
                    Ratings
                </button>
                <button type="button">
                    Find Something Similar
                </button>
              </div>
            </div>
          ))}
        
          <div style={{height:'400px'}}></div>
        </div>
      </div> 
         
    </div>

  );
}

export default MovieCardList;

/*
{
  "adult": false,
  "backdrop_path": "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
  "genre_ids": [
    878,
    12,
    28
  ],
  "id": 653346,
  "original_language": "en",
  "original_title": "Kingdom of the Planet of the Apes",
  "overview": "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
  "popularity": 5313.091,
  "poster_path": "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
  "release_date": "2024-05-08",
  "title": "Kingdom of the Planet of the Apes",
  "video": false,
  "vote_average": 6.92,
  "vote_count": 804
}, */