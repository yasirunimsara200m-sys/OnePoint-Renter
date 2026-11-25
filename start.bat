@echo off
echo ========================================================
echo   Launching OnePoint Renter (Full Project)
echo   Backend:  http://localhost:5000 (Swagger: /api/docs)
echo   Frontend: http://localhost:3000 (Customer & Admin)
echo ========================================================
echo.

start "OnePoint Backend (NestJS)" cmd /k "cd backend && npm run start:dev"
start "OnePoint Frontend (NextJS)" cmd /k "cd frontend && npm run dev"

echo Both Backend and Frontend services have been launched in separate windows!
echo Open your browser at: http://localhost:3000
echo Admin Portal at:      http://localhost:3000/opv-admin
echo.
pause
