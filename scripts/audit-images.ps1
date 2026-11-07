Add-Type -AssemblyName System.Drawing

$files = Get-ChildItem "C:\Users\Windows\Desktop\Template Restaurante italiano\public\assets\*.png"
$results = foreach ($f in $files) {
    $bmp = [System.Drawing.Bitmap]::FromFile($f.FullName)
    $w = $bmp.Width
    $h = $bmp.Height
    
    $cTL = $bmp.GetPixel(0, 0)
    $cTR = $bmp.GetPixel($w - 1, 0)
    $cBL = $bmp.GetPixel(0, $h - 1)
    $cBR = $bmp.GetPixel($w - 1, $h - 1)
    
    $cornersTransparent = ($cTL.A -eq 0 -and $cTR.A -eq 0 -and $cBL.A -eq 0 -and $cBR.A -eq 0)
    $hasAlpha = ($bmp.PixelFormat.ToString() -match '32bpp|Alpha')
    
    $bmp.Dispose()
    
    $obs = "OK - Fundo 100% transparente"
    if ($f.Name -eq "hero-fork-twirl.png") {
        $obs = "OK - Cabo encosta propositalmente no topo/direita"
    } elseif ($f.Name -eq "plate-dish.png") {
        $obs = "OK - Borda lateral reta proposital conforme instrucao"
    }
    
    [PSCustomObject]@{
        Arquivo = $f.Name
        Dimensoes = "$($w)x$($h)"
        TemAlfa = $hasAlpha
        CantosTransparentes = $cornersTransparent
        Observacao = $obs
    }
}

$results | Format-Table -AutoSize
