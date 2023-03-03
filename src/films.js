// Importing necessary modules and functions
import { useState, useEffect } from 'react';
import { listFilms, searchFilms, searchFilmsByRating, searchFilmsByDescription } from './api';
import { Link } from 'react-router-dom';

// Defining FilmsList component
function FilmsList() {

  // Defining state variables using useState hook
  const [films, setFilms] = useState([]); // Stores list of films fetched from API
  const [loading, setLoading] = useState(false); // Indicates whether films are being loaded or not
  const [query, setQuery] = useState(''); // Stores search query entered by user
  const [searchType, setSearchType] = useState('title'); // Stores the type of search selected by user
  const [flippedCardId, setFlippedCardId] = useState(null); // Stores the ID of the flipped card

  // Function to fetch films from API
  const fetchFilms = async () => {
    try {
      const data = await listFilms();
      setFilms(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect hook to fetch films when component mounts
  useEffect(() => {
    setLoading(true);
    fetchFilms();
  }, []);

  // Function to handle search button click
  const handleSearchButtonClick = async () => {
    setLoading(true);
    if (query === '') {
      await fetchFilms();
    } else {
      let data;
      if (searchType === 'title') {
        data = await searchFilms(query);
      } else if (searchType === 'rating') {
        data = await searchFilmsByRating(query);
      } else if (searchType === 'description') {
        data = await searchFilmsByDescription(query);
      }
      setFilms(data);
    }
    setLoading(false);
  };

  // Function to handle input change
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Function to handle input key down
  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchButtonClick();
    }
  };

  // Function to handle clear search button click
  const handleClearSearchButtonClick = async () => {
    setLoading(true);
    setQuery('');
    await fetchFilms();
  };

  // Function to handle search type change
  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
  };

  // Function to handle card click
  const handleCardClick = (e) => {
    const card = e.currentTarget;
    card.isFlipped = !card.isFlipped;
    card.classList.toggle('is-flipped');
  };

  // Conditional rendering based on loading and films data
  if (loading) {
    return <div>Loading films...</div>;
  }

  return (
    <div>
      <div class="search-container">
        <div class="input-container">
          <input type="text" value={query} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
          <select id="searchDrop" value={searchType} onChange={handleSearchTypeChange}>
            <option value="title">Title</option>
            <option value="rating">MPAA Rating</option>
            <option value="description">Description</option>
          </select>
        </div>
        <div class="button-container">
          <button className="search" onClick={handleSearchButtonClick}>Search Movies</button>
          <button className="search" onClick={handleClearSearchButtonClick}>Clear Search</button>
        </div>
      </div>
      <button id="home">
        <Link to="/">Home</Link>
      </button>
      <h2 className="page_title"> Movies</h2>
      {films.length === 0 ? (
        <div>No films found.</div>
      ) : (
        <div className="card-container">
          {films.map((film) => (
            <div className="card" key={film.FilmId} onClick={handleCardClick}>
              <div className="card-front">
                <h3>{film.FilmId}: {film.Title}</h3>
                <p>{film.Description}</p>
              </div>
              <div className="card-back">
                <p>MPAA Rating: {film.Rating}</p>
                <p>Runtime: {film.Length} min</p>
              </div>
            </div>
          ))}
        </div>
      )
      }
    </div >
  );
}

export default FilmsList;