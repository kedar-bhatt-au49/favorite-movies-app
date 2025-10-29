#!/bin/bash

# Railway start script
echo "Starting application..."

# Change to server directory
cd server

# Run database migrations
npm run db:push

# Seed database if needed
if [ "$SEED_DATABASE" = "true" ]; then
  npm run db:seed
fi

# Start the application
npm start
