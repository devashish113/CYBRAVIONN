import { readdir, copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = path.join(projectRoot, 'dist', 'assets');
const archiveDir = path.join(projectRoot, 'dist', 'assets_archive');

async function main() {
  try {
    const files = await readdir(assetsDir);
    
    const currentIndexJs = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
    const currentIndexCss = files.find(f => f.startsWith('index-') && f.endsWith('.css'));
    const currentVendorIcons = files.find(f => f.startsWith('vendor-icons-') && f.endsWith('.js'));

    console.log('[Preserve Assets] Current build assets:', { currentIndexJs, currentIndexCss, currentVendorIcons });

    // Known transitional hashes cached by edge proxies / Cloudflare
    const legacyAliases = [
      { target: 'index-CAlOJpiR.js', source: currentIndexJs },
      { target: 'index-B7o333vR.css', source: currentIndexCss },
      { target: 'vendor-icons-C2Cp0NJB.js', source: currentVendorIcons },
    ];

    for (const alias of legacyAliases) {
      if (alias.source) {
        const srcPath = path.join(assetsDir, alias.source);
        const dstPath = path.join(assetsDir, alias.target);
        await copyFile(srcPath, dstPath);
        console.log(`[Preserve Assets] Created fallback alias: ${alias.target} -> ${alias.source}`);
      }
    }

    // Ensure assets archive directory exists
    await mkdir(archiveDir, { recursive: true });

    // Backup current files into archive
    for (const file of files) {
      await copyFile(path.join(assetsDir, file), path.join(archiveDir, file));
    }

    console.log('[Preserve Assets] Asset resilience setup complete.');
  } catch (err) {
    console.error('[Preserve Assets] Error preserving assets:', err);
    process.exit(1);
  }
}

main();
