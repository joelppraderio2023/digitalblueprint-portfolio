# DEMOS — Digital Blueprint

Doce plantillas demo para mostrar a clientes antes de empezar un proyecto. Todo estático (HTML/CSS/JS puro), **mobile-first**, sin dependencias ni build.

## Estructura

```
DEMOS/
├── index.html          → Página índice que agrupa las 12 demos (filtros + previews reales)
├── ecommerce/          → ÁMBAR · Tienda de indumentaria (carrito funcional falso)
├── gimnasio/           → PULSO · Gimnasio (clases, planes, horarios)
├── landing/            → Lucía Romero · Landing de coach personal
├── restaurante/        → Sazón · Restaurante (menú filtrable + reservas)
├── inmobiliaria/       → Terra · Inmobiliaria (propiedades con filtros + fichas)
├── barberia/           → BRAVO · Barbería (servicios + reserva de turnos)
├── spa/                → Aura · Spa & estética (tratamientos + precios)
├── agencia/            → VORTEX · Agencia creativa (portfolio + servicios)
├── consultorio/        → Sonrisa · Consultorio odontológico (servicios + FAQ + turnos)
├── hotel/              → Terrazas del Valle · Cabañas/turismo (disponibilidad + reservas)
├── elearning/          → Aprendé+ · Academia online (catálogo de cursos + planes)
├── juridico/           → Méndez & Asociados · Estudio jurídico (áreas + consulta)
├── assets/previews/    → Capturas .webp de cada demo (preview del índice)
└── _tools/shots.mjs    → Script que regenera las capturas con puppeteer
```

Cada demo tiene su propia paleta, tipografía y secciones acordes al rubro.

## Regenerar las capturas de preview

Si editás una demo y querés actualizar su thumbnail del índice:

```bash
# 1. Levantá un server estático en el puerto 8099
python -m http.server 8099
# 2. En otra terminal, corré el script
node _tools/shots.mjs
```

Cada demo es independiente: su propio `index.html`, `styles.css` y `script.js`.

## Cómo verlas en local

Abrí `index.html` en el navegador (doble clic). O, para servirlo:

```bash
npx serve .
# o
python -m http.server 8000
```

## Cómo publicarlas (Cloudflare Pages)

1. Subí la carpeta `DEMOS/` como proyecto a Cloudflare Pages (o como subcarpeta de tu portfolio).
2. No requiere build. Build command vacío, output directory = la carpeta.
3. Quedaría en algo como `digitalblueprint-portfolio.pages.dev/demos`.

Para enlazarlas desde tu portfolio, apuntá un botón "Ver demos" a `index.html`.

## Notas

- Todas las marcas, personas, productos y precios son **ficticios**, solo ilustran el diseño.
- Los visuales usan gradientes/placeholders CSS (sin imágenes externas) para que carguen instantáneo y nunca se rompan. Al adaptar para un cliente real, se reemplazan por sus fotos.
- Los formularios y el checkout son simulados (no envían ni cobran nada).
- Cambiá el número de WhatsApp `000000000` y los datos de contacto al personalizar.
