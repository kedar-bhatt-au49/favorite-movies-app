# Render Deployment Guide

## Quick Setup (Recommended)

### Method 1: One-Click Deploy
1. Visit: https://render.com
2. Sign up with GitHub account
3. Click "New" → "Blueprint"
4. Connect your GitHub repository: `kedar-bhatt-au49/favorite-movies-app`
5. Render will automatically detect `render.yaml` and deploy both web service and database

### Method 2: Manual Setup

#### Step 1: Create PostgreSQL Database
1. Go to Render Dashboard
2. Click "New" → "PostgreSQL"
3. Name: `favorite-movies-db`
4. Database: `favorite_movies`
5. Username: `favorite_movies_user`
6. Click "Create Database"
7. Copy the **Internal Database URL** (starts with `postgresql://`)

#### Step 2: Create Web Service
1. Click "New" → "Web Service"
2. Connect GitHub repo: `kedar-bhatt-au49/favorite-movies-app`
3. Fill details:
   - **Name**: `favorite-movies-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build && npm run db:generate`
   - **Start Command**: `npm start`

#### Step 3: Environment Variables
Add these in Render dashboard:
```
NODE_ENV=production
PORT=10000
DATABASE_URL=[paste your Internal Database URL]
JWT_SECRET=[generate a secure random string]
```

#### Step 4: Deploy
1. Click "Create Web Service"
2. Render will automatically build and deploy
3. Your backend URL will be: `https://favorite-movies-backend.onrender.com`

## Environment Variables Needed

```bash
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key
```

## Features
- ✅ Auto-deploy on GitHub push
- ✅ Free PostgreSQL database (512MB)
- ✅ Free web service (750 hours/month)
- ✅ HTTPS enabled by default
- ✅ Custom domain support
- ✅ Built-in monitoring and logs

## After Deployment
1. Your backend will be live at: `https://[your-service-name].onrender.com`
2. Update frontend environment variable `VITE_API_URL` to point to your Render URL
3. Test API endpoints:
   - Health check: `https://[your-service-name].onrender.com/api/health`
   - API docs: Available in your application

## Troubleshooting
- Check logs in Render dashboard
- Database migrations run automatically on deploy
- Free tier may have cold starts (30-second delay)
- Upgrade to paid plan for better performance

## Cost
- **Free Tier**: 750 hours/month web service + 512MB PostgreSQL
- **Paid Tier**: $7/month for always-on service + faster database
