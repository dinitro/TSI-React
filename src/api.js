// Fetch a list of actors from the provided URL
const API_URL = 'http://localhost:8080';

export const listActors = async () => {
  try {
    // Fetch data from the given URL
    const response = await fetch(`${API_URL}/actors`);

    // Check if network response
    if (!response.ok) {
      // Error if the response fails
      throw new Error('Network response was not ok');
    }

    // Read response into JSON format
    const data = await response.json();

    // Check if the response data is an array
    if (!Array.isArray(data)) {
      // Error if the response data is not an array
      throw new Error('Response data is not an array');
    }

    // Return the array of actors
    return data;
  } catch (error) {
    // Log errors to console
    console.error(error);
  }
};

export async function searchActors(query) {
  try {
    // Fetch data from the given URL
    
    const response = await fetch(`${API_URL}/actors/search?aq=${query}`);
    
    // Check if network response
    if (!response.ok) {
      // Error if the response fails
      throw new Error('Network response was not ok');
    }

    // Read response into JSON format
    const data = await response.json();

    // Check if the response data is an array
    if (!Array.isArray(data)) {
      // Error if the response data is not an array
      throw new Error('Response data is not an array');
    }

    // Return the array of actors
    return data;
  } catch (error) {
    // Log errors to console
    console.error(error);
  }
};
    

export const listFilms = async () => {
  try {
    // Fetch data from the given URL
    const response = await fetch(`${API_URL}/films`);

    // Check if network response
    if (!response.ok) {
      // Error if the response fails
      throw new Error('Network response was not ok');
    }

    // Read response into JSON format
    const data = await response.json();

    // Check if the response data is an array
    if (!Array.isArray(data)) {
      // Error if the response data is not an array
      throw new Error('Response data is not an array');
    }

    // Return the array of actors
    return data;
  } catch (error) {
    // Log errors to console
    console.error(error);
  }
};

export async function searchFilms(query) {
  try {
    // Fetch data from the given URL
    
    const response = await fetch(`${API_URL}/films/search?fq=${query}`);
    
    // Check if network response
    if (!response.ok) {
      // Error if the response fails
      throw new Error('Network response was not ok');
    }

    // Read response into JSON format
    const data = await response.json();

    // Check if the response data is an array
    if (!Array.isArray(data)) {
      // Error if the response data is not an array
      throw new Error('Response data is not an array');
    }

    // Return the array of actors
    return data;
  } catch (error) {
    // Log errors to console
    console.error(error);
  }
};

export async function searchFilmsByRating(query) {
  try {
    // Fetch data from the given URL
    console.log(query)
    // const response = await fetch(`${API_URL}/films/rating?rt=${query}`);
    const response = await fetch(`${API_URL}/films/rating/${query}`);
    
    // Check if network response
    if (!response.ok) {
      // Error if the response fails
      throw new Error('Network response was not ok');
    }

    // Read response into JSON format
    const data = await response.json();

    // Check if the response data is an array
    if (!Array.isArray(data)) {
      // Error if the response data is not an array
      throw new Error('Response data is not an array');
    }

    // Return the array of actors
    return data;
  } catch (error) {
    // Log errors to console
    console.error(error);
  }
};

export async function searchFilmsByDescription(query) {
  try {
    // Fetch data from the given URL
    
    const response = await fetch(`${API_URL}/films/search?desc=${query}`);
    
    // Check if network response
    if (!response.ok) {
      // Error if the response fails
      throw new Error('Network response was not ok');
    }

    // Read response into JSON format
    const data = await response.json();

    // Check if the response data is an array
    if (!Array.isArray(data)) {
      // Error if the response data is not an array
      throw new Error('Response data is not an array');
    }

    // Return the array of actors
    return data;
  } catch (error) {
    // Log errors to console
    console.error(error);
  }
};