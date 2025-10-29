@echo off
setlocal enabledelayedexpansion

echo 🎬 Favorite Movies App - Deployment Helper
echo ==========================================

REM Function to check if command exists
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ git is not installed. Please install git first.
    pause
    exit /b 1
)

echo ✅ All prerequisites are installed!

REM Show Node.js version
for /f "tokens=*" %%i in ('node --version') do set node_version=%%i
echo 📋 Node.js version: !node_version!

REM Check if we're in a git repository
if not exist ".git" (
    echo ⚠️  This doesn't appear to be a git repository.
    echo 💡 Initialize git with: git init
    echo 💡 Add remote with: git remote add origin https://github.com/yourusername/favorite-movies-app.git
)

:main_menu
echo.
echo 🚀 Choose your deployment option:
echo 1. Railway (Full-stack, includes database)
echo 2. Vercel + Railway (Frontend on Vercel, Backend on Railway)
echo 3. Local development setup only
echo 4. Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto railway_deploy
if "%choice%"=="2" goto split_deploy
if "%choice%"=="3" goto local_setup
if "%choice%"=="4" goto exit_script

echo ❌ Invalid choice. Please try again.
goto main_menu

:install_deps
echo 📦 Installing dependencies...
call npm install
cd server
call npm install
cd ..
cd client
call npm install
cd ..
echo ✅ Dependencies installed successfully!
exit /b 0

:build_app
echo 🔨 Building application...
cd server
call npm run build
cd ..
cd client
call npm run build
cd ..
echo ✅ Application built successfully!
exit /b 0

:setup_env
echo ⚙️ Setting up environment files...
if not exist "server\.env" (
    copy "server\.env.example" "server\.env" >nul
    echo 📝 Please edit server\.env with your database credentials
    echo    Example: DATABASE_URL="mysql://user:password@localhost:3306/favorite_movies_db"
)
if not exist "client\.env" (
    copy "client\.env.example" "client\.env" >nul
    echo 📝 Please edit client\.env with your API URL
    echo    Example: VITE_API_URL=http://localhost:5000/api
)
echo ✅ Environment files created!
exit /b 0

:setup_database
echo 🗄️ Setting up database...
cd server
call npm run db:generate
call npm run db:push
set /p seed_choice="Do you want to seed the database with sample data? (y/n): "
if /i "%seed_choice%"=="y" (
    call npm run db:seed
    echo ✅ Database seeded with sample data!
)
cd ..
echo ✅ Database setup completed!
exit /b 0

:railway_deploy
echo 🚂 Setting up for Railway deployment...
call :install_deps
call :build_app
echo.
echo 🚂 To complete Railway deployment:
echo 1. Install Railway CLI: npm install -g @railway/cli
echo 2. Login: railway login
echo 3. Initialize: railway init
echo 4. Deploy: railway up
echo.
echo 💡 Or use the Railway web interface at https://railway.app
goto end_script

:split_deploy
echo 🔄 Setting up for split deployment...
call :install_deps
call :build_app
echo.
echo 📋 Next steps for split deployment:
echo.
echo Backend (Railway):
echo 1. Go to https://railway.app
echo 2. Connect your GitHub repository
echo 3. Deploy the /server folder
echo.
echo Frontend (Vercel):
echo 1. Go to https://vercel.com
echo 2. Connect your GitHub repository
echo 3. Set root directory to 'client'
echo 4. Add environment variable: VITE_API_URL=https://your-backend.railway.app/api
goto end_script

:local_setup
echo 💻 Setting up for local development...
call :setup_env
call :install_deps
call :setup_database
echo.
echo ✅ Local setup completed!
echo 🚀 Start development with: npm run dev
echo 📝 Don't forget to update your .env files!
goto end_script

:exit_script
echo 👋 Goodbye!
exit /b 0

:end_script
echo.
echo 🎉 Deployment script completed!
echo.
echo 📚 Additional Resources:
echo    • README.md - Complete documentation
echo    • DEPLOYMENT.md - Detailed deployment guide
echo    • GitHub repository for issues and updates
echo.
echo 🆘 Need help? Create an issue on GitHub!
echo.
pause
exit /b 0
