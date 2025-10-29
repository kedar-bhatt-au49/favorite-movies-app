#!/bin/bash

# Railway start script
echo "Starting application..."

# Run database migrations
cd server
npm run db:push

# Seed database if needed
if [ "$SEED_DATABASE" = "true" ]; then
  npm run db:seed
fi

# Start the application
npm start
