const express = require('express');
const http = require('http');
const app = express();

// Proxy API calls to backend service
app.get('/api/books', (req, res) => {
  const options = {
    hostname: 'backend',
    port: 8080,
    path: '/books',
    method: 'GET'
  };

  const proxyReq = http.request(options, (proxyRes) => {
    let data = '';
    
    proxyRes.on('data', (chunk) => {
      data += chunk;
    });
    
    proxyRes.on('end', () => {
      console.log('Books fetched:', data);
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });

  proxyReq.on('error', (err) => {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: err.message });
  });

  proxyReq.end();
});

app.use(express.static('.'));

app.listen(3000, () => console.log('Frontend running on 3000'));