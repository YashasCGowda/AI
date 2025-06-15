const http = require('http');

const options = {
  hostname: 'localhost',
  port: 8000,
  path: '/api/hospital-resources?hospital=hospital-a',
  method: 'GET',
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.end();
