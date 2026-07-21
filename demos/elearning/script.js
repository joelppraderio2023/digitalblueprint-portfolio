/* ====== Aprendé+ · Demo e-learning — ficticio ====== */
const COURSES = [
  {n:"Diseño UX/UI desde cero", cat:"Diseño", lvl:"Principiante", h:"32 hs", rate:"4.9", rev:"2.1k", price:"$14.900", old:"$24.900", e:"🎨", g:"#5b4be3,#9333ea"},
  {n:"Programación web Full Stack", cat:"Programación", lvl:"Intermedio", h:"60 hs", rate:"4.8", rev:"3.4k", price:"$19.900", old:null, e:"💻", g:"#2563c9,#5b4be3"},
  {n:"Marketing digital práctico", cat:"Marketing", lvl:"Principiante", h:"28 hs", rate:"4.7", rev:"1.8k", price:"$12.900", old:"$18.900", e:"📈", g:"#f5a623,#e3514b"},
  {n:"Excel y datos para negocios", cat:"Negocios", lvl:"Todos", h:"22 hs", rate:"4.9", rev:"2.6k", price:"$9.900", old:null, e:"📊", g:"#22a06b,#0f7a4d"},
  {n:"Fotografía con tu celular", cat:"Diseño", lvl:"Principiante", h:"16 hs", rate:"4.8", rev:"1.2k", price:"$8.900", old:"$13.900", e:"📷", g:"#9333ea,#c026d3"},
  {n:"Finanzas personales", cat:"Negocios", lvl:"Principiante", h:"14 hs", rate:"4.9", rev:"3.0k", price:"$10.900", old:null, e:"💰", g:"#0ea5a5,#0e7490"},
  {n:"Inglés para el trabajo", cat:"Idiomas", lvl:"Intermedio", h:"40 hs", rate:"4.7", rev:"2.3k", price:"$15.900", old:"$22.900", e:"🗣️", g:"#e3514b,#b91c1c"},
  {n:"IA y productividad", cat:"Programación", lvl:"Todos", h:"18 hs", rate:"5.0", rev:"4.1k", price:"$13.900", old:null, e:"🤖", g:"#5b4be3,#2563c9"},
  {n:"Community Manager", cat:"Marketing", lvl:"Principiante", h:"24 hs", rate:"4.6", rev:"1.5k", price:"$11.900", old:"$17.900", e:"📱", g:"#f5a623,#d97706"},
];
const BENEFITS = [
  {ic:"🎓", n:"Certificado oficial", d:"Sumá a tu CV un certificado validado al terminar."},
  {ic:"♾️", n:"Acceso de por vida", d:"Cursá a tu ritmo y volvé cuando quieras."},
  {ic:"💬", n:"Comunidad activa", d:"Resolvé dudas con profes y compañeros."},
  {ic:"📱", n:"Aprendé donde estés", d:"Desde el celu, tablet o compu, online."},
];
const CATS = ["Todos","Diseño","Programación","Marketing","Negocios","Idiomas"];
const $ = (s)=>document.querySelector(s);
let activeCat = "Todos";

$("#filters").innerHTML = CATS.map(c=>`<button class="fchip ${c===activeCat?'active':''}" onclick="setCat('${c}',this)">${c}</button>`).join("");

function renderCourses(){
  const list = activeCat==="Todos"? COURSES : COURSES.filter(c=>c.cat===activeCat);
  $("#courseGrid").innerHTML = list.map(c=>`
    <article class="course-card">
      <div class="course-img" style="background:linear-gradient(150deg,${c.g})">
        <span class="course-cat">${c.cat}</span><span class="course-lvl">${c.lvl}</span>${c.e}
      </div>
      <div class="course-body">
        <h3>${c.n}</h3>
        <div class="course-meta"><span>⏱️ ${c.h}</span><span class="course-rating">★ ${c.rate} <span>(${c.rev})</span></span></div>
        <div class="course-foot">
          <span class="course-price">${c.old?`<small>${c.old}</small>`:''}${c.price}</span>
          <a href="#planes" class="btn btn-primary sm">Ver curso</a>
        </div>
      </div>
    </article>`).join("");
}
function setCat(c, el){ activeCat=c; document.querySelectorAll(".fchip").forEach(x=>x.classList.remove("active")); el.classList.add("active"); renderCourses(); }

$("#benefitGrid").innerHTML = BENEFITS.map(b=>`
  <article class="benefit-card"><div class="ic">${b.ic}</div><h3>${b.n}</h3><p>${b.d}</p></article>`).join("");

function toggleMenu(){ $("#mainNav").classList.toggle("open"); $(".menu-toggle").classList.toggle("active"); document.body.style.overflow=$("#mainNav").classList.contains("open")?"hidden":""; }
function closeMenu(){ $("#mainNav").classList.remove("open"); $(".menu-toggle").classList.remove("active"); document.body.style.overflow=""; }
window.addEventListener("scroll",()=>{ $("#header").style.boxShadow = window.scrollY>10?"0 4px 20px -14px rgba(26,23,48,.25)":"none"; });

renderCourses();
