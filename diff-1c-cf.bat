@echo off
rem путь к diff-1c-cf луше сделать полным.
rem если svn текущий путь ставит там где bat, то bzr временный. 

If Exist "%CD%\%1" ( 
	cscript.exe %~dp0\diff-1c-cf.js %CD%\%1 %2 %3
) Else (
	cscript.exe %~dp0\diff-1c-cf.js %1 %2 %3
)

rem pause