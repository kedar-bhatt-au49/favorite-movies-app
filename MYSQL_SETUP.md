# MySQL Deployment Guide for Render

Since Render doesn't provide managed MySQL service, you have several options:

## Option 1: PlanetScale (Recommended for MySQL)
1. Go to https://planetscale.com
2. Create free account
3. Create new database: `favorite-movies`
4. Get connection string
5. Add to Render environment variables

## Option 2: Railway MySQL
1. Go to https://railway.app  
2. Create MySQL service
3. Get connection string
4. Use with Render web service

## Option 3: External MySQL Providers
- **AWS RDS**: Production-ready MySQL
- **Google Cloud SQL**: Managed MySQL
- **DigitalOcean Managed MySQL**: Simple setup
- **FreeSQLDatabase.com**: Free MySQL hosting

## Connection String Format
```
DATABASE_URL="mysql://username:password@host:port/database_name"
```

## Current Setup
- Prisma schema configured for MySQL
- All queries compatible with MySQL
- Ready to connect to any MySQL database

## Environment Variables Needed
```
NODE_ENV=production
PORT=10000
DATABASE_URL=mysql://your-connection-string
JWT_SECRET=your-secret-key
```

## Deployment Steps
1. Choose MySQL provider
2. Create database 
3. Update DATABASE_URL in Render
4. Deploy - tables will be created automatically
