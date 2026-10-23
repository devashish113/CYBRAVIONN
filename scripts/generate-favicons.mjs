import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const sourceImagePath = 'C:\\Users\\devas\\Desktop\\cybravions\\Golden Shield Mandala Crest.png';
const targets = [
  'C:\\Users\\devas\\Desktop\\cybravions\\cybravions_website\\public',
  'C:\\Users\\devas\\Desktop\\cybravions\\cybravions_website_dev\\public'
];

async function generateFavicons() {
  if (!fs.existsSync(sourceImagePath)) {
    throw new Error(`Source image not found at ${sourceImagePath}`);
  }

  console.log(`Processing source image: ${sourceImagePath}`);

  // 1. Read source and make outer 4 corners transparent via BFS
  const { data, info } = await sharp(sourceImagePath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const rgba = Buffer.alloc(width * height * 4);

  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    rgba[j] = data[i];
    rgba[j + 1] = data[i + 1];
    rgba[j + 2] = data[i + 2];
    rgba[j + 3] = 255;
  }

  const visited = new Uint8Array(width * height);
  const queue = [0, width - 1, (height - 1) * width, height * width - 1];
  for (const idx of queue) visited[idx] = 1;

  let head = 0;
  while (head < queue.length) {
    const idx = queue[head++];
    const x = idx % width;
    const y = Math.floor(idx / width);
    const r = rgba[idx * 4];
    const g = rgba[idx * 4 + 1];
    const b = rgba[idx * 4 + 2];

    // Near-white outer background
    if (r > 230 && g > 230 && b > 230) {
      rgba[idx * 4 + 3] = 0;

      const neighbors = [
        x > 0 ? idx - 1 : -1,
        x < width - 1 ? idx + 1 : -1,
        y > 0 ? idx - width : -1,
        y < height - 1 ? idx + width : -1
      ];

      for (const n of neighbors) {
        if (n >= 0 && !visited[n]) {
          visited[n] = 1;
          queue.push(n);
        }
      }
    }
  }

  console.log(`Flood fill completed: ${queue.length} transparent corner pixels`);

  const masterBase = sharp(rgba, { raw: { width, height, channels: 4 } });

  // 2. Generate buffers
  const buf16 = await masterBase.clone().resize(16, 16, { kernel: 'lanczos3' }).png().toBuffer();
  const buf32 = await masterBase.clone().resize(32, 32, { kernel: 'lanczos3' }).png().toBuffer();
  const buf48 = await masterBase.clone().resize(48, 48, { kernel: 'lanczos3' }).png().toBuffer();
  const buf180 = await masterBase.clone().resize(180, 180, { kernel: 'lanczos3' }).png().toBuffer();
  const buf192 = await masterBase.clone().resize(192, 192, { kernel: 'lanczos3' }).png().toBuffer();
  const buf512 = await masterBase.clone().resize(512, 512, { kernel: 'lanczos3' }).png().toBuffer();

  // 3. Assemble multi-size ICO (16, 32, 48)
  const icoImages = [
    { width: 16, height: 16, buffer: buf16 },
    { width: 32, height: 32, buffer: buf32 },
    { width: 48, height: 48, buffer: buf48 }
  ];

  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0);
  icoHeader.writeUInt16LE(1, 2);
  icoHeader.writeUInt16LE(icoImages.length, 4);

  let offset = 6 + icoImages.length * 16;
  const entries = [];
  for (const img of icoImages) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width, 0);
    entry.writeUInt8(img.height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([icoHeader, ...entries, ...icoImages.map(i => i.buffer)]);

  // 4. Write files to each target public directory
  for (const targetDir of targets) {
    if (!fs.existsSync(targetDir)) continue;

    fs.writeFileSync(path.join(targetDir, 'favicon.ico'), icoBuffer);
    fs.writeFileSync(path.join(targetDir, 'favicon-16x16.png'), buf16);
    fs.writeFileSync(path.join(targetDir, 'favicon-32x32.png'), buf32);
    fs.writeFileSync(path.join(targetDir, 'apple-touch-icon.png'), buf180);
    fs.writeFileSync(path.join(targetDir, 'android-chrome-192x192.png'), buf192);
    fs.writeFileSync(path.join(targetDir, 'android-chrome-512x512.png'), buf512);
    fs.writeFileSync(path.join(targetDir, 'favicon.png'), buf512);

    console.log(`Saved favicon suite to: ${targetDir}`);
  }

  // Remove test file if exists
  const testFile = 'C:\\Users\\devas\\Desktop\\cybravions\\cybravions_website\\public\\test-transparent.png';
  if (fs.existsSync(testFile)) fs.unlinkSync(testFile);

  console.log('Favicon generation finished successfully!');
}

generateFavicons().catch(err => {
  console.error('Failed to generate favicons:', err);
  process.exit(1);
});
