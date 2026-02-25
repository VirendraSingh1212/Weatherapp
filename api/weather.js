// Vercel Serverless Function - Weather API Proxy
// This avoids CORS and mixed content issues by proxying requests server-side

const API_KEY = process.env.WEATHERSTACK_API_KEY || 'fd2e1dab64862c77bd1e60f96a6678e8';
const BASE_URL = 'http://api.weatherstack.com';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { endpoint, ...params } = req.query;

  if (!endpoint) {
    return res.status(400).json({ error: 'Endpoint is required' });
  }

  // Build query string
  const queryParams = new URLSearchParams({
    access_key: API_KEY,
    ...params
  });

  const url = `${BASE_URL}/${endpoint}?${queryParams}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ 
        error: true, 
        info: data.error.info || 'Weather API error' 
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Weather API Error:', error);
    return res.status(500).json({ 
      error: true, 
      info: 'Failed to fetch weather data' 
    });
  }
}
