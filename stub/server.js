const express = require('express');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

// SSL options
const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem')),
};

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Use routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

https.createServer(options, app).listen(port, () => {
  console.log(`Secure stub server running at https://localhost:${port}`);
});
