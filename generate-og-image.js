/**
 * generate-og-image.js
 * Genera la imagen OG (1200×630 JPG) usando Playwright + Chromium.
 *
 * Uso: node generate-og-image.js
 */

const { chromium } = require('playwright-core');
const path = require('path');
const fs   = require('fs');

(async () => {
  const templatePath = path.join(__dirname, 'og-image-template.html');
  const outputPath   = path.join(__dirname, 'assets', 'og-image.jpg');

  if (!fs.existsSync(templatePath)) {
    console.error('❌ No encontré og-image-template.html');
    process.exit(1);
  }

  console.log('⏳ Abriendo Chromium...');
  const browser = await chromium.launch({ headless: true });
  const page    = await browser.newPage();

  // Viewport exacto del OG image
  await page.setViewportSize({ width: 1200, height: 630 });

  // Cargar el template como archivo local
  const fileUrl = `file:///${templatePath.replace(/\\/g, '/')}`;
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Esperar a que las Google Fonts carguen (timeout de red 3s si no hay internet)
  await page.waitForTimeout(1500);

  // Capturar como JPG calidad 95
  await page.screenshot({
    path:     outputPath,
    type:     'jpeg',
    quality:  95,
    fullPage: false,
    clip:     { x: 0, y: 0, width: 1200, height: 630 }
  });

  await browser.close();

  const stat = fs.statSync(outputPath);
  const kb   = Math.round(stat.size / 1024);
  console.log(`✅ OG image generada: assets/og-image.jpg`);
  console.log(`   Tamaño: 1200×630 px — ${kb} KB`);
  console.log(`   Ruta:   ${outputPath}`);
})();
