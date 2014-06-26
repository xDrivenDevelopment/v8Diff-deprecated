//Исправь, на правильный путь. 
var pathTo1C = "c:\\Program Files (x86)\\1cv82\\8.2.19.73\\bin\\1cv8.exe";
//var pathTo1C = "c:\\Program Files (x86)\\1cv82\\8.2.19.73\\bin\\1cv8s.exe";
var pathToBase = "C:\\Cmd\\v8Diff\\ibService";

objArgs = WScript.Arguments;
num = objArgs.length;
if (num < 2)
{
   WScript.Echo("Usage: [CScript | WScript] diff-doc.js base.doc new.doc");
   WScript.Quit(1);
}

sBaseDoc = objArgs(0).replace(/\//g, '\\');
sNewDoc = objArgs(1).replace(/\//g, '\\');

objScript = new ActiveXObject("Scripting.FileSystemObject");
if ( ! objScript.FileExists(sBaseDoc))
{
    WScript.Echo("File " + sBaseDoc + " does not exist.  Cannot compare the documents.");
    WScript.Quit(1);
}
if ( ! objScript.FileExists(sNewDoc))
{
    WScript.Echo("File " + sNewDoc + " does not exist.  Cannot compare the documents.");
    WScript.Quit(1);
}

//Теперь запишем пути к файлам во вспомогательный файл. 
var tfolder, tfile, tname, fname, TemporaryFolder = 2;
var file1 = objScript.GetFile(sBaseDoc);
var file2 = objScript.GetFile(sNewDoc);
tfolder = objScript.GetSpecialFolder(TemporaryFolder);
var Name2 = file2.Name;
if (file1.Name==file2.Name) {
    tname = objScript.GetTempName();
    Name2 = tname.replace(".", "") +"_"+ Name2
}
var NewsBaseDoc = objScript.buildPath(tfolder, file1.Name);
var NewsNewDoc = objScript.buildPath(tfolder, Name2);
objScript.CopyFile(sBaseDoc, NewsBaseDoc);
objScript.CopyFile(sNewDoc, NewsNewDoc);
tname = objScript.GetTempName();
tempfile = tfolder.CreateTextFile(tname,true,true);
tempfile.writeline(NewsBaseDoc);
tempfile.writeline(NewsNewDoc);
tempfile.close();


var WshShell = new ActiveXObject("WScript.Shell");
var cmd = '"'+pathTo1C+'" enterprise /F"'+pathToBase+'" /C"'+objScript.GetAbsolutePathName(objScript.BuildPath(tfolder.path, tname))+'" ' ;

WScript.Echo(cmd);

err = WshShell.Run(cmd, 2,true);

var i = 0;
while (i < 50) {
    i=i+1;
    //WScript.Echo(oExec.Status);
    WScript.sleep(100);
}
file1 = null;
file2 = null;
