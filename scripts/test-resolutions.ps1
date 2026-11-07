$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$url = "https://rosso-cucina-italiana.mi-c-openheimer.workers.dev"
$outDir = "C:\Users\Windows\Desktop\Template Restaurante italiano\test_screenshots"

if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$resolutions = @(
    @{ w = 1920; h = 1080; name = "desktop-1920" },
    @{ w = 1366; h = 768;  name = "laptop-1366" },
    @{ w = 1280; h = 720;  name = "desktop-1280" },
    @{ w = 390;  h = 844;  name = "mobile-390" }
)

foreach ($res in $resolutions) {
    $shotPath = Join-Path $outDir "$($res.name)-hero.png"
    Write-Output "Capturing screenshot for $($res.name) ($($res.w)x$($res.h))..."
    & $chrome --headless --disable-gpu --virtual-time-budget=5000 --window-size="$($res.w),$($res.h)" --screenshot="$shotPath" $url
    Write-Output "Saved: $shotPath"
}

Write-Output "All screenshots captured successfully!"
