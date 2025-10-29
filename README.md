# Favorite Movies & TV Shows

A full-stack web application for managing your favorite movies and TV shows collection. Built with React, TypeScript, Node.js, Express, Prisma, and MySQL.

## 🚀 Features

### Frontend Features
- **Modern React UI** with TypeScript and TailwindCSS
- **Responsive Design** that works on desktop, tablet, and mobile
- **Infinite Scrolling** for seamless browsing experience
- **Search & Filter** by title, director, or type (Movie/TV Show)
- **Add/Edit/Delete** entries with form validation
- **Image Upload** support for movie/TV show posters
- **Real-time Toast Notifications** for user feedback
- **Clean Modal System** for viewing and editing entries

### Backend Features
- **RESTful API** with Express.js and TypeScript
- **MySQL Database** with Prisma ORM
- **Input Validation** using Zod schemas
- **File Upload** support with Multer
- **JWT Authentication** (bonus feature)
- **Error Handling** and proper response structure
- **CORS Configuration** for cross-origin requests

### Bonus Features
- **Authentication System** with JWT-based login/register
- **User Association** for entries
- **Image Upload** for poster storage
- **Advanced Search** and filtering capabilities

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- TailwindCSS for styling
- React Query (TanStack Query) for data fetching
- React Hook Form with Zod validation
- React Router for navigation
- Lucide React for icons
- React Hot Toast for notifications

### Backend
- Node.js with Express.js
- TypeScript for type safety
- Prisma ORM with MySQL
- Zod for schema validation
- Multer for file uploads
- JWT for authentication
- bcryptjs for password hashing
- CORS and Helmet for security

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- MySQL database
- npm or yarn package manager

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kedar-bhatt-au49/favorite-movies-app.git
cd favorite-movies-app
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your database credentials
DATABASE_URL="mysql://username:password@localhost:3306/favorite_movies_db"
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed database with sample data
npm run db:seed
```

### 4. Frontend Setup

```bash
cd ../client

# Install dependencies
npm install

# Create environment file (optional)
echo "VITE_API_URL=http://localhost:5000/api" > .env
```

### 5. Start Development Servers

Start the backend server:
```bash
cd server
npm run dev
```

Start the frontend development server:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
favorite-movies-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service functions
│   │   ├── lib/            # Utility functions
│   │   ├── types/          # TypeScript type definitions
│   │   └── config/         # Configuration constants
│   ├── public/             # Static assets
│   └── package.json
└── server/                 # Node.js backend
    ├── src/
    │   ├── routes/         # Express route handlers
    │   ├── middleware/     # Custom middleware
    │   ├── validation/     # Zod validation schemas
    │   ├── lib/            # Database and utility functions
    │   └── types/          # TypeScript type definitions
    ├── prisma/             # Database schema and migrations
    ├── uploads/            # Uploaded files storage
    └── package.json
```

## 🔧 API Endpoints

### Entries
- `GET /api/entries` - Get all entries with pagination and filtering
  - Query params: `page`, `limit`, `search`, `type`
- `GET /api/entries/:id` - Get single entry by ID
- `POST /api/entries` - Create new entry (with file upload)
- `PUT /api/entries/:id` - Update entry (with file upload)
- `DELETE /api/entries/:id` - Delete entry

### Authentication (Bonus)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Health Check
- `GET /api/health` - Server health check

## 📊 Database Schema

### Entry Model
```prisma
model Entry {
  id          String   @id @default(cuid())
  title       String
  type        EntryType
  director    String
  budget      String
  location    String
  duration    String
  year        String
  description String?
  posterUrl   String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  userId      String?
  user        User?    @relation(fields: [userId], references: [id])
}

enum EntryType {
  MOVIE
  TV_SHOW
}
```

### User Model (Bonus)
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  entries   Entry[]
}
```

## 🎨 UI Components

### Core Components
- **Layout** - Main app layout with navigation
- **EntryCard** - Movie/TV show card display
- **EntryModal** - View/edit entry modal
- **DeleteConfirmModal** - Confirmation dialog
- **EntryForm** - Add/edit entry form

### Pages
- **HomePage** - Main collection view with infinite scroll
- **AddEntryPage** - Add new entry form
- **LoginPage** - User authentication (bonus)
- **RegisterPage** - User registration (bonus)

## 🚢 Deployment

### Quick Deploy Options

#### Option 1: Deploy Both Frontend and Backend Together (Recommended)

**Railway (Full-Stack Deployment)**
1. Fork this repository on GitHub
2. Connect to [Railway](https://railway.app)
3. Create new project from GitHub repo
4. Set environment variables (see below)
5. Railway will auto-deploy both frontend and backend

**Render (Full-Stack)**
1. Fork this repository on GitHub
2. Create new Web Service on [Render](https://render.com)
3. Connect your GitHub repo
4. Set build command: `npm run build`
5. Set start command: `npm start`

#### Option 2: Deploy Separately

**Frontend: Vercel/Netlify**
1. Fork this repository
2. Deploy `/client` folder to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set build directory: `dist`
5. Add environment variables

**Backend: Railway/Render**
1. Deploy `/server` folder to [Railway](https://railway.app) or [Render](https://render.com)
2. Set build command: `npm run build`
3. Set start command: `npm start`
4. Add database and environment variables

### 🗄️ Database Setup for Production

#### Option 1: Railway PostgreSQL (Recommended)
```bash
# Railway automatically provides DATABASE_URL
# No additional setup needed
```

#### Option 2: PlanetScale MySQL
1. Create account at [PlanetScale](https://planetscale.com)
2. Create new database
3. Get connection string and set as DATABASE_URL

#### Option 3: Aiven MySQL
1. Create account at [Aiven](https://aiven.io)
2. Create MySQL service
3. Get connection string and set as DATABASE_URL

### 🔧 Environment Variables for Production

#### Backend Environment Variables
```env
# Database (provided by Railway/PlanetScale/Aiven)
DATABASE_URL=mysql://user:password@host:port/database

# Server
PORT=5000
NODE_ENV=production

# JWT
JWT_SECRET=your_super_secure_production_jwt_secret_key_here_minimum_32_characters
JWT_EXPIRES_IN=7d

# File uploads
UPLOAD_DIR=uploads

# CORS (add your frontend domain)
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

#### Frontend Environment Variables
```env
# API URL (your deployed backend)
VITE_API_URL=https://your-backend-domain.railway.app/api
```

### 📦 Database Migration for Production

After deploying, run database migrations:

```bash
# SSH into your backend deployment or use Railway CLI
npm run db:push

# Seed with sample data (optional)
npm run db:seed
```

### 🎯 Live Demo

- **Frontend**: [https://favorite-movies-kedar.vercel.app](https://favorite-movies-kedar.vercel.app)
- **Backend API**: [https://favorite-movies-api-kedar.railway.app](https://favorite-movies-api-kedar.railway.app)
- **API Documentation**: [https://favorite-movies-api-kedar.railway.app/api/health](https://favorite-movies-api-kedar.railway.app/api/health)

### 🔑 Demo Credentials

For testing the authentication features:

```
Email: demo@example.com
Password: password123
```

Or register a new account to test the full functionality.

### Sample Data

The application comes with pre-seeded sample data including:
- Popular movies (Inception, The Matrix, Pulp Fiction, etc.)
- TV shows (Breaking Bad, Game of Thrones, The Office, etc.)
- Test user account for authentication

## 🧪 Testing

### Sample Data
The application includes a seed script that populates the database with sample movies and TV shows:

```bash
cd server
npm run db:seed
```

### Test Users (if authentication is enabled)
- Email: demo@example.com
- Password: password123

## 🔍 Features Walkthrough

### 1. View Collection
- Browse all movies and TV shows in a responsive grid
- Infinite scroll for smooth navigation
- Filter by type (Movie/TV Show)
- Search by title or director

### 2. Add New Entry
- Complete form with validation
- Upload poster image or provide URL
- Required fields: title, type, director, budget, location, duration, year
- Optional fields: description, poster

### 3. Edit Entry
- Click edit on any entry card
- Pre-filled form with existing data
- Update any field including poster image

### 4. Delete Entry
- Confirmation modal to prevent accidental deletion
- Soft delete with confirmation step

### 5. Authentication (Bonus)
- User registration and login
- JWT-based session management
- User-specific entries (optional association)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check MySQL is running
   - Verify DATABASE_URL in .env file
   - Ensure database exists

2. **File Upload Issues**
   - Check uploads directory permissions
   - Verify file size limits (5MB max)
   - Ensure supported image formats (jpg, png, gif, webp)

3. **CORS Errors**
   - Check frontend URL in CORS configuration
   - Verify API_BASE_URL in frontend

4. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check Node.js version compatibility
   - Verify all environment variables are set

### Support

For support and questions, please create an issue in the repository.

## 📋 Step-by-Step Deployment Guide

### 🐙 GitHub Setup

1. **Create GitHub Repository**
   ```bash
   # Initialize git in your project folder
   git init
   git add .
   git commit -m "Initial commit: Favorite Movies App"
   
   # Create repository on GitHub and push
   git remote add origin https://github.com/kedar-bhatt-au49/favorite-movies-app.git
   git branch -M main
   git push -u origin main
   ```

2. **Repository Structure**
   ```
   favorite-movies-app/
   ├── .gitignore              # Git ignore file
   ├── README.md               # This documentation
   ├── package.json            # Root package.json
   ├── Procfile               # For Heroku deployment
   ├── Dockerfile             # For containerized deployment
   ├── vercel.json            # Vercel configuration
   ├── railway-build.sh       # Railway build script
   ├── railway-start.sh       # Railway start script
   ├── client/                # Frontend React app
   ├── server/                # Backend Express app
   └── docs/                  # Additional documentation
   ```

### 🚀 Railway Deployment (Recommended)

**Why Railway?** Full-stack deployment with database, simple setup, automatic builds.

1. **Prepare for Deployment**
   ```bash
   # Make scripts executable (Linux/Mac)
   chmod +x railway-build.sh railway-start.sh
   ```

2. **Deploy to Railway**
   - Go to [Railway](https://railway.app)
   - Sign up/Login with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your forked repository
   - Railway will auto-detect and deploy

3. **Environment Variables on Railway**
   ```env
   NODE_ENV=production
   JWT_SECRET=your_32_character_secret_key_here_for_production
   JWT_EXPIRES_IN=7d
   UPLOAD_DIR=uploads
   SEED_DATABASE=true
   ```

4. **Database Setup**
   - Railway provides PostgreSQL by default
   - Your DATABASE_URL will be automatically set
   - No additional configuration needed!

### 🔷 Vercel + Railway Split Deployment

**Frontend (Vercel) + Backend (Railway)**

1. **Deploy Backend to Railway**
   - Create new Railway project from `/server` folder only
   - Set environment variables as above
   - Note your Railway backend URL

2. **Deploy Frontend to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Set Root Directory to `client`
   - Add environment variable:
     ```env
     VITE_API_URL=https://your-app-name.railway.app/api
     ```

### 🎨 Alternative Deployment Options

#### Netlify + Render
1. **Frontend (Netlify)**
   ```bash
   # Build command
   npm run build
   
   # Publish directory
   dist
   
   # Environment variables
   VITE_API_URL=https://your-backend.onrender.com/api
   ```

2. **Backend (Render)**
   ```bash
   # Build command
   npm run build
   
   # Start command
   npm start
   
   # Add environment variables via Render dashboard
   ```

#### Heroku (if available)
```bash
# Create Heroku app
heroku create your-app-name

# Add database addon
heroku addons:create jawsdb:kitefin

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### 🗃️ Database Migration Guide

#### For MySQL/PlanetScale
```bash
# After deployment, run in production
npm run db:push

# Seed database (optional)
npm run db:seed
```

#### For PostgreSQL (Railway default)
```bash
# Update schema.prisma for PostgreSQL
# Change: provider = "mysql"
# To: provider = "postgresql"

# Then push schema
npm run db:push
npm run db:seed
```

### 🔍 Deployment Verification

1. **Check Backend Health**
   ```
   GET https://your-backend.railway.app/api/health
   
   Response: { "status": "ok", "timestamp": "..." }
   ```

2. **Test API Endpoints**
   ```
   GET https://your-backend.railway.app/api/entries
   POST https://your-backend.railway.app/api/auth/register
   ```

3. **Frontend Functionality**
   - Load the frontend URL
   - Test login/register (if auth enabled)
   - Add a new movie/TV show entry
   - Upload an image
   - Search and filter entries

### 🐛 Common Deployment Issues

1. **CORS Errors**
   ```javascript
   // In server/src/index.ts, update CORS config
   app.use(cors({
     origin: [
       'http://localhost:5173',
       'https://your-frontend.vercel.app',
       'https://your-custom-domain.com'
     ]
   }));
   ```

2. **Database Connection Issues**
   - Verify DATABASE_URL format
   - Check firewall settings
   - Ensure database service is running

3. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Environment Variables Not Loading**
   - Check variable names (case-sensitive)
   - Restart deployment after changes
   - Verify no extra spaces in values

### 📊 Monitoring Your Deployment

1. **Railway Dashboard**
   - View logs and metrics
   - Monitor database usage
   - Check build status

2. **Vercel Analytics**
   - Page views and performance
   - Error tracking
   - Build logs

### 🔄 Continuous Deployment

1. **Auto-deploy on GitHub push**
   - Railway and Vercel auto-deploy on main branch updates
   - Configure branch protection rules
   - Set up staging environments

2. **Environment-specific deployments**
   ```bash
   # Development branch → staging environment
   # Main branch → production environment
   ```

---

**Built with ❤️ using modern web technologies**
