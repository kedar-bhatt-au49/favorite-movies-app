#!/bin/bash

# Quick MySQL Setup with Railway
echo "🚀 Setting up MySQL database on Railway..."

echo "📋 Steps to follow:"
echo "1. Go to https://railway.app"
echo "2. Login with GitHub"
echo "3. Create new project"
echo "4. Add MySQL service"
echo "5. Copy DATABASE_URL from Railway"
echo "6. Add to Render environment variables"

echo ""
echo "🔗 Railway MySQL Database URL format:"
echo "mysql://root:password@containers-us-west-x.railway.app:port/railway"

echo ""
echo "📝 Add this to Render environment variables:"
echo "DATABASE_URL=<your-railway-mysql-url>"
echo "NODE_ENV=production"
echo "PORT=10000"
echo "JWT_SECRET=mySecretKey123"

echo ""
echo "✅ After adding environment variables, redeploy on Render"
