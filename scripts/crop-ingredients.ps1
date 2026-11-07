Add-Type -AssemblyName System.Drawing

$assetsDir = "C:\Users\Windows\Desktop\Template Restaurante italiano\public\assets"
$ingFiles = Get-ChildItem -Path $assetsDir -Filter "ing-*.png"

foreach ($file in $ingFiles) {
    $bmp = [System.Drawing.Bitmap]::FromFile($file.FullName)
    $w = $bmp.Width
    $h = $bmp.Height
    
    # Find bounding box
    $minX = $w; $maxX = 0; $minY = $h; $maxY = 0
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            if ($bmp.GetPixel($x, $y).A -gt 10) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }
    
    # 8px margin
    $pad = 8
    $cropX = [Math]::Max(0, $minX - $pad)
    $cropY = [Math]::Max(0, $minY - $pad)
    $cropW = [Math]::Min($w - $cropX, ($maxX - $minX) + ($pad * 2))
    $cropH = [Math]::Min($h - $cropY, ($maxY - $minY) + ($pad * 2))
    
    # Scale to max 768px if larger
    $maxDim = 768
    $scale = 1.0
    if ($cropW -gt $maxDim -or $cropH -gt $maxDim) {
        $scale = [Math]::Min($maxDim / $cropW, $maxDim / $cropH)
    }
    $targetW = [int]($cropW * $scale)
    $targetH = [int]($cropH * $scale)
    
    $cropped = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($cropped)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)
    $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
    $g.DrawImage($bmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    
    $g.Dispose()
    $bmp.Dispose()
    
    # Save cropped PNG
    $tempPath = "$($file.FullName).tmp.png"
    $cropped.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    
    Move-Item -Path $tempPath -Destination $file.FullName -Force
    Write-Output "Optimized $($file.Name): $($cropW)x$($cropH) -> $($targetW)x$($targetH)"
}
