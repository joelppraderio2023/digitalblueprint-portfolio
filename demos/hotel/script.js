/* ====== Terrazas del Valle · Demo cabañas — ficticio ====== */
const CABINS = [
  {n:"Cabaña Pinar", cap:"2 personas", feats:["🛏️ 1 dormitorio","🔥 Hogar a leña","🌲 Vista al bosque"], price:"$48.000", per:"por noche", e:"🌲", g:"#5a7048,#39482d"},
  {n:"Cabaña Sierra", cap:"4 personas", feats:["🛏️ 2 dormitorios","🍳 Cocina equipada","☀️ Galería"], price:"$72.000", per:"por noche", e:"🏔️", g:"#6f8a57,#465a37"},
  {n:"Cabaña Familiar", cap:"6 personas", feats:["🛏️ 3 dormitorios","🛁 2 baños","🔥 Parrilla propia"], price:"$98.000", per:"por noche", e:"🏡", g:"#8a7050,#5a4733"},
  {n:"Suite Mirador", cap:"2 personas", feats:["💑 Ideal parejas","🛁 Jacuzzi","🌄 Vista panorámica"], price:"$86.000", per:"por noche", e:"🌄", g:"#7a8a9a,#4a5763"},
];
const AMENITIES = [
  {ic:"🏊", n:"Pileta climatizada", d:"Abierta todo el año"},
  {ic:"🔥", n:"Quinchos con parrilla", d:"Para tus asados"},
  {ic:"🌿", n:"Senderos y trekking", d:"Guías disponibles"},
  {ic:"🧖", n:"Spa & masajes", d:"Con reserva previa"},
  {ic:"🐴", n:"Cabalgatas", d:"Paseos por las sierras"},
  {ic:"📶", n:"WiFi y cochera", d:"En todo el complejo"},
  {ic:"🍳", n:"Desayuno regional", d:"Productos caseros"},
  {ic:"🔥", n:"Fogón nocturno", d:"Bajo las estrellas"},
];
const GAL = ["🌲","🏔️","🌅","🔥","🛶","🌌","🍂","🦌"];
const $ = (s)=>document.querySelector(s);

$("#cabinGrid").innerHTML = CABINS.map(c=>`
  <article class="cabin-card">
    <div class="cabin-img" style="background:linear-gradient(150deg,${c.g})"><span class="cabin-cap">${c.cap}</span><span>${c.e}</span></div>
    <div class="cabin-body">
      <h3>${c.n}</h3>
      <div class="cabin-feats">${c.feats.map(f=>`<span>${f}</span>`).join("")}</div>
      <div class="cabin-foot">
        <div class="cabin-price">${c.price}<small>${c.per}</small></div>
        <a href="#reservar" class="btn btn-leaf sm">Reservar</a>
      </div>
    </div>
  </article>`).join("");

$("#amenGrid").innerHTML = AMENITIES.map(a=>`
  <article class="amen-card"><div class="ic">${a.ic}</div><h3>${a.n}</h3><p>${a.d}</p></article>`).join("");

$("#galleryGrid").innerHTML = GAL.map((e,i)=>{
  const g=["#4a5f3a,#2c3a23","#5a6f47,#374429","#6f5a3f,#443827","#7a6a4a,#4a4030","#4f6a5a,#2f4238","#3a4a5a,#222c38","#6a5a3a,#403726","#5a6a4a,#374230"][i];
  return `<div class="gi" style="background:linear-gradient(150deg,${g})">${e}</div>`;
}).join("");

function toggleMenu(){ $("#mainNav").classList.toggle("open"); $(".menu-toggle").classList.toggle("active"); document.body.style.overflow=$("#mainNav").classList.contains("open")?"hidden":""; }
function closeMenu(){ $("#mainNav").classList.remove("open"); $(".menu-toggle").classList.remove("active"); document.body.style.overflow=""; }
function submitForm(e){ e.preventDefault(); e.target.reset(); $("#formMsg").textContent="¡Consulta enviada! Te confirmamos disponibilidad por WhatsApp. (Demo — no se envía nada real.)"; }
window.addEventListener("scroll",()=>{ $("#header").style.boxShadow = window.scrollY>10?"0 4px 20px -14px rgba(43,46,38,.3)":"none"; });
