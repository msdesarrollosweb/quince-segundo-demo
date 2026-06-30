(() => {
  "use strict";

  const $ = (selector) => document.querySelector(selector);

  const navToggle = $(".nav-toggle");
  const navMenu = $(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    navMenu.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  const countdown = $(".countdown");
  const eventDateValue = countdown?.dataset.eventDate;
  const eventDate = eventDateValue ? new Date(eventDateValue).getTime() : null;

  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = String(value).padStart(2, "0");
  };

  const updateCountdown = () => {
    if (!eventDate || Number.isNaN(eventDate)) return;

    const now = Date.now();
    const distance = Math.max(eventDate - now, 0);

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    setText("days", days);
    setText("hours", hours);
    setText("minutes", minutes);
    setText("seconds", seconds);
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);

  const rsvpForm = $("#rsvpForm");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!rsvpForm.checkValidity()) {
        rsvpForm.reportValidity();
        return;
      }

      const data = new FormData(rsvpForm);
      const nombre = String(data.get("nombre") || "").trim();
      const asistentes = String(data.get("asistentes") || "").trim();
      const menu = String(data.get("menu") || "").trim();
      const mensaje = String(data.get("mensaje") || "").trim();

      const text = [
        "Hola, quiero confirmar asistencia a la fiesta de 15 de Valentina.",
        `Nombre: ${nombre}`,
        `Cantidad de asistentes: ${asistentes}`,
        `Menú especial: ${menu}`,
        mensaje ? `Mensaje: ${mensaje}` : ""
      ].filter(Boolean).join("\n");

      const phone = "5491100000000";
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    });
  }

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", async () => {
      const value = button.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = "Copiado";
        setTimeout(() => { button.textContent = "Copiar alias"; }, 1800);
      } catch {
        alert(`Alias: ${value}`);
      }
    });
  });
})();
