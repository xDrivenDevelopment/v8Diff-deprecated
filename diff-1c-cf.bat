@echo off
rem ���� � diff-1c-cf ��� ᤥ���� �����.
rem �᫨ svn ⥪�騩 ���� �⠢�� ⠬ ��� bat, � bzr �६����. 

If Exist "%CD%\%1" ( 
	cscript.exe %~dp0\diff-1c-cf.js %CD%\%1 %2 %3
) Else (
	cscript.exe %~dp0\diff-1c-cf.js %1 %2 %3
)

rem pause