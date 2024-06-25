// intheaters.js
const dotenv = require("dotenv");
dotenv.config();
const fetch = require('node-fetch');

async function getTopRated(page) {
  let pg = '';
  if(page){pg = `?page=${page}`}
  const rd_token = 'Bearer ' + process.env.TMDB_RD_TOKEN;
  const url = `https://api.themoviedb.org/3/movie/top_rated${pg}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: rd_token,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get response: ${response.statusText} - ${errorText}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    throw error;
  }
}

module.exports=  {getTopRated};
