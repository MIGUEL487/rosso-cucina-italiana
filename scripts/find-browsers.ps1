$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$edge = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
Write-Output "Chrome exists: $(Test-Path $chrome)"
Write-Output "Edge exists: $(Test-Path $edge)"
