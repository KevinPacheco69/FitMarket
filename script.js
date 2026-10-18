const botonesFiltro = document.querySelectorAll(".filtro");
const productos = document.querySelectorAll(".producto");
const mensajeFiltro = document.querySelector("#resultado-filtro");

botonesFiltro.forEach((boton) => {
  boton.addEventListener("click", () => {
    const categoriaSeleccionada = boton.dataset.categoria;
    let productosVisibles = 0;

    // Actualizar el estado de los botones
    botonesFiltro.forEach((otroBoton) => {
      const seleccionado = otroBoton === boton;

      otroBoton.classList.toggle("activo", seleccionado);
      otroBoton.setAttribute("aria-pressed", String(seleccionado));
    });

    // Mostrar solamente los productos de la categoría elegida
    productos.forEach((producto) => {
      const coincide =
        categoriaSeleccionada === "todos" ||
        producto.dataset.categoria === categoriaSeleccionada;

      producto.hidden = !coincide;

      if (coincide) {
        productosVisibles++;
      }
    });

    mensajeFiltro.textContent = `Productos encontrados: ${productosVisibles}.`;
  });
});

const botonMenu = document.querySelector(".menu-toggle");
const menuPrincipal = document.querySelector("#menu-principal");

function actualizarMenu(mostrar) {
  menuPrincipal.hidden = !mostrar;

  botonMenu.setAttribute("aria-expanded", String(mostrar));
  botonMenu.querySelector(".menu-toggle-text").textContent = mostrar
    ? "Cerrar menú"
    : "Menú";
}

actualizarMenu(false);

botonMenu.addEventListener("click", () => {
  const menuEstaAbierto = botonMenu.getAttribute("aria-expanded") === "true";

  actualizarMenu(!menuEstaAbierto);
});

// Cerrar el menú después de seleccionar una sección en móvil
menuPrincipal.querySelectorAll("a").forEach((enlace) => {
  enlace.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 699px)").matches) {
      actualizarMenu(false);
    }
  });
});

// Restaurar la navegación al cambiar a pantalla grande
window.matchMedia("(min-width: 700px)").addEventListener("change", (evento) => {
  if (evento.matches) {
    actualizarMenu(true);
  } else {
    actualizarMenu(false);
  }
});
