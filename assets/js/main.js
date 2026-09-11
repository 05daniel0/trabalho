/* KRAFTWEG — interações leves, sem dependências */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- header: sombra ao rolar ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.dataset.scrolled = String(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- menu mobile ---- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.dataset.open === "true";
      nav.dataset.open = String(!open);
      toggle.setAttribute("aria-expanded", String(!open));
    });
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.dataset.open = "false";
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- filtro de modelos ---- */
  var filterBar = document.querySelector("[data-filters]");
  if (filterBar) {
    var cards = document.querySelectorAll("[data-model]");
    filterBar.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var val = btn.dataset.filter;
        filterBar.querySelectorAll("button").forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        cards.forEach(function (card) {
          var show = val === "all" || card.dataset.model === val;
          card.hidden = !show;
        });
      });
    });
  }

  /* ---- ano no rodapé ---- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---- formulário de contato (validação client-side) ---- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var ok = form.querySelector(".form__ok");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll(".field").forEach(function (field) {
        var input = field.querySelector("input, textarea, select");
        if (!input || !input.hasAttribute("required")) return;
        var bad = !input.value.trim() ||
          (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value));
        field.dataset.invalid = String(bad);
        if (bad) valid = false;
      });
      if (valid) {
        form.reset();
        if (ok) { ok.dataset.show = "true"; ok.focus && ok.focus(); }
      }
    });
  }
})();
