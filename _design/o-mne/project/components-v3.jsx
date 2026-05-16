// Portfolio v3 — Ing. Jakub Matišák, PhD.
// IOLab @ FEI STU · Vývojár virtuálneho laboratória
// Reálne dáta z iolab.sk

const { useState, useEffect, useRef, useMemo } = React;

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function useIntersect(options = {}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.12, ...options });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}
function Reveal({ children, delay = 0, as: Tag = "div", ...rest }) {
  const [ref, seen] = useIntersect();
  return (
    <Tag ref={ref} {...rest} style={{
      ...(rest.style || {}),
      opacity: seen ? 1 : 0,
      transform: seen ? "translateY(0)" : "translateY(14px)",
      transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
    }}>{children}</Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  Roles                                                              */
/* ------------------------------------------------------------------ */
const ROLES = {
  dev: {
    key: "dev",
    label: "vývojár",
    cmd: "switch --role=dev",
    headline: ["Píšem", "frontend.", "Aj backend, keď treba."],
    sub: "Frontend vývojár so zázemim v Vue, Vuetify a Angulare. K backendu prejdem keď to projekt potáďa — Python, Laravel, REST API. Cez deň robím na projektoch, pomimo učím a robím výskum.",
  },
  research: {
    key: "research",
    label: "výskumník",
    cmd: "switch --role=research",
    headline: ["Skúmam", "AR a holografiu", "vo vzdelávaní."],
    sub: "Online laboratóriá pre výučbu automatického riadenia, 3D vizualizácia mechatronických systémov, využitie rozšírenej reality a holografie v inžinierskom vzdelávaní.",
  },
  teach: {
    key: "teach",
    label: "pedagóg",
    cmd: "switch --role=teach",
    headline: ["Učím na", "FEI STU", "Bratislava."],
    sub: "Ústav automobilovej mechatroniky. Doteraz som viedol 23 záverečných prác — bakalárky, diplomovky aj jednu dizertačnú.",
  },
};

/* ------------------------------------------------------------------ */
/*  TopBar                                                             */
/* ------------------------------------------------------------------ */
function TopBar({ role, setRole }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const items = [
    ["o-mne", "~/o-mne"],
    ["dev", "~/dev"],
    ["vyskum", "~/výskum"],
    ["projekty", "~/projekty"],
    ["publikacie", "~/publikácie"],
    ["ucim", "~/učím"],
    ["kontakt", "~/kontakt"],
  ];
  return (
    <header className={`topbar ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#top" className="brand">
        <span className="brand-dot" />
        <span className="brand-name">jmatisak<span className="brand-cursor">_</span></span>
        <span className="brand-meta">IOLab @ FEI STU</span>
      </a>
      <nav className="nav">
        {items.map(([id, label]) => (
          <a key={id} href={`#${id}`}>{label}</a>
        ))}
      </nav>
      <div className="role-switch" role="tablist">
        {Object.values(ROLES).map((r) => (
          <button key={r.key}
            className={`rs-btn ${role === r.key ? "is-on" : ""}`}
            onClick={() => setRole(r.key)}
            title={r.cmd}>
            {r.label}
          </button>
        ))}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Terminal                                                           */
/* ------------------------------------------------------------------ */
const TERM_SCRIPTS = {
  dev: [
    { type: "cmd", text: "whoami" },
    { type: "out", text: "jakub matišák — frontend dev (+ backend, keď treba)" },
    { type: "cmd", text: "cat stack.txt" },
    { type: "out", text: "frontend  ▸ vue · vuetify · angular" },
    { type: "out", text: "backend   ▸ python · laravel" },
    { type: "out", text: "+         ▸ čo si projekt žiada" },
    { type: "cmd", text: "cat day.txt" },
    { type: "out", text: "  9:00 → 18:00   projekty · kód" },
    { type: "out", text: "  večer / week  učenie · výskum" },
    { type: "cmd", text: "echo $STATUS" },
    { type: "out", text: "freelance: plne vyťažený · collab vítaná", cls: "ok" },
    { type: "cmd", text: "_", hold: true },
  ],
  research: [
    { type: "cmd", text: "grep -i focus ~/research/*.md" },
    { type: "out", text: "virtual laboratories ............ ▮▮▮▮▮▮▮▮▮▮ primary" },
    { type: "out", text: "AR / holography in education .... ▮▮▮▮▮▮▮▮▮▮ primary" },
    { type: "out", text: "3D visualization of mechatronics  ▮▮▮▮▮▮▮▮▮▯ active" },
    { type: "out", text: "AI in higher education .......... ▮▮▮▮▮▮▮▯▯▯ growing" },
    { type: "cmd", text: "wc -l ~/publications/* | tail -1" },
    { type: "out", text: "25  total · 2 časopisy · 1 monografia · 18 zborníky" },
    { type: "cmd", text: "git log --oneline -3 grants/" },
    { type: "out", text: "012STU-4/2026  KEGA · InnoTech Hub (garant)", cls: "ok" },
    { type: "out", text: "APVV-24-0390   LiDAR diagnostika pohybu (riešiteľ)" },
    { type: "out", text: "1/0713/26      VEGA · LabShift (riešiteľ)" },
    { type: "cmd", text: "_", hold: true },
  ],
  teach: [
    { type: "cmd", text: "cat ~/teaching/profile.yaml" },
    { type: "out", text: "university:    STU Bratislava" },
    { type: "out", text: "faculty:       FEI · Ústav automobilovej mechatroniky" },
    { type: "out", text: "phd_year:      2022" },
    { type: "out", text: "phd_thesis:    \"Platforma pre virtuálne laboratórium" },
    { type: "out", text: "                mechatronických systémov\"" },
    { type: "out", text: "supervised:" },
    { type: "out", text: "  - bachelor:  14" },
    { type: "out", text: "  - master:    9" },
    { type: "out", text: "  - total:     23 obhájených prác" },
    { type: "cmd", text: "echo $OPEN_TO_THESIS_SUPERVISION" },
    { type: "out", text: "true — píš na jakub.matisak@stuba.sk", cls: "ok" },
    { type: "cmd", text: "_", hold: true },
  ],
};

function Terminal({ role }) {
  const script = TERM_SCRIPTS[role] || TERM_SCRIPTS.dev;
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState("");
  const [step, setStep] = useState(0);
  const [caret, setCaret] = useState(true);

  useEffect(() => { setLines([]); setTyping(""); setStep(0); }, [role]);
  useEffect(() => {
    const i = setInterval(() => setCaret((c) => !c), 520);
    return () => clearInterval(i);
  }, []);
  useEffect(() => {
    if (step >= script.length) return;
    const node = script[step];
    if (node.hold) { setLines((l) => [...l, node]); return; }
    if (node.type === "cmd") {
      let i = 0; setTyping("");
      const t = setInterval(() => {
        i++;
        setTyping(node.text.slice(0, i));
        if (i >= node.text.length) {
          clearInterval(t);
          setTimeout(() => {
            setLines((l) => [...l, node]); setTyping("");
            setStep((s) => s + 1);
          }, 200);
        }
      }, 26 + Math.random() * 24);
      return () => clearInterval(t);
    }
    const to = setTimeout(() => {
      setLines((l) => [...l, node]); setStep((s) => s + 1);
    }, 90);
    return () => clearTimeout(to);
  }, [step, script]);

  const showingCmd = step < script.length && script[step]?.type === "cmd";

  return (
    <div className="terminal">
      <div className="term-head">
        <span className="tdot tdot--r" />
        <span className="tdot tdot--y" />
        <span className="tdot tdot--g" />
        <span className="term-title">jmatisak@stuba — zsh — role: {role}</span>
      </div>
      <div className="term-body">
        {lines.map((ln, i) => (
          <div key={i} className={`tl tl--${ln.type} ${ln.cls || ""}`}>
            {ln.type === "cmd"
              ? (<><span className="prompt">➜</span> <span className="path">~</span> {ln.text}</>)
              : (<span>{ln.text}</span>)}
          </div>
        ))}
        {showingCmd && (
          <div className="tl tl--cmd">
            <span className="prompt">➜</span> <span className="path">~</span> {typing}
            <span className="caret" style={{ opacity: caret ? 1 : 0 }}>█</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
function Hero({ role, setRole }) {
  const r = ROLES[role];
  return (
    <section id="top" className="hero">
      <div className="hero-grid">
        <div className="hero-left">
          <div className="eyebrow">
            <span className="dot-live" />
            <span>IOLab @ FEI STU · Bratislava · open to collaborations</span>
          </div>
          <h1 className="hero-title" key={role}>
            {r.headline[0]}<br/>
            <em>{r.headline[1]}</em><br/>
            {r.headline[2]}
          </h1>
          <p className="hero-sub">
            Ahoj, som <strong>Jakub Matišák</strong>. {r.sub}
          </p>
          <div className="hero-cta">
            <a href="#vyskum" className="btn btn--primary">
              pozrieť výskum <span className="arr">→</span>
            </a>
            <a href="https://iolab.sk" target="_blank" rel="noreferrer" className="btn btn--ghost">
              iolab.sk ↗
            </a>
          </div>
          <div className="hero-stats">
            <Stat n="10+" label="rokov s kódom" />
            <Stat n="25" label="publikácií" />
            <Stat n="8" label="grantov" />
            <Stat n="23" label="vedených prác" />
          </div>
        </div>
        <div className="hero-right">
          <Terminal role={role} />
          <div className="role-hint">
            // tip: prepni kontext —
            <div className="role-cmds">
              {Object.values(ROLES).map((rl) => (
                <button key={rl.key}
                  className={`rc ${role === rl.key ? "is-on" : ""}`}
                  onClick={() => setRole(rl.key)}>
                  $ {rl.cmd}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="hero-marquee" aria-hidden>
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="marquee-inner">
              SCILAB · XCOS · OPENMODELICA · ARCORE · HOLOLENS · UNITY · WEBGL · PYTHON · JAVASCRIPT · TYPESCRIPT · MATLAB · IEEE · IFAC · KEGA · VEGA · APVV ·&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ n, label }) {
  return (
    <div className="stat">
      <div className="stat-n">{n}</div>
      <div className="stat-l">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Head                                                       */
/* ------------------------------------------------------------------ */
function SectionHead({ n, title, sub }) {
  return (
    <Reveal className="section-head">
      <div className="sh-n">{n}</div>
      <div className="sh-t">
        <h2>{title}</h2>
        <div className="sh-sub">{sub}</div>
      </div>
      <div className="sh-line" />
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */
function About() {
  return (
    <section id="o-mne" className="section">
      <SectionHead n="01" title="o mne" sub="// vývojár · výskumník · pedagóg" />
      <div className="about-grid">
        <Reveal className="about-portrait">
          <div className="portrait">
            <div className="portrait-inner">
              <span className="portrait-init">JM</span>
            </div>
            <div className="portrait-tag">
              <span className="dot-live" /> online · káva v ruke
            </div>
          </div>
          <div className="affil">
            <div className="affil-row">
              <span className="affil-k">remeslo</span>
              <span className="affil-v">fullstack vývojár</span>
            </div>
            <div className="affil-row">
              <span className="affil-k">tím</span>
              <span className="affil-v">IOLab</span>
            </div>
            <div className="affil-row">
              <span className="affil-k">ústav</span>
              <span className="affil-v">automobilovej mechatroniky</span>
            </div>
            <div className="affil-row">
              <span className="affil-k">fakulta</span>
              <span className="affil-v">FEI STU</span>
            </div>
            <div className="affil-row">
              <span className="affil-k">e-mail</span>
              <span className="affil-v">jakub.matisak<wbr/>@stuba.sk</span>
            </div>
            <div className="affil-row">
              <span className="affil-k">orcid</span>
              <span className="affil-v">0009-0000<wbr/>-2850-7565</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="about-copy" delay={120}>
          <p className="lead">
            Som hlavne <em>vývojár</em>. Cez deň robím na <strong>projektoch</strong>,
            pomimo <em>učím</em> a <em>robím výskum</em>.
            Akademický titul nosím ako vedľajší effect.
          </p>
          <p>
            Špecializujem sa na <strong>frontend</strong> — Vue, Vuetify, Angular.
            Backendu sa nevyhýbam, naopak: keď to projekt potrebuje, prejdem
            na <strong>Python</strong>, <strong>Laravel</strong> alebo čo úloha vyžaduje.
            Najradšej mám projekty, kde frontend a backend držia spolu od začiatku.
          </p>
          <p>
            Pomimo dev práce učím na <strong>FEI STU</strong> a v <strong>IOLab</strong> robím
            výskum okolo virtuálnych laboratórií, AR a holografie vo vzdelávaní.
            PhD mám z roku 2022 — dizertačka <em>„Platforma pre virtuálne laboratórium
            mechatronických systémov"</em> u doc. Katky Žákovej.
          </p>

          <dl className="facts">
            <div><dt>lokácia</dt><dd>Bratislava, SK</dd></div>
            <div><dt>časové pásmo</dt><dd>UTC+2 · CET</dd></div>
            <div><dt>freelance</dt><dd><span className="chip chip--mute">aktuálne plne vyťažený</span></dd></div>
            <div><dt>vedie záverečné práce</dt><dd>áno (Bc., Ing.)</dd></div>
            <div><dt>úžitkový vzor</dt><dd>č. 8947 (2020)</dd></div>
            <div><dt>spoluautori</dt><dd>K. Žáková · J. Šefčík · M. Rábek</dd></div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Dev & Remeslo — stack + projekty                                  */
/* ------------------------------------------------------------------ */
const STACK_GROUPS = [
  {
    h: "frontend",
    tag: "primary",
    items: ["Vue", "Vuetify", "Angular", "TypeScript", "Sass"],
  },
  {
    h: "state mgmt",
    tag: "podľa frameworku",
    items: ["Pinia", "Vuex", "NgRx", "Redux"],
  },
  {
    h: "backend",
    tag: "when needed",
    items: ["Python", "Laravel", "PHP", "REST API"],
  },
  {
    h: "ostatné",
    tag: "+ čo projekt žiada",
    items: ["Git", "Docker", "Linux", "MATLAB / Scilab"],
  },
];

const SIDE_PROJECTS = [
  {
    name: "klientské projekty",
    tag: "cez deň · aktuálne",
    desc: "Frontend a fullstack zákazky — Vue/Vuetify a Angular aplikácie, k tomu Python alebo Laravel backend. Konkrétne mená a screenshoty na vyžiadanie.",
    stack: ["Vue", "Angular", "Laravel"],
    role: "frontend dev",
    yrs: "priebežne",
  },
  {
    name: "OVL platforma",
    tag: "iolab · in production",
    desc: "Online virtuálne laboratórium — Scilab/Xcos engine, 3D modely v prehliadači, ovládanie z mobilu aj holografie. Súčasť výskumu, beží pre študentov.",
    stack: ["Vue", "Python", "Scilab"],
    role: "hlavný vývojár",
    yrs: "2018 – ",
  },
  {
    name: "AiA platforma",
    tag: "vedľa toho · LLM nástroje",
    desc: "Platforma pre lokálne LLM chatboty a low-code generátor balíkov. Súčasť aktuálnych diplomoviek (Kollár, Višvarda 2025).",
    stack: ["TS", "LLM", "low-code"],
    role: "tech lead",
    yrs: "2024 – ",
  },
  {
    name: "open source · drobnosti",
    tag: "voľný čas",
    desc: "CLI nástroje, LaTeX šablóny pre záverečné práce, batch grader pre Python úlohy. Pár repov, používa pár kolegov.",
    stack: ["Python", "Bash"],
    role: "maintainer",
    yrs: "priebežne",
  },
];

function Dev() {
  return (
    <section id="dev" className="section">
      <SectionHead n="02" title="dev & remeslo" sub="// čím píšem · čo staviam" />

      <div className="dev-stack">
        {STACK_GROUPS.map((g, gi) => (
          <Reveal key={g.h} className="ds-row" delay={gi * 80}>
            <div className="ds-h">
              <span className="ds-brk">[</span>
              <span className="ds-name">{g.h}</span>
              <span className="ds-brk">]</span>
              <span className="ds-tag">{g.tag}</span>
            </div>
            <div className="ds-items">
              {g.items.map((s) => (
                <span key={s} className="ds-chip">{s}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="side-h">
        <span className="side-h-l">// projekty &amp; práce</span>
        <span className="side-h-r">cez deň · pomimo · voľný čas</span>
      </div>

      <div className="side-grid">
        {SIDE_PROJECTS.map((p, i) => (
          <Reveal key={p.name} className="side-card" delay={i * 80}>
            <div className="side-top">
              <div className="side-name">
                <span className="side-hash">#</span>{p.name}
              </div>
              <div className="side-yrs">{p.yrs}</div>
            </div>
            <div className="side-tag">{p.tag}</div>
            <p className="side-desc">{p.desc}</p>
            <div className="side-meta">
              <span className="sm-k">rola</span>
              <span className="sm-v">{p.role}</span>
            </div>
            <div className="side-stack">
              {p.stack.map((s) => <span key={s} className="pill">{s}</span>)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Research                                                           */
/* ------------------------------------------------------------------ */
const TOPICS = [
  {
    k: "virtuálne laboratóriá",
    desc: "OVL platforma — Scilab/Xcos a OpenModelica engines napojené na 3D modely reálnych mechatronických zariadení. Ovládanie cez web.",
    tag: "primary",
  },
  {
    k: "AR & holografia vo vzdelávaní",
    desc: "Holografický 3D towercopter, ARCore vizualizácie riadiacich experimentov nad fyzickým modelom, HoloLens experimenty.",
    tag: "primary",
  },
  {
    k: "3D vizualizácia mechatroniky",
    desc: "Interaktívne 3D modely — ball-on-plate, towercopter, termo-opto-mechanické sústavy, hydraulika. Web rendering + simulácia v reálnom čase.",
    tag: "active",
  },
  {
    k: "AI v inžinierskej pedagogike",
    desc: "Vplyv LLM (ChatGPT) na vysokoškolské vzdelávanie. Spoluautor článku v Education and Information Technologies (2025).",
    tag: "growing",
  },
];

function Research() {
  return (
    <section id="vyskum" className="section">
      <SectionHead n="03" title="výskum" sub="// druhá polovica mozgu" />
      <Reveal className="topic-grid">
        {TOPICS.map((t) => (
          <div className="topic" key={t.k}>
            <div className="topic-k">
              <span className="topic-bullet">▸</span> {t.k}
              <span className={`topic-tag topic-tag--${t.tag}`}>{t.tag}</span>
            </div>
            <div className="topic-desc">{t.desc}</div>
          </div>
        ))}
      </Reveal>

      <Reveal className="ovl-card">
        <div className="ovl-l">
          <div className="ovl-tag">// hlavný projekt</div>
          <div className="ovl-name">
            OVL <span className="ovl-sub">Online Virtual Laboratory</span>
          </div>
          <p>
            Webový ekosystém, ktorý prepája simulačné prostredia
            (Scilab/Xcos, OpenModelica, Matlab) s 3D modelmi reálnych
            laboratórnych zariadení. Študent ovláda experiment z prehliadača,
            mobilu alebo holografického zobrazovača.
          </p>
          <div className="ovl-stack">
            <span className="pill">Scilab Engine</span>
            <span className="pill">OpenModelica Engine</span>
            <span className="pill">3D models</span>
            <span className="pill">ARCore</span>
            <span className="pill">Holographic display</span>
          </div>
        </div>
        <div className="ovl-r">
          <pre className="ovl-ascii">{`  ┌────────┐    ┌───────────┐    ┌──────────┐
  │ SCILAB │───▶│   OVL     │───▶│ BROWSER  │
  │  XCOS  │    │  ENGINE   │───▶│ MOBILE   │
  │ MODELI.│    │  + API    │───▶│ HOLO 3D  │
  └────────┘    └───────────┘    └──────────┘
   simulácia      backend         student UI`}</pre>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Projects (grants)                                                  */
/* ------------------------------------------------------------------ */
const GRANTS = [
  {
    type: "KEGA",
    role: "garant",
    id: "012STU-4/2026",
    name: "InnoTech Hub: Pokročilá platforma pre cloud a edge computing aplikácie",
    years: "2026 – 2028",
    status: "running",
    featured: true,
  },
  {
    type: "APVV",
    role: "riešiteľ",
    id: "APVV-24-0390",
    name: "Inovatívna diagnostika pohybových schopností pomocou LiDAR technológie",
    years: "2025 – 2029",
    status: "running",
  },
  {
    type: "VEGA",
    role: "riešiteľ",
    id: "1/0713/26",
    name: "LabShift: technológie pre distribuované experimentovanie",
    years: "2026",
    status: "running",
  },
  {
    type: "KEGA",
    role: "riešiteľ",
    id: "003STU-4/2025",
    name: "Zavádzanie inovatívnych technologických prostriedkov do výučby mechatroniky",
    years: "2025 – 2027",
    status: "running",
  },
  {
    type: "VEGA",
    role: "riešiteľ",
    id: "1/0821/25",
    name: "Zovšeobecnené PID riadenie s využitím derivácií vyšších rádov",
    years: "2025 – 2028",
    status: "running",
  },
  {
    type: "Mladý výskumník",
    role: "garant",
    id: "POLrMSys",
    name: "Platforma pre online laboratórium na riadenie mechatronických systémov",
    years: "2021 – 2022",
    status: "done",
  },
  {
    type: "Mladý výskumník",
    role: "garant",
    id: "3DVinOE",
    name: "3D vizualizačné metódy v online experimentovaní",
    years: "2020 – 2021",
    status: "done",
  },
  {
    type: "Iný domáci",
    role: "garant",
    id: "2018et016",
    name: "Holografická technológia a rozšírená realita v online experimentovaní",
    years: "2019",
    status: "done",
  },
];

function Projects() {
  const [filter, setFilter] = useState("running");
  const filtered = useMemo(() => {
    if (filter === "all") return GRANTS;
    return GRANTS.filter((g) => g.status === filter);
  }, [filter]);

  const counts = { all: GRANTS.length, running: GRANTS.filter(g => g.status === "running").length, done: GRANTS.filter(g => g.status === "done").length };

  return (
    <section id="projekty" className="section">
      <SectionHead n="04" title="granty & projekty STU" sub="// formálne, s číslami a pečiatkami" />

      <div className="grant-filter">
        {[
          ["all", "všetky", counts.all],
          ["running", "prebiehajúce", counts.running],
          ["done", "ukončené", counts.done],
        ].map(([k, l, c]) => (
          <button key={k}
            className={`gf ${filter === k ? "is-on" : ""}`}
            onClick={() => setFilter(k)}>
            {l} <span className="gf-c">{c}</span>
          </button>
        ))}
      </div>

      <ul className="grant-list">
        {filtered.map((g, i) => (
          <GrantRow key={g.id} g={g} i={i} />
        ))}
      </ul>
    </section>
  );
}

function GrantRow({ g, i }) {
  const [ref, seen] = useIntersect();
  return (
    <li ref={ref} className={`grant ${g.featured ? "is-featured" : ""}`}
        style={{
          opacity: seen ? 1 : 0,
          transform: seen ? "translateY(0)" : "translateY(10px)",
          transition: `opacity .5s ease ${i * 40}ms, transform .5s ease ${i * 40}ms`,
        }}>
      <div className="g-type">
        <span className={`g-badge g-badge--${g.type.toLowerCase().replace(/[^a-z]/g, "")}`}>{g.type}</span>
        <span className={`g-role g-role--${g.role}`}>{g.role}</span>
      </div>
      <div className="g-main">
        <div className="g-id">{g.id}</div>
        <div className="g-name">{g.name}</div>
      </div>
      <div className="g-meta">
        <div className="g-years">{g.years}</div>
        <div className={`g-status g-status--${g.status}`}>
          {g.status === "running" ? "● prebieha" : "○ ukončený"}
        </div>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Publications                                                       */
/* ------------------------------------------------------------------ */
const PUBS = [
  {
    type: "journal",
    year: "2025",
    title: "Exploring student and teacher perspectives on ChatGPT's impact in higher education",
    authors: ["ŽÁKOVÁ, K.", "URBANO, D.", "CRUZ-CORREIA, R.", "GUZMÁN, J. L.", "MATIŠÁK, J."],
    venue: "Education and Information Technologies",
    pages: "vol. 30, pp. 649–692",
    tags: ["AI", "education", "ChatGPT"],
    featured: true,
  },
  {
    type: "conf",
    year: "2025",
    title: "Scilab-Based Online Simulation Engine for Online Virtual Laboratory",
    authors: ["MATIŠÁK, J.", "VRBOVSKÝ, A.", "ŽÁKOVÁ, K."],
    venue: "exp.at '25 (IEEE)",
    pages: "pp. 232–234",
    tags: ["Scilab", "OVL", "simulation"],
    featured: true,
  },
  {
    type: "conf",
    year: "2024",
    title: "Contribution to PID and PIDA Interactive Educational Tools",
    authors: ["ŽÁKOVÁ, K.", "MATIŠÁK, J.", "ŠEFČÍK, J."],
    venue: "PID 2024 (Elsevier)",
    pages: "pp. 115–119",
    tags: ["PID", "interactive", "education"],
  },
  {
    type: "conf",
    year: "2023",
    title: "Platform for Virtual Laboratory of Mechatronic Systems in Augmented Reality",
    authors: ["MATIŠÁK, J.", "POHANČENIK, M.", "ŽÁKOVÁ, K."],
    venue: "exp.at '23 (IEEE)",
    pages: "pp. 17–18",
    tags: ["AR", "virtual lab", "mechatronics"],
  },
  {
    type: "conf",
    year: "2022",
    title: "Hologram in control applications",
    authors: ["MATIŠÁK, J.", "ŽÁKOVÁ, K.", "RÁBEK, M."],
    venue: "Cybernetics & Informatics K&I 2022 (IEEE)",
    pages: "—",
    tags: ["holography", "control"],
  },
  {
    type: "journal",
    year: "2020",
    title: "Online control education using 3D holographic visualisation",
    authors: ["MATIŠÁK, J.", "RÁBEK, M.", "ŽÁKOVÁ, K."],
    venue: "Journal of Automation, Mobile Robotics and Intelligent Systems",
    pages: "vol. 14, pp. 42–47",
    tags: ["holography", "education", "3D"],
  },
  {
    type: "conf",
    year: "2020",
    title: "The control of holographic 3D towercopter model",
    authors: ["MATIŠÁK, J.", "ŽÁKOVÁ, K."],
    venue: "21st IFAC World Congress (Elsevier)",
    pages: "pp. 17536–17541",
    tags: ["IFAC", "holography", "towercopter"],
  },
  {
    type: "monograph",
    year: "2020",
    title: "Laboratórny model lietajúceho stroja s jedným stupňom voľnosti",
    authors: ["ŤAPÁK, P.", "MATIŠÁK, J."],
    venue: "Úžitkový vzor č. 8947, ÚPV SR",
    pages: "Vestník č. 12/2020",
    tags: ["patent", "hardware"],
  },
  {
    type: "conf",
    year: "2018",
    title: "Online tool for creating simple models of mechanical systems",
    authors: ["MATIŠÁK, J.", "ŽÁKOVÁ, K."],
    venue: "ICETA 2018 (IEEE)",
    pages: "pp. 355–360",
    tags: ["web tool", "mechanical models"],
  },
];

function Publications() {
  const [expanded, setExpanded] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? PUBS : PUBS.slice(0, 5);
  return (
    <section id="publikacie" className="section">
      <SectionHead n="05" title="publikácie" sub={`// 25 záznamov · zobrazujem ${showAll ? "výber" : "top 5"}`} />

      <div className="pubs-h">
        <span className="pubs-h-l">// vybrané · zoradené podľa roku</span>
        <span className="pubs-h-r">
          <a href="https://www.researchgate.net/profile/Jakub-Matisak"
             target="_blank" rel="noreferrer">
            celý zoznam na ResearchGate ↗
          </a>
        </span>
      </div>

      <ul className="pub-list">
        {visible.map((p, i) => (
          <PubRow key={i} p={p} i={i}
            open={expanded === i}
            onToggle={() => setExpanded(expanded === i ? null : i)} />
        ))}
      </ul>

      {PUBS.length > 5 && (
        <div className="pubs-more">
          <button className="pubs-more-btn" onClick={() => setShowAll((s) => !s)}>
            {showAll
              ? `↑ zobraziť menej`
              : `↓ zobraziť ďalších ${PUBS.length - 5}`}
          </button>
        </div>
      )}
    </section>
  );
}

function PubRow({ p, i, open, onToggle }) {
  const [ref, seen] = useIntersect();
  const typeLabel = { conf: "conf.", journal: "journal", monograph: "patent" }[p.type] || p.type;
  return (
    <li ref={ref} className={`pub ${open ? "is-open" : ""} ${p.featured ? "is-featured" : ""}`}
        style={{
          opacity: seen ? 1 : 0,
          transform: seen ? "translateY(0)" : "translateY(8px)",
          transition: `opacity .5s ease ${i * 40}ms, transform .5s ease ${i * 40}ms`,
        }}>
      <button className="pub-row" onClick={onToggle}>
        <span className="pub-year">{p.year}</span>
        <span className={`pub-type pub-type--${p.type}`}>{typeLabel}</span>
        <span className="pub-title">{p.title}</span>
        <span className="pub-toggle">{open ? "−" : "+"}</span>
      </button>
      <div className="pub-body" hidden={!open}>
        <div className="pub-meta">
          <div><span className="pm-k">autori</span><span className="pm-v">{p.authors.join(", ")}</span></div>
          <div><span className="pm-k">venue</span><span className="pm-v">{p.venue}</span></div>
          <div><span className="pm-k">strany</span><span className="pm-v">{p.pages}</span></div>
        </div>
        <div className="pub-tags">
          {p.tags.map((t) => <span key={t} className="pill">{t}</span>)}
        </div>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Teaching                                                           */
/* ------------------------------------------------------------------ */
const THESES_RECENT = [
  { year: "2025", level: "Diplomová", name: "Portál laboratória pre virtuálne mechatronické experimenty", student: "Roman KOIŠ" },
  { year: "2025", level: "Diplomová", name: "Lokálny LLM chatbot pre platformu AiA", student: "Matej KOLLÁR" },
  { year: "2025", level: "Diplomová", name: "Low code platforma na tvorbu balíkov pre AiA", student: "Lukáš VIŠVARDA" },
  { year: "2024", level: "Diplomová", name: "API pre integráciu Scilab do portálu virtuálneho laboratória", student: "Adrián VRBOVSKÝ" },
  { year: "2024", level: "Diplomová", name: "Integrácia Matlab pre portál online virtuálneho laboratória", student: "Emma VALÁBKOVÁ" },
  { year: "2023", level: "Diplomová", name: "Simulácia 3D modelov experimentov vo virtuálnom laboratóriu", student: "Samuel KOBERA" },
];

function Teaching() {
  return (
    <section id="ucim" className="section">
      <SectionHead n="06" title="učím & vediem" sub="// FEI STU · Ústav automobilovej mechatroniky" />

      <div className="teach-summary">
        <Reveal className="ts-card">
          <div className="ts-n">23</div>
          <div className="ts-l">vedených<br/>záverečných prác</div>
        </Reveal>
        <Reveal className="ts-card" delay={80}>
          <div className="ts-n">14 / 9</div>
          <div className="ts-l">bakalárky /<br/>diplomovky</div>
        </Reveal>
        <Reveal className="ts-card" delay={160}>
          <div className="ts-n">2016–</div>
          <div className="ts-l">aktívne<br/>vedenie</div>
        </Reveal>
        <Reveal className="ts-card ts-card--cta" delay={240}>
          <div className="ts-cta-l">Hľadáš tému?</div>
          <a href="#kontakt" className="ts-cta-link">
            napíš mi <span className="arr">→</span>
          </a>
        </Reveal>
      </div>

      <div className="theses-h">
        <span className="theses-h-l">// posledné vedené práce</span>
      </div>
      <Reveal className="theses-wrap">
        <table className="theses">
          <tbody>
            {THESES_RECENT.map((t, i) => (
              <tr key={i}>
                <td className="th-year">{t.year}</td>
                <td className="th-level">
                  <span className={`th-pill th-pill--${t.level === "Diplomová" ? "dipl" : "bc"}`}>
                    {t.level === "Diplomová" ? "Ing." : "Bc."}
                  </span>
                </td>
                <td className="th-name">{t.name}</td>
                <td className="th-student">{t.student}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <Reveal className="theses-foot">
        <a className="link-arr"
           href="https://iolab.sk/team/map-projects_csv-body-njakub-matisak-sa-specializuje-na-vyvoj-virtualnych-laboratorii-so-zameranim-na-rozsirenu-realitu-a-holograficke-vizualizacne-technologie-pre-vzdelavacie-ucely-n-active-true-name-ing-jakub-matisak-phd-f"
           target="_blank" rel="noreferrer">
          všetky práce na iolab.sk <span>↗</span>
        </a>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */
function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "jakub.matisak@stuba.sk";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const socials = [
    ["linkedin", "linkedin.com/in/jakmat", "https://www.linkedin.com/in/jakmat/"],
    ["researchgate", "/Jakub-Matisak", "https://www.researchgate.net/profile/Jakub-Matisak"],
    ["orcid", "0009-0000-2850-7565", "https://orcid.org/0009-0000-2850-7565"],
    ["google scholar", "k7edJQkAAAAJ", "https://scholar.google.com/citations?user=k7edJQkAAAAJ&hl=sk"],
    ["iolab", "iolab.sk", "https://iolab.sk"],
  ];

  return (
    <section id="kontakt" className="section section--contact">
      <SectionHead n="07" title="kontakt" sub="// najlepšie cez email" />
      <div className="contact">
        <Reveal className="contact-main">
          <div className="contact-lead">
            Spolupráca, výskum,<br/>
            téma na diplomovku?<br/>
            <em>Ozvi sa.</em>
          </div>
          <button className="email-btn" onClick={copy}>
            <span className="email-at">{email}</span>
            <span className="email-copy">{copied ? "✓ skopírované" : "⧉ kopírovať"}</span>
          </button>
          <p className="contact-note">
            FEI STU, Ústav automobilovej mechatroniky, Ilkovičova 3, Bratislava.
            Email odpovedám obvykle do 24h.
          </p>
        </Reveal>

        <Reveal className="contact-socials" delay={100}>
          <div className="sock-h">// inde na internete</div>
          <ul>
            {socials.map(([k, v, href]) => (
              <li key={k}>
                <a href={href} target="_blank" rel="noreferrer">
                  <span className="sk-k">{k}</span>
                  <span className="sk-v">{v}</span>
                  <span className="sk-arr">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Colophon — "stránka bola vibecoded"                                */
/* ------------------------------------------------------------------ */
function Colophon() {
  const [hover, setHover] = useState(false);
  return (
    <section className="colophon">
      <div className="colophon-grid">
        <Reveal className="colo-l">
          <div className="colo-tag">// colophon · postscript</div>
          <h3 className="colo-q">
            <span className="q-mark">„</span>
            Bola táto stránka <em>vibecoded</em>?
            <span className="q-mark">"</span>
          </h3>
          <p className="colo-a">
            A čo? Na takéto srandy nie je čas —
            <br/>
            <strong>v robote musíme makať.</strong>
          </p>
          <p className="colo-foot">
            <span className="ans-prompt">$</span> echo $TIME_BUDGET<br/>
            <span className="ans-out">  → 0.0h pre HTML &amp; CSS · ∞h pre granty, papery, študentov</span>
          </p>
        </Reveal>

        <Reveal className="colo-r" delay={120}>
          <pre className={`colo-ascii ${hover ? "is-hover" : ""}`}
               onMouseEnter={() => setHover(true)}
               onMouseLeave={() => setHover(false)}>{`     ╭──────────────────╮
     │  $ vibecoded     │
     │  > deploying...  │
     │  > ✓ shipped     │
     │  > back to work  │
     ╰────────┬─────────╯
              │
       ┌──────┴──────┐
       │  ${hover ? "lab > html  " : "    makať    "}│
       └─────────────┘`}</pre>
          <div className="colo-stamp">
            built in &lt; 1h · between two meetings · ☕
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-l">
        <div className="foot-brand">Ing. Jakub Matišák, PhD.<span>_</span></div>
        <div className="foot-meta">
          © 2026 · IOLab @ FEI STU Bratislava · <a href="#top">↑ späť hore</a>
        </div>
      </div>
      <div className="footer-r">
        <pre className="foot-ascii">{`  ┌──────────────┐
  │ while(true){ │
  │   research();│
  │   teach();   │
  │   ship();    │
  │ }            │
  └──────────────┘`}</pre>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Tweaks                                                             */
/* ------------------------------------------------------------------ */
function TweaksUI({ tweaks, setTweak, role, setRole }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Rola (hero kontext)">
        <TweakRadio
          label="aktívna rola"
          value={role}
          onChange={setRole}
          options={[
            { value: "dev", label: "dev" },
            { value: "research", label: "research" },
            { value: "teach", label: "teach" },
          ]}
        />
      </TweakSection>
      <TweakSection title="Téma">
        <TweakRadio
          label="mód"
          value={tweaks.mode}
          onChange={(v) => setTweak("mode", v)}
          options={[
            { value: "dark", label: "dark" },
            { value: "dim", label: "dim" },
            { value: "light", label: "light" },
          ]}
        />
        <TweakColor
          label="accent"
          value={tweaks.accent}
          onChange={(v) => setTweak("accent", v)}
          options={["#7aa2f7", "#ff7a45", "#bb9af7", "#9ece6a", "#e0af68"]}
        />
      </TweakSection>
      <TweakSection title="Typografia">
        <TweakRadio
          label="display font"
          value={tweaks.displayFont}
          onChange={(v) => setTweak("displayFont", v)}
          options={[
            { value: "mono", label: "mono" },
            { value: "serif", label: "serif" },
            { value: "sans", label: "sans" },
          ]}
        />
        <TweakSlider label="veľkosť titulku"
          min={48} max={120} step={2}
          value={tweaks.titleSize}
          onChange={(v) => setTweak("titleSize", v)}
          suffix="px" />
      </TweakSection>
      <TweakSection title="Vizuál">
        <TweakToggle label="marquee stack" value={tweaks.showMarquee} onChange={(v) => setTweak("showMarquee", v)} />
        <TweakToggle label="grain / zrno" value={tweaks.grain} onChange={(v) => setTweak("grain", v)} />
        <TweakToggle label="vibecoded colophon" value={tweaks.showColophon} onChange={(v) => setTweak("showColophon", v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "dark",
  "accent": "#7aa2f7",
  "displayFont": "mono",
  "titleSize": 60,
  "showMarquee": true,
  "grain": true,
  "showColophon": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [role, setRole] = useState("dev");

  useEffect(() => {
    const r = document.documentElement;
    r.dataset.mode = tweaks.mode;
    r.dataset.font = tweaks.displayFont;
    r.dataset.grain = tweaks.grain ? "on" : "off";
    r.style.setProperty("--accent", tweaks.accent);
    r.style.setProperty("--title-size", tweaks.titleSize + "px");
  }, [tweaks]);

  return (
    <>
      <div className="bg-grid" aria-hidden />
      {tweaks.grain && <div className="bg-grain" aria-hidden />}
      <TopBar role={role} setRole={setRole} />
      <main className="main">
        <Hero role={role} setRole={setRole} />
        <About />
        <Dev />
        <Research />
        <Projects />
        <Publications />
        <Teaching />
        <Contact />
        {tweaks.showColophon && <Colophon />}
      </main>
      <Footer />
      <TweaksUI tweaks={tweaks} setTweak={setTweak} role={role} setRole={setRole} />
      {!tweaks.showMarquee && <style>{`.hero-marquee{display:none}`}</style>}
    </>
  );
}

window.App = App;
