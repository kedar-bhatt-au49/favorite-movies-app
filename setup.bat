@echo off
echo 🎬 Setting up Favorite Movies & TV Shows App...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js v18 or higher.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Install root dependencies
echo 📦 Installing root dependencies...
npm install

REM Setup server
echo 🔧 Setting up server...
cd server

REM Install server dependencies
npm install

REM Check if .env exists
if not exist .env (
    echo 📝 Creating server .env file...
    copy .env.example .env
    echo ⚠️  Please update the DATABASE_URL in server\.env with your MySQL credentials
)

REM Generate Prisma client
echo 🗄️  Generating Prisma client...
npm run db:generate

echo 📊 Database schema ready. Please ensure your MySQL database is running and run:
echo    cd server ^&^& npm run db:push ^&^& npm run db:seed

cd ..

REM Setup client
echo 🎨 Setting up client...
cd client

REM Install client dependencies
npm install

REM Check if .env exists
if not exist .env (
    echo 📝 Creating client .env file...
    copy .env.example .env
)

cd ..

echo.
echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo 1. Ensure MySQL is running
echo 2. Update server\.env with your database credentials
echo 3. Run database setup: cd server ^&^& npm run db:push ^&^& npm run db:seed
echo 4. Start development: npm run dev
echo.
echo 🌐 The app will be available at:
echo    Frontend: http://localhost:5173
echo    Backend: http://localhost:5000
echo.
pause
