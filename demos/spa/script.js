/* ====== Aura · Demo spa — ficticio ====== */
const TREATMENTS = [
  {ic:"💆‍♀️", n:"Facial detox", d:"Limpieza profunda, hidratación y luminosidad para tu piel.", from:"Desde $18.000"},
  {ic:"🌿", n:"Masaje relajante", d:"Descontracturante con aceites esenciales tibios.", from:"Desde $20.000"},
  {ic:"🪷", n:"Tratamiento corporal", d:"Exfoliación, hidratación y envoltura nutritiva.", from:"Desde $24.000"},
  {ic:"💎", n:"Antiage premium", d:"Radiofrecuencia y activos que rejuvenecen la piel.", from:"Desde $28.000"},
  {ic:"🕯️", n:"Aromaterapia", d:"Ritual sensorial para equilibrar cuerpo y mente.", from:"Desde $16.000"},
  {ic:"✋", n:"Reflexología", d:"Masaje de pies que libera tensiones de todo el cuerpo.", from:"Desde $14.000"},
];
const $ = (s)=>document.querySelector(s);

$("#treatGrid").innerHTML = TREATMENTS.map(t=>`
  <article class="treat-card">
    <div class="treat-ic">${t.ic}</div>
    <h3>${t.n}</h3>
    <p>${t.d}</p>
    <span class="from">${t.from}</span>
  </article>`).join("");

function toggleMenu(){ $("#mainNav").classList.toggle("open"); $(".menu-toggle").classList.toggle("active"); document.body.style.overflow=$("#mainNav").classList.contains("open")?"hidden":""; }
function closeMenu(){ $("#mainNav").classList.remove("open"); $(".menu-toggle").classList.remove("active"); document.body.style.overflow=""; }
function submitForm(e){ e.preventDefault(); e.target.reset(); $("#formMsg").textContent="¡Gracias! Te contactamos para coordinar tu cita. (Demo — no se envía nada real.)"; }
window.addEventListener("scroll",()=>{ $("#header").style.boxShadow = window.scrollY>10?"0 4px 20px -14px rgba(58,61,51,.25)":"none"; });
