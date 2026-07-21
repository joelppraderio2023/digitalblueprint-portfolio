// Captura screenshots de los sitios de clientes en viewport mobile (390x844 @2x)
// Uso: node take-mobile-shots.js
const { chromium } = require('playwright-core');

const SITES = [
  { slug: 'woods-puppys',      url: 'https://woodspuppys.com.ar/' },
  { slug: 'mf-tramites',       url: 'https://joelppraderio2023.github.io/mf-tramites-vehiculares/' },
  { slug: 'silvia-fotografia', url: 'https://silvia-gomez-fotografia.pages.dev/' },
  { slug: 'la-buena-semilla',  url: 'https://la-buenasemilla.netlify.app/' },
  { slug: 'owen-house',        url: 'https://owen-house-criadero.pages.dev/' },
  { slug: 'ayelen',            url: 'https://ayelen-productos-capilares.pages.dev/' },
];

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });

  for (const site of SITES) {
    const page = await ctx.newPage();
    try {
      console.log(`→ ${site.slug}`);
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 45000 });
      // esperar intros/animaciones de entrada
      await page.waitForTimeout(5000);
      // scroll leve para disparar reveals y volver arriba
      await page.evaluate(() => window.scrollTo(0, 400));
      await page.waitForTimeout(800);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1200);
      await page.screenshot({
        path: `assets/screenshots/mobile/${site.slug}.jpg`,
        type: 'jpeg',
        quality: 85,
      });
      console.log(`  ✓ assets/screenshots/mobile/${site.slug}.jpg`);
    } catch (e) {
      console.error(`  ✗ ${site.slug}: ${e.message.split('\n')[0]}`);
    }
    await page.close();
  }

  await browser.close();
  console.log('Listo.');
})().catch(e => { console.error(e); process.exit(1); });
