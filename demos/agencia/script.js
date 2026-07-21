/* ====== VORTEX · Demo agencia — ficticio ====== */
const SERVICES = [
  {num:"01", n:"Branding & Identidad", d:"Logo, sistema visual y guía de marca que te hacen único.", tags:["Logo","Identidad","Guía"]},
  {num:"02", n:"Diseño web / UX-UI", d:"Sitios y productos digitales que se ven increíbles y convierten.", tags:["Figma","UX","Prototipos"]},
  {num:"03", n:"Desarrollo", d:"Webs y apps rápidas, escalables y a medida de tu negocio.", tags:["Web","E-commerce","Apps"]},
  {num:"04", n:"Marketing digital", d:"Estrategia de contenido, ads y growth para crecer en serio.", tags:["Ads","Social","SEO"]},
  {num:"05", n:"Motion & Video", d:"Animaciones y piezas audiovisuales que detienen el scroll.", tags:["Motion","Reels","3D"]},
  {num:"06", n:"Consultoría", d:"Te ayudamos a ordenar tu marca y tu presencia digital.", tags:["Estrategia","Auditoría"]},
];
const WORK = [
  {e:"🚀", cat:"Branding", n:"Nova Tech", d:"Identidad para una startup de IA.", g:"#3a1f5c,#1a0f2e"},
  {e:"🛍️", cat:"E-commerce", n:"Pulse Store", d:"Tienda online + branding completo.", g:"#1f3a5c,#0f1e2e"},
  {e:"📱", cat:"App", n:"Drift", d:"App de movilidad, diseño UX/UI.", g:"#5c1f3a,#2e0f1e"},
  {e:"🎬", cat:"Motion", n:"Lumen", d:"Campaña audiovisual de lanzamiento.", g:"#1f5c4a,#0f2e24"},
];
const STEPS = [
  {n:"Descubrimos", d:"Entendemos tu marca, tu público y tus objetivos."},
  {n:"Estrategia", d:"Definimos el plan y el concepto creativo."},
  {n:"Creamos", d:"Diseñamos y desarrollamos con foco en resultados."},
  {n:"Lanzamos", d:"Implementamos, medimos y optimizamos."},
];
const STATS = [["+150","proyectos entregados"],["12","años de experiencia"],["98%","clientes que vuelven"],["8","premios de diseño"]];
const $ = (s)=>document.querySelector(s);

$("#svcGrid").innerHTML = SERVICES.map(s=>`
  <article class="svc-card">
    <div class="svc-num">${s.num}</div>
    <h3>${s.n}</h3><p>${s.d}</p>
    <div class="svc-tags">${s.tags.map(t=>`<span>${t}</span>`).join("")}</div>
  </article>`).join("");

$("#workGrid").innerHTML = WORK.map(w=>`
  <article class="work-card">
    <div class="work-img" style="background:linear-gradient(150deg,${w.g})">
      <span class="work-cat">${w.cat}</span>${w.e}
    </div>
    <div class="work-info"><h3>${w.n}</h3><p>${w.d}</p></div>
  </article>`).join("");

$("#stepGrid").innerHTML = STEPS.map((s,i)=>`
  <article class="step-card">
    <div class="step-n">${i+1}</div>
    <div><h3>${s.n}</h3><p>${s.d}</p></div>
  </article>`).join("");

$("#statsInner").innerHTML = STATS.map(s=>`<div><strong>${s[0]}</strong><span>${s[1]}</span></div>`).join("");

function toggleMenu(){ $("#mainNav").classList.toggle("open"); $(".menu-toggle").classList.toggle("active"); document.body.style.overflow=$("#mainNav").classList.contains("open")?"hidden":""; }
function closeMenu(){ $("#mainNav").classList.remove("open"); $(".menu-toggle").classList.remove("active"); document.body.style.overflow=""; }
function submitForm(e){ e.preventDefault(); e.target.reset(); $("#formMsg").textContent="¡Mensaje enviado! Te respondemos en menos de 24 hs. (Demo — no se envía nada real.)"; }
window.addEventListener("scroll",()=>{ $("#header").style.boxShadow = window.scrollY>10?"0 4px 20px -14px rgba(168,85,247,.3)":"none"; });
