const express = require('express');
const path = require('path');
const readline = require('readline');

const app = express();
const port = 3000;
let server;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the Three.js project
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Listen for keypress events to stop the server
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (key, data) => {
  if (data.ctrl && data.name === 'c') {
    process.stdin.setRawMode(false);
    process.stdin.pause();
    server.close(() => {
      console.log('Server stopped.');
      process.exit(0);
    });
  } else if (key === 'q') {
    server.close(() => {
      console.log('Server stopped.');
      process.exit(0);
    });
  }
});
