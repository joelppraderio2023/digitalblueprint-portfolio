/**
 * check-responsive.js — audit visual por sección
 */
const { chromium } = require('playwright-core');
const path = require('path');
const fs   = require('fs');

const SECTIONS = ['#servicios', '#proceso', '#nosotros', '#precios', '#trabajos', '#contacto'];

async function capturePage(browser, name, width, height) {
  const htmlPath = path.join(__dirname, 'index.html');
  const outDir   = path.join(__dirname, 'assets', 'responsive-check');
  fs.mkdirSync(outDir, { recursive: true });

  const page = await browser.newPage();
  await page.setViewportSize({ width, height });
  await page.goto(`file:///${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });

  // Forzar TODAS las animaciones a estado final (como si el usuario hubiera scrolleado)
  await page.addStyleTag({ content: `
    .svc-card, .feat, .step, .p-card, .price-card,
    .sec-lbl, .sec-h2, .sec-sub,
    .cta-h2, .cta-p, .cta-btns {
      opacity: 1 !important;
      transform: none !important;
      transition: none !important;
    }
    .sec-head, .cta-sec {
      opacity: 1 !important;
    }
    .revealed .sec-lbl,
    .revealed .sec-h2,
    .revealed .sec-sub { opacity: 1 !important; transform: none !important; }
  `});

  await page.waitForTimeout(400);

  // Captura del hero
  const heroFile = path.join(outDir, `${name}-hero.jpg`);
  await page.screenshot({ path: heroFile, type: 'jpeg', quality: 88,
    clip: { x: 0, y: 0, width, height } });
  console.log(`  📸 ${name} hero`);

  // Captura de cada sección
  for (const sel of SECTIONS) {
    const el = await page.$(sel);
    if (!el) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const box = await el.boundingBox();
    if (!box) continue;
    const label = sel.replace('#', '');
    const file  = path.join(outDir, `${name}-${label}.jpg`);
    await page.screenshot({ path: file, type: 'jpeg', quality: 85,
      clip: { x: 0, y: Math.max(0, box.y - 20), width, height: Math.min(height + 100, box.height + 40) }
    });
    console.log(`  📸 ${name} ${label}`);
  }

  await page.close();
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  console.log('\n🖥  Desktop 1440');
  await capturePage(browser, 'desktop', 1440, 900);

  console.log('\n📱 Tablet 768');
  await capturePage(browser, 'tablet', 768, 1024);

  console.log('\n📱 Mobile 390 (iPhone 14)');
  await capturePage(browser, 'mobile-390', 390, 844);

  console.log('\n📱 Mobile 360 (Android)');
  await capturePage(browser, 'mobile-360', 360, 780);

  await browser.close();
  console.log('\n✅ Listo → assets/responsive-check/');
})();
