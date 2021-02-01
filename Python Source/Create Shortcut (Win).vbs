Set Shell = CreateObject("WScript.Shell")
scriptdir = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
DesktopPath = Shell.SpecialFolders("Desktop")
Set link = Shell.CreateShortcut(DesktopPath & "\Kerbal Telemetry.lnk")
link.Description = "Kerbal Telemetry Server Interface"
link.IconLocation = scriptdir + "\logo.ico"
link.TargetPath = scriptdir + "\TelemetryServer.py"
link.WorkingDirectory = scriptdir
link.Save