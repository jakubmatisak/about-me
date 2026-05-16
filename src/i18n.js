// SK + EN message bundles. SK strings are verbatim from the v3 prototype.
// To add or edit copy, edit the values here — they're keyed by id, the
// markup in index.html refers to them via data-i18n attributes.

import { TERM_SCRIPTS, TERM_SCRIPTS_EN } from "./data.js";

export const MESSAGES = {
  sk: {
    meta: {
      title: "Ing. Jakub Matišák, PhD. — IOLab @ FEI STU",
      desc: "Jakub Matišák — vývojár virtuálneho laboratória, IOLab @ FEI STU Bratislava. Výskum: virtuálne laboratóriá, AR a holografia vo vzdelávaní.",
    },
    nav: {
      eyebrow: "IOLab @ FEI STU · Bratislava · open to collaborations",
      "o-mne": "~/o-mne",
      dev: "~/dev",
      vyskum: "~/výskum",
      projekty: "~/projekty",
      publikacie: "~/publikácie",
      ucim: "~/učím",
      kontakt: "~/kontakt",
    },
    roles: {
      dev:      { label: "vývojár",  cmd: "switch --role=dev",      headline: ["Píšem", "frontend.", "Aj backend, keď treba."], sub: "Frontend vývojár so zázemim v Vue, Vuetify a Angulare. K backendu prejdem keď to projekt potrebuje — Python, Laravel, REST API. Cez deň robím na projektoch, pomimo učím a robím výskum." },
      research: { label: "výskumník", cmd: "switch --role=research", headline: ["Skúmam", "AR a holografiu", "vo vzdelávaní."], sub: "Online laboratóriá pre výučbu automatického riadenia, 3D vizualizácia mechatronických systémov, využitie rozšírenej reality a holografie v inžinierskom vzdelávaní." },
      teach:    { label: "pedagóg",   cmd: "switch --role=teach",    headline: ["Učím na", "FEI STU", "Bratislava."],          sub: "Ústav automobilovej mechatroniky. Doteraz som viedol 23 záverečných prác — bakalárky, diplomovky aj jednu dizertačnú." },
    },
    hero: {
      ahoj: "Ahoj, som",
      jmeno: "Jakub Matišák",
      cta1: "pozrieť výskum",
      cta2: "iolab.sk",
      stats: [
        { n: "10+", l: "rokov s kódom" },
        { n: "25",  l: "publikácií" },
        { n: "8",   l: "grantov" },
        { n: "23",  l: "vedených prác" },
      ],
      tip: "// tip: prepni kontext —",
      termTitle: "jmatisak@stuba — zsh — role: ",
    },
    about: {
      n: "01", title: "o mne", sub: "// vývojár · výskumník · pedagóg",
      portraitTag: "online · káva v ruke",
      affil: {
        remeslo: ["remeslo", "fullstack vývojár"],
        tim: ["tím", "IOLab"],
        ustav: ["ústav", "automobilovej mechatroniky"],
        fakulta: ["fakulta", "FEI STU"],
        email: ["e-mail", "jakub.matisak@stuba.sk"],
        orcid: ["orcid", "0009-0000-2850-7565"],
      },
      lead: 'Som hlavne <em>vývojár</em>. Cez deň robím na <strong>projektoch</strong>, pomimo <em>učím</em> a <em>robím výskum</em>.',
      body: [
        'Špecializujem sa na <strong>frontend</strong> — Vue, Vuetify, Angular. Backendu sa nevyhýbam, naopak: keď to projekt potrebuje, prejdem na <strong>Python</strong>, <strong>Laravel</strong> alebo čo úloha vyžaduje. Najradšej mám projekty, kde frontend a backend držia spolu od začiatku.',
        'Pomimo dev práce učím na <strong>FEI STU</strong> a v <strong>IOLab</strong> robím výskum okolo virtuálnych laboratórií, AR a holografie vo vzdelávaní. PhD mám z roku 2022 — dizertačka <em>„Platforma pre virtuálne laboratórium mechatronických systémov"</em> u doc. Katky Žákovej.',
      ],
      facts: {
        lokacia: ["lokácia", "Bratislava, SK"],
        cas: ["časové pásmo", "UTC+2 · CET"],
        freelance: ["freelance", "aktuálne plne vyťažený"],
        prace: ["vedie záverečné práce", "áno (Bc., Ing.)"],
        uzitkovy: ["úžitkový vzor", "č. 8947 (2020)"],
        spoluautori: ["spoluautori", "K. Žáková · J. Šefčík · M. Rábek"],
      },
    },
    dev: {
      n: "02", title: "dev & remeslo", sub: "// čím píšem · čo staviam",
      groups: {
        frontend: { h: "frontend",   tag: "primary" },
        state:    { h: "state mgmt", tag: "podľa frameworku" },
        backend:  { h: "backend",    tag: "when needed" },
        auth:     { h: "auth & SSO", tag: "tenant · token" },
        db:       { h: "databáza",   tag: "modely · procedúry" },
        viz:      { h: "3D & viz",   tag: "grafy · 3D scény" },
        tests:    { h: "e2e testy",  tag: "regress · faker" },
        other:    { h: "ostatné",    tag: "+ čo projekt žiada" },
      },
      sidesH: { l: "// projekty & práce", r: "klientske zákazky · interné nástroje" },
      projects: {
        dms:         { name: "Registratúrny DMS systém", tag: "klient · 2 roky+ · in production", desc: "Komplexné FE riešenie registratúrneho softvéru — návrh architektúry, integrácia ÚPVS, práca v malom tíme. Vlastné zastrešenie e2e testovania (Cypress + Faker).", role: "FE architekt + dev" },
        vytazovanie: { name: "Vyťažovanie faktúr",       tag: "finančný sektor · in production",  desc: "Aplikácia na správu fakturácie, klientov a agendy v účtovnej oblasti. Integrácia rozhrania, PDF processing, CRUD, Queue, MS Graph API.",                         role: "fullstack dev" },
        aiagym:      { name: "AIA GYM — labelovanie dát", tag: "klient · in production",          desc: "FE webovej aplikácie na správu zmlúv a labelovanie dát. Integrácia Label Studio, autentifikácia cez MSAL/AAD.",                                                       role: "FE dev" },
        rpa:         { name: "RPA kalkulačka",           tag: "interný nástroj",                  desc: "Webová aplikácia ktorá zhodnocuje efektivitu spracovania procesov prostredníctvom automatizácie.",                                                                  role: "fullstack dev" },
        itaps:       { name: "Web stránky · ITAPS",      tag: "dlhodobá zákazka",                 desc: "Návrh a údržba itaps.sk a zacnivit.sk.",                                                                                                                              role: "dev" },
      },
      roleK: "rola",
    },
    research: {
      n: "03", title: "výskum", sub: "// druhá polovica mozgu",
      topics: {
        vlabs: { k: "virtuálne laboratóriá",        desc: "OVL platforma — Scilab/Xcos a OpenModelica engines napojené na 3D modely reálnych mechatronických zariadení. Ovládanie cez web." },
        ar:    { k: "AR & holografia vo vzdelávaní", desc: "Holografický 3D towercopter, ARCore vizualizácie riadiacich experimentov nad fyzickým modelom, HoloLens experimenty." },
        viz:   { k: "3D vizualizácia mechatroniky",  desc: "Interaktívne 3D modely — ball-on-plate, towercopter, termo-opto-mechanické sústavy, hydraulika. Web rendering + simulácia v reálnom čase." },
        ai:    { k: "AI v inžinierskej pedagogike",  desc: "Vplyv LLM (ChatGPT) na vysokoškolské vzdelávanie. Spoluautor článku v Education and Information Technologies (2025)." },
      },
      ovl: {
        tag: "// hlavný projekt",
        name: "OVL",
        sub: "Online Virtual Laboratory",
        desc: "Webový ekosystém, ktorý prepája simulačné prostredia (Scilab/Xcos, OpenModelica, Matlab) s 3D modelmi reálnych laboratórnych zariadení. Študent ovláda experiment z prehliadača, mobilu alebo holografického zobrazovača.",
        ascii: "  +--------+    +-----------+    +----------+\n  | SCILAB |--->|   OVL     |--->| BROWSER  |\n  |  XCOS  |    |  ENGINE   |--->| MOBILE   |\n  | MODELI.|    |  + API    |--->| HOLO 3D  |\n  +--------+    +-----------+    +----------+\n   simulácia      backend         student UI",
      },
    },
    projects: {
      n: "04", title: "granty & projekty STU", sub: "// formálne, s číslami a pečiatkami",
      filters: { all: "všetky", running: "prebiehajúce", done: "ukončené" },
      roleLabels: { garant: "garant", riesitel: "riešiteľ" },
      moreTpl: "↓ zobraziť ďalších {0}", less: "↑ zobraziť menej",
      grantNames: {
        "012STU-4/2026":  "InnoTech Hub: Pokročilá platforma pre cloud a edge computing aplikácie",
        "APVV-24-0390":   "Inovatívna diagnostika pohybových schopností pomocou LiDAR technológie",
        "1/0713/26":      "LabShift: technológie pre distribuované experimentovanie",
        "003STU-4/2025":  "Zavádzanie inovatívnych technologických prostriedkov do výučby mechatroniky",
        "1/0821/25":      "Zovšeobecnené PID riadenie s využitím derivácií vyšších rádov",
        "POLrMSys":       "Platforma pre online laboratórium na riadenie mechatronických systémov",
        "3DVinOE":        "3D vizualizačné metódy v online experimentovaní",
        "2018et016":      "Holografická technológia a rozšírená realita v online experimentovaní",
      },
      statusRunning: "● prebieha",
      statusDone: "○ ukončený",
    },
    pubs: {
      n: "05", title: "publikácie", subTpl: "// 25 záznamov · zobrazujem {0}", subTop: "top 3", subFull: "výber",
      headL: "// vybrané · zoradené podľa roku", headR: "celý zoznam na ResearchGate ↗",
      meta: { authors: "autori", venue: "venue", pages: "strany" },
      typeLabel: { conf: "conf.", journal: "journal", monograph: "patent" },
      moreTpl: "↓ zobraziť ďalších {0}", less: "↑ zobraziť menej",
      titles: {
        0: "Exploring student and teacher perspectives on ChatGPT's impact in higher education",
        1: "Scilab-Based Online Simulation Engine for Online Virtual Laboratory",
        2: "Contribution to PID and PIDA Interactive Educational Tools",
        3: "Platform for Virtual Laboratory of Mechatronic Systems in Augmented Reality",
        4: "Hologram in control applications",
        5: "Online control education using 3D holographic visualisation",
        6: "The control of holographic 3D towercopter model",
        7: "Laboratórny model lietajúceho stroja s jedným stupňom voľnosti",
        8: "Online tool for creating simple models of mechanical systems",
      },
    },
    teach: {
      n: "06", title: "učím & vediem", sub: "// FEI STU · Ústav automobilovej mechatroniky",
      cards: [
        { n: "23",     l: "vedených<br/>záverečných prác" },
        { n: "14 / 9", l: "bakalárky /<br/>diplomovky" },
        { n: "2016–",  l: "aktívne<br/>vedenie" },
      ],
      cta: { l: "Hľadáš tému?", link: "napíš mi" },
      thesesH: "// posledné vedené práce",
      thesisNames: {
        0: "Portál laboratória pre virtuálne mechatronické experimenty",
        1: "Lokálny LLM chatbot pre platformu AiA",
        2: "Low code platforma na tvorbu balíkov pre AiA",
        3: "API pre integráciu Scilab do portálu virtuálneho laboratória",
        4: "Integrácia Matlab pre portál online virtuálneho laboratória",
        5: "Simulácia 3D modelov experimentov vo virtuálnom laboratóriu",
      },
      levelPill: { bc: "Bc.", dipl: "Ing." },
      footLink: "všetky práce na iolab.sk",
    },
    contact: {
      n: "07", title: "kontakt", sub: "// najlepšie cez email",
      lead: "Spolupráca, výskum,<br/>téma na diplomovku?<br/><em>Ozvi sa.</em>",
      copy: "⧉ kopírovať", copied: "✓ skopírované",
      note: "Email odpovedám obvykle do 24h.",
      socialsH: "// inde na internete",
    },
    colophon: {
      tag: "// colophon · postscript",
      q: '<span class="q-mark">„</span>Bola táto stránka <em>vibecoded</em>?<span class="q-mark">"</span>',
      a: 'Bola.<br/><strong>Konečne mám na takéto srandy čas..</strong>',
      foot: '<span class="ans-prompt">$</span> echo $TIME_BUDGET<br/><span class="ans-out">  → 0.0h pre HTML &amp; CSS · ∞h pre aplikácie, granty, články, študentov</span>',
      stamp: "built in < 1h · between two meetings · ☕",
    },
    footer: {
      copy: "© 2026 · IOLab @ FEI STU Bratislava ·",
      top: "↑ späť hore",
    },
  },

  en: {
    meta: {
      title: "Ing. Jakub Matišák, PhD. — IOLab @ FEI STU",
      desc: "Jakub Matišák — virtual-lab developer, IOLab @ FEI STU Bratislava. Research: virtual labs, AR & holography in education.",
    },
    nav: {
      eyebrow: "IOLab @ FEI STU · Bratislava · open to collaborations",
      "o-mne": "~/about",
      dev: "~/dev",
      vyskum: "~/research",
      projekty: "~/projects",
      publikacie: "~/publications",
      ucim: "~/teaching",
      kontakt: "~/contact",
    },
    roles: {
      dev:      { label: "developer",  cmd: "switch --role=dev",      headline: ["I build", "frontends.", "Backend too, when needed."], sub: "Frontend developer rooted in Vue, Vuetify and Angular. I move to the backend when the project calls for it — Python, Laravel, REST APIs. Days are for projects, evenings for teaching and research." },
      research: { label: "researcher", cmd: "switch --role=research", headline: ["I research", "AR & holography", "in education."],     sub: "Online laboratories for control-systems teaching, 3D visualization of mechatronic systems, augmented reality and holography in engineering education." },
      teach:    { label: "teacher",    cmd: "switch --role=teach",    headline: ["I teach at", "FEI STU", "Bratislava."],                 sub: "Institute of Automotive Mechatronics. I've supervised 23 final theses so far — bachelor's, master's, and one doctoral." },
    },
    hero: {
      ahoj: "Hi, I'm",
      jmeno: "Jakub Matišák",
      cta1: "see the research",
      cta2: "iolab.sk",
      stats: [
        { n: "10+", l: "years writing code" },
        { n: "25",  l: "publications" },
        { n: "8",   l: "grants" },
        { n: "23",  l: "theses supervised" },
      ],
      tip: "// tip: switch context —",
      termTitle: "jmatisak@stuba — zsh — role: ",
    },
    about: {
      n: "01", title: "about", sub: "// developer · researcher · teacher",
      portraitTag: "online · coffee in hand",
      affil: {
        remeslo: ["craft", "fullstack developer"],
        tim: ["team", "IOLab"],
        ustav: ["institute", "Automotive Mechatronics"],
        fakulta: ["faculty", "FEI STU"],
        email: ["e-mail", "jakub.matisak@stuba.sk"],
        orcid: ["orcid", "0009-0000-2850-7565"],
      },
      lead: 'Mainly a <em>developer</em>. Days I spend on <strong>projects</strong>, on the side I <em>teach</em> and <em>do research</em>.',
      body: [
        'I focus on <strong>frontend</strong> — Vue, Vuetify, Angular. I don\'t shy away from the backend: when a project needs it I switch to <strong>Python</strong>, <strong>Laravel</strong> or whatever the task requires. My favourite projects are the ones where the frontend and backend grow together from day one.',
        'Alongside dev work I teach at <strong>FEI STU</strong> and in <strong>IOLab</strong> I do research on virtual laboratories, AR and holography in education. PhD since 2022 — dissertation <em>"Platform for virtual laboratory of mechatronic systems"</em> under doc. Katarína Žáková.',
      ],
      facts: {
        lokacia: ["location", "Bratislava, SK"],
        cas: ["timezone", "UTC+2 · CET"],
        freelance: ["freelance", "currently fully booked"],
        prace: ["thesis supervision", "yes (BSc, MSc)"],
        uzitkovy: ["utility model", "no. 8947 (2020)"],
        spoluautori: ["co-authors", "K. Žáková · J. Šefčík · M. Rábek"],
      },
    },
    dev: {
      n: "02", title: "dev & craft", sub: "// what I write with · what I build",
      groups: {
        frontend: { h: "frontend",   tag: "primary" },
        state:    { h: "state mgmt", tag: "framework-dependent" },
        backend:  { h: "backend",    tag: "when needed" },
        auth:     { h: "auth & SSO", tag: "tenant · token" },
        db:       { h: "database",   tag: "models · procedures" },
        viz:      { h: "3D & viz",   tag: "charts · 3D scenes" },
        tests:    { h: "e2e tests",  tag: "regress · faker" },
        other:    { h: "other",      tag: "+ whatever the project needs" },
      },
      sidesH: { l: "// projects & work", r: "client work · internal tools" },
      projects: {
        dms:         { name: "Document Management System",   tag: "client · 2y+ · in production", desc: "Frontend of a complex DMS — architecture, ÚPVS (Slovak government portal) integration, work in a small team. Self-driven e2e testing (Cypress + Faker).", role: "FE architect + dev" },
        vytazovanie: { name: "Invoice processing app",        tag: "financial sector · in production", desc: "Application managing invoicing, clients and accounting workflows. Interface integration, PDF processing, CRUD, Queue, MS Graph API.",                  role: "fullstack dev" },
        aiagym:      { name: "AIA GYM — data labeling",       tag: "client · in production",      desc: "Frontend of a contract-management and data-labeling app. Label Studio integration, MSAL/AAD authentication.",                                              role: "FE dev" },
        rpa:         { name: "RPA calculator",                tag: "internal tool",                desc: "Web app evaluating the efficiency of process automation.",                                                                                                  role: "fullstack dev" },
        itaps:       { name: "ITAPS websites",                tag: "long-term engagement",         desc: "Design and maintenance of itaps.sk and zacnivit.sk.",                                                                                                       role: "dev" },
      },
      roleK: "role",
    },
    research: {
      n: "03", title: "research", sub: "// the other half of the brain",
      topics: {
        vlabs: { k: "virtual laboratories",         desc: "The OVL platform — Scilab/Xcos and OpenModelica engines wired to 3D models of real mechatronic devices. Controlled through the web." },
        ar:    { k: "AR & holography in education", desc: "Holographic 3D towercopter, ARCore visualizations of control experiments over the physical model, HoloLens experiments." },
        viz:   { k: "3D visualization of mechatronics", desc: "Interactive 3D models — ball-on-plate, towercopter, thermo-opto-mechanical systems, hydraulics. Web rendering + real-time simulation." },
        ai:    { k: "AI in engineering pedagogy",   desc: "The impact of LLMs (ChatGPT) on higher education. Co-author of an article in Education and Information Technologies (2025)." },
      },
      ovl: {
        tag: "// flagship project",
        name: "OVL",
        sub: "Online Virtual Laboratory",
        desc: "A web ecosystem connecting simulation environments (Scilab/Xcos, OpenModelica, Matlab) to 3D models of real lab equipment. The student controls the experiment from a browser, a phone, or a holographic display.",
        ascii: "  +--------+    +-----------+    +----------+\n  | SCILAB |--->|   OVL     |--->| BROWSER  |\n  |  XCOS  |    |  ENGINE   |--->| MOBILE   |\n  | MODELI.|    |  + API    |--->| HOLO 3D  |\n  +--------+    +-----------+    +----------+\n   simulation     backend         student UI",
      },
    },
    projects: {
      n: "04", title: "grants & STU projects", sub: "// formal, with numbers and stamps",
      filters: { all: "all", running: "running", done: "completed" },
      roleLabels: { garant: "PI", riesitel: "co-PI" },
      moreTpl: "↓ show {0} more", less: "↑ show fewer",
      grantNames: {
        "012STU-4/2026":  "InnoTech Hub: Advanced platform for cloud and edge computing applications",
        "APVV-24-0390":   "Innovative diagnostics of motor abilities using LiDAR technology",
        "1/0713/26":      "LabShift: technologies for distributed experimentation",
        "003STU-4/2025":  "Introducing innovative technological tools into mechatronics teaching",
        "1/0821/25":      "Generalized PID control using higher-order derivatives",
        "POLrMSys":       "Platform for online lab in control of mechatronic systems",
        "3DVinOE":        "3D visualization methods in online experimentation",
        "2018et016":      "Holographic technology and augmented reality in online experimentation",
      },
      statusRunning: "● running",
      statusDone: "○ completed",
    },
    pubs: {
      n: "05", title: "publications", subTpl: "// 25 records · showing {0}", subTop: "top 3", subFull: "selection",
      headL: "// selected · ordered by year", headR: "full list on ResearchGate ↗",
      meta: { authors: "authors", venue: "venue", pages: "pages" },
      typeLabel: { conf: "conf.", journal: "journal", monograph: "patent" },
      moreTpl: "↓ show {0} more", less: "↑ show fewer",
      titles: {
        0: "Exploring student and teacher perspectives on ChatGPT's impact in higher education",
        1: "Scilab-Based Online Simulation Engine for Online Virtual Laboratory",
        2: "Contribution to PID and PIDA Interactive Educational Tools",
        3: "Platform for Virtual Laboratory of Mechatronic Systems in Augmented Reality",
        4: "Hologram in control applications",
        5: "Online control education using 3D holographic visualisation",
        6: "The control of holographic 3D towercopter model",
        7: "Laboratory model of a flying machine with one degree of freedom",
        8: "Online tool for creating simple models of mechanical systems",
      },
    },
    teach: {
      n: "06", title: "teaching & supervision", sub: "// FEI STU · Institute of Automotive Mechatronics",
      cards: [
        { n: "23",     l: "supervised<br/>final theses" },
        { n: "14 / 9", l: "bachelor's /<br/>master's" },
        { n: "2016–",  l: "active<br/>supervision" },
      ],
      cta: { l: "Looking for a topic?", link: "write to me" },
      thesesH: "// recent supervised theses",
      thesisNames: {
        0: "Laboratory portal for virtual mechatronic experiments",
        1: "Local LLM chatbot for the AiA platform",
        2: "Low-code platform for creating AiA packages",
        3: "API for Scilab integration into the virtual-lab portal",
        4: "Matlab integration for the online virtual-lab portal",
        5: "3D model simulation of experiments in the virtual laboratory",
      },
      levelPill: { bc: "BSc", dipl: "MSc" },
      footLink: "all theses on iolab.sk",
    },
    contact: {
      n: "07", title: "contact", sub: "// email is best",
      lead: "Collaboration, research,<br/>a thesis topic?<br/><em>Get in touch.</em>",
      copy: "⧉ copy", copied: "✓ copied",
      note: "I usually reply within 24h.",
      socialsH: "// elsewhere on the internet",
    },
    colophon: {
      tag: "// colophon · postscript",
      q: '<span class="q-mark">"</span>Was this site <em>vibecoded</em>?<span class="q-mark">"</span>',
      a: 'It was.<br/><strong>Finally got time for this kind of fun..</strong>',
      foot: '<span class="ans-prompt">$</span> echo $TIME_BUDGET<br/><span class="ans-out">  → 0.0h for HTML &amp; CSS · ∞h for apps, grants, papers, students</span>',
      stamp: "built in < 1h · between two meetings · ☕",
    },
    footer: {
      copy: "© 2026 · IOLab @ FEI STU Bratislava ·",
      top: "↑ back to top",
    },
  },
};

export function termScripts(lang) {
  return lang === "en" ? TERM_SCRIPTS_EN : TERM_SCRIPTS;
}

// Locale state — single source of truth.
let current = "sk";

export function getLang() {
  return current;
}

export function tr() {
  return MESSAGES[current];
}

// Resolve a "dot.path" against the current message bundle.
export function tPath(path) {
  return path.split(".").reduce((o, k) => (o == null ? o : o[k]), tr());
}

export function fmt(tpl, ...args) {
  return String(tpl).replace(/\{(\d+)\}/g, (_, i) => args[+i] ?? "");
}

const LS_KEY = "lang";

// Apply a locale: update html[lang], rewrite [data-i18n] / [data-i18n-html],
// persist to localStorage. Caller fires "i18n:change" so other modules
// (terminal script, role-dependent text) can resync.
export function applyLocale(lang) {
  if (!MESSAGES[lang]) lang = "sk";
  current = lang;
  document.documentElement.lang = lang;
  try { localStorage.setItem(LS_KEY, lang); } catch {}

  document.title = MESSAGES[lang].meta.title;
  const descEl = document.querySelector('meta[name="description"]');
  if (descEl) descEl.setAttribute("content", MESSAGES[lang].meta.desc);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = tPath(el.dataset.i18n);
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const v = tPath(el.dataset.i18nHtml);
    if (v != null) el.innerHTML = v;
  });

  document.querySelectorAll("[data-lang-btn]").forEach((b) => {
    b.classList.toggle("is-on", b.dataset.langBtn === lang);
    b.setAttribute("aria-pressed", b.dataset.langBtn === lang ? "true" : "false");
  });

  window.dispatchEvent(new CustomEvent("i18n:change", { detail: { lang } }));
}

export function initLocale() {
  let stored;
  try { stored = localStorage.getItem(LS_KEY); } catch {}
  applyLocale(stored || "sk");
}
