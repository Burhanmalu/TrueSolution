const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generate() {
  const input = path.join(__dirname, 'public', 'logo.png');
  const publicDir = path.join(__dirname, 'public');

  if (!fs.existsSync(input)) {
    console.error("Logo file not found at", input);
    process.exit(1);
  }

  const baseImage = sharp(input);

  // Resize and fit to square with transparent padding
  const squareBuffer = await baseImage
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer();

  const squareSharp = sharp(squareBuffer);

  console.log("Generating 16x16...");
  await squareSharp.resize(16, 16).toFile(path.join(publicDir, 'favicon-16x16.png'));
  
  console.log("Generating 32x32...");
  await squareSharp.resize(32, 32).toFile(path.join(publicDir, 'favicon-32x32.png'));
  
  console.log("Generating favicon.ico (as 64x64 PNG)...");
  await squareSharp.resize(64, 64).toFile(path.join(publicDir, 'favicon.ico'));
  
  console.log("Generating apple-touch-icon.png (180x180)...");
  await squareSharp.resize(180, 180, {
      fit: 'contain',
      background: { r: 9, g: 9, b: 11, alpha: 1 } // Dark background for Apple icon looks better if it's white logo
  }).toFile(path.join(publicDir, 'apple-touch-icon.png'));
  
  console.log("Generating android-chrome-192x192.png...");
  await squareSharp.resize(192, 192).toFile(path.join(publicDir, 'android-chrome-192x192.png'));
  
  console.log("Generating android-chrome-512x512.png...");
  await squareSharp.resize(512, 512).toFile(path.join(publicDir, 'android-chrome-512x512.png'));

  console.log("Successfully generated all favicons!");
}

generate().catch(err => {
  console.error("Error generating favicons:", err);
  process.exit(1);
});
