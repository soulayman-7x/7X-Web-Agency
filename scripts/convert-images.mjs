/**
 * convert-images.mjs
 * Converts PNG screenshots from assets-src/projects/<slug>/
 * to WebP in assets/img/projects/<slug>/
 * Also generates og-image.png and favicon.png.
 */
import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const SRC_DIR = join(root, 'assets-src', 'projects');
const OUT_DIR = join(root, 'assets', 'img', 'projects');
const LOGO_SRC = join(root, 'assets', 'img', 'logo', 'Logo-whait.png');
const OG_OUT = join(root, 'assets', 'img', 'og-image.png');
const FAV_OUT = join(root, 'assets', 'img', 'favicon.png');

const MAX_WIDTH = 1400;
const QUALITY = 80;
const WARN_SIZE = 250 * 1024; // 250KB

// Map original filenames to output slugs
const FILE_MAP = {
  library: {
    '7X-LIB-HERO.png':      'hero.webp',
    '7X-LIB-POS.png':       'pos.webp',
    '7X-LIB-INVOICE.png':   'invoice.webp',
    '7X-LIB-INVENTORY.png': 'inventory.webp',
    '7X-LIB-REPORTS.png':   'reports.webp',
  },
  pharma: {
    '7X-PHARMA-1.png':          'main.webp',
    '7X-PHARMA-inventory.png':  'inventory.webp',
  },
  hub: {
    '7X-HUB-1.png':           'main.webp',
    '7X-HUB-DASHBOARD-1.png': 'dashboard.webp',
  },
};

async function convertImages() {
  console.log('🖼️  Converting project screenshots to WebP...\n');

  for (const [slug, files] of Object.entries(FILE_MAP)) {
    const srcSlug = join(SRC_DIR, slug);
    const outSlug = join(OUT_DIR, slug);

    if (!existsSync(srcSlug)) {
      console.warn(`⚠️  Source dir missing: ${srcSlug} — skipping ${slug}`);
      continue;
    }

    await mkdir(outSlug, { recursive: true });

    for (const [inFile, outFile] of Object.entries(files)) {
      const srcPath = join(srcSlug, inFile);
      const outPath = join(outSlug, outFile);

      if (!existsSync(srcPath)) {
        console.warn(`  ⚠️  Missing: ${inFile} — skipping`);
        continue;
      }

      try {
        const img = sharp(srcPath);
        const meta = await img.metadata();
        const needsResize = meta.width > MAX_WIDTH;

        const result = await img
          .resize(needsResize ? { width: MAX_WIDTH, withoutEnlargement: true } : undefined)
          .webp({ quality: QUALITY })
          .toFile(outPath);

        const sizeKB = Math.round(result.size / 1024);
        const warn = result.size > WARN_SIZE ? ' ⚠️  OVER 250KB!' : '';
        console.log(`  ✅ ${slug}/${outFile} — ${result.width}×${result.height}px — ${sizeKB}KB${warn}`);
      } catch (err) {
        console.error(`  ❌ Failed ${inFile}: ${err.message}`);
      }
    }
  }

  // ── Generate OG image (1200×630 navy + logo) ──
  console.log('\n🖼️  Generating OG image...');
  try {
    const logoMeta = await sharp(LOGO_SRC).metadata();
    // Scale logo to fit nicely inside 1200x630, max 480px wide
    const logoW = Math.min(480, logoMeta.width);
    const logoH = Math.round(logoW * (logoMeta.height / logoMeta.width));

    const logoResized = await sharp(LOGO_SRC)
      .resize(logoW, logoH, { fit: 'inside' })
      .toBuffer();

    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 5, g: 11, b: 31, alpha: 1 }, // #050B1F navy
      }
    })
      .composite([{
        input: logoResized,
        gravity: 'centre',
      }])
      .png()
      .toFile(OG_OUT);
    console.log(`  ✅ og-image.png — 1200×630`);
  } catch (err) {
    console.error(`  ❌ OG image failed: ${err.message}`);
  }

  // ── Generate favicon (32×32 from Logo-whait.png) ──
  console.log('\n🖼️  Generating favicon...');
  try {
    // Crop a square region from the top of the logo (the 7X symbol region)
    const logoMeta = await sharp(LOGO_SRC).metadata();
    const cropSize = Math.min(logoMeta.width, logoMeta.height);
    // Take the top-center square (the 7X symbol area)
    const left = Math.round((logoMeta.width - cropSize) / 2);

    const cropped = await sharp(LOGO_SRC)
      .extract({ left, top: 0, width: cropSize, height: cropSize })
      .resize(32, 32, { fit: 'contain', background: { r: 5, g: 11, b: 31, alpha: 1 } })
      .png()
      .toBuffer();

    await sharp({
      create: { width: 32, height: 32, channels: 4,
        background: { r: 5, g: 11, b: 31, alpha: 1 } }
    })
      .composite([{ input: cropped, gravity: 'centre' }])
      .png()
      .toFile(FAV_OUT);
    console.log(`  ✅ favicon.png — 32×32`);
  } catch (err) {
    console.error(`  ❌ Favicon failed: ${err.message}`);
  }

  console.log('\n✨ Image conversion complete.');
}

convertImages().catch(err => { console.error(err); process.exit(1); });
