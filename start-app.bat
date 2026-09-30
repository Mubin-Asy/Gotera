@echo off
echo ===================================================
echo Starting GOTERA National Food Reserve System...
echo ===================================================

echo [1/2] Starting Backend Server (Port 5000)...
start "Gotera Backend Server" cmd /k "cd server && npm start"

timeout /t 2 /nobreak >nul

echo [2/2] Starting Frontend Vite Server (Port 5173)...
start "Gotera Client Web" cmd /k "cd client && npm run dev"

timeout /t 2 /nobreak >nul
echo Opening application in your default browser...
start http://localhost:5173/

echo ===================================================
echo GOTERA is running!
echo Frontend: http://localhost:5173/
echo Backend API: http://localhost:5000/
echo ===================================================
pause
