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
      services_1_title: "Intelligent Systems Design for Insight-Driven Decisions",
      services_1_text: "We design AI-native systems that transform complex human signals—behavior, sentiment, and intent—into structured, actionable decisions. Our work replaces guesswork with adaptive intelligence, enabling organizations to act on real insights across education, dialogue, and commerce.",
      services_2_title: "Structured Platforms for Learning, Dialogue, and Human Growth",
      services_2_text: "We build structured digital platforms that restore clarity to learning, discussion, and collaboration. By combining proven frameworks with intelligent guidance, we create environments where understanding deepens, dialogue becomes meaningful, and people grow with purpose.",
      productsTitle: "Products",
      available: "Available",
      finished: "Finished",
      dev: "Development Stage",
      mvp: "MVP",
      review: "Review Impact",
      mvpreview: "What's that ?",
      open: "Open",
      product_qcc_desc: "Non-profit training initiative born from a simple belief: learning programming should be accessible, clear, and meaningful — not expensive or overwhelming.",
      product_fasil_desc: "Automated web platform for structured debates, designed to bring clarity and order to meaningful discussions. It guides dialogue using established debate rules, AI mentorship, and transparent decision-making to help ideas stand on truth, not noise.",
      product_vestara_desc: "AI-native e-commerce system built to eliminate guesswork from selling. By modeling community mood and behavioral intent through adaptive intelligence, it converts real-time social insight into market decisions executed through a seamless commerce layer.",
      product_soon_title: "Haád",
      soon: "Coming soon",
      product_soon_desc: "Quietly in progress. A product that tightens the bridge between culture, AI, and traveling.",
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
      services_1_title: "تصميم أنظمة ذكية لاتخاذ قرارات قائمة على الفهم",
      services_1_text: "نقوم بتصميم أنظمة مبنية جوهريًا على الذكاء الاصطناعي لتحويل السلوك البشري والمزاج العام والنية إلى قرارات واضحة وقابلة للتنفيذ. نساعد المؤسسات على استبدال التخمين بالفهم عبر ذكاء متكيّف يخدم التعليم، والحوار، والأسواق.",
      services_2_title: "منصات منظمة للتعلّم والحوار وبناء الإنسان",
      services_2_text: "نطوّر منصات رقمية منظمة تعيد الوضوح إلى التعلّم والنقاش والعمل الجماعي. من خلال دمج الأطر المنهجية مع التوجيه الذكي، نخلق بيئات تعزّز الفهم الحقيقي، وتحوّل الحوار إلى قيمة، والنمو إلى تجربة واعي.",
      productsTitle: "المنتجات",
      available: "متاح",
      finished: "انتهى",
      dev: "مرحلة التطوير",
      mvp: "النسخة الأولية",
      review: "استعراض النتائج",
      mvpreview: "اعرف اكثر",
      open: "فتح",
      product_qcc_desc: "مبادرة تدريبية غير ربحية استمرت ٣ سنوات وُلِدت من قناعة بسيطة: أن تعلّم البرمجة يجب أن يكون متاحًا، واضحًا، وذا معنى — لا مكلفًا ولا مُربكًا.",
      product_fasil_desc: "منصة ويب مؤتمتة للمناظرات المنظمة، صُمِّمت لإعادة الوضوح والنظام إلى النقاشات الهادفة. تُوجّه الحوار باستخدام قواعد مناظرة معتمدة، وإرشاد بالذكاء الاصطناعي، وآليات اتخاذ قرار شفافة، لمساعدة الأفكار على الوقوف على أساس الحقيقة لا الضجيج.",
      product_vestara_desc: "نظام تجارة إلكترونية مبني جوهريًا على الذكاء الاصطناعي، صُمِّم لإلغاء التخمين من عملية البيع. من خلال نمذجة المزاج العام للمجتمعات ونواياها السلوكية باستخدام ذكاء متكيّف، يحوّل الإشارات الاجتماعية اللحظية إلى قرارات سوقية تُنفَّذ عبر طبقة تجارة سلسة.",
      product_soon_title: "Haád",
      soon: "قريبًا",
      product_soon_desc: "قيد التطوير بهدوء. منتج يعزّز الجسر بين الثقافة ،الذكاء الاصطناعي والسفر.",
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
