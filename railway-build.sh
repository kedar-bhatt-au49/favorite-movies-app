#!/bin/bash

# Railway build script
echo "Starting build process..."

# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
npm run db:generate
cd ..

# Install client dependencies and build
cd client
npm install
npm run build
cd ..

echo "Build completed successfully!"
