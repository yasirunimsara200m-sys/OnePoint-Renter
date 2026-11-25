@echo off
echo ========================================================
echo   OnePoint Renter - Sri Lanka Bike & Scooter Rental
echo           Full Stack Project Auto Setup
echo ========================================================
echo.

echo [1/3] Installing Backend Dependencies (Nest.js + Prisma)...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install backend dependencies.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] Generating Prisma Client...
call npx prisma generate
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Prisma generate encountered an issue. Check schema.
)

echo.
echo [3/3] Installing Frontend Dependencies (Next.js + Tailwind)...
cd ..\frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install frontend dependencies.
    pause
    exit /b %ERRORLEVEL%
)

cd ..
echo.
echo ========================================================
echo   SUCCESS! All dependencies installed successfully.
echo   You can now run 'start.bat' to launch the project!
echo ========================================================
pause
