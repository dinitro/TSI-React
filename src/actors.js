// Import necessary dependencies
import { useState, useEffect } from 'react';
import { listActors, searchActors } from './api';
import { Link } from 'react-router-dom';

// Define the ActorsList component
function ActorsList() {

  // Define state variables using useState hooks
  const [actors, setActors] = useState([]); // an array of actors
  const [loading, setLoading] = useState(true); // a boolean indicating if data is currently being fetched
  const [query, setQuery] = useState(''); // a string representing the search query
  const [sortOrder, setSortOrder] = useState('asc'); // a string representing the current sort order
  const [sortKey, setSortKey] = useState('firstName'); // a string representing the current sort key

  // Define a function to fetch actors using the search API
  const fetchActors = async () => {
    try {
      const data = await searchActors(query);
      setActors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Define a function to fetch all actors using the list API
  const fetchAllActors = async () => {
    try {
      const data = await listActors();
      setActors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Define a function to handle form submission for searching
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetchActors();
  };

  // Define a function to handle input change for the search query
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Define a function to handle clearing the search query
  const handleClearSearch = () => {
    setQuery('');
    fetchAllActors();
  };

  // Define a function to handle changing the sort order
  const handleSortOrderChange = (event, key) => {
    setSortOrder(event.target.value);
    setSortKey(key);
  };

  // Use the useEffect hook to fetch all actors when the component mounts
  useEffect(() => {
    fetchAllActors();
  }, []);

  // Sort the actors based on the current sort order and key
  let sortedActors = actors.slice().sort((a, b) => {
    let keyA, keyB;
    if (sortKey === 'firstName') {
      keyA = a.FirstName;
      keyB = b.FirstName;
    } else {
      keyA = a.LastName;
      keyB = b.LastName;
    }
    if (sortOrder === 'asc') {
      return keyA.localeCompare(keyB);
    } else {
      return keyB.localeCompare(keyA);
    }
  });

  // If the data is still being fetched, display a loading message
  if (loading) {
    return <div>Loading actors...</div>;
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSearchSubmit}>
          <input type="text" value={query} onChange={handleInputChange} />
          <button type="submit">Search Actors</button>
          <button onClick={handleClearSearch}>Clear Search</button>
        </form>
        <label htmlFor="sort-order">Sort by:</label>
        <select id="sort-order" value={`${sortKey}-${sortOrder}`} onChange={(e) => {
          const [key, order] = e.target.value.split('-');
          handleSortOrderChange({target: {value: order}}, key);
        }}>
          <option value="firstName-asc">First Name Ascending</option>
          <option value="firstName-desc">First Name Descending</option>
          <option value="lastName-asc">Last Name Ascending</option>
          <option value="lastName-desc">Last Name Descending</option>
        </select>
      </div>
      <button id="home">
        <Link to="/">Home</Link>
      </button>
      <h2>List of Actors:</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {sortedActors.map((actor) => (
            <tr key={actor.ActorId}>
              <td>{actor.FirstName}</td>
              <td>{actor.LastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActorsList;