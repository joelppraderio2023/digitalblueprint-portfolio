/* ====== Sazón · Demo restaurante — ficticio ====== */
const MENU = {
  "Entradas":[
    {n:"Burrata de campo",d:"Tomates asados, albahaca y aceite de oliva varietal",p:"$8.900",tag:"Veggie"},
    {n:"Empanada de osobuco",d:"Braseada 8 horas, masa de hojaldre casera",p:"$6.500",tag:""},
    {n:"Ceviche de la casa",d:"Pesca del día, leche de tigre y batata crocante",p:"$11.200",tag:"Fresco"},
  ],
  "Principales":[
    {n:"Bondiola al malbec",d:"Cocción lenta, puré rústico y chips de batata",p:"$14.900",tag:"Estrella"},
    {n:"Risotto de hongos",d:"Carnaroli, hongos de pino y parmesano curado",p:"$12.500",tag:"Veggie"},
    {n:"Pesca del día",d:"A la plancha, vegetales de estación y manteca negra",p:"$16.800",tag:""},
    {n:"Ojo de bife 350g",d:"Carne madurada, papas confitadas y chimichurri",p:"$18.900",tag:""},
  ],
  "Postres":[
    {n:"Flan de dulce de leche",d:"Receta de la abuela, crema batida a mano",p:"$5.900",tag:"Clásico"},
    {n:"Volcán de chocolate",d:"75% cacao, helado de crema americana",p:"$6.500",tag:""},
  ],
  "Vinos":[
    {n:"Malbec de altura",d:"Valle de Uco · copa / botella",p:"$3.500 / $19.000",tag:""},
    {n:"Torrontés",d:"Cafayate · aromático y fresco",p:"$3.200 / $17.500",tag:""},
  ],
};
const GAL = ["🍝","🥩","🍷","🍲","🍰","🫕","🥗","🍤"];
const $ = (s)=>document.querySelector(s);
let activeTab = Object.keys(MENU)[0];

function renderTabs(){
  $("#menuTabs").innerHTML = Object.keys(MENU).map(t=>
    `<button class="menu-tab ${t===activeTab?'active':''}" onclick="setTab('${t}')">${t}</button>`).join("");
}
function renderList(){
  $("#menuList").innerHTML = MENU[activeTab].map(i=>`
    <div class="menu-item">
      <div class="mi-left"><h3>${i.n}${i.tag?`<span class="mi-tag">${i.tag}</span>`:''}</h3><p>${i.d}</p></div>
      <span class="mi-price">${i.p}</span>
    </div>`).join("");
}
function setTab(t){ activeTab=t; renderTabs(); renderList(); }

$("#galleryGrid").innerHTML = GAL.map((e,i)=>{
  const g=["#3a281c,#241813","#2e2418,#1c160e","#3a2424,#241616","#2c3220,#181c10","#322438,#1c1024","#38301c,#241e10","#1c2c2a,#101816","#382a1c,#241a10"][i];
  return `<div class="gi" style="background:linear-gradient(150deg,${g})">${e}</div>`;
}).join("");

function toggleMenu(){ $("#mainNav").classList.toggle("open"); $(".menu-toggle").classList.toggle("active"); document.body.style.overflow=$("#mainNav").classList.contains("open")?"hidden":""; }
function closeMenu(){ $("#mainNav").classList.remove("open"); $(".menu-toggle").classList.remove("active"); document.body.style.overflow=""; }
function submitForm(e){ e.preventDefault(); e.target.reset(); $("#formMsg").textContent="¡Reserva recibida! Te confirmamos por WhatsApp. (Demo — no se envía nada real.)"; }
window.addEventListener("scroll",()=>{ $("#header").style.boxShadow = window.scrollY>10?"0 4px 20px -14px rgba(0,0,0,.6)":"none"; });

renderTabs(); renderList();
