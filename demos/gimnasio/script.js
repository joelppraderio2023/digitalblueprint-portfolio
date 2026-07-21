/* ====== PULSO · Demo gimnasio — contenido ficticio ====== */
const CLASSES = [
  { emoji:"🏋️", name:"Musculación", desc:"Sala equipada con máquinas de última generación.", c:"c1" },
  { emoji:"🔥", name:"Funcional",   desc:"Entrená fuerza, resistencia y movilidad.",          c:"c2" },
  { emoji:"🥊", name:"Boxeo",       desc:"Descargá energía y ganá coordinación.",            c:"c3" },
  { emoji:"🧘", name:"Yoga",        desc:"Flexibilidad, equilibrio y respiración.",           c:"c4" },
  { emoji:"🚴", name:"Indoor Cycle",desc:"Cardio intenso al ritmo de la música.",            c:"c5" },
  { emoji:"💃", name:"Ritmos",      desc:"Bailá y quemá calorías sin darte cuenta.",         c:"c6" },
];

const COACHES = [
  { emoji:"🧔", name:"Diego Funes",   role:"Head Coach",       bio:"15 años de experiencia en alto rendimiento." },
  { emoji:"👩", name:"Caro Méndez",   role:"Funcional",        bio:"Especialista en entrenamiento metabólico." },
  { emoji:"🧑", name:"Tomás Ledesma", role:"Musculación",      bio:"Lic. en Educación Física, planes de hipertrofia." },
  { emoji:"👩‍🦰", name:"Vale Ortiz",  role:"Yoga & Movilidad", bio:"Instructora certificada de Hatha y Vinyasa." },
];

const DAYS = ["Lun","Mar","Mié","Jue","Vie","Sáb"];
const SLOTS = [
  { time:"08:00", row:["Funcional","Musculación","Funcional","Musculación","Funcional","Yoga"] },
  { time:"10:00", row:["Yoga","Indoor Cycle","Yoga","Indoor Cycle","Ritmos","Funcional"] },
  { time:"18:00", row:["Boxeo","Funcional","Boxeo","Funcional","Boxeo","—"] },
  { time:"19:30", row:["Indoor Cycle","Ritmos","Indoor Cycle","Ritmos","Funcional","—"] },
  { time:"21:00", row:["Musculación","Yoga","Musculación","Yoga","Musculación","—"] },
];

const $ = (s)=>document.querySelector(s);

/* CLASSES */
$("#classGrid").innerHTML = CLASSES.map(c=>`
  <article class="class-card ${c.c}">
    <span class="emoji">${c.emoji}</span>
    <h3>${c.name}</h3>
    <p>${c.desc}</p>
  </article>`).join("");

/* COACHES */
$("#coachGrid").innerHTML = COACHES.map(c=>`
  <article class="coach-card">
    <div class="coach-photo" style="background:linear-gradient(160deg,#222a1c,#10140d)">${c.emoji}</div>
    <div class="coach-info">
      <h3>${c.name}</h3>
      <div class="role">${c.role}</div>
      <p>${c.bio}</p>
    </div>
  </article>`).join("");

/* SCHEDULE */
$("#scheduleTable").innerHTML = `
  <thead><tr><th>Hora</th>${DAYS.map(d=>`<th>${d}</th>`).join("")}</tr></thead>
  <tbody>${SLOTS.map(s=>`
    <tr><td>${s.time}</td>${s.row.map(c=>`<td>${c==="—"?'<span style="color:#3a4031">—</span>':`<span class="cls">${c}</span>`}</td>`).join("")}</tr>
  `).join("")}</tbody>`;

/* NAV */
function toggleMenu(){
  $("#mainNav").classList.toggle("open");
  $(".menu-toggle").classList.toggle("active");
  document.body.style.overflow = $("#mainNav").classList.contains("open")?"hidden":"";
}
function closeMenu(){
  $("#mainNav").classList.remove("open");
  $(".menu-toggle").classList.remove("active");
  document.body.style.overflow="";
}

/* FORM */
function submitForm(e){
  e.preventDefault();
  e.target.reset();
  $("#formMsg").textContent = "¡Gracias! Te contactamos en breve. (Demo — no se envía nada real.)";
}

/* header shadow */
window.addEventListener("scroll",()=>{ $("#header").style.boxShadow = window.scrollY>10? "0 4px 20px -12px rgba(0,0,0,.6)":"none"; });
