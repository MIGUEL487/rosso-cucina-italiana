$shot = "C:\Users\Windows\Desktop\Template Restaurante italiano\test_screenshots\shot.png"
$url = "https://rosso-cucina-italiana.mi-c-openheimer.workers.dev"
$profile = "C:\Users\Windows\AppData\Local\Temp\edge_test_profile"

if (!(Test-Path $profile)) {
    New-Item -ItemType Directory -Path $profile -Force | Out-Null
}

$edgeArgs = @(
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--user-data-dir=$profile",
    "--virtual-time-budget=6000",
    "--run-all-compositor-stages-before-draw",
    "--window-size=1920,1080",
    "--screenshot=$shot",
    $url
)

$p = Start-Process -FilePath "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" -ArgumentList $edgeArgs -Wait -PassThru
Write-Output "Edge ExitCode: $($p.ExitCode)"
Get-ChildItem "C:\Users\Windows\Desktop\Template Restaurante italiano\test_screenshots"
