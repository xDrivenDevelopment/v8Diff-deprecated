//Исправь, на правильный путь. 
//var pathTo1C = "c:\\Program Files (x86)\\1cv82\\8.2.15.319\\bin\\1cv8.exe";
////var pathToBase = "d:\\WORK\\1C\\diff1c\\basediff";
//var pathToBase = "d:\\WORK\\repository\\repo\\git\\antbuild\\ibService";
var pathTo1C = "c:\\Program Files (x86)\\1cv82\\8.2.19.73\\bin\\1cv8.exe";
var pathToBase = "C:\\Cmd\\v8Diff\\ibService";
var pathToV8reader = "C:\\Cmd\\v8Diff\\V8Reader.epf";

objArgs = WScript.Arguments;
num = objArgs.length;
if (num < 2)
{
   WScript.Echo("Usage: [CScript | WScript] diff-doc.js base.doc new.doc");
   WScript.Quit(1);
}

sBaseDoc = objArgs(0).replace(/\//g, '\\');
sNewDoc = objArgs(1).replace(/\//g, '\\');

sBaseDoc = sBaseDoc.replace(/\"/g, '');
sNewDoc = sNewDoc.replace(/\//g, '\\');

var WshShell = WScript.CreateObject ("WScript.Shell");
WScript.Echo (WshShell.CurrentDirectory);

WScript.Echo("File " + sBaseDoc + " ");
WScript.Echo("File " + sNewDoc + " ");

objScript = new ActiveXObject("Scripting.FileSystemObject");

if ( ! objScript.FileExists(sBaseDoc))
{
	//sBaseDoc = objScript.GetAbsolutePathName(WshShell.CurrentDirectory + sBaseDoc)
//WScript.Echo("File " + sBaseDoc + " ");
	//if ( ! objScript.FileExists(sBaseDoc))
	//{
	    WScript.Echo("File " + sBaseDoc + " does not exist.  Cannot compare the documents.");
	    WScript.Quit(1);
	//}
}
if ( ! objScript.FileExists(sNewDoc))
{
	//sNewDoc = objScript.GetAbsolutePathName(WshShell.CurrentDirectory + sNewDoc) //".\\"
//WScript.Echo("File " + sNewDoc + " ");
	//if ( ! objScript.FileExists(sNewDoc))
	//{
	    WScript.Echo("File " + sNewDoc + " does not exist.  Cannot compare the documents.");
	    WScript.Quit(1);
	//}
}

//Теперь запишем пути к файлам во вспомогательный файл. 
var tfolder, tfile, tname, fname, TemporaryFolder = 2;
var file1 = objScript.GetFile(sBaseDoc);
var file2 = objScript.GetFile(sNewDoc);
WScript.Echo("file1.Name =" + file1.Name);
WScript.Echo("file2.Name =" + file2.Name);

tfolder = objScript.GetSpecialFolder(TemporaryFolder);
var Name2 = file2.Name;
if (file1.Name==file2.Name) {
    tname = objScript.GetTempName();
    Name2 = tname.replace(".", "") +"_"+ Name2
    WScript.Echo("Name2 =" + Name2);
}
var NewsBaseDoc = objScript.buildPath(tfolder, file1.Name);
var NewsNewDoc = objScript.buildPath(tfolder, Name2);
WScript.Echo("NewsBaseDoc =" + NewsBaseDoc);
if (NewsBaseDoc != sBaseDoc) {
	if (objScript.FileExists(NewsBaseDoc))
		objScript.DeleteFile(NewsBaseDoc, true);
	objScript.CopyFile(sBaseDoc, NewsBaseDoc);
}

WScript.Echo("NewsNewDoc =" + NewsNewDoc);
if (NewsNewDoc != sNewDoc) {
	if (objScript.FileExists(NewsNewDoc))
		objScript.DeleteFile(NewsNewDoc, true);
	objScript.CopyFile(sNewDoc, NewsNewDoc);
}

tname = objScript.GetTempName();
tempfile = tfolder.CreateTextFile(tname,true,true);
tempfile.writeline(NewsBaseDoc);
tempfile.writeline(NewsNewDoc);
tempfile.close();


var WshShell = new ActiveXObject("WScript.Shell");
var cmd = '"'+pathTo1C+'" enterprise /F"'+pathToBase+'" /C"diff;'+objScript.GetAbsolutePathName(objScript.BuildPath(tfolder.path, tname))+';" /Execute"'+pathToV8reader+'"' ;
WScript.Echo("cmd = " + cmd);

err = WshShell.Run(cmd, 1, true);//2

//var i = 0;
//while (i < 50) {
//    i=i+1;
//    //WScript.Echo(oExec.Status);
//    WScript.sleep(100);
//}
//WScript.sleep(100 * 50);

if (objScript.FileExists(NewsBaseDoc))
	objScript.DeleteFile(NewsBaseDoc, true);
if (objScript.FileExists(NewsNewDoc))
	objScript.DeleteFile(NewsNewDoc, true);

file1 = null;
file2 = null;
