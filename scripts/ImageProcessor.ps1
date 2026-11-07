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
                    
                    // Check how close the pixel is to white (255, 255, 255)
                    int minChannel = Math.Min(r, Math.Min(g, b));
                    int maxDiff = Math.Max(Math.Abs(r - g), Math.Max(Math.Abs(r - b), Math.Abs(g - b)));
                    
                    // If near white and low saturation
                    if (minChannel >= threshold && maxDiff < 20) {
                        rgbValues[i + 3] = 0; // Transparent
                    } else if (minChannel >= (threshold - feather) && maxDiff < 30) {
                        // Smooth feathering
                        float factor = (float)(threshold - minChannel) / (float)feather;
                        if (factor < 0) factor = 0;
                        if (factor > 1) factor = 1;
                        rgbValues[i + 3] = (byte)(255 * factor);
                    } else {
                        rgbValues[i + 3] = 255; // Opaque
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

Write-Output "ImageProcessor compiled successfully."
