/**
 * render.js
 * Converte una cartella di file HTML compilati in PNG pronti per Instagram.
 *
 * Uso:
 *   node render.js <cartella-html-compilati> <cartella-output>
 *
 * Esempio:
 *   node render.js posts/esempio-post/compiled posts/esempio-post/output
 *
 * Richiede: npm install playwright && npx playwright install chromium
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const WIDTH = 1080;
const HEIGHT = 1350;
const SCALE_FACTOR = 2; // rendering "retina" per nitidezza su schermi telefono

async function main() {
  const inputDir = process.argv[2];
  const outputDir = process.argv[3];

  if (!inputDir || !outputDir) {
    console.error('Uso: node render.js <cartella-input> <cartella-output>');
    process.exit(1);
  }

  if (!fs.existsSync(inputDir)) {
    console.error(`Cartella input non trovata: ${inputDir}`);
    process.exit(1);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const htmlFiles = fs
    .readdirSync(inputDir)
    .filter((f) => f.endsWith('.html'))
    .sort(); // ordine alfabetico: slide-01.html, slide-02.html, ...

  if (htmlFiles.length === 0) {
    console.error(`Nessun file .html trovato in ${inputDir}`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: SCALE_FACTOR,
  });

  for (const file of htmlFiles) {
    const fullPath = path.resolve(inputDir, file);
    const outputName = file.replace(/\.html$/, '.png');
    const outputPath = path.resolve(outputDir, outputName);

    await page.goto(`file://${fullPath}`);
    await page.waitForTimeout(150); // margine per font/rendering CSS

    await page.screenshot({
      path: outputPath,
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    });

    console.log(`OK: ${file} -> ${outputName}`);
  }

  await browser.close();
  console.log(`\nFatto. ${htmlFiles.length} slide esportate in ${outputDir}`);
}

main();
