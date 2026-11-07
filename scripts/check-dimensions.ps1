Add-Type -AssemblyName System.Drawing

$names = @('hero-fork-twirl.png', 'hero-fork-empty.png', 'hero-twirl-only.png', 'spiral-spaghetti.png', 'plate-dish.png')
foreach ($name in $names) {
    $path = "C:\Users\Windows\Desktop\Template Restaurante italiano\public\assets\$name"
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    
    # Calculate bounding box of non-transparent pixels (Alpha > 20)
    $minX = $bmp.Width; $maxX = 0; $minY = $bmp.Height; $maxY = 0
    for ($y = 0; $y -lt $bmp.Height; $y += 5) {
        for ($x = 0; $x -lt $bmp.Width; $x += 5) {
            if ($bmp.GetPixel($x, $y).A -gt 20) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    
    Write-Output "$name : $($bmp.Width)x$($bmp.Height) | Box: ($minX, $minY) to ($maxX, $maxY)"
    $bmp.Dispose()
}
