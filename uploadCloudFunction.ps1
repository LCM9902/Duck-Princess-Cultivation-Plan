$env:path = "C:\Program Files (x86)\Tencent\微信web开发者工具\"
$envId = "$(Get-Content .\miniprogram\envList.js -First 1 | ForEach-Object { $_.substring(16) } | ConvertFrom-Json | ForEach-object { $_.envId })"
cli.bat cloud functions deploy --e $envId --n quickstartFunctions --r --project "$PSScriptRoot" --report_first --report
pause
