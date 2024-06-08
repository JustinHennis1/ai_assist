const fetch = require('node-fetch');
require('dotenv').config();

async function getInTheater() {
  const rd_token = 'Bearer ' + process.env.TMDB_RD_TOKEN;
  const url = 'https://api.themoviedb.org/3/movie/now_playing';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: rd_token,
    },
  };

  //console.log('TMDB_RD_TOKEN:', process.env.TMDB_RD_TOKEN); // Debugging line
  //console.log('Authorization Header:', rd_token); // Debugging line

  try {
    const response = await fetch(url, options); // Await the fetch call
    const responseText = await response.text(); // Await the text method
    console.log('Response Text:', responseText); // Log the response text

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.statusText} - ${responseText}`);
    }

    const json = JSON.parse(responseText); // Parse the text to JSON
    return json;
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    throw error;
  }
}

// Test the function and print the result to the terminal
// getInTheater()
//   .then((data) => {
//     console.log('Movies:', data);
//   })
//   .catch((error) => {
//     console.error('Failed to fetch movies:', error.message);
//   });
module.exports = {getInTheater}