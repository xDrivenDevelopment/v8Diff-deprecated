@echo off
rem путь к diff-1c-cf луше сделать полным.
rem если svn текущий путь ставит там где bat, то bzr временный. 
rem echo %1 
rem echo %2
rem echo %3
rem echo %CD%\%1

rem start "" /min cscript.exe C:\Cmd\v8Diff\diff-1c-cf.js %1 %2 %3
If Exist "%CD%\%1" ( 
	REM start "" /min /WAIT 
	cscript.exe %~dp0\diff-1c-cf.js %CD%\%1 %2 %3
) Else (
	REM start "" /min 
	cscript.exe %~dp0\diff-1c-cf.js %1 %2 %3
)

rem 
pause