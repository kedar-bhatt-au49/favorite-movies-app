#!/bin/bash

# Favorite Movies App - Quick Deploy Script
# This script helps you deploy your app to various platforms

echo "🎬 Favorite Movies App - Deployment Helper"
echo "=========================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    
    # Root dependencies
    npm install
    
    # Server dependencies
    cd server
    npm install
    cd ..
    
    # Client dependencies
    cd client
    npm install
    cd ..
    
    echo "✅ Dependencies installed successfully!"
}

# Function to build the application
build_application() {
    echo "🔨 Building application..."
    
    # Build server
    cd server
    npm run build
    cd ..
    
    # Build client
    cd client
    npm run build
    cd ..
    
    echo "✅ Application built successfully!"
}

# Function to setup database
setup_database() {
    echo "🗄️ Setting up database..."
    
    cd server
    
    # Generate Prisma client
    npm run db:generate
    
    # Push database schema
    npm run db:push
    
    # Seed database
    echo "Do you want to seed the database with sample data? (y/n)"
    read -r seed_choice
    if [[ $seed_choice =~ ^[Yy]$ ]]; then
        npm run db:seed
        echo "✅ Database seeded with sample data!"
    fi
    
    cd ..
    echo "✅ Database setup completed!"
}

# Function to deploy to Railway
deploy_railway() {
    echo "🚂 Deploying to Railway..."
    
    if ! command_exists railway; then
        echo "Installing Railway CLI..."
        npm install -g @railway/cli
    fi
    
    echo "Please login to Railway:"
    railway login
    
    echo "Initializing Railway project:"
    railway init
    
    echo "Deploying to Railway:"
    railway up
    
    echo "✅ Deployment to Railway completed!"
    echo "🌐 Your app will be available at the URL provided by Railway"
}

# Function to deploy to Vercel
deploy_vercel() {
    echo "▲ Deploying frontend to Vercel..."
    
    if ! command_exists vercel; then
        echo "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    cd client
    echo "Deploying to Vercel:"
    vercel --prod
    cd ..
    
    echo "✅ Frontend deployed to Vercel!"
}

# Function to setup environment files
setup_env_files() {
    echo "⚙️ Setting up environment files..."
    
    # Server environment
    if [[ ! -f "server/.env" ]]; then
        cp server/.env.example server/.env
        echo "📝 Please edit server/.env with your database credentials"
        echo "   Example: DATABASE_URL=\"mysql://user:password@localhost:3306/favorite_movies_db\""
    fi
    
    # Client environment
    if [[ ! -f "client/.env" ]]; then
        cp client/.env.example client/.env
        echo "📝 Please edit client/.env with your API URL"
        echo "   Example: VITE_API_URL=http://localhost:5000/api"
    fi
    
    echo "✅ Environment files created!"
}

# Function to show deployment options
show_deployment_options() {
    echo ""
    echo "🚀 Choose your deployment option:"
    echo "1. Railway (Full-stack, includes database)"
    echo "2. Vercel + Railway (Frontend on Vercel, Backend on Railway)"
    echo "3. Local development setup only"
    echo "4. Exit"
    echo ""
    echo -n "Enter your choice (1-4): "
}

# Main menu
main_menu() {
    while true; do
        show_deployment_options
        read -r choice
        
        case $choice in
            1)
                echo "🚂 Setting up for Railway deployment..."
                install_dependencies
                build_application
                deploy_railway
                break
                ;;
            2)
                echo "🔄 Setting up for split deployment..."
                install_dependencies
                build_application
                echo ""
                echo "Backend deployment:"
                deploy_railway
                echo ""
                echo "Frontend deployment:"
                deploy_vercel
                break
                ;;
            3)
                echo "💻 Setting up for local development..."
                setup_env_files
                install_dependencies
                setup_database
                echo ""
                echo "✅ Local setup completed!"
                echo "🚀 Start development with: npm run dev"
                echo "📝 Don't forget to update your .env files!"
                break
                ;;
            4)
                echo "👋 Goodbye!"
                exit 0
                ;;
            *)
                echo "❌ Invalid choice. Please try again."
                ;;
        esac
    done
}

# Check prerequisites
echo "🔍 Checking prerequisites..."

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

if ! command_exists git; then
    echo "❌ git is not installed. Please install git first."
    exit 1
fi

echo "✅ All prerequisites are installed!"

# Show Node.js version
node_version=$(node --version)
echo "📋 Node.js version: $node_version"

# Check if we're in a git repository
if [[ ! -d ".git" ]]; then
    echo "⚠️  This doesn't appear to be a git repository."
    echo "💡 Initialize git with: git init"
    echo "💡 Add remote with: git remote add origin https://github.com/yourusername/favorite-movies-app.git"
fi

# Start main menu
main_menu

echo ""
echo "🎉 Deployment script completed!"
echo ""
echo "📚 Additional Resources:"
echo "   • README.md - Complete documentation"
echo "   • DEPLOYMENT.md - Detailed deployment guide"
echo "   • GitHub repository for issues and updates"
echo ""
echo "🆘 Need help? Create an issue on GitHub!"
