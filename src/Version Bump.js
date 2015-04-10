function executeCommands(input)
{
    var oShell = new ActiveXObject("Shell.Application");
    
    var command = "C:\\Winnt\\Notepad.exe";
    
    if(input != "")
    {
        var commandParams = document.Form1.filename.value
    }
    
    oShell.ShellExecute(command, commandParams, "", "open", "1");
}