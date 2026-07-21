/* ====== ÁMBAR · Demo e-commerce — datos ficticios ====== */
const PRODUCTS = [
  { id:1,  name:"Camisa de lino Toscana",   cat:"Mujer",      price:38900, old:null,  grad:"linear-gradient(150deg,#e8d5b8,#c9ac82)", isNew:true },
  { id:2,  name:"Pantalón sastrero Olmo",   cat:"Mujer",      price:45900, old:54900, grad:"linear-gradient(150deg,#9aa394,#6f7a68)", isNew:false },
  { id:3,  name:"Vestido midi Duna",        cat:"Mujer",      price:52900, old:null,  grad:"linear-gradient(150deg,#d8a98c,#b07a5d)", isNew:true },
  { id:4,  name:"Sweater oversize Bruma",   cat:"Mujer",      price:41900, old:null,  grad:"linear-gradient(150deg,#cdc3b4,#a59a88)", isNew:false },
  { id:5,  name:"Remera box de algodón",    cat:"Hombre",     price:21900, old:27900, grad:"linear-gradient(150deg,#b9bfc6,#878f98)", isNew:false },
  { id:6,  name:"Camisa denim Roble",       cat:"Hombre",     price:43900, old:null,  grad:"linear-gradient(150deg,#7e90a8,#51647f)", isNew:true },
  { id:7,  name:"Chino slim Arena",         cat:"Hombre",     price:39900, old:null,  grad:"linear-gradient(150deg,#cdb999,#a08a66)", isNew:false },
  { id:8,  name:"Buzo de frisa Carbón",     cat:"Hombre",     price:36900, old:44900, grad:"linear-gradient(150deg,#6b6b6b,#3d3d3d)", isNew:false },
  { id:9,  name:"Bolso de cuero Nómada",    cat:"Accesorios", price:58900, old:null,  grad:"linear-gradient(150deg,#a87b4e,#7a5632)", isNew:true },
  { id:10, name:"Gorro de lana tejido",     cat:"Accesorios", price:14900, old:null,  grad:"linear-gradient(150deg,#b3a58c,#897c63)", isNew:false },
  { id:11, name:"Cinturón trenzado Sierra", cat:"Accesorios", price:18900, old:23900, grad:"linear-gradient(150deg,#8a6f52,#5f4a33)", isNew:false },
  { id:12, name:"Pañuelo de seda Aurora",   cat:"Accesorios", price:16900, old:null,  grad:"linear-gradient(150deg,#d9a9a0,#bd7e78)", isNew:true },
];

let currentFilter = "all";
let cart = [];

const $ = (s)=>document.querySelector(s);
const fmt = (n)=>"$"+n.toLocaleString("es-AR");

/* ---------- RENDER PRODUCTS ---------- */
function getVisible(){
  let list = PRODUCTS.filter(p=> currentFilter==="all" || p.cat===currentFilter);
  const sort = $("#sortSel").value;
  if(sort==="low")  list=[...list].sort((a,b)=>a.price-b.price);
  if(sort==="high") list=[...list].sort((a,b)=>b.price-a.price);
  if(sort==="new")  list=[...list].sort((a,b)=>(b.isNew?1:0)-(a.isNew?1:0));
  return list;
}

function renderProducts(){
  const list = getVisible();
  $("#resultCount").textContent = currentFilter==="all"
    ? `Mostrando los ${list.length} productos`
    : `${list.length} producto(s) en ${currentFilter}`;
  $("#productGrid").innerHTML = list.map(p=>`
    <article class="product">
      <div class="product-img" style="background:${p.grad}">
        ${p.isNew?'<span class="tag-new">Nuevo</span>':''}
        <button class="wish" aria-label="Favorito" onclick="toggleWish(this)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
        </button>
        <span class="swatch-name">${p.name.split(" ")[0]}</span>
      </div>
      <div class="product-info">
        <span class="product-cat">${p.cat}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-bottom">
          <span class="price">${p.old?`<small>${fmt(p.old)}</small>`:''}${fmt(p.price)}</span>
          <button class="add-btn" aria-label="Agregar al carrito" onclick="addToCart(${p.id})">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>
    </article>`).join("");
}

/* ---------- FILTERS ---------- */
function setFilter(cat, el){
  currentFilter = cat;
  document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));
  el.classList.add("active");
  renderProducts();
}
function filterFromNav(cat){
  closeMenu();
  currentFilter = cat;
  document.querySelectorAll(".chip").forEach(c=>c.classList.toggle("active", c.dataset.cat===cat));
  renderProducts();
  document.getElementById("catalogo").scrollIntoView({behavior:"smooth"});
}

/* ---------- CART ---------- */
function addToCart(id){
  const p = PRODUCTS.find(x=>x.id===id);
  const item = cart.find(x=>x.id===id);
  if(item) item.qty++;
  else cart.push({...p, qty:1});
  updateCart();
  showToast(`✓ ${p.name.split(" ").slice(0,2).join(" ")} agregado`);
}
function changeQty(id, delta){
  const item = cart.find(x=>x.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty<=0) cart = cart.filter(x=>x.id!==id);
  updateCart();
}
function removeItem(id){ cart = cart.filter(x=>x.id!==id); updateCart(); }

function updateCart(){
  const count = cart.reduce((s,i)=>s+i.qty,0);
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  $("#cartCount").textContent = count;
  $("#cartCount").style.display = count? "flex":"none";
  $("#cartTotal").textContent = fmt(total);

  if(cart.length===0){
    $("#cartItems").innerHTML = `<div class="cart-empty"><span>🛍️</span>Tu carrito está vacío.<br>¡Sumá algo que te guste!</div>`;
    $("#cartFooter").style.display = "none";
    return;
  }
  $("#cartFooter").style.display = "block";
  $("#cartItems").innerHTML = cart.map(i=>`
    <div class="cart-item">
      <div class="ci-img" style="background:${i.grad}"></div>
      <div class="ci-info">
        <span class="ci-cat">${i.cat}</span>
        <h5>${i.name}</h5>
        <div class="qty">
          <button onclick="changeQty(${i.id},-1)" aria-label="Restar">−</button>
          <span>${i.qty}</span>
          <button onclick="changeQty(${i.id},1)" aria-label="Sumar">+</button>
        </div>
        <span class="ci-price">${fmt(i.price*i.qty)}</span>
      </div>
      <button class="ci-remove" onclick="removeItem(${i.id})">Quitar</button>
    </div>`).join("");
}

function openCart(){ $("#cartDrawer").classList.add("open"); $("#overlay").classList.add("show"); document.body.style.overflow="hidden"; }
function closeCart(){ $("#cartDrawer").classList.remove("open"); $("#overlay").classList.remove("show"); document.body.style.overflow=""; }
function checkout(){
  if(cart.length===0) return;
  closeCart();
  $("#modal").classList.add("show");
  cart = []; updateCart();
}
function closeModal(){ $("#modal").classList.remove("show"); }

/* ---------- UI helpers ---------- */
let toastTimer;
function showToast(msg){
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(()=>t.classList.remove("show"),1900);
}
function toggleWish(el){ el.style.color = el.style.color==="rgb(192, 133, 47)" ? "" : "rgb(192, 133, 47)"; }
function toggleMenu(){ $("#mainNav").classList.toggle("open"); document.body.style.overflow = $("#mainNav").classList.contains("open")?"hidden":""; }
function closeMenu(){ $("#mainNav").classList.remove("open"); document.body.style.overflow=""; }
function subscribe(e){ e.preventDefault(); e.target.reset(); $("#nlMsg").textContent="¡Listo! Revisá tu correo (demo, no se envía nada real)."; }

/* header shadow on scroll */
window.addEventListener("scroll",()=>{ $("#header").style.boxShadow = window.scrollY>10? "0 4px 20px -12px rgba(0,0,0,.3)":"none"; });

/* init */
renderProducts();
updateCart();
