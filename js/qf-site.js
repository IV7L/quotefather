(function () {
  const STORAGE_LANG = "qf_lang";
  const STORAGE_VISITED = "qf_visited";
  const STORAGE_GRID_DONE = "qf_grid_done";

  const i18n = {
    en: {
      transition: "ENTERING",
      scroll: "Scroll",
      slogan: "Empowering ideas, structuring dialogue, transforming decisions with technology.",
      about_kicker: "About",
      about_text: "We build disciplined web products for governance, structure, and decision-making — where culture meets systems.",
      vision_kicker: "Vision",
      vision_text: "Translate complex thinking into usable systems: clear workflows, accountable decisions, and durable institutions.",
      servicesTitle: "Services",
      services_1_title: "Systems & Governance Architecture",
      services_1_text: "We design decision workflows and governance structures, then translate them into clear product experiences.",
      services_2_title: "Build, Deploy, Iterate",
      services_2_text: "We implement robust web apps with disciplined UI, intentional transitions, and measurable iteration cycles.",
      productsTitle: "Products",
      available: "Available",
      open: "Open",
      product_fasil_desc: "A web app for structured governance workflows: propose, deliberate, decide, and archive with clarity.",
      product_vestara_desc: "A web app for organizing dialogue and proposals into coherent, reviewable institutional processes.",
      product_soon_title: "Third Product",
      soon: "Coming soon",
      product_soon_desc: "Quietly in progress. A product that tightens the bridge between culture, governance, and execution.",
      soon_link: "Soon →",
      footer_note: "Framing truth through order.",
      footer_contact: "contact@quotefather.com",
    },
    ar: {
      transition: "دخول",
      scroll: "اسحب للأسفل",
      slogan: "نُمكّن الأفكار، وننظّم الحوار، ونحوّل القرار إلى نظام عبر التقنية.",
      about_kicker: "من نحن",
      about_text: "نبني منتجات ويب منضبطة للحوكمة والبنية وصناعة القرار — حيث تلتقي الثقافة مع الأنظمة.",
      vision_kicker: "الرؤية",
      vision_text: "نحوّل التفكير المعقّد إلى أنظمة قابلة للاستخدام: مسارات واضحة، قرارات مسؤولة، ومؤسسات أكثر صلابة.",
      servicesTitle: "الخدمات",
      services_1_title: "هندسة الأنظمة والحوكمة",
      services_1_text: "نصمّم مسارات اتخاذ القرار وبُنى الحوكمة ثم نحولها إلى تجربة منتج واضحة ومنظمة.",
      services_2_title: "بناء، نشر، تطوير",
      services_2_text: "ننفّذ تطبيقات ويب قوية بواجهة منضبطة وانتقالات مقصودة ودورات تحسين قابلة للقياس.",
      productsTitle: "المنتجات",
      available: "متاح",
      open: "فتح",
      product_fasil_desc: "تطبيق ويب لمسارات حوكمة منظمة: اقتراح، مداولة، قرار، وأرشفة بوضوح.",
      product_vestara_desc: "تطبيق ويب لتنظيم الحوار والمقترحات ضمن عمليات مؤسسية قابلة للمراجعة.",
      product_soon_title: "المنتج الثالث",
      soon: "قريبًا",
      product_soon_desc: "قيد التطوير بهدوء. منتج يعزّز الجسر بين الثقافة والحوكمة والتنفيذ.",
      soon_link: "قريبًا →",
      footer_note: "صياغة الحقيقة عبر النظام.",
      footer_contact: "contact@quotefather.com",
    },
  };

  function setYear() {
    const y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  function applyLang(lang) {
    const dict = i18n[lang] || i18n.en;

    document.documentElement.lang = lang === "ar" ? "ar" : "en";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    const btnEn = document.getElementById("lang-en");
    const btnAr = document.getElementById("lang-ar");
    if (btnEn && btnAr) {
      btnEn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
      btnAr.setAttribute("aria-pressed", lang === "ar" ? "true" : "false");
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    const contact = document.querySelector('.qf-footer-link[href^="mailto:"]');
    if (contact) {
      const email = dict.footer_contact || contact.textContent.trim();
      contact.textContent = email;
      contact.setAttribute("href", "mailto:" + email);
    }

    localStorage.setItem(STORAGE_LANG, lang);
  }

  function initLang() {
    const saved = localStorage.getItem(STORAGE_LANG);
    const lang = saved === "ar" ? "ar" : "en";
    applyLang(lang);

    const btnEn = document.getElementById("lang-en");
    const btnAr = document.getElementById("lang-ar");
    if (btnEn) btnEn.addEventListener("click", () => applyLang("en"));
    if (btnAr) btnAr.addEventListener("click", () => applyLang("ar"));
  }

  function playIntroOnce() {
    const visited = localStorage.getItem(STORAGE_VISITED) === "true";
    document.body.classList.add("intro");

    if (visited) {
      document.body.classList.remove("intro");
      return;
    }

    document.body.classList.add("intro-on");
    localStorage.setItem(STORAGE_VISITED, "true");

    window.setTimeout(() => {
      document.body.classList.remove("intro");
      document.body.classList.remove("intro-on");
    }, 900); // faster
  }

  function showTransition(text) {
    const overlay = document.getElementById("page-transition");
    if (!overlay) return;
    const t = overlay.querySelector(".pt-text");
    if (t && typeof text === "string") t.textContent = text;
    overlay.classList.add("is-on");
  }

  function initTransitions() {
    document.addEventListener("click", (e) => {
      const a = e.target && e.target.closest ? e.target.closest('a[data-transition="true"]') : null;
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;
      if (href.startsWith("http")) return;

      e.preventDefault();

      const lang = localStorage.getItem(STORAGE_LANG) === "ar" ? "ar" : "en";
      showTransition((i18n[lang] || i18n.en).transition || "ENTERING");

      window.setTimeout(() => {
        window.location.href = href;
      }, 220); // faster
    });
  }

  /* GRID BUILD — first time only (separate from intro visited) */
  function buildGridOnce() {
    const page = document.querySelector(".qf-page");
    if (!page) return;

    const gridDone = localStorage.getItem(STORAGE_GRID_DONE) === "true";
    if (gridDone) {
      page.classList.add("grid-built");
      return;
    }

    // animate first time
    setTimeout(() => page.classList.add("grid-built"), 180);
    localStorage.setItem(STORAGE_GRID_DONE, "true");
  }

  // init
  setYear();
  initLang();
  initTransitions();
  buildGridOnce();

  // intro after first paint
  window.requestAnimationFrame(() => playIntroOnce());
})();
