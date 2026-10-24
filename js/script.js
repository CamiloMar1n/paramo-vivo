
// Páramo Vivo - Validación del formulario de contacto


// Busco el formulario. Como este archivo se carga en todas las páginas,

const formulario = document.getElementById("formulario-contacto");

if (formulario) {
  // Campos del formulario
  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const motivo = document.getElementById("motivo");
  const mensaje = document.getElementById("mensaje");
  const acepto = document.getElementById("acepto");
  const mensajeExito = document.getElementById("mensaje-exito");

  // Muestra el error debajo del campo y lo marca en rojo
  function mostrarError(campo, idError, texto) {
    document.getElementById(idError).textContent = texto;
    campo.classList.add("campo-invalido");
    campo.classList.remove("campo-valido");
    campo.setAttribute("aria-invalid", "true");
  }

  // Quita el error y marca el campo como válido
  function mostrarCorrecto(campo, idError) {
    document.getElementById(idError).textContent = "";
    campo.classList.remove("campo-invalido");
    campo.classList.add("campo-valido");
    campo.setAttribute("aria-invalid", "false");
  }

  // ----- Validaciones (cada una devuelve true si está bien) -----

  function validarNombre() {
    const valor = nombre.value.trim();
    if (valor.length < 3) {
      mostrarError(nombre, "error-nombre", "El nombre debe tener mínimo 3 caracteres.");
      return false;
    }
    mostrarCorrecto(nombre, "error-nombre");
    return true;
  }

  function validarEmail() {
    const valor = email.value.trim();
    // Patrón sencillo: algo + @ + algo + . + algo
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (valor === "") {
      mostrarError(email, "error-email", "Escribe tu correo electrónico.");
      return false;
    }
    if (!patron.test(valor)) {
      mostrarError(email, "error-email", "El correo no tiene un formato válido (ejemplo: nombre@correo.com).");
      return false;
    }
    mostrarCorrecto(email, "error-email");
    return true;
  }

  function validarMotivo() {
    if (motivo.value === "") {
      mostrarError(motivo, "error-motivo", "Selecciona el motivo de tu mensaje.");
      return false;
    }
    mostrarCorrecto(motivo, "error-motivo");
    return true;
  }

  function validarMensaje() {
    const valor = mensaje.value.trim();
    if (valor.length < 20) {
      mostrarError(mensaje, "error-mensaje", "El mensaje debe tener mínimo 20 caracteres (llevas " + valor.length + ").");
      return false;
    }
    mostrarCorrecto(mensaje, "error-mensaje");
    return true;
  }

  function validarAcepto() {
    if (!acepto.checked) {
      mostrarError(acepto, "error-acepto", "Debes aceptar para poder enviar el mensaje.");
      return false;
    }
    mostrarCorrecto(acepto, "error-acepto");
    return true;
  }

  // ----- Validación en tiempo real (mientras el usuario escribe) -----
  nombre.addEventListener("input", validarNombre);
  email.addEventListener("input", validarEmail);
  motivo.addEventListener("change", validarMotivo);
  mensaje.addEventListener("input", validarMensaje);
  acepto.addEventListener("change", validarAcepto);

  // ----- Al enviar el formulario -----
  formulario.addEventListener("submit", function (evento) {
    // Evito que la página se recargue
    evento.preventDefault();

    // Escondo el mensaje de éxito por si venía de un envío anterior
    mensajeExito.classList.add("d-none");

    // Llamo todas las validaciones por separado para que salgan todos los errores juntos
    const nombreOk = validarNombre();
    const emailOk = validarEmail();
    const motivoOk = validarMotivo();
    const mensajeOk = validarMensaje();
    const aceptoOk = validarAcepto();

    if (nombreOk && emailOk && motivoOk && mensajeOk && aceptoOk) {
      // Todo bien: muestro el mensaje de éxito (sin alert)
      const nombreUsuario = nombre.value.trim();
      mensajeExito.textContent = "¡Gracias, " + nombreUsuario + "! Tu mensaje fue enviado correctamente.";
      mensajeExito.classList.remove("d-none");

      // Limpio el formulario y los colores de los campos
      formulario.reset();
      const campos = [nombre, email, motivo, mensaje, acepto];
      campos.forEach(function (campo) {
        campo.classList.remove("campo-valido", "campo-invalido");
        campo.removeAttribute("aria-invalid");
      });
    } else {
      // Si hay errores, dejo el cursor en el primer campo que falló
      const primerError = formulario.querySelector(".campo-invalido");
      if (primerError) {
        primerError.focus();
      }
    }
  });
}