(function(){
  const STORAGE_LANG = "qf_lang";
  const STORAGE_VISITED = "qf_visited";

  const i18n = {
    en: {
      slogan: "EMPOWERING Ideas, Structuring Dialogue, Transforming Decisions with Technology.",
      productsTitle: "Products",
      servicesTitle: "Services",
      services_1_title: "Governance Systems on Chain",
      services_1_text: "Smart-contract based decision workflows built for auditability, integrity, and long-term institutional trust.",
      services_2_title: "Structured Communication Consulting",
      services_2_text: "Architecture for dialogue and policy-making across enterprises, NGOs, and public institutions.",
      product_fasil_desc: "A web app that structures proposals, voting, and institutional decisions with clarity.",
      product_vestara_desc: "A web app for disciplined dialogue: issues, arguments, and outcomes — traceable by design.",
      product_soon_title: "Coming Soon",
      product_soon_desc: "A third product is being shaped — quietly.",
      open: "Open",
      soon: "Soon",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms & Conditions",
      footer_about: "About",
      footer_contact: "Contact",
      transition: "ENTERING"
    },
    ar: {
      slogan: "تمكين الأفكار، تنظيم الحوار، وتحويل القرارات عبر التكنولوجيا.",
      productsTitle: "المنتجات",
      servicesTitle: "الخدمات",
      services_1_title: "حوكمة رقمية على السلسلة",
      services_1_text: "تدفقات قرار مبنية على العقود الذكية—قابلة للتدقيق، عالية النزاهة، ومصممة لثقة مؤسسية طويلة الأمد.",
      services_2_title: "استشارات التواصل المنظّم",
      services_2_text: "تصميم بنية للحوار وصناعة السياسات داخل الشركات والمنظمات والمؤسسات العامة.",
      product_fasil_desc: "تطبيق ويب ينظّم المقترحات والتصويت والقرارات المؤسسية بوضوح وانضباط.",
      product_vestara_desc: "تطبيق ويب للحوار المنضبط: قضايا، حجج، ومخرجات—قابلة للتتبّع بالتصميم.",
      product_soon_title: "قريبًا",
      product_soon_desc: "منتج ثالث قيد التشكل—بهدوء.",
      open: "فتح",
      soon: "قريبًا",
      footer_privacy: "سياسة الخصوصية",
      footer_terms: "الشروط والأحكام",
      footer_about: "من نحن",
      footer_contact: "تواصل",
      transition: "دخول"
    }
  };

  function setHtmlDirLang(lang){
    const html = document.documentElement;
    html.lang = lang === "ar" ? "ar" : "en";
    html.dir = lang === "ar" ? "rtl" : "ltr";
  }

  function applyI18n(lang){
    const dict = i18n[lang] || i18n.en;
    setHtmlDirLang(lang);

    document.querySelectorAll("[data-i18n]").forEach((el)=>{
      const key = el.getAttribute("data-i18n");
      if(!key) return;
      const val = dict[key];
      if(typeof val === "string"){
        el.textContent = val;
      }
    });

    // Update toggle states
    const btnAr = document.getElementById("lang-ar");
    const btnEn = document.getElementById("lang-en");
    if(btnAr && btnEn){
      btnAr.setAttribute("aria-pressed", String(lang === "ar"));
      btnEn.setAttribute("aria-pressed", String(lang === "en"));
    }
  }

  function splitText(el){
    // Keep words spacing
    const text = el.textContent;
    el.textContent = "";
    for(const ch of text){
      const span = document.createElement("span");
      span.className = "split-char";
      span.textContent = ch === " " ? "\u00A0" : ch;
      el.appendChild(span);
    }
  }

  function runIntroOnce(){
    const visited = localStorage.getItem(STORAGE_VISITED) === "true";
    if(visited){
      document.body.classList.add("no-intro");
      return;
    }
    localStorage.setItem(STORAGE_VISITED, "true");
    document.body.classList.add("intro-animate");

    // Text motion for hero headings
    const heroHeadings = document.querySelectorAll(".hero-heading");
    heroHeadings.forEach((h, idx)=>{
      splitText(h);
      // Stagger via inline animation-delay
      h.querySelectorAll(".split-char").forEach((sp, j)=>{
        sp.style.animationDelay = (0.15*idx + j*0.012) + "s";
      });
    });

    // Slogan motion
    const slogan = document.querySelector(".hero-text");
    if(slogan){
      splitText(slogan);
      slogan.querySelectorAll(".split-char").forEach((sp, j)=>{
        sp.style.animationDelay = (0.35 + j*0.006) + "s";
      });
    }

    // Turn off intro class after animations
    setTimeout(()=>{ document.body.classList.remove("intro-animate"); }, 2500);
  }

  function bindLangToggle(){
    const btnAr = document.getElementById("lang-ar");
    const btnEn = document.getElementById("lang-en");
    if(btnAr){
      btnAr.addEventListener("click", ()=>{
        localStorage.setItem(STORAGE_LANG, "ar");
        applyI18n("ar");
      });
    }
    if(btnEn){
      btnEn.addEventListener("click", ()=>{
        localStorage.setItem(STORAGE_LANG, "en");
        applyI18n("en");
      });
    }
  }

  function bindPageTransitions(){
    const overlay = document.getElementById("page-transition");
    if(!overlay) return;

    // Set overlay text based on lang
    const lang = localStorage.getItem(STORAGE_LANG) || "en";
    const dict = i18n[lang] || i18n.en;
    const t = overlay.querySelector(".pt-text");
    if(t) t.textContent = dict.transition;

    document.querySelectorAll("a[href]").forEach((a)=>{
      const href = a.getAttribute("href");
      if(!href) return;
      const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
      const isHash = href.startsWith("#");
      if(isExternal || isHash) return;

      a.addEventListener("click", (e)=>{
        // allow modifiers
        if(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        overlay.classList.add("active");
        setTimeout(()=>{ window.location.href = href; }, 520);
      });
    });

    // On load, ensure overlay hidden
    window.addEventListener("pageshow", ()=> overlay.classList.remove("active"));
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    const lang = localStorage.getItem(STORAGE_LANG) || "en";
    applyI18n(lang);
    bindLangToggle();
    bindPageTransitions();
    runIntroOnce();
  });
})();