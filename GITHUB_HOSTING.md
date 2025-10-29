# 🚀 GitHub Hosting & Deployment Guide

## Quick Start - GitHub Repository Setup

### 1. Create GitHub Repository

1. **Go to GitHub** and create a new repository named `favorite-movies-app`
2. **Clone this project** or upload the files
3. **Push your code** to GitHub:

```bash
# If starting fresh
git init
git add .
git commit -m "🎬 Initial commit: Favorite Movies App"
git branch -M main
git remote add origin https://github.com/kedar-bhatt-au49/favorite-movies-app.git
git push -u origin main
```

### 2. Quick Deploy Options

#### Option A: One-Click Railway Deploy ⚡
1. [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/github.com/kedar-bhatt-au49/favorite-movies-app)
2. Connect your GitHub repository
3. Set environment variables (see below)
4. Deploy automatically!

#### Option B: Vercel + Railway Split Deploy 🔄
**Frontend (Vercel):**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kedar-bhatt-au49/favorite-movies-app/tree/main/client)

**Backend (Railway):**
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/github.com/kedar-bhatt-au49/favorite-movies-app)

## 🎯 Live Demo

- **🌐 Frontend**: [https://favorite-movies-kedar.vercel.app](https://favorite-movies-kedar.vercel.app)
- **⚙️ Backend API**: [https://favorite-movies-api-kedar.railway.app](https://favorite-movies-api-kedar.railway.app)
- **📊 API Health Check**: [https://favorite-movies-api-kedar.railway.app/api/health](https://favorite-movies-api-kedar.railway.app/api/health)

## 🔑 Demo Credentials

For testing authentication features:
```
Email: demo@example.com
Password: password123
```

Or register a new account to test the full experience!

## 🗄️ Database Schema

The application uses **Prisma ORM** with support for both **MySQL** and **PostgreSQL**:

### User Model
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

### Entry Model
```prisma
model Entry {
  id          String   @id @default(cuid())
  title       String
  type        String   // "MOVIE" or "TV_SHOW"
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
```

### Sample Seed Data 🌱

The app comes pre-loaded with sample data:
- **Movies**: The Matrix, Inception, Pulp Fiction, The Shawshank Redemption
- **TV Shows**: Breaking Bad, Game of Thrones, The Office, Friends
- **Demo User**: For testing authentication features

## 🚀 Deployment Platforms

### Railway (Recommended) 🚂

**Why Railway?**
- ✅ One-click full-stack deployment
- ✅ Built-in PostgreSQL database
- ✅ Automatic builds from GitHub
- ✅ Simple environment management
- ✅ Great free tier

**Steps:**
1. Go to [Railway.app](https://railway.app)
2. Connect GitHub repository
3. Auto-deploy with default settings
4. Add environment variables

**Environment Variables:**
```env
NODE_ENV=production
JWT_SECRET=your-32-character-secret-key
UPLOAD_DIR=uploads
```

### Vercel + Railway Split 🔄

**Frontend on Vercel:**
- ⚡ Lightning-fast CDN
- 🔧 Automatic builds from GitHub
- 🌍 Global edge network

**Backend on Railway:**
- 🗄️ Built-in database
- 🚀 Easy API deployment
- 📊 Simple monitoring

### Other Platforms

| Platform | Frontend | Backend | Database | Free Tier |
|----------|----------|---------|----------|-----------|
| Railway | ✅ | ✅ | ✅ PostgreSQL | 500 hours |
| Vercel | ✅ | ✅ (Serverless) | ❌ | Generous |
| Netlify | ✅ | ✅ (Functions) | ❌ | 100GB |
| Render | ✅ | ✅ | ✅ PostgreSQL | 750 hours |
| Heroku | ✅ | ✅ | ✅ PostgreSQL | Limited |

## ⚙️ Environment Configuration

### Backend (.env)
```env
# Database (auto-provided by Railway)
DATABASE_URL=postgresql://user:pass@host:port/db

# Server
PORT=5000
NODE_ENV=production

# Authentication
JWT_SECRET=your_super_secure_32_character_secret_key_here
JWT_EXPIRES_IN=7d

# File Uploads
UPLOAD_DIR=uploads

# CORS (add your frontend domains)
CORS_ORIGIN=https://your-frontend.vercel.app,https://custom-domain.com
```

### Frontend (.env)
```env
# API URL (your deployed backend)
VITE_API_URL=https://your-backend.railway.app/api
```

## 🛠️ Database Setup

### PostgreSQL (Railway Default)
```bash
# Automatic setup - no configuration needed!
# DATABASE_URL is automatically provided
```

### MySQL (PlanetScale/Aiven)
```bash
# Update schema.prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

# Run migrations
npm run db:push
npm run db:seed
```

### Local Development
```bash
# Install dependencies
npm run setup

# Set up database
cd server
npm run db:generate
npm run db:push
npm run db:seed

# Start development
npm run dev
```

## 🔒 Production Security Checklist

- [ ] Strong JWT secret (32+ characters)
- [ ] Secure database credentials
- [ ] CORS configured for production domains
- [ ] Environment variables properly set
- [ ] HTTPS enabled (automatic on Vercel/Railway)
- [ ] File upload limits configured
- [ ] Input validation on all endpoints

## 📊 Monitoring & Analytics

### Built-in Features
- **Health Check Endpoint**: `/api/health`
- **Error Handling**: Comprehensive error responses
- **Request Logging**: Server request logs
- **Database Monitoring**: Prisma query insights

### Optional Additions
```bash
# Vercel Analytics
npm install @vercel/analytics

# Sentry Error Tracking
npm install @sentry/react @sentry/node
```

## 🔄 Continuous Deployment

### Automatic Deployment
- **GitHub → Railway**: Auto-deploy on push to main
- **GitHub → Vercel**: Auto-deploy on push to main
- **Branch Protection**: Set up staging environments

### Manual Deployment
```bash
# Railway CLI
npm install -g @railway/cli
railway login
railway deploy

# Vercel CLI
npm install -g vercel
cd client && vercel --prod
```

## 🆘 Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Database Connection**
   ```bash
   # Check DATABASE_URL format
   # Ensure database service is running
   npm run db:generate
   ```

3. **CORS Errors**
   ```javascript
   // Update server CORS configuration
   app.use(cors({
     origin: ['https://your-frontend.vercel.app']
   }));
   ```

4. **Environment Variables**
   - Check variable names (case-sensitive)
   - Restart deployment after changes
   - No spaces in values

### Getting Help
- 🐛 [Create an Issue](https://github.com/kedar-bhatt-au49/favorite-movies-app/issues)
- 💬 [GitHub Discussions](https://github.com/kedar-bhatt-au49/favorite-movies-app/discussions)
- 📧 [Contact Support](mailto:kedar.bhatt@example.com)

## 📈 Performance Tips

### Frontend Optimization
- Image optimization with Vercel
- Code splitting for faster loads
- Service worker for offline support

### Backend Optimization
- Database connection pooling
- API response caching
- File compression for uploads

### Database Optimization
- Proper indexing for search queries
- Connection pooling
- Query optimization

## 🎉 Ready to Deploy?

1. **⭐ Star this repository**
2. **🍴 Fork the project**
3. **🚀 Deploy to Railway/Vercel**
4. **🎬 Start managing your favorite movies!**

---

**🔗 Quick Links:**
- [📖 Full Documentation](README.md)
- [🚀 Deployment Guide](DEPLOYMENT.md)
- [🤝 Contributing Guidelines](CONTRIBUTING.md)
- [📝 License](LICENSE)

**Built with ❤️ by developers, for movie lovers!**
