@echo off
echo Starting Cursor.ai cleanup...

echo.
echo 1. Checking for Cursor installation in Programs...
powershell -Command "Get-AppxPackage *Cursor* | Remove-AppxPackage"

echo.
echo 2. Removing application data...
rmdir /s /q "%LOCALAPPDATA%\Programs\Cursor" 2>nul
rmdir /s /q "%APPDATA%\Cursor" 2>nul
rmdir /s /q "%LOCALAPPDATA%\Cursor" 2>nul

echo.
echo 3. Cleaning registry...
reg delete "HKEY_CURRENT_USER\Software\Cursor" /f 2>nul
reg delete "HKEY_LOCAL_MACHINE\SOFTWARE\Cursor" /f 2>nul

echo.
echo 4. Removing VS Code integration...
rmdir /s /q "%USERPROFILE%\.vscode\extensions\cursor-vscode" 2>nul
for /d %%i in ("%USERPROFILE%\.vscode\extensions\cursor*") do rmdir /s /q "%%i"

echo.
echo 6. Cleaning temporary files...
del /s /q "%TEMP%\cursor*" 2>nul
cleanmgr /sagerun:1

echo.
echo Cleanup complete! Please restart your computer for changes to take full effect.
pause