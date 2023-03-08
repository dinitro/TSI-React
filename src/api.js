// Fetch a list of actors from the provided URL
// import { apiUrl } from ".config/constants"
export const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const listActors = async () => {
  try {
    // Fetch data from the given URL
    const response = await fetch(`${apiUrl}/actors`);

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
    
    const response = await fetch(`${apiUrl}/actors/search?aq=${query}`);
    
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
    const response = await fetch(`${apiUrl}/films`);

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
    const response = await fetch(`${apiUrl}/films/search?fq=${query}`);
    
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
    const response = await fetch(`${apiUrl}/films/rating/${query}`);
    
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
    
    const response = await fetch(`${apiUrl}/films/search/description?desc=${query}`);
    
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


export async function createActor(firstName, lastName) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        firstName: firstName,
        lastName: lastName 
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('Response data is not an array');
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};