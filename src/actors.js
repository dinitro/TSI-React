// Import necessary dependencies
import { useState, useEffect } from 'react';
import { listActors, searchActors, createActor } from './api';
import { Link } from 'react-router-dom';
import Modal from './Modal';

// Define the ActorsList component
function ActorsList() {

  // Define state variables using useState hooks
  const [actors, setActors] = useState([]); // an array of actors
  const [loading, setLoading] = useState(true); // a boolean indicating if data is currently being fetched
  const [query, setQuery] = useState(''); // a string representing the search query
  const [sortOrder, setSortOrder] = useState('asc'); // a string representing the current sort order
  const [sortKey, setSortKey] = useState('actorId'); // a string representing the current sort key
  const [newActor, setNewActor] = useState({ firstName: '', lastName: '' }); // an object representing the new actor being created
  const [showCreateActorForm, setShowCreateActorForm] = useState(false);
  const [showModal, setShowModal] = useState(false);


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

  // 
  const createNewActor = async (newActor) => {
    if (!newActor.firstName || !newActor.lastName) {
      console.log("Error: Both first and last names are required.");
      return;
    }

    try {
      const createdActor = await createActor(newActor);
      console.log(createdActor);
      setShowModal(true); // Show the Modal
      setTimeout(() => setShowModal(false), 3000); // Hide the Modal after 3 seconds
      return createdActor;
    } catch (error) {
      console.error(error);
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
    } else if (sortKey === 'actorId') {
      keyA = String(a.ActorId);
      keyB = String(b.ActorId);
    } else {
      keyA = a.LastName;
      keyB = b.LastName;
    }
    if (sortOrder === 'asc') {
      return sortKey === 'actorId' ? keyA - keyB : keyA.localeCompare(keyB);
    } else {
      return sortKey === 'actorId' ? keyB - keyA : keyB.localeCompare(keyA);
    }
  });

  // Define a function to handle form submission for creating a new actor
  const handleCreateActorSubmit = (event) => {
    event.preventDefault();
    createNewActor(newActor);
  };

  // Define a function to handle input change for the new actor form
  const handleNewActorChange = (event) => {
    setNewActor({
      ...newActor,
      [event.target.name]: event.target.value
    });
  };

  // If the data is still being fetched, display a loading message
  if (loading) {
    return <div>Loading actors...</div>;
  }

  return (
    <div className="actors-container">
      <div className="actors-search-bar">
        {/* Search Field */}
        <form onSubmit={handleSearchSubmit}>
          <input type="text" value={query} onChange={handleInputChange} />
          <button type="submit">Search Actors</button>
          <button onClick={handleClearSearch}>Clear Search</button>
        </form>
        <button id="home">
          <Link to="/">Home</Link>
        </button>
      </div>
      <div className="actors-sorting">
      </div>
      <div className="actors-form">
        {/* New Actor Form */}
        <button id="create" onClick={() => setShowCreateActorForm(!showCreateActorForm)}>Create New Actor</button>
        {showCreateActorForm && (
          <form id="createForm" onSubmit={handleCreateActorSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" value={newActor.firstName} onChange={handleNewActorChange} />
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" value={newActor.lastName} onChange={handleNewActorChange} />
            {newActor.firstName && newActor.lastName && (
              <button type="submit">Submit</button>
            )}
          </form>
        )}
      </div>
      <div className="actors-table">
        {/* Create actor table */}
        <h2>List of Actors:</h2>
        <table>
          <thead>
            <tr>
              <th>
                <span>
                  ID
                  <button className="sort-arrow" onClick={() => handleSortOrderChange({ target: { value: sortOrder === 'asc' ? 'desc' : 'asc' } }, 'actorId')}>
                    {sortKey === 'actorId' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </button>
                </span>
              </th>
              <th>
                <span>
                  First Name
                  <button className="sort-arrow" onClick={() => handleSortOrderChange({ target: { value: sortOrder === 'asc' ? 'desc' : 'asc' } }, 'firstName')}>
                    {sortKey === 'firstName' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </button>
                </span>
              </th>
              <th>
                <span>
                  Last Name
                  <button className="sort-arrow" onClick={() => handleSortOrderChange({ target: { value: sortOrder === 'asc' ? 'desc' : 'asc' } }, 'lastName')}>
                    {sortKey === 'lastName' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </button>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedActors.map((actor) => (
              <tr key={actor.ActorId}>
                <td>{actor.ActorId}</td>
                <td>{actor.FirstName}</td>
                <td>{actor.LastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add the Modal component */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <p>Actor successfully added!</p>
      </Modal>
    </div >
  );


}

export default ActorsList;