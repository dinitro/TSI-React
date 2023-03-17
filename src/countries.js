import { useState, useEffect } from 'react';
import { searchCountries, listCountries, createCountry, deleteCountry, updateCountry } from './api';
import { Link } from 'react-router-dom';
import Modal from './Modal';

function CountriesList() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [newCountry, setNewCountry] = useState({ name: '' }); // an object representing the new country being created
  const [showCreateCountryForm, setShowCreateCountryForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedCountries, setSelectedCountries] = useState({});

  // Fetch countries based on search query
  const fetchCountries = async () => {
    try {
      const data = await searchCountries(query);
      setCountries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all countries without any search filter
  const fetchAllCountries = async () => {
    try {
      const data = await listCountries();
      setCountries(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetchCountries();
  };

  // Update query state when input changes
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Clear search query and fetch all countries
  const handleClearSearch = () => {
    setQuery('');
    fetchAllCountries();
  };

  // Create a new country and update the countries list
  const createNewCountry = async (newCountry) => {
    if (!newCountry.name) {
      console.log("Error: Please enter a name.");
      return;
    }

    try {
      const createdCountry = await createCountry(newCountry);
      console.log(createdCountry);
      setSuccessMessage(`Country "${createdCountry.name}" was successfully added.`);
      fetchAllCountries(); // Update the countries list to show the new addition
      setNewCountry({ name: '' }); // Clear the input field
      setShowCreateCountryForm(false); // Auto-hide the "Add Country" form
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a country and update the countries list
  const handleDeleteCountry = async (id) => {
    if (window.confirm("Are you sure you want to delete this country?")) {
      try {
        await deleteCountry(id);
        // Update the countries list after deletion
        fetchAllCountries();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Update selectedCountries state when a country is checked or unchecked
  const handleSelectedCountryChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCountries((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Update country name and fetch all countries if the country is selected
  const handleCountryNameChange = async (id, newName) => {
    if (selectedCountries[id]) {
      try {
        await updateCountry(id, { name: newName });
        fetchAllCountries();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Fetch all countries when the component mounts
  useEffect(() => {
    fetchAllCountries();
  }, []);

  // Define a function to handle form submission for creating a new country
  const handleCreateCountrySubmit = (event) => {
    event.preventDefault();
    createNewCountry(newCountry);
  };

  // Define a function to handle input change for the new actor form
  const handleNewCountryChange = (event) => {
    setNewCountry({
      ...newCountry,
      [event.target.name]: event.target.value
    });
  };

  // If the data is still being fetched, display a loading message
  if (loading) {
    return <div>Loading countries...</div>;
  }

  return (
    <div>
      {/* Display the success message when it is not empty */}
      <Modal show={successMessage !== ''} onClose={() => setSuccessMessage('')}>
        <h2>Success</h2>
        <p>{successMessage}</p>
        <button onClick={() => setSuccessMessage('')}>Close</button>
      </Modal>
      <div>
        <form onSubmit={handleSearchSubmit}>
          <input type="text" value={query} onChange={handleInputChange} />
          <button type="submit">Search</button>
          <button onClick={handleClearSearch}>Clear</button>
        </form>
      </div>
      {/* New Actor Form */}
      <button id="create" onClick={() => setShowCreateCountryForm(!showCreateCountryForm)}>Add a Country</button>
      {showCreateCountryForm && (
        <form id="createForm" onSubmit={handleCreateCountrySubmit}>
          <label htmlFor="name">Country Name:</label>
          <input type="text" id="name" name="name" value={newCountry.name} onChange={handleNewCountryChange} />
          {newCountry.name && (
            <button type="submit">Submit</button>
          )}
        </form>
      )}
      <button id="home">
        <Link to="/">Home</Link>
      </button>
      <h2>List of Countries:</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Country Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.id}>
              <td>
                <input
                  type="checkbox"
                  name={country.id}
                  checked={selectedCountries[country.id] || false}
                  onChange={handleSelectedCountryChange}
                />
              </td>
              <td>{country.id}</td>
              <td>
                {selectedCountries[country.id] ? (
                  <input
                    type="text"
                    value={country.name}
                    onChange={(e) => handleCountryNameChange(country.id, e.target.value)}
                    onBlur={(e) => handleCountryNameChange(country.id, e.target.value)}
                  />
                ) : (
                  <span>{country.name}</span>
                )}
              </td>
              <td>
                <button id onClick={() => handleDeleteCountry(country.id)}>&#128465;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CountriesList;