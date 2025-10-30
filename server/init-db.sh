#!/bin/bash

# Database initialization script for Render
echo "🔧 Initializing database..."

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Push database schema (create tables)
echo "🗄️ Creating database tables..."
npx prisma db push --accept-data-loss

# Check if database is accessible
echo "🔍 Testing database connection..."
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.\$connect();
    console.log('✅ Database connection successful');
    await prisma.\$disconnect();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

test();
"

echo "✅ Database initialization complete!"
echo "🚀 Starting server..."
