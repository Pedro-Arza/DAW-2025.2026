document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // === Cargar el tema guardado ===
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    themeToggle.textContent = "🌙";
  }

  // === Cambiar tema ===
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    themeToggle.textContent = isDark ? "🌙" : "🌞";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // === Buscador ===
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `buscar.html?q=${encodeURIComponent(query)}`;
      }
    });
  }

  // === Página de resultados ===
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");
  const searchQuery = document.getElementById("searchQuery");
  const resultsList = document.getElementById("resultsList");

  if (query && searchQuery && resultsList) {
    searchQuery.innerHTML = `Has buscado: <strong>${query}</strong>`;

    const resultados = [
      { titulo: "Inicio", descripcion: "Volver al inicio.", enlace: "index.html" },
      { titulo: "Quiénes somos", descripcion: "Conoce nuestro equipo.", enlace: "quienes-somos.html" },
      { titulo: "Proyectos", descripcion: "Explora nuestros proyectos.", enlace: "proyectos.html" },
    ];

    const filtrados = resultados.filter(r =>
      r.titulo.toLowerCase().includes(query.toLowerCase()) ||
      r.descripcion.toLowerCase().includes(query.toLowerCase())
    );

    if (filtrados.length > 0) {
      filtrados.forEach(r => {
        const item = document.createElement("a");
        item.href = r.enlace;
        item.classList.add("result-item");
        item.innerHTML = `<h2>${r.titulo}</h2><p>${r.descripcion}</p>`;
        resultsList.appendChild(item);
      });
    } else {
      resultsList.innerHTML = `<p>No se encontraron resultados para "<strong>${query}</strong>".</p>`;
    }
  }
});
