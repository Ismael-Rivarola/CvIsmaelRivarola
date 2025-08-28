// Animación simple de entrada
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section, footer");

  sections.forEach((sec, index) => {
    sec.style.opacity = 0;
    sec.style.transform = "translateY(30px)";
    setTimeout(() => {
      sec.style.transition = "all 0.6s ease";
      sec.style.opacity = 1;
      sec.style.transform = "translateY(0)";
    }, index * 200); // efecto escalonado
  });
});
