// Genera capturas de cada demo para usarlas como preview en el índice.
// Uso: node _tools/shots.mjs   (con un server estático corriendo en :8099)
import { createRequire } from 'module';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
// puppeteer está instalado en un proyecto vecino
const puppeteer = require('C:/Users/Joel_&_Brenchus/Desktop/portfolio/wood puppys/node_modules/puppeteer');

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'assets', 'previews');
mkdirSync(OUT, { recursive: true });

const DEMOS = [
  'ecommerce','gimnasio','landing','restaurante','inmobiliaria','barberia',
  'spa','agencia','consultorio','hotel','elearning','juridico'
];
const BASE = 'http://localhost:8099';

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox','--disable-setuid-sandbox']
});

for (const d of DEMOS) {
  const page = await browser.newPage();
  // viewport tipo desktop angosto para que el thumbnail se vea como una web
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  const url = `${BASE}/${d}/index.html`;
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    // ocultar la barra de demo para que el preview sea limpio
    await page.addStyleTag({ content: '.demo-bar{display:none!important}' });
    await new Promise(r => setTimeout(r, 600)); // dejar asentar fuentes/animaciones
    const out = join(OUT, `${d}.webp`);
    await page.screenshot({ path: out, type: 'webp', quality: 82,
      clip: { x: 0, y: 0, width: 1280, height: 800 } });
    console.log('✓', d);
  } catch (e) {
    console.log('✗', d, e.message);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log('Listo. Capturas en assets/previews/');
