Add-Type -AssemblyName System.Drawing

$files = Get-ChildItem "C:\Users\Windows\Desktop\Template Restaurante italiano\extracted_assets\*.png"
foreach ($f in $files) {
    $bmp = [System.Drawing.Bitmap]::FromFile($f.FullName)
    $w = $bmp.Width
    $h = $bmp.Height
    
    $cTL = $bmp.GetPixel(0, 0)
    $cTR = $bmp.GetPixel($w - 1, 0)
    $cBL = $bmp.GetPixel(0, $h - 1)
    $cBR = $bmp.GetPixel($w - 1, $h - 1)
    
    Write-Output "$($f.Name): TL(A=$($cTL.A)) TR(A=$($cTR.A)) BL(A=$($cBL.A)) BR(A=$($cBR.A))"
    $bmp.Dispose()
}
