const express = require('express');
const responseTime = require('response-time');
const axios = require('axios');
const redis = require('redis');
const app = express();

// create and connect redis client to local instance.
const client = redis.createClient();

client.on('connect', () => console.log('Redis server connected'));
client.on('error', (err) => console.log('Error', err));

app.use(responseTime())

app.get('/', (req, res) => {
  res.send('Redis caching');
});

app.get('/api/search', (req, res) => {
  const query = (req.query.query).trim();
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${query}`;

  // Cache with redis
  return client.get(`wikipedia:${query}`, (err, result) => {
    if (result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    }
    // if key doesn't exist
    return axios.get(searchUrl)
      .then(res => {
        const responseJSON = res.data;
        // Cache response in redis
        client.setex(`wikipedia:${query}`, 3600, JSON.stringify({
          source: 'Redis Cache',
          ...responseJSON
        }));
        
        return res.status(200).json({
          source: 'Wikipedia API',
          ...responseJSON
        });
      })
      .catch(err => res.json(err));
  });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
