# Deployment Guide

This document provides detailed instructions for deploying the Favorite Movies & TV Shows application to various cloud platforms.

## 🚀 Quick Deployment Options

### Option 1: Railway (Recommended - Full Stack)
- **Pros**: One-click deployment, includes database, simple setup
- **Cons**: Limited free tier
- **Best for**: Production deployments, beginners

### Option 2: Vercel + Railway
- **Pros**: Optimal performance, Vercel's CDN for frontend
- **Cons**: Two separate deployments to manage
- **Best for**: High-traffic applications

### Option 3: Netlify + Render
- **Pros**: Good free tiers, reliable platforms
- **Cons**: Slightly more complex setup
- **Best for**: Portfolio projects, demos

## 📋 Pre-Deployment Checklist

- [ ] Code pushed to GitHub repository
- [ ] Environment files created (.env.example files exist)
- [ ] Database schema finalized
- [ ] API endpoints tested locally
- [ ] Frontend build works locally (`npm run build`)
- [ ] All dependencies listed in package.json

## 🛠️ Platform-Specific Instructions

### Railway Deployment

1. **Create Railway Account**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Project**
   ```bash
   # Option A: Railway CLI
   npm install -g @railway/cli
   railway login
   railway init
   railway up
   
   # Option B: GitHub Integration
   # Connect repository in Railway dashboard
   ```

3. **Environment Variables**
   ```env
   NODE_ENV=production
   JWT_SECRET=your-super-secure-32-char-secret
   JWT_EXPIRES_IN=7d
   PORT=5000
   UPLOAD_DIR=uploads
   SEED_DATABASE=true
   ```

4. **Database Setup**
   - Railway auto-provisions PostgreSQL
   - DATABASE_URL is automatically set
   - No manual configuration needed

### Vercel Frontend Deployment

1. **Connect Repository**
   ```bash
   # Install Vercel CLI (optional)
   npm i -g vercel
   cd client
   vercel --prod
   ```

2. **Configuration**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "installCommand": "npm install",
     "framework": "vite"
   }
   ```

3. **Environment Variables**
   ```env
   VITE_API_URL=https://your-backend.railway.app/api
   ```

### Render Backend Deployment

1. **Create Web Service**
   - Connect GitHub repository
   - Select server folder as root

2. **Build & Start Commands**
   ```bash
   # Build Command
   npm install && npm run build && npm run db:push

   # Start Command
   npm start
   ```

3. **Environment Variables**
   ```env
   DATABASE_URL=postgresql://user:pass@host:port/db
   NODE_ENV=production
   JWT_SECRET=your-secret-key
   PORT=10000
   ```

## 🗄️ Database Configuration

### PostgreSQL (Railway/Render Default)

1. **Update Prisma Schema**
   ```prisma
   datasource db {
     provider = "postgresql"  // Changed from "mysql"
     url      = env("DATABASE_URL")
   }
   ```

2. **Migration Commands**
   ```bash
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

### MySQL (PlanetScale/Aiven)

1. **PlanetScale Setup**
   ```bash
   # Install PlanetScale CLI
   npm install -g @planetscale/cli
   
   # Create database
   pscale database create favorite-movies
   
   # Get connection string
   pscale connect favorite-movies main --port 3309
   ```

2. **Connection String Format**
   ```env
   DATABASE_URL="mysql://user:password@host:port/database?sslaccept=strict"
   ```

## 🔐 Security Configuration

### JWT Secret Generation
```bash
# Generate secure JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### CORS Configuration
```javascript
// server/src/index.ts
app.use(cors({
  origin: [
    'http://localhost:5173',                    // Local development
    'https://your-app.vercel.app',             // Vercel deployment
    'https://your-custom-domain.com',          // Custom domain
    process.env.FRONTEND_URL                   // Environment variable
  ],
  credentials: true
}));
```

### Environment Variables Security
```env
# Use strong, unique values in production
JWT_SECRET=use-crypto-random-32-char-string-here
DATABASE_URL=postgresql://secure-connection-string
```

## 📊 Monitoring & Logging

### Railway Monitoring
- Built-in metrics dashboard
- Real-time logs viewing
- Resource usage tracking

### Vercel Analytics
```bash
# Enable Vercel Analytics
npm install @vercel/analytics
```

```javascript
// client/src/main.tsx
import { Analytics } from '@vercel/analytics/react';

<Analytics />
```

### Error Tracking
```bash
# Optional: Add Sentry for error tracking
npm install @sentry/react @sentry/node
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install and test
        run: |
          npm install
          cd client && npm install && npm run build
          cd ../server && npm install && npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Railway
        run: echo "Railway auto-deploys on push"
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache
   rm -rf node_modules package-lock.json
   npm install
   
   # Check Node.js version
   node --version  # Should be >= 18
   ```

2. **Database Connection Errors**
   ```bash
   # Test database connection
   npm run db:generate
   npx prisma db pull  # Verify connection
   ```

3. **Environment Variable Issues**
   ```bash
   # Check variable loading
   console.log('DATABASE_URL:', process.env.DATABASE_URL);
   ```

4. **CORS Errors**
   ```javascript
   // Add to server configuration
   app.use(cors({
     origin: true,  // Temporary for debugging
     credentials: true
   }));
   ```

### Performance Optimization

1. **Frontend Optimizations**
   ```javascript
   // vite.config.ts
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             router: ['react-router-dom']
           }
         }
       }
     }
   });
   ```

2. **Backend Optimizations**
   ```javascript
   // Enable gzip compression
   app.use(compression());
   
   // Add response caching
   app.use('/api/entries', cache('5 minutes'));
   ```

## 📈 Scaling Considerations

### Database Scaling
- Connection pooling with Prisma
- Read replicas for heavy read workloads
- Database indexing for search performance

### File Upload Scaling
- Use cloud storage (AWS S3, Cloudinary) for production
- Implement image optimization
- Add CDN for static assets

### Application Scaling
- Horizontal scaling with load balancers
- Containerization with Docker
- Microservices architecture for larger applications

## 🔗 Useful Links

- [Railway Documentation](https://docs.railway.app)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

## 💡 Tips for Production

1. **Monitor your application** regularly
2. **Set up alerts** for downtime or errors
3. **Keep dependencies updated** for security
4. **Use environment-specific configurations**
5. **Implement proper logging** for debugging
6. **Regular database backups**
7. **SSL certificates** for custom domains
