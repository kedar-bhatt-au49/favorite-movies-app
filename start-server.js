#!/usr/bin/env node

// Start script for Railway deployment
const path = require('path');
const { spawn } = require('child_process');

// Change to server directory and start the application
process.chdir(path.join(__dirname, 'server'));

// Start the Node.js application
const app = spawn('node', ['dist/index.js'], {
  stdio: 'inherit',
  env: process.env
});

app.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

app.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
