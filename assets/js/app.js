/* Arahan Singh — portfolio interactions
   Vanilla JS, no dependencies. Handles:
   custom avatar cursor, draggable sticky notes, scroll reveals,
   mobile nav, active links, works filtering/views, contact form, mascot. */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const on = (el, ev, fn, opt) => el && el.addEventListener(ev, fn, opt);

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    setYear();
    setActiveNav();
    mobileNav();
    revealOnScroll();
    draggableStickies();
    customCursor();
    worksControls();
    contactForm();
    mascot();
  }

  /* ---------- footer year ---------- */
  function setYear() {
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- active nav link ---------- */
  function setActiveNav() {
    const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".site-nav a[href]").forEach((a) => {
      const target = (a.getAttribute("href").split("/").pop() || "").toLowerCase();
      if (target === here || (here === "" && target === "index.html")) a.classList.add("active");
    });
  }

  /* ---------- mobile nav ---------- */
  function mobileNav() {
    const btn = document.querySelector(".menu-button");
    const nav = document.getElementById("site-nav");
    if (!btn || !nav) return;
    on(btn, "click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((a) =>
      on(a, "click", () => {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- reveal on scroll ---------- */
  function revealOnScroll() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("revealed"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => io.observe(el));
    // safety net: reveal anything still hidden after load
    window.addEventListener("load", () =>
      setTimeout(() => items.forEach((el) => el.classList.add("revealed")), 1200)
    );
  }

  /* ---------- draggable sticky notes ---------- */
  function draggableStickies() {
    document.querySelectorAll(".draggable").forEach((note) => {
      let startX, startY, baseX, baseY, dragging = false;
      const parent = note.offsetParent || note.parentElement;

      const down = (e) => {
        dragging = true;
        note.classList.add("dragging");
        note.setPointerCapture && note.setPointerCapture(e.pointerId);
        const rect = note.getBoundingClientRect();
        const pRect = parent.getBoundingClientRect();
        baseX = rect.left - pRect.left;
        baseY = rect.top - pRect.top;
        note.style.left = baseX + "px";
        note.style.top = baseY + "px";
        note.style.right = "auto";
        note.style.setProperty("--x", "auto");
        startX = e.clientX;
        startY = e.clientY;
      };
      const move = (e) => {
        if (!dragging) return;
        note.style.left = baseX + (e.clientX - startX) + "px";
        note.style.top = baseY + (e.clientY - startY) + "px";
      };
      const up = (e) => {
        dragging = false;
        note.classList.remove("dragging");
        note.releasePointerCapture && note.releasePointerCapture(e.pointerId);
      };
      on(note, "pointerdown", down);
      on(note, "pointermove", move);
      on(note, "pointerup", up);
      on(note, "pointercancel", up);
    });
  }

  /* ---------- custom avatar cursor ---------- */
  function customCursor() {
    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;
    if (!finePointer) {
      cursor.remove();
      return;
    }
    const span = cursor.querySelector("span");
    let x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y;

    on(document, "mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
      const zone = e.target.closest("[data-cursor-text],[data-cursor]");
      if (!zone) {
        cursor.classList.remove("visible");
        return;
      }
      cursor.classList.add("visible");
      const label = zone.getAttribute("data-cursor-text");
      if (label != null) {
        cursor.classList.add("text-mode");
        cursor.classList.remove("avatar-mode");
        if (span) span.textContent = label || "View";
      } else {
        cursor.classList.add("avatar-mode");
        cursor.classList.remove("text-mode");
      }
    });
    on(document, "mouseleave", () => cursor.classList.remove("visible"));

    (function loop() {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      cursor.style.left = x + "px";
      cursor.style.top = y + "px";
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- works page: view toggle + filters ---------- */
  function worksControls() {
    // view toggle (cards / kanban)
    const viewButtons = document.querySelectorAll(".view-button[data-view]");
    if (viewButtons.length) {
      viewButtons.forEach((btn) =>
        on(btn, "click", () => {
          const view = btn.getAttribute("data-view");
          viewButtons.forEach((b) => b.classList.toggle("active", b === btn));
          document.querySelectorAll(".works-view").forEach((v) => {
            v.hidden = v.getAttribute("data-view") !== view;
          });
        })
      );
    }
    // expandable cards: show description on click
    document.querySelectorAll(".works-archive .completed-card").forEach((card) =>
      on(card, "click", () => card.classList.toggle("open"))
    );
    // filters
    const filters = document.querySelectorAll(".filter[data-filter]");
    if (!filters.length) return;
    filters.forEach((f) =>
      on(f, "click", () => {
        const val = f.getAttribute("data-filter");
        filters.forEach((b) => b.classList.toggle("active", b === f));
        document.querySelectorAll("[data-cat]").forEach((card) => {
          const cats = (card.getAttribute("data-cat") || "").split(/\s+/);
          card.hidden = !(val === "all" || cats.indexOf(val) !== -1);
        });
      })
    );
  }

  /* ---------- contact form (front-end only) ---------- */
  function contactForm() {
    const form = document.querySelector(".brief-form");
    if (!form) return;
    on(form, "submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const email = form.getAttribute("data-email");
      if (email) {
        const fd = new FormData(form);
        const name = (fd.get("name") || "").toString().trim();
        const subject = `Project brief${name ? " from " + name : ""}`;
        const body =
          `Name: ${fd.get("name") || ""}\n` +
          `Email: ${fd.get("email") || ""}\n` +
          `Company: ${fd.get("company") || ""}\n` +
          `Topic: ${fd.get("topic") || ""}\n\n` +
          `${fd.get("message") || ""}`;
        window.location.href =
          `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
      form.classList.add("submitted");
      const note = form.querySelector(".success-note");
      if (note) note.classList.add("visible");
    });
  }

  /* ---------- mascot ---------- */
  function mascot() {
    const widget = document.getElementById("mascot-widget");
    if (!widget) return;
    const bubble = document.getElementById("mascot-bubble");
    const text = document.getElementById("mascot-bubble-text");
    const closeBtn = document.getElementById("mascot-bubble-close");
    const muteBtn = document.getElementById("mascot-bubble-mute");
    const sleepBtn = document.getElementById("mascot-sleep-btn");
    const eyes = widget.querySelector(".mascot-eyes");
    const head = widget.querySelector(".mascot-head-group");
    const body = widget.querySelector(".mascot-body-wrapper");

    const lines = [
      "Hi, I'm Sparky! Let's explore Arahan's work together.",
      "He's built brands, ventures and a lot of content. 🚀",
      "Curious about Off-side Origins? Check the Work page.",
      "Marketing, operations, venture building — pick a lane.",
      "Tip: you can drag those sticky notes around. ↗",
      "Want the full story? The About page has it.",
      "Two 1st-place wins at IVB. Not bad, right? 🏆"
    ];
    let idx = 0, muted = false, asleep = false;

    function say(msg) {
      if (asleep) return;
      if (text) text.textContent = msg;
      if (bubble) bubble.classList.add("visible");
    }
    function hide() {
      if (bubble) bubble.classList.remove("visible");
    }

    setTimeout(() => say(lines[0]), 1400);
    on(body, "click", () => {
      if (asleep) return;
      idx = (idx + 1) % lines.length;
      say(lines[idx]);
    });
    on(closeBtn, "click", (e) => { e.stopPropagation(); hide(); });
    on(muteBtn, "click", (e) => {
      e.stopPropagation();
      muted = !muted;
      muteBtn.textContent = muted ? "🔇" : "🔊";
    });
    on(sleepBtn, "click", (e) => {
      e.stopPropagation();
      asleep = !asleep;
      widget.classList.toggle("sleeping", asleep);
      if (asleep) { hide(); spawnZ(); }
    });

    function spawnZ() {
      if (!widget.classList.contains("sleeping")) return;
      const z = document.createElement("span");
      z.className = "sleeping-z";
      z.textContent = "z";
      z.style.right = "40px";
      z.style.bottom = "120px";
      widget.appendChild(z);
      setTimeout(() => z.remove(), 2000);
      setTimeout(spawnZ, 900);
    }

    // eyes follow pointer
    if (!prefersReduced && (eyes || head)) {
      on(document, "mousemove", (e) => {
        if (asleep) return;
        const r = widget.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / 400));
        const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / 400));
        if (eyes) eyes.style.transform = `translate(${dx * 5}px, ${dy * 3}px)`;
        if (head) head.style.transform = `translate(${dx * 2.5}px, ${dy * 1.5}px)`;
      });
    }
  }
})();
