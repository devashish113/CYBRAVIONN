import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

async function optimizeImages() {
  const publicDir = path.resolve('public');
  const imagesDir = path.join(publicDir, 'images');
  const servicesDir = path.join(imagesDir, 'services');

  console.log('⚡ Starting Cybravions asset optimization...');

  // 1. Optimize Hero futuristic-cloud-network.png (1.8 MB -> WebP)
  const heroPngPath = path.join(imagesDir, 'futuristic-cloud-network.png');
  const heroRootPngPath = path.join(publicDir, 'futuristic-cloud-network.png');
  const sourceHeroPng = fs.existsSync(heroPngPath) ? heroPngPath : heroRootPngPath;

  if (fs.existsSync(sourceHeroPng)) {
    console.log(`Processing Hero Cloud Graphic: ${sourceHeroPng} (${(fs.statSync(sourceHeroPng).size / 1024 / 1024).toFixed(2)} MB)`);
    
    // Max display size in Hero is 480px, so 1000px width provides flawless 2x retina rendering
    const webpBuffer = await sharp(sourceHeroPng)
      .resize({ width: 1000, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toBuffer();

    const heroWebpDest = path.join(imagesDir, 'futuristic-cloud-network.webp');
    const heroWebpRootDest = path.join(publicDir, 'futuristic-cloud-network.webp');
    fs.writeFileSync(heroWebpDest, webpBuffer);
    fs.writeFileSync(heroWebpRootDest, webpBuffer);
    console.log(`✅ Generated futuristic-cloud-network.webp (${(webpBuffer.length / 1024).toFixed(1)} KB) - ${(100 - (webpBuffer.length / fs.statSync(sourceHeroPng).size) * 100).toFixed(1)}% reduction!`);
  }

  // 2. Optimize neon-cloud-datacenter.png (1.5 MB -> WebP)
  const neonPngPath = path.join(imagesDir, 'neon-cloud-datacenter.png');
  const neonRootPngPath = path.join(publicDir, 'neon-cloud-datacenter.png');
  const sourceNeonPng = fs.existsSync(neonPngPath) ? neonPngPath : neonRootPngPath;

  if (fs.existsSync(sourceNeonPng)) {
    const webpBuffer = await sharp(sourceNeonPng)
      .resize({ width: 1000, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toBuffer();

    fs.writeFileSync(path.join(imagesDir, 'neon-cloud-datacenter.webp'), webpBuffer);
    fs.writeFileSync(path.join(publicDir, 'neon-cloud-datacenter.webp'), webpBuffer);
    console.log(`✅ Generated neon-cloud-datacenter.webp (${(webpBuffer.length / 1024).toFixed(1)} KB)`);
  }

  // 3. Optimize Services Card JPEGs (each ~900KB -> ~40KB WebP)
  if (fs.existsSync(servicesDir)) {
    const serviceFiles = fs.readdirSync(servicesDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    for (const file of serviceFiles) {
      const srcPath = path.join(servicesDir, file);
      const nameWithoutExt = path.parse(file).name;
      const destPath = path.join(servicesDir, `${nameWithoutExt}.webp`);

      const origSize = fs.statSync(srcPath).size;
      const webpBuffer = await sharp(srcPath)
        .resize({ width: 720, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();

      fs.writeFileSync(destPath, webpBuffer);
      console.log(`✅ Optimized service asset: ${file} (${(origSize / 1024).toFixed(1)} KB) -> ${nameWithoutExt}.webp (${(webpBuffer.length / 1024).toFixed(1)} KB)`);
    }
  }

  // 4. Optimize Branding / Logos
  const originalPng = path.join(publicDir, 'logo.png');
  const backupPng = path.join(publicDir, 'logo-hires-original.png');

  if (fs.existsSync(originalPng) && !fs.existsSync(backupPng)) {
    fs.copyFileSync(originalPng, backupPng);
  }

  const baseLogo = fs.existsSync(backupPng) ? backupPng : originalPng;
  if (fs.existsSync(baseLogo)) {
    // Favicon (32x32)
    await sharp(baseLogo)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, 'favicon-32x32.png'));

    // Apple Touch Icon (180x180)
    await sharp(baseLogo)
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  }

  console.log('🎉 Asset optimization finished successfully!');
}

optimizeImages().catch(err => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
