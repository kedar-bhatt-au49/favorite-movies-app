#!/bin/bash

echo "🎬 Setting up Favorite Movies & TV Shows App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Setup server
echo "🔧 Setting up server..."
cd server

# Install server dependencies
npm install

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating server .env file..."
    cp .env.example .env
    echo "⚠️  Please update the DATABASE_URL in server/.env with your MySQL credentials"
fi

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
npm run db:generate

echo "📊 Database schema ready. Please ensure your MySQL database is running and run:"
echo "   cd server && npm run db:push && npm run db:seed"

cd ..

# Setup client
echo "🎨 Setting up client..."
cd client

# Install client dependencies
npm install

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating client .env file..."
    cp .env.example .env
fi

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Ensure MySQL is running"
echo "2. Update server/.env with your database credentials"
echo "3. Run database setup: cd server && npm run db:push && npm run db:seed"
echo "4. Start development: npm run dev"
echo ""
echo "🌐 The app will be available at:"
echo "   Frontend: http://localhost:5173"
echo "   Backend: http://localhost:5000"
echo ""
