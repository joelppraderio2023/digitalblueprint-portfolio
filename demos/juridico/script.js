/* ====== Méndez & Asociados · Demo estudio jurídico — ficticio ====== */
const AREAS = [
  {ic:"💼", n:"Derecho laboral", d:"Despidos, indemnizaciones, accidentes de trabajo y reclamos."},
  {ic:"👨‍👩‍👧", n:"Derecho de familia", d:"Divorcios, cuota alimentaria, tenencia y sucesiones."},
  {ic:"🚗", n:"Accidentes de tránsito", d:"Reclamos por daños y lesiones. No cobramos si no ganás."},
  {ic:"🏢", n:"Derecho comercial", d:"Asesoramiento a empresas, contratos y societario."},
  {ic:"🏠", n:"Derecho civil", d:"Daños, contratos, propiedad y desalojos."},
  {ic:"📜", n:"Sucesiones", d:"Tramitamos herencias de forma ágil y transparente."},
];
const TEAM = [
  {e:"👩‍⚖️", n:"Dra. Liliana Méndez", role:"Socia fundadora", area:"Laboral y Familia"},
  {e:"👨‍⚖️", n:"Dr. Carlos Ferreyra", role:"Socio", area:"Comercial y Societario"},
  {e:"👩‍💼", n:"Dra. Sofía Aguirre", role:"Asociada", area:"Civil y Daños"},
  {e:"👨‍💼", n:"Dr. Martín Quiroga", role:"Asociado", area:"Sucesiones"},
];
const $ = (s)=>document.querySelector(s);

$("#areaGrid").innerHTML = AREAS.map(a=>`
  <article class="area-card"><div class="area-ic">${a.ic}</div><h3>${a.n}</h3><p>${a.d}</p></article>`).join("");

$("#teamGrid").innerHTML = TEAM.map(t=>`
  <article class="team-card">
    <div class="team-photo">${t.e}</div>
    <div class="team-info"><h3>${t.n}</h3><div class="role">${t.role}</div><div class="area">${t.area}</div></div>
  </article>`).join("");

function toggleMenu(){ $("#mainNav").classList.toggle("open"); $(".menu-toggle").classList.toggle("active"); document.body.style.overflow=$("#mainNav").classList.contains("open")?"hidden":""; }
function closeMenu(){ $("#mainNav").classList.remove("open"); $(".menu-toggle").classList.remove("active"); document.body.style.overflow=""; }
function submitForm(e){ e.preventDefault(); e.target.reset(); $("#formMsg").textContent="¡Consulta enviada! Un abogado del estudio te contactará a la brevedad. (Demo — no se envía nada real.)"; }
window.addEventListener("scroll",()=>{ $("#header").style.boxShadow = window.scrollY>10?"0 4px 20px -14px rgba(20,35,56,.3)":"none"; });
