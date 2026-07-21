/* ====== BRAVO · Demo barbería — ficticio ====== */
const SERVICES = [
  {n:"Corte clásico",     d:"Lavado, corte a tijera/máquina y peinado",  p:"$8.000"},
  {n:"Corte + barba",     d:"El combo completo, perfilado a navaja",     p:"$12.500"},
  {n:"Afeitado a navaja", d:"Toalla caliente, ritual completo",          p:"$7.500"},
  {n:"Arreglo de barba",  d:"Perfilado, recorte y aceite",               p:"$6.000"},
  {n:"Color / camuflaje", d:"Cobertura de canas o color completo",       p:"$10.000"},
  {n:"Diseños / líneas",  d:"Freestyle y detalles personalizados",       p:"$3.500"},
  {n:"Corte infantil",    d:"Para los más chicos, con paciencia",        p:"$6.500"},
];
const BARBERS = [
  {e:"🧔", n:"Nacho",  r:"Fundador", ig:"@nacho.bravo"},
  {e:"🧑", n:"Rama",   r:"Fades pro", ig:"@rama.cuts"},
  {e:"👨", n:"Fede",   r:"Barba & navaja", ig:"@fede.barber"},
  {e:"🧑‍🦱", n:"Lucho", r:"Color & diseños", ig:"@lucho.style"},
];
const GAL = ["💈","✂️","🪒","💇‍♂️","🧔","🔥"];
const SLOTS = ["10:00","11:30","13:00","15:00","16:30","18:00","19:30"];
const $ = (s)=>document.querySelector(s);

$("#svcList").innerHTML = SERVICES.map(s=>`
  <div class="svc-row">
    <div><div class="svc-name">${s.n}</div><div class="svc-desc">${s.d}</div></div>
    <span class="svc-dots"></span>
    <span class="svc-price">${s.p}</span>
  </div>`).join("");

$("#barberGrid").innerHTML = BARBERS.map(b=>`
  <article class="barber-card">
    <div class="barber-photo" style="background:linear-gradient(160deg,#1b3a6b,#13233f)">${b.e}</div>
    <div class="barber-info"><h3>${b.n}</h3><div class="role">${b.r}</div><div class="ig">${b.ig}</div></div>
  </article>`).join("");

$("#galleryGrid").innerHTML = GAL.map((e,i)=>{
  const g=["#1b3a6b,#13233f","#b51f1f,#7d1414","#1d3a6b,#142c52","#d62828,#9a1d1d","#16315c,#0f2244","#c12222,#8a1818"][i];
  return `<div class="gi" style="background:linear-gradient(150deg,${g})">${e}</div>`;
}).join("");

$("#bSvc").innerHTML = `<option value="">Elegí un servicio</option>` + SERVICES.map(s=>`<option>${s.n} — ${s.p}</option>`).join("");

$("#slots").innerHTML = SLOTS.map(t=>`<button type="button" class="slot" onclick="pickSlot(this)">${t}</button>`).join("");
function pickSlot(el){ document.querySelectorAll(".slot").forEach(s=>s.classList.remove("active")); el.classList.add("active"); }

function toggleMenu(){ $("#mainNav").classList.toggle("open"); $(".menu-toggle").classList.toggle("active"); document.body.style.overflow=$("#mainNav").classList.contains("open")?"hidden":""; }
function closeMenu(){ $("#mainNav").classList.remove("open"); $(".menu-toggle").classList.remove("active"); document.body.style.overflow=""; }
function submitForm(e){
  e.preventDefault();
  if(!document.querySelector(".slot.active")){ $("#formMsg").textContent="Elegí un horario para continuar."; return; }
  e.target.reset(); document.querySelectorAll(".slot").forEach(s=>s.classList.remove("active"));
  $("#formMsg").textContent="¡Turno reservado! Te confirmamos por WhatsApp. (Demo — no se envía nada real.)";
}
window.addEventListener("scroll",()=>{ $("#header").style.boxShadow = window.scrollY>10?"0 4px 20px -14px rgba(0,0,0,.6)":"none"; });
