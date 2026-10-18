import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

async function optimizeImages() {
  const publicDir = path.resolve('public');
  const originalPng = path.join(publicDir, 'logo.png');
  const backupPng = path.join(publicDir, 'logo-hires-original.png');

  if (!fs.existsSync(backupPng)) {
    fs.copyFileSync(originalPng, backupPng);
    console.log('Backed up original logo to logo-hires-original.png');
  }

  // 1. Generate Favicon (32x32)
  await sharp(backupPng)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('Generated favicon-32x32.png');

  // 2. Generate Apple Touch Icon (180x180)
  await sharp(backupPng)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // 3. Generate high-density retina web display WebP (height: 160px for 2x/3x crispness)
  const webpTemp = path.join(publicDir, 'logo.webp.tmp');
  await sharp(backupPng)
    .resize({ height: 160 })
    .webp({ quality: 90, effort: 6 })
    .toFile(webpTemp);
  fs.renameSync(webpTemp, path.join(publicDir, 'logo.webp'));
  console.log('Generated optimized logo.webp');

  // 4. Generate high-density retina web display PNG (height: 160px)
  const pngTemp = path.join(publicDir, 'logo.png.tmp');
  await sharp(backupPng)
    .resize({ height: 160 })
    .png({ compressionLevel: 9 })
    .toFile(pngTemp);
  fs.renameSync(pngTemp, path.join(publicDir, 'logo.png'));
  console.log('Generated optimized logo.png');
}

optimizeImages().catch(err => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
