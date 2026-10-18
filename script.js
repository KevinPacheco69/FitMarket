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

const vistaMovil = window.matchMedia("(max-width: 699px)");

actualizarMenu(!vistaMovil.matches);

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

const formulario = document.querySelector("#formulario-contacto");

if (formulario) {
  const campos = [
    {
      elemento: document.querySelector("#nombre"),
      mensaje: document.querySelector("#error-nombre"),
      validar: (campo) =>
        campo.value.trim() !== "" ? "" : "Escribe tu nombre completo.",
    },
    {
      elemento: document.querySelector("#correo"),
      mensaje: document.querySelector("#error-correo"),
      validar: (campo) =>
        campo.validity.valueMissing
          ? "Escribe tu correo electrónico."
          : campo.validity.typeMismatch
            ? "Introduce un correo con formato válido."
            : "",
    },
    {
      elemento: document.querySelector("#servicio"),
      mensaje: document.querySelector("#error-servicio"),
      validar: (campo) =>
        campo.value !== "" ? "" : "Selecciona el servicio que te interesa.",
    },
    {
      elemento: document.querySelector("#mensaje"),
      mensaje: document.querySelector("#error-mensaje"),
      validar: (campo) =>
        campo.value.trim() === ""
          ? "Escribe un mensaje."
          : campo.value.trim().length < 10
            ? "El mensaje debe tener al menos 10 caracteres."
            : "",
    },
  ];

  function validarCampo(campoInfo) {
    const error = campoInfo.validar(campoInfo.elemento);

    campoInfo.mensaje.textContent = error;

    if (error) {
      campoInfo.elemento.setAttribute("aria-invalid", "true");
    } else {
      campoInfo.elemento.removeAttribute("aria-invalid");
    }

    return error === "";
  }

  campos.forEach((campoInfo) => {
    campoInfo.elemento.addEventListener("blur", () => {
      validarCampo(campoInfo);
    });

    campoInfo.elemento.addEventListener("input", () => {
      if (campoInfo.elemento.hasAttribute("aria-invalid")) {
        validarCampo(campoInfo);
      }
    });

    campoInfo.elemento.addEventListener("change", () => {
      if (campoInfo.elemento.hasAttribute("aria-invalid")) {
        validarCampo(campoInfo);
      }
    });
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const resultados = campos.map(validarCampo);
    const formularioValido = resultados.every(Boolean);
    const estado = document.querySelector("#estado-formulario");

    if (!formularioValido) {
      estado.textContent = "Revisa los campos indicados antes de continuar.";

      const primerCampoInvalido = campos.find(
        (campoInfo, indice) => !resultados[indice],
      );

      primerCampoInvalido.elemento.focus();
      return;
    }

    estado.textContent =
      "Formulario validado correctamente. Esta demostración no envía la consulta a un servidor.";
  });
}
