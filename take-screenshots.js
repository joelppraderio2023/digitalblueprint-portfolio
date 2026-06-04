const { chromium } = require('C:/Users/Joel_&_Brenchus/Desktop/portfolio/wood puppys/node_modules/playwright-core');
const path = require('path');

const SITES = [
  {
    name: 'woods-puppys',
    url: 'https://wood-puppys-ar.netlify.app/',
    width: 1280,
    waitFor: 2500,
  },
  {
    name: 'mf-tramites',
    url: 'https://joelppraderio2023.github.io/mf-tramites-vehiculares/',
    width: 1280,
    waitFor: 2500,
  },
  {
    name: 'silvia-fotografia',
    url: 'file:///C:/Users/Joel_%26_Brenchus/Desktop/portfolio/fotografia%20silvia/kit-instagram-web/index.html',
    width: 1280,
    waitFor: 1500,
  },
  {
    name: 'la-buena-semilla',
    // carpeta local de Next.js — intenta la URL deployada si existe, si no salta
    url: 'https://la-buenasemilla.netlify.app/',
    width: 1280,
    waitFor: 3000,
    fallbackLocal: true,
  },
  {
    name: 'owen-house',
    url: 'https://owen-house-criadero.pages.dev/',
    width: 1280,
    waitFor: 3000,
  },
];

const OUT = path.join(__dirname, 'assets', 'screenshots');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1.5,   // resolución 2×
  });

  for (const site of SITES) {
    const page = await context.newPage();
    try {
      console.log(`📸 Capturando ${site.name}…`);
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(site.waitFor);

      // Scroll suave para disparar animaciones
      await page.evaluate(() => window.scrollTo(0, 0));

      await page.screenshot({
        path: path.join(OUT, `${site.name}.jpg`),
        type: 'jpeg',
        quality: 88,
        clip: { x: 0, y: 0, width: 1280, height: 800 },
      });
      console.log(`  ✅ ${site.name}.jpg guardado`);
    } catch (err) {
      console.log(`  ⚠️  Error en ${site.name}: ${err.message}`);
      // Si falla, intenta el camino local del HTML de silvia
      if (site.name === 'la-buena-semilla') {
        console.log(`  ↩  Intentando con ruta local Next.js…`);
        // Captura el componente renderizado del home
        try {
          const localHero = 'file:///C:/Users/Joel_%26_Brenchus/Desktop/portfolio/e-commerce%20verduleria/app/page.tsx';
          await page.goto(localHero, { timeout: 5000 });
          await page.screenshot({
            path: path.join(OUT, `${site.name}.jpg`),
            type: 'jpeg', quality: 80,
            clip: { x: 0, y: 0, width: 1280, height: 800 },
          });
        } catch {
          console.log(`  ❌ Skipping ${site.name}`);
        }
      }
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n✨ Listo. Screenshots en assets/screenshots/');
})();
