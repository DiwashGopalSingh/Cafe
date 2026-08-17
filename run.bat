@echo off
title Copper Kettle Cafe
cd /d "%~dp0"

echo ===================================================
echo   Starting Copper Kettle Cafe Website...
echo ===================================================
echo.

:: Open default web browser pointing to local dev server
echo Opening http://localhost:3000 in your browser...
start "" "http://localhost:3000"

:: Run the Vite development server
echo Starting Vite development server...
call npm run dev

pause
