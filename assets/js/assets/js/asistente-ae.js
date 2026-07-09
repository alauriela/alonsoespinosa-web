(function () {
  const DATA_URL = "/assets/data/asistente-ae.json";

  let respuestas = [];

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function crearAsistente() {
    const wrapper = document.createElement("div");
    wrapper.className = "ae-assistant";

    wrapper.innerHTML = `
      <button class="ae-assistant-button" id="aeAssistantButton" aria-label="Abrir guía rápida">
        <span class="ae-assistant-dot"></span>
        <span>Guía rápida</span>
      </button>

      <section class="ae-assistant-panel" id="aeAssistantPanel" aria-label="Guía rápida de Alonso & Espinosa">
        <div class="ae-assistant-header">
          <div>
            <strong>Guía rápida</strong>
            <small>Respuestas frecuentes de Alonso & Espinosa</small>
          </div>
          <button class="ae-assistant-close" id="aeAssistantClose" aria-label="Cerrar guía rápida">×</button>
        </div>

        <div class="ae-assistant-messages" id="aeAssistantMessages">
          <div class="ae-message ae-message-bot">
            Hola. Soy una guía rápida con respuestas predefinidas sobre Alonso & Espinosa. No recojo datos personales ni sustituyo una conversación profesional.
          </div>
        </div>

        <form class="ae-assistant-form" id="aeAssistantForm">
          <input
            type="text"
            id="aeAssistantInput"
            placeholder="Escribe una duda breve..."
            autocomplete="off"
            aria-label="Escribe tu pregunta"
          >
          <button type="submit">Enviar</button>
        </form>

        <div class="ae-assistant-footer">
          <a href="/preguntas-frecuentes/">Ver preguntas frecuentes</a>
          <span>·</span>
          <a href="/contacto/">Contacto</a>
        </div>
      </section>
    `;

    document.body.appendChild(wrapper);

    const button = document.getElementById("aeAssistantButton");
    const panel = document.getElementById("aeAssistantPanel");
    const close = document.getElementById("aeAssistantClose");
    const form = document.getElementById("aeAssistantForm");
    const input = document.getElementById("aeAssistantInput");

    button.addEventListener("click", function () {
      panel.classList.toggle("open");
      if (panel.classList.contains("open")) {
        input.focus();
      }
    });

    close.addEventListener("click", function () {
      panel.classList.remove("open");
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const pregunta = input.value.trim();

      if (!pregunta) return;

      agregarMensaje(pregunta, "user");
      responder(pregunta);
      input.value = "";
    });
  }

  function agregarMensaje(texto, tipo, enlace) {
    const messages = document.getElementById("aeAssistantMessages");
    const msg = document.createElement("div");
    msg.className = `ae-message ae-message-${tipo}`;

    msg.textContent = texto;

    if (enlace) {
      const link = document.createElement("a");
      link.href = enlace;
      link.textContent = "Ver más";
      link.className = "ae-message-link";
      msg.appendChild(link);
    }

    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function responder(pregunta) {
    const preguntaNormalizada = normalizar(pregunta);

    let mejorRespuesta = null;
    let mejorPuntuacion = 0;

    respuestas.forEach((item) => {
      let puntuacion = 0;

      item.keywords.forEach((keyword) => {
        const keywordNormalizada = normalizar(keyword);

        if (preguntaNormalizada.includes(keywordNormalizada)) {
          puntuacion += keywordNormalizada.length > 8 ? 2 : 1;
        }
      });

      if (puntuacion > mejorPuntuacion) {
        mejorPuntuacion = puntuacion;
        mejorRespuesta = item;
      }
    });

    if (mejorRespuesta && mejorPuntuacion > 0) {
      agregarMensaje(mejorRespuesta.answer, "bot", mejorRespuesta.link);
    } else {
      agregarMensaje(
        "No tengo una respuesta clara para esa pregunta. Puedes consultar la página de preguntas frecuentes o agendar una primera conversación para verlo con más detalle.",
        "bot",
        "/preguntas-frecuentes/"
      );
    }
  }

  async function cargarDatos() {
    try {
      const response = await fetch(DATA_URL);
      if (!response.ok) throw new Error("No se pudo cargar la base de respuestas");
      respuestas = await response.json();
    } catch (error) {
      respuestas = [];
      console.warn("Guía rápida: no se pudo cargar la base de respuestas.");
    }
  }

  document.addEventListener("DOMContentLoaded", async function () {
    await cargarDatos();
    crearAsistente();
  });
})();