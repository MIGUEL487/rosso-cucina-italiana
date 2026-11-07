Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public class ImageProcessor {
    public static void RemoveWhiteBackground(string srcPath, string destPath, int threshold, int feather) {
        using (Bitmap src = new Bitmap(srcPath)) {
            int width = src.Width;
            int height = src.Height;
            using (Bitmap dest = new Bitmap(width, height, PixelFormat.Format32bppArgb)) {
                BitmapData srcData = src.LockBits(new Rectangle(0, 0, width, height), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
                BitmapData destData = dest.LockBits(new Rectangle(0, 0, width, height), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
                
                int bytes = Math.Abs(srcData.Stride) * height;
                byte[] rgbValues = new byte[bytes];
                Marshal.Copy(srcData.Scan0, rgbValues, 0, bytes);
                
                for (int i = 0; i < bytes; i += 4) {
                    byte b = rgbValues[i];
                    byte g = rgbValues[i + 1];
                    byte r = rgbValues[i + 2];
                    
                    int minChannel = Math.Min(r, Math.Min(g, b));
                    int maxDiff = Math.Max(Math.Abs(r - g), Math.Max(Math.Abs(r - b), Math.Abs(g - b)));
                    
                    if (minChannel >= threshold && maxDiff < 22) {
                        rgbValues[i + 3] = 0; // Fully transparent
                    } else if (minChannel >= (threshold - feather) && maxDiff < 32) {
                        float factor = (float)(threshold - minChannel) / (float)feather;
                        if (factor < 0) factor = 0;
                        if (factor > 1) factor = 1;
                        rgbValues[i + 3] = (byte)(255 * factor);
                    } else {
                        rgbValues[i + 3] = 255;
                    }
                }
                
                Marshal.Copy(rgbValues, 0, destData.Scan0, bytes);
                src.UnlockBits(srcData);
                dest.UnlockBits(destData);
                
                dest.Save(destPath, ImageFormat.Png);
            }
        }
    }
}
"@ -ReferencedAssemblies System.Drawing

$srcDir = "C:\Users\Windows\.gemini\antigravity\brain\e4a15c33-b01a-4f5b-911c-fc2bd371f1ed"
$outDir = "C:\Users\Windows\Desktop\Template Restaurante italiano\public\assets"

if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$mappings = @{
    "hero_fork_twirl"   = "hero-fork-twirl.png"
    "spiral_spaghetti" = "spiral-spaghetti.png"
    "plate_dish"       = "plate-dish.png"
    "ing_mussel_open"  = "ing-mussel-open.png"
    "ing_tomato_half"  = "ing-tomato-2.png"
    "ing_tomato_"      = "ing-tomato.png"
    "ing_shrimp"       = "ing-shrimp.png"
    "ing_basil"        = "ing-basil.png"
}

$files = Get-ChildItem -Path $srcDir -Filter "*.jpg"

foreach ($file in $files) {
    foreach ($key in $mappings.Keys) {
        if ($file.Name.StartsWith($key)) {
            $dest = Join-Path $outDir $mappings[$key]
            Write-Output "Processing $($file.Name) -> $($mappings[$key])"
            # For plate dish, keep feathering slightly softer
            $feather = 16
            $threshold = 246
            if ($mappings[$key] -eq "plate-dish.png") {
                $threshold = 248
                $feather = 14
            }
            [ImageProcessor]::RemoveWhiteBackground($file.FullName, $dest, $threshold, $feather)
            break
        }
    }
}

Write-Output "All assets processed into $outDir!"
