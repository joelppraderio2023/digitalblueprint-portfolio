const { chromium } = require('C:/Users/Joel_&_Brenchus/Desktop/portfolio/wood puppys/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const OUT = path.join(__dirname, 'assets', 'screenshots');

const SITES = [
  {
    name: 'woods-puppys',
    url: 'https://woodspuppys.com.ar/',
    waitFor: 4500, // espera la intro animación
    count: 4,
  },
  {
    name: 'silvia-fotografia',
    url: 'file:///C:/Users/Joel_%26_Brenchus/Desktop/portfolio/fotografia%20silvia/kit-instagram-web/index.html',
    waitFor: 1500,
    count: 4,
  },
  {
    name: 'la-buena-semilla',
    url: 'https://la-buenasemilla.netlify.app/',
    waitFor: 3000,
    count: 4,
  },
];

// Detecta las secciones principales de la página y devuelve sus posiciones Y
async function detectSections(page, count) {
  return await page.evaluate((count) => {
    const VIEWPORT_H = window.innerHeight;
    const TOTAL_H = document.documentElement.scrollHeight;

    // Selectores en orden de prioridad
    const selectors = [
      'section',
      'article',
      '[class*="section"]',
      '[id*="section"]',
      'header',
      '.hero, [class*="hero"]',
      'main > div',
      'body > div > div',
    ];

    let candidates = [];
    for (const sel of selectors) {
      try {
        const els = Array.from(document.querySelectorAll(sel));
        candidates.push(...els);
      } catch (e) {}
    }

    // Filtramos: visibles, altura mínima razonable, no demasiado pequeños
    const validSections = candidates
      .filter(el => {
        const h = el.offsetHeight;
        const w = el.offsetWidth;
        const style = window.getComputedStyle(el);
        return (
          h > Math.min(300, VIEWPORT_H * 0.3) &&
          w > 600 &&
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          style.opacity !== '0'
        );
      })
      .map(el => {
        let top = 0;
        let e = el;
        while (e) { top += e.offsetTop || 0; e = e.offsetParent; }
        return { top, height: el.offsetHeight, tag: el.tagName, cls: el.className.toString().substring(0, 60) };
      })
      .sort((a, b) => a.top - b.top);

    // Deduplicar: si dos secciones están a menos de VIEWPORT_H/2 de distancia, quedarse con la primera
    const deduped = [];
    for (const sec of validSections) {
      const last = deduped[deduped.length - 1];
      if (!last || sec.top - last.top > VIEWPORT_H * 0.6) {
        deduped.push(sec);
      }
    }

    // Tomar las primeras `count` secciones, distribuidas a lo largo de la página
    if (deduped.length <= count) {
      return deduped.map(s => s.top);
    }

    // Si hay más secciones que slots, distribuirlas uniformemente
    const step = (deduped.length - 1) / (count - 1);
    const selected = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.round(i * step);
      selected.push(deduped[idx].top);
    }
    return selected;
  }, count);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1.5,
  });

  for (const site of SITES) {
    const page = await context.newPage();
    try {
      console.log(`\n📸 ${site.name} — cargando…`);
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(site.waitFor);

      // Scroll hasta el final y volver al inicio para disparar todas las animaciones
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await page.waitForTimeout(500);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(800);

      console.log(`   🔍 Detectando secciones…`);
      const positions = await detectSections(page, site.count);
      console.log(`   → ${positions.length} secciones: [${positions.map(p => Math.round(p)).join(', ')}]px`);

      for (let i = 0; i < positions.length; i++) {
        const scrollY = positions[i];
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY);
        await page.waitForTimeout(600); // pequeña pausa para que las animaciones se asienten

        const filename = `${site.name}-s${i + 1}.jpg`;
        await page.screenshot({
          path: path.join(OUT, filename),
          type: 'jpeg',
          quality: 88,
          clip: { x: 0, y: 0, width: 1280, height: 800 },
        });
        console.log(`   ✅ ${filename}`);
      }
    } catch (err) {
      console.log(`   ❌ Error en ${site.name}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('\n✨ Listo! Screenshots de secciones en assets/screenshots/');
})();
