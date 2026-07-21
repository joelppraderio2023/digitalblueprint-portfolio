/* ====== Lucía Romero · Demo landing coach — ficticio ====== */
function submitForm(e){
  e.preventDefault();
  e.target.reset();
  document.getElementById("formMsg").textContent =
    "¡Gracias! Recibí tu mensaje y te escribo en menos de 24 hs. (Demo — no se envía nada real.)";
}

/* header shadow on scroll */
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.style.boxShadow = window.scrollY > 10 ? "0 4px 20px -14px rgba(35,32,28,.4)" : "none";
});

/* reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.style.opacity = 1; en.target.style.transform = "none"; io.unobserve(en.target); }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".pain-card,.service-card,.testi,.about-grid>div,.booking-form").forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(22px)";
  el.style.transition = "opacity .6s ease, transform .6s ease";
  io.observe(el);
});
