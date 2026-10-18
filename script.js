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
