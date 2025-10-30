#!/bin/bash

# Railway deployment script
set -e

echo "🚀 Starting Railway deployment..."

# Navigate to server directory
cd server

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Build TypeScript
echo "🔨 Building TypeScript..."
npm run build

# Push database schema (Railway will have DATABASE_URL)
echo "🗄️ Setting up database..."
if [ -n "$DATABASE_URL" ]; then
  npx prisma db push --accept-data-loss
  echo "✅ Database schema applied"
else
  echo "⚠️ DATABASE_URL not found, skipping database setup"
fi

echo "🎉 Build completed successfully!"
