import { useState, useEffect } from 'react';
import { searchCountries, listCountries } from './api';
import { Link } from 'react-router-dom';

function CountriesList() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

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

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetchCountries();
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setQuery('');
    fetchAllCountries();
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  // If the data is still being fetched, display a loading message
  if (loading) {
    return <div>Loading countries...</div>;
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSearchSubmit}>
          <input type="text" value={query} onChange={handleInputChange} />
          <button type="submit">Search</button>
          <button onClick={handleClearSearch}>Clear</button>
        </form>
      </div>
      <button id="home">
        <Link to="/">Home</Link>
      </button>
      <h2>List of Countries:</h2>
      <table>
        <thead>
          <tr>
            <th>Country Code</th>
            <th>Country Name</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country.id}>
              <td>{country.id}</td>
              <td>{country.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CountriesList;
