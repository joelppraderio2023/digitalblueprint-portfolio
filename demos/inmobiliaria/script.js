/* ====== Terra · Demo inmobiliaria — propiedades ficticias ====== */
const PROPS = [
  {id:1, op:"Venta", type:"Departamento", title:"Monoambiente a estrenar", loc:"Centro, Tu Ciudad", price:"USD 78.000", rooms:1, beds:1, baths:1, m2:42, emoji:"🏢", g:"#6f86b0,#3f5780"},
  {id:2, op:"Venta", type:"Casa", title:"Casa con jardín y pileta", loc:"Barrio Norte", price:"USD 245.000", rooms:4, beds:3, baths:2, m2:210, emoji:"🏡", g:"#7faf7a,#4f7d4a"},
  {id:3, op:"Alquiler", type:"Departamento", title:"2 ambientes luminoso", loc:"Villa Crespo", price:"$320.000/mes", rooms:2, beds:1, baths:1, m2:55, emoji:"🌆", g:"#b08f6f,#80603f"},
  {id:4, op:"Venta", type:"Terreno", title:"Lote en barrio privado", loc:"Las Lomas", price:"USD 65.000", rooms:0, beds:0, baths:0, m2:600, emoji:"🌳", g:"#8aa86f,#5a7d3f"},
  {id:5, op:"Alquiler", type:"Casa", title:"Casa familiar 3 dorm.", loc:"Zona Sur", price:"$540.000/mes", rooms:4, beds:3, baths:2, m2:180, emoji:"🏠", g:"#a87f9f,#7a4f70"},
  {id:6, op:"Venta", type:"Departamento", title:"Piso con vista panorámica", loc:"Puerto Madero", price:"USD 420.000", rooms:3, beds:2, baths:2, m2:120, emoji:"🌃", g:"#6f9fb0,#3f7080"},
  {id:7, op:"Venta", type:"Casa", title:"Chalet de categoría", loc:"Country El Roble", price:"USD 510.000", rooms:5, beds:4, baths:3, m2:320, emoji:"🏰", g:"#b0976f,#80683f"},
  {id:8, op:"Alquiler", type:"Departamento", title:"Studio amoblado", loc:"Recoleta", price:"$410.000/mes", rooms:1, beds:1, baths:1, m2:38, emoji:"🛋️", g:"#9f7fa8,#705080"},
  {id:9, op:"Venta", type:"Terreno", title:"Fracción para desarrollo", loc:"Ruta 8 km 45", price:"USD 130.000", rooms:0, beds:0, baths:0, m2:2400, emoji:"🌲", g:"#7fa87f,#4f7d4f"},
];
const $ = (s)=>document.querySelector(s);
let filters = {op:"all", type:"all", rooms:"all"};

function cardHTML(p){
  return `<article class="prop-card" onclick="openModal(${p.id})">
    <div class="prop-img" style="background:linear-gradient(150deg,${p.g})">
      <span class="prop-badge">${p.op}</span>
      <button class="prop-fav" onclick="event.stopPropagation();this.textContent=this.textContent==='🤍'?'❤️':'🤍'">🤍</button>
      ${p.emoji}
    </div>
    <div class="prop-info">
      <div class="prop-price">${p.price}</div>
      <div class="prop-title">${p.title}</div>
      <div class="prop-loc">📍 ${p.loc} · ${p.type}</div>
      <div class="prop-specs">
        ${p.rooms?`<span>🚪 ${p.rooms} amb</span><span>🛏️ ${p.beds}</span><span>🚿 ${p.baths}</span>`:''}
        <span>📐 ${p.m2} m²</span>
      </div>
    </div>
  </article>`;
}
function getFiltered(){
  return PROPS.filter(p=>
    (filters.op==="all"||p.op===filters.op) &&
    (filters.type==="all"||p.type===filters.type) &&
    (filters.rooms==="all"||p.rooms===Number(filters.rooms))
  );
}
function render(){
  const list = getFiltered();
  $("#resultCount").textContent = `${list.length} propiedad(es) encontradas`;
  $("#noResults").style.display = list.length? "none":"block";
  $("#propGrid").innerHTML = list.map(cardHTML).join("");
}
function applyFilters(){
  filters.op = $("#fOp").value; filters.type = $("#fType").value; filters.rooms = $("#fRooms").value;
  render();
  document.getElementById("propiedades").scrollIntoView({behavior:"smooth"});
}
function resetFilters(){
  filters={op:"all",type:"all",rooms:"all"};
  $("#fOp").value="all"; $("#fType").value="all"; $("#fRooms").value="all";
  render();
}
function openModal(id){
  const p = PROPS.find(x=>x.id===id);
  $("#modalContent").innerHTML = `
    <div class="prop-img" style="background:linear-gradient(150deg,${p.g});aspect-ratio:16/10;font-size:3.4rem;border-radius:0">
      <span class="prop-badge">${p.op}</span>${p.emoji}
    </div>
    <div style="padding:22px 22px 26px">
      <div class="prop-price" style="font-size:1.6rem">${p.price}</div>
      <h3 style="font-size:1.3rem;margin:6px 0 4px">${p.title}</h3>
      <p style="color:#5e6b7e">📍 ${p.loc} · ${p.type}</p>
      <div class="prop-specs" style="margin-top:16px">
        ${p.rooms?`<span>🚪 ${p.rooms} amb</span><span>🛏️ ${p.beds} dorm</span><span>🚿 ${p.baths} baños</span>`:''}<span>📐 ${p.m2} m²</span>
      </div>
      <p style="color:#5e6b7e;font-size:.92rem;margin:16px 0 20px">Excelente oportunidad en una de las mejores zonas. Luminosa, con terminaciones de primera calidad y a metros de todos los servicios. (Descripción de demo.)</p>
      <a href="#contacto" class="btn btn-primary full" onclick="closeModal()">Solicitar visita</a>
      <button class="clear-btn" style="width:100%;margin-top:10px" onclick="closeModal()">Cerrar</button>
    </div>`;
  $("#modal").classList.add("show"); document.body.style.overflow="hidden";
}
function closeModal(){ $("#modal").classList.remove("show"); document.body.style.overflow=""; }

function toggleMenu(){ $("#mainNav").classList.toggle("open"); $(".menu-toggle").classList.toggle("active"); document.body.style.overflow=$("#mainNav").classList.contains("open")?"hidden":""; }
function closeMenu(){ $("#mainNav").classList.remove("open"); $(".menu-toggle").classList.remove("active"); document.body.style.overflow=""; }
function submitForm(e){ e.preventDefault(); e.target.reset(); $("#formMsg").textContent="¡Gracias! Un asesor te contacta a la brevedad. (Demo — no se envía nada real.)"; }
window.addEventListener("scroll",()=>{ $("#header").style.boxShadow = window.scrollY>10?"0 4px 20px -14px rgba(19,36,59,.3)":"none"; });

render();
