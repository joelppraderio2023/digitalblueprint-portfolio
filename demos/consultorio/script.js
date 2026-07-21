/* ====== Sonrisa · Demo consultorio odontológico — ficticio ====== */
const SERVICES = [
  {ic:"🪥", n:"Limpieza y control", d:"Profilaxis y chequeos para mantener tu boca sana."},
  {ic:"😬", n:"Ortodoncia", d:"Brackets y alineadores invisibles para enderezar tu sonrisa."},
  {ic:"✨", n:"Estética dental", d:"Blanqueamiento y carillas para una sonrisa de revista."},
  {ic:"🦷", n:"Implantes", d:"Reemplazá piezas perdidas con implantes de titanio."},
  {ic:"🩹", n:"Endodoncia", d:"Tratamiento de conducto sin dolor y en pocas sesiones."},
  {ic:"👶", n:"Odontopediatría", d:"Atención especializada y amigable para los más chicos."},
];
const TEAM = [
  {e:"👩‍⚕️", n:"Dra. Marina Sosa", role:"Directora · Ortodoncia", mat:"M.N. 00000"},
  {e:"👨‍⚕️", n:"Dr. Pablo Iriarte", role:"Implantología", mat:"M.N. 00000"},
  {e:"👩‍⚕️", n:"Dra. Lucía Vera", role:"Estética dental", mat:"M.N. 00000"},
  {e:"👨‍⚕️", n:"Dr. Tomás Gil", role:"Odontopediatría", mat:"M.N. 00000"},
];
const FAQ = [
  {q:"¿Atienden por obra social o prepaga?", a:"Sí, trabajamos con las principales obras sociales y prepagas. Consultanos por la tuya al pedir el turno y te confirmamos la cobertura."},
  {q:"¿Atienden urgencias?", a:"Contamos con guardia de urgencias las 24 horas. Si tenés dolor agudo, llamanos y te damos prioridad de atención."},
  {q:"¿El tratamiento duele?", a:"Trabajamos con anestesia de última generación y técnicas mínimamente invasivas para que tu experiencia sea lo más cómoda posible."},
  {q:"¿Puedo financiar mi tratamiento?", a:"Sí, ofrecemos planes de pago en cuotas sin interés y distintos medios de pago. Te armamos un presupuesto claro antes de empezar."},
  {q:"¿Atienden a niños?", a:"¡Claro! Tenemos un área de odontopediatría pensada para que los más chicos se sientan cómodos y sin miedo."},
];
const $ = (s)=>document.querySelector(s);

$("#svcGrid").innerHTML = SERVICES.map(s=>`
  <article class="svc-card"><div class="svc-ic">${s.ic}</div><h3>${s.n}</h3><p>${s.d}</p></article>`).join("");

$("#teamGrid").innerHTML = TEAM.map(t=>`
  <article class="team-card">
    <div class="team-photo">${t.e}</div>
    <div class="team-info"><h3>${t.n}</h3><div class="role">${t.role}</div><div class="mat">${t.mat}</div></div>
  </article>`).join("");

$("#faqList").innerHTML = FAQ.map(f=>`
  <div class="faq-item">
    <button class="faq-q" onclick="toggleFaq(this)">${f.q}<span class="ic">+</span></button>
    <div class="faq-a"><p>${f.a}</p></div>
  </div>`).join("");
function toggleFaq(btn){
  const item = btn.parentElement;
  const ans = item.querySelector(".faq-a");
  const open = item.classList.contains("open");
  document.querySelectorAll(".faq-item").forEach(i=>{ i.classList.remove("open"); i.querySelector(".faq-a").style.maxHeight=null; });
  if(!open){ item.classList.add("open"); ans.style.maxHeight = ans.scrollHeight+"px"; }
}

function toggleMenu(){ $("#mainNav").classList.toggle("open"); $(".menu-toggle").classList.toggle("active"); document.body.style.overflow=$("#mainNav").classList.contains("open")?"hidden":""; }
function closeMenu(){ $("#mainNav").classList.remove("open"); $(".menu-toggle").classList.remove("active"); document.body.style.overflow=""; }
function submitForm(e){ e.preventDefault(); e.target.reset(); $("#formMsg").textContent="¡Turno solicitado! Te confirmamos por WhatsApp. (Demo — no se envía nada real.)"; }
window.addEventListener("scroll",()=>{ $("#header").style.boxShadow = window.scrollY>10?"0 4px 20px -14px rgba(15,48,58,.2)":"none"; });
