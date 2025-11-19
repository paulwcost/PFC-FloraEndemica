document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");

  // Dá um pequeno delay opcional (200ms) para evitar piscar
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 200);
});
