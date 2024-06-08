const express = require('express');
const bodyParser = require('body-parser');
const { AzureOpenAI } = require('openai');
const dotenv = require('dotenv');
const cors = require('cors');
const { getInTheater } = require('./src/js/intheaters');
const { getTopRated } = require('./src/js/topRated');
const { fetchYoutube } = require('./src/js/youtube');
const { getPopular } = require('./src/js/popular');
const { getUpcoming } = require('./src/js/upcoming');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const authTok = process.env.TMDB_RD_TOKEN;
const apiVersion = '2024-05-01-preview';
const deployment = 'gpt-4';

console.log("Server configuration:");
console.log("Endpoint:", endpoint);
console.log("API Key:", apiKey);
console.log("TMDB auth:", authTok);

app.post('/api/getAIResponse', async (req, res) => {
  const { userInput } = req.body;
  console.log("Received user input:", userInput);
  const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment, dangerouslyAllowBrowser: true });

  try {
    const result = await client.chat.completions.create({
      messages: [
        { role: 'system', content: "I'm here to help you find your next movie." },
        { role: 'user', content: "If I ask a question about a movie answer it. Based on my next message give me 3 to 5 movie recommendations that match my interests." },
        { role: 'user', content: userInput },
      ],
      model: 'gpt-4',
    });

    console.log("AI Response:", result.choices[0].message.content);
    res.json({ content: result.choices[0].message.content });
  } catch (error) {
    console.error("Error in fetching AI response:", error);
    res.status(500).send('Error in fetching AI response');
  }
});

app.get('/api/inTheaters', async (req, res) => {
  try {
    const movies = await getInTheater();
    //console.log('CHecking Output of In Theaters: ', movies);
    res.json(movies);
  } catch (error) {
    console.error('Error fetching in-theater movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies that are now playing' });
  }
});

app.get('/api/topRated', async (req, res) => {
  try {
    const movies = await getTopRated();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching top-rated movies:', error);
    res.status(500).json({ error: 'Failed to fetch top-rated movies' });
  }
});

app.get('/api/popular', async (req, res) => {
  try {
    const movies = await getPopular();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    res.status(500).json({ error: 'Failed to fetch popular movies' });
  }
});

app.get('/api/upcoming', async (req, res) => {
  try {
    const movies = await getUpcoming();
    res.json(movies);
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming movies' });
  }
});

app.get('/api/youtube/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const videosResponse = await fetchYoutube(id);
    if (!videosResponse || videosResponse.error) {
      return res.status(500).json({ error: 'Failed to fetch videos' });
    }
    res.json(videosResponse);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
