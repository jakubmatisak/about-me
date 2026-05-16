// Portfolio v2 — Jakub Matišák
// Programátor · Výskumník · Pedagóg
// STU Bratislava, FEI

const { useState, useEffect, useRef, useMemo } = React;

/* ------------------------------------------------------------------ */
/*  Util — scroll reveal                                               */
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
/*  Role context (programátor / výskumník / pedagóg)                  */
/* ------------------------------------------------------------------ */
const ROLES = {
  dev: {
    key: "dev",
    label: "programátor",
    cmd: "switch --role=dev",
    accent: "var(--accent)",
    headline: ["Píšem softvér", "a", "učím stroje rozmýšľať."],
    sub: "Webové aplikácie, simulácie a nástroje, ktoré spájajú výskum s reálnym používateľom.",
  },
  research: {
    key: "research",
    label: "výskumník",
    cmd: "switch --role=research",
    accent: "var(--accent)",
    headline: ["Robím výskum", "v oblasti", "online vzdelávania a riadenia."],
    sub: "Online laboratóriá, AR vizualizácie a simulačné prostredia pre technické predmety.",
  },
  teach: {
    key: "teach",
    label: "pedagóg",
    cmd: "switch --role=teach",
    accent: "var(--accent)",
    headline: ["Učím na", "Slovenskej Technickej", "Univerzite."],
    sub: "Programovanie, webové technológie a riadenie systémov — FEI STU v Bratislave.",
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
    ["vyskum", "~/výskum"],
    ["ucim", "~/učím"],
    ["projekty", "~/projekty"],
    ["kontakt", "~/kontakt"],
  ];

  return (
    <header className={`topbar ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#top" className="brand">
        <span className="brand-dot" />
        <span className="brand-name">jmatisak<span className="brand-cursor">_</span></span>
        <span className="brand-meta">v2.0 · 2026</span>
      </a>
      <nav className="nav">
        {items.map(([id, label]) => (
          <a key={id} href={`#${id}`}>{label}</a>
        ))}
      </nav>
      <div className="role-switch" role="tablist" aria-label="Prepnúť rolu">
        {Object.values(ROLES).map((r) => (
          <button
            key={r.key}
            className={`rs-btn ${role === r.key ? "is-on" : ""}`}
            onClick={() => setRole(r.key)}
            title={r.cmd}
          >
            {r.label}
          </button>
        ))}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Terminal — script changes with role                                */
/* ------------------------------------------------------------------ */
const TERM_SCRIPTS = {
  dev: [
    { type: "cmd", text: "whoami" },
    { type: "out", text: "jakub matišák" },
    { type: "cmd", text: "cat roles.txt" },
    { type: "out", text: "[1] programátor    — fullstack, simulácie, web" },
    { type: "out", text: "[2] výskumník      — STU FEI, online education" },
    { type: "out", text: "[3] pedagóg        — vyučujem na univerzite" },
    { type: "cmd", text: "ls ~/stack" },
    { type: "out", text: "python  js/ts  java  c#  modelica  arcore" },
    { type: "cmd", text: "echo $STATUS" },
    { type: "out", text: "open to research & freelance collaborations", cls: "ok" },
    { type: "cmd", text: "_", hold: true },
  ],
  research: [
    { type: "cmd", text: "cd ~/research && ls" },
    { type: "out", text: "online-lab/   modelica-web/   arcore-control/   publications/" },
    { type: "cmd", text: "cat focus.md" },
    { type: "out", text: "# výskumné záujmy" },
    { type: "out", text: "- online laboratóriá pre riadenie systémov" },
    { type: "out", text: "- web-based simulačné nástroje (OpenModelica)" },
    { type: "out", text: "- AR/VR vo vzdelávaní inžinierov" },
    { type: "cmd", text: "git log --oneline | head -3" },
    { type: "out", text: "a1c4f2  paper accepted @ FedCSIS 2020", cls: "ok" },
    { type: "out", text: "8d3b91  IEEE conference paper, 2018" },
    { type: "out", text: "0091ee  thesis defended" },
    { type: "cmd", text: "_", hold: true },
  ],
  teach: [
    { type: "cmd", text: "cat ~/teaching/semester.json" },
    { type: "out", text: "{" },
    { type: "out", text: "  \"university\":  \"STU FEI Bratislava\"," },
    { type: "out", text: "  \"department\":  \"Institute of Automotive Mechatronics\"," },
    { type: "out", text: "  \"semester\":    \"letný 2025/26\"," },
    { type: "out", text: "  \"courses\":     [\"Programovanie\", \"Webové aplikácie\", \"Riadenie systémov\"]," },
    { type: "out", text: "  \"students\":    142," },
    { type: "out", text: "  \"office_hrs\":  \"Po 13:00 — Ilkovičova 3, B-503\"" },
    { type: "out", text: "}" },
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

  // reset on role change
  useEffect(() => {
    setLines([]); setTyping(""); setStep(0);
  }, [role]);

  useEffect(() => {
    const i = setInterval(() => setCaret((c) => !c), 520);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (step >= script.length) return;
    const node = script[step];
    if (node.hold) { setLines((l) => [...l, node]); return; }
    if (node.type === "cmd") {
      let i = 0;
      setTyping("");
      const t = setInterval(() => {
        i++;
        setTyping(node.text.slice(0, i));
        if (i >= node.text.length) {
          clearInterval(t);
          setTimeout(() => {
            setLines((l) => [...l, node]);
            setTyping("");
            setStep((s) => s + 1);
          }, 220);
        }
      }, 30 + Math.random() * 28);
      return () => clearInterval(t);
    }
    const to = setTimeout(() => {
      setLines((l) => [...l, node]);
      setStep((s) => s + 1);
    }, 110);
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
            <span>STU FEI Bratislava · open to collaborations</span>
          </div>
          <h1 className="hero-title" key={role}>
            {r.headline[0]}<br/>
            <em>{r.headline[1]}</em><br/>
            {r.headline[2]}
          </h1>
          <p className="hero-sub">
            Ahoj, som <strong>Jakub Matišák</strong>. Programátor, výskumník a pedagóg.
            {" "}{r.sub}
          </p>
          <div className="hero-cta">
            <a href="#vyskum" className="btn btn--primary">
              pozrieť výskum <span className="arr">→</span>
            </a>
            <a href="#kontakt" className="btn btn--ghost">napíš mi</a>
          </div>
          <div className="hero-stats">
            <Stat n="STU" label="FEI Bratislava" />
            <Stat n="6+" label="rokov výskumu" />
            <Stat n="3" label="oblasti pôsobenia" />
            <Stat n="142" label="študentov / sem." />
          </div>
        </div>
        <div className="hero-right">
          <Terminal role={role} />
          <div className="role-hint">
            // tip: prepni rolu v hornom paneli alebo:
            <div className="role-cmds">
              {Object.values(ROLES).map((rl) => (
                <button key={rl.key} className={`rc ${role === rl.key ? "is-on" : ""}`} onClick={() => setRole(rl.key)}>
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
              PYTHON · JAVASCRIPT · TYPESCRIPT · JAVA · C# · MODELICA · OPENMODELICA · ARCORE · REACT · NODE · FLASK · DOCKER · LATEX · IEEE · STU FEI ·&nbsp;
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
      <SectionHead n="01" title="o mne" sub="// programátor · výskumník · pedagóg" />
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
              <span className="affil-k">univerzita</span>
              <span className="affil-v">STU v Bratislave</span>
            </div>
            <div className="affil-row">
              <span className="affil-k">fakulta</span>
              <span className="affil-v">FEI</span>
            </div>
            <div className="affil-row">
              <span className="affil-k">e-mail</span>
              <span className="affil-v">jakub.matisak<wbr/>@stuba.sk</span>
            </div>
            <div className="affil-row">
              <span className="affil-k">linkedin</span>
              <span className="affil-v">/in/jakmat</span>
            </div>
            <div className="affil-row">
              <span className="affil-k">researchgate</span>
              <span className="affil-v">/Jakub-Matisak</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="about-copy" delay={120}>
          <p className="lead">
            Pohybujem sa medzi tromi svetmi — <em>kódom</em>, <em>výskumom</em> a <em>učebňou</em>.
            Najradšej mám, keď sa pretnú.
          </p>
          <p>
            Programovaniu sa venujem profesionálne aj pre radosť. Na <strong>STU FEI</strong>{" "}
            učím predmety okolo programovania a webových technológií,
            zároveň pracujem na výskume v oblasti <strong>online vzdelávacích nástrojov</strong>,
            simulácií riadiacich systémov a využitia AR/VR technológií vo výučbe.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit — túto časť ešte
            doplním. Zatiaľ tu môže byť pár viet o tom, ako sa volné víkendy snažím
            tráviť bez monitora, čo sa nie vždy podarí.
          </p>

          <dl className="facts">
            <div><dt>lokácia</dt><dd>Bratislava, SK</dd></div>
            <div><dt>časové pásmo</dt><dd>UTC+2 · CET</dd></div>
            <div><dt>jazyky</dt><dd>SK · EN · CZ</dd></div>
            <div><dt>status</dt><dd><span className="chip chip--ok">open to collab</span></dd></div>
            <div><dt>vedie záverečné práce</dt><dd>áno (Bc., Ing.)</dd></div>
            <div><dt>recenzent</dt><dd>vybrané IEEE konferencie</dd></div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Research — publications + topics                                   */
/* ------------------------------------------------------------------ */
const TOPICS = [
  { k: "online laboratóriá", desc: "Vzdialený prístup k reálnym a simulovaným riadiacim experimentom cez prehliadač." },
  { k: "web simulácie", desc: "OpenModelica + web service ako backend pre prehliadačové modely mechanických systémov." },
  { k: "AR vo vzdelávaní", desc: "Využitie ARCore na vizualizáciu odozvy riadiacich systémov v reálnom čase nad fyzickým objektom." },
  { k: "didaktika programovania", desc: "Interaktívne nástroje pre začínajúcich študentov FEI." },
];

const PUBS = [
  {
    type: "conf",
    year: "2020",
    title: "The Use of ARCore Technology for Online Control Simulations",
    authors: ["Matišák, J.", "Žáková, K."],
    venue: "Proceedings of FedCSIS 2020",
    pages: "pp. 649–652",
    tags: ["AR", "control", "education"],
    doi: "10.15439/2020F38",
  },
  {
    type: "conf",
    year: "2018",
    title: "Online Tool for Creating Simple Models of Mechanical Systems",
    authors: ["Matišák, J.", "Žáková, K."],
    venue: "IEEE International Conference on Emerging eLearning Technologies",
    pages: "ICETA 2018",
    tags: ["OpenModelica", "web", "simulation"],
    doi: "10.1109/ICETA.2018.8572064",
  },
  {
    type: "journal",
    year: "—",
    title: "[ďalší článok — placeholder / doplním]",
    authors: ["Matišák, J.", "et al."],
    venue: "Lorem Ipsum Journal of Educational Technology",
    pages: "—",
    tags: ["placeholder"],
    doi: null,
  },
];

function Research() {
  return (
    <section id="vyskum" className="section">
      <SectionHead n="02" title="výskum" sub="// čo skúmam a publikujem" />

      <Reveal className="topic-grid">
        {TOPICS.map((t, i) => (
          <div className="topic" key={t.k} style={{ animationDelay: `${i * 80}ms` }}>
            <div className="topic-k">
              <span className="topic-bullet">▸</span> {t.k}
            </div>
            <div className="topic-desc">{t.desc}</div>
          </div>
        ))}
      </Reveal>

      <div className="pubs-h">
        <span className="pubs-h-l">// publikácie</span>
        <span className="pubs-h-r">vybraný výber · zoradené podľa roku</span>
      </div>

      <ul className="pub-list">
        {PUBS.map((p, i) => (
          <PubRow key={i} p={p} i={i} />
        ))}
      </ul>

      <Reveal className="pub-foot">
        <a className="link-arr" href="https://www.researchgate.net/profile/Jakub-Matisak" target="_blank" rel="noreferrer">
          celý zoznam na ResearchGate <span>↗</span>
        </a>
      </Reveal>
    </section>
  );
}

function PubRow({ p, i }) {
  const [open, setOpen] = useState(false);
  const [ref, seen] = useIntersect();
  return (
    <li ref={ref} className={`pub ${open ? "is-open" : ""}`}
        style={{
          opacity: seen ? 1 : 0,
          transform: seen ? "translateY(0)" : "translateY(10px)",
          transition: `opacity .5s ease ${i * 60}ms, transform .5s ease ${i * 60}ms`,
        }}>
      <button className="pub-row" onClick={() => setOpen((o) => !o)}>
        <span className="pub-year">{p.year}</span>
        <span className={`pub-type pub-type--${p.type}`}>{p.type === "conf" ? "conference" : p.type === "journal" ? "journal" : "preprint"}</span>
        <span className="pub-title">{p.title}</span>
        <span className="pub-toggle">{open ? "−" : "+"}</span>
      </button>
      <div className="pub-body" hidden={!open}>
        <div className="pub-meta">
          <div><span className="pm-k">autori</span><span className="pm-v">{p.authors.join(", ")}</span></div>
          <div><span className="pm-k">venue</span><span className="pm-v">{p.venue}</span></div>
          <div><span className="pm-k">strany</span><span className="pm-v">{p.pages}</span></div>
          {p.doi && <div><span className="pm-k">doi</span><span className="pm-v">{p.doi}</span></div>}
        </div>
        <div className="pub-tags">
          {p.tags.map((t) => <span key={t} className="pill">{t}</span>)}
        </div>
        <div className="pub-cite">
          <span className="cite-k">// BibTeX</span>
          <pre className="cite">{`@inproceedings{matisak${p.year},
  author = {${p.authors.join(" and ")}},
  title  = {${p.title}},
  booktitle = {${p.venue}},
  year   = {${p.year}}${p.doi ? `,\n  doi    = {${p.doi}}` : ""}
}`}</pre>
        </div>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Teaching                                                           */
/* ------------------------------------------------------------------ */
const COURSES = [
  {
    code: "B-PRG1",
    name: "Programovanie I.",
    role: "cvičiaci",
    level: "Bc.",
    sem: "zimný",
    students: 58,
    topics: ["základy", "Python", "algoritmy"],
  },
  {
    code: "B-WEB",
    name: "Webové technológie",
    role: "vedúci predmetu",
    level: "Bc.",
    sem: "letný",
    students: 42,
    topics: ["HTML/CSS", "JS", "React", "REST API"],
  },
  {
    code: "I-RSY",
    name: "Riadenie systémov",
    role: "cvičiaci",
    level: "Ing.",
    sem: "zimný",
    students: 27,
    topics: ["MATLAB", "PID", "simulácia"],
  },
  {
    code: "I-OEDU",
    name: "Online vzdelávacie nástroje",
    role: "konzultant",
    level: "Ing.",
    sem: "letný",
    students: 15,
    topics: ["UX", "didaktika", "WebRTC"],
  },
];

function Teaching() {
  return (
    <section id="ucim" className="section">
      <SectionHead n="03" title="učím" sub="// kurzy & vedenie záverečných prác" />

      <div className="teach-grid">
        {COURSES.map((c, i) => (
          <Reveal key={c.code} delay={i * 60} className="course">
            <div className="course-head">
              <span className="course-code">{c.code}</span>
              <span className="course-sem">{c.sem} · {c.level}</span>
            </div>
            <div className="course-name">{c.name}</div>
            <div className="course-role">
              <span className="cr-k">moja rola</span>
              <span className="cr-v">{c.role}</span>
            </div>
            <div className="course-topics">
              {c.topics.map((t) => <span key={t} className="pill">{t}</span>)}
            </div>
            <div className="course-foot">
              <span className="cf-ico">👥</span> {c.students} študentov
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="thesis-cta">
        <div className="thesis-l">
          <div className="thesis-h">Vedem aj záverečné práce.</div>
          <p>
            Ak hľadáš tému Bc. alebo Ing. v oblasti webových aplikácií,
            simulácií, AR/VR alebo online laboratórií — napíš mi.
          </p>
        </div>
        <a href="#kontakt" className="btn btn--primary">téma na diplomovku <span className="arr">→</span></a>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */
const PROJECTS = [
  {
    id: "modelweb",
    name: "modelweb",
    tag: "online tool · mechanické modely",
    year: "2018–",
    desc: "Webová aplikácia pre vytváranie animovaných modelov jednoduchých mechanických systémov. Backend driven by OpenModelica cez web service.",
    stack: ["Python", "JS", "OpenModelica"],
    metric: ["používateľov", "200+"],
    featured: true,
  },
  {
    id: "arcontrol",
    name: "ar-control",
    tag: "augmented reality · riadenie",
    year: "2020",
    desc: "ARCore aplikácia pre vizualizáciu odoziev riadiacich systémov v reálnom čase. Mobil drží študent, simulácia beží na serveri, AR ukáže krivky nad fyzickým modelom.",
    stack: ["Java", "ARCore", "WebSockets"],
    metric: ["FedCSIS", "2020"],
    featured: true,
  },
  {
    id: "labgrid",
    name: "labgrid",
    tag: "remote lab booking",
    year: "2022",
    desc: "Systém pre rezerváciu vzdialených laboratórnych experimentov pre študentov. Kalendár, autentifikácia, queueing pre limitované hardware zdroje.",
    stack: ["TypeScript", "Node", "Postgres"],
    metric: ["rezervácií / sem.", "1.2k"],
  },
  {
    id: "stuba-utils",
    name: "stuba-utils",
    tag: "interné nástroje pre kolegov",
    year: "priebežne",
    desc: "Drobné nástroje — generátor LaTeX šablón pre záverečné práce, scraper rozvrhu, batch grader pre Python úlohy. Open source, používa pár kolegov.",
    stack: ["Python", "TS"],
    metric: ["repos", "8"],
  },
];

function Projects() {
  return (
    <section id="projekty" className="section">
      <SectionHead n="04" title="projekty" sub="// kde sa kód a výskum stretávajú" />
      <div className="projects">
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
      </div>
    </section>
  );
}

function ProjectCard({ p, i }) {
  const [hover, setHover] = useState(false);
  const [ref, seen] = useIntersect();
  return (
    <article
      ref={ref}
      className={`card ${p.featured ? "card--featured" : ""} ${hover ? "is-hover" : ""}`}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(18px)",
        transition: `opacity .6s ease ${i * 60}ms, transform .6s cubic-bezier(.2,.7,.2,1) ${i * 60}ms, border-color .2s, background .2s`,
      }}>
      <div className="card-top">
        <div className="card-id">
          <span className="card-hash">#</span><span className="card-name">{p.name}</span>
        </div>
        <div className="card-year">{p.year}</div>
      </div>
      <div className="card-tag">{p.tag}</div>
      <p className="card-desc">{p.desc}</p>
      <div className="card-metric">
        <div className="metric-k">{p.metric[0]}</div>
        <div className="metric-v">{p.metric[1]}</div>
      </div>
      <div className="card-stack">
        {p.stack.map((s) => <span key={s} className="pill">{s}</span>)}
      </div>
      <div className="card-glow" />
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Talks                                                              */
/* ------------------------------------------------------------------ */
const TALKS = [
  ["2020", "FedCSIS",                "Sofia, BG",     "ARCore for online control simulations"],
  ["2018", "IEEE ICETA",             "Stará Lesná, SK", "Online tool for mechanical systems"],
  ["—",    "—",                      "—",             "[ďalší talk — placeholder]"],
];

function Talks() {
  return (
    <section id="talks" className="section section--tight">
      <SectionHead n="05" title="talks & konferencie" sub="// kde som hovoril" />
      <Reveal className="talks-wrap">
        <table className="talks">
          <thead>
            <tr><th>rok</th><th>kde</th><th>lokácia</th><th>téma</th></tr>
          </thead>
          <tbody>
            {TALKS.map(([y, v, loc, t], i) => (
              <tr key={i}>
                <td className="t-year">{y}</td>
                <td className="t-venue">{v}</td>
                <td className="t-loc">{loc}</td>
                <td className="t-title">{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
    ["github", "github.com/jmatisak", "#"],
    ["orcid", "0000-0000-0000-0000", "#"],
  ];

  return (
    <section id="kontakt" className="section section--contact">
      <SectionHead n="06" title="kontakt" sub="// najlepšie cez email" />
      <div className="contact">
        <Reveal className="contact-main">
          <div className="contact-lead">
            Máš nápad na výskum<br/>
            alebo zaujímavý projekt?<br/>
            <em>Ozvi sa.</em>
          </div>
          <button className="email-btn" onClick={copy}>
            <span className="email-at">{email}</span>
            <span className="email-copy">{copied ? "✓ skopírované" : "⧉ kopírovať"}</span>
          </button>
          <p className="contact-note">
            Konzultačné hodiny — <strong>pondelok 13:00</strong>, FEI STU, Ilkovičova 3.
            Email odpovedám obvykle do 24h, mimo prednáškových týždňov rýchlejšie.
          </p>
        </Reveal>

        <Reveal className="contact-socials" delay={100}>
          <div className="sock-h">// inde na internete</div>
          <ul>
            {socials.map(([k, v, href]) => (
              <li key={k}>
                <a href={href} target={href === "#" ? undefined : "_blank"} rel="noreferrer">
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
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-l">
        <div className="foot-brand">jakub matišák<span>_</span></div>
        <div className="foot-meta">
          © 2026 · STU FEI Bratislava · postavené s vim &amp; espressom · <a href="#top">↑ späť hore</a>
        </div>
      </div>
      <div className="footer-r">
        <pre className="foot-ascii">{`  ┌─────────────┐
  │  while(true)│
  │    code();  │
  │    teach(); │
  │    research│
  │  ;          │
  └─────────────┘`}</pre>
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
          options={["#ff7a45", "#7aa2f7", "#bb9af7", "#9ece6a", "#e0af68"]}
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
        <TweakSlider
          label="veľkosť titulku" min={48} max={120} step={2}
          value={tweaks.titleSize}
          onChange={(v) => setTweak("titleSize", v)}
          suffix="px"
        />
      </TweakSection>

      <TweakSection title="Vizuál">
        <TweakToggle label="marquee stack" value={tweaks.showMarquee} onChange={(v) => setTweak("showMarquee", v)} />
        <TweakToggle label="grain / zrno" value={tweaks.grain} onChange={(v) => setTweak("grain", v)} />
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
  "titleSize": 76,
  "showMarquee": true,
  "grain": true
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
        <Research />
        <Teaching />
        <Projects />
        <Talks />
        <Contact />
      </main>
      <Footer />
      <TweaksUI tweaks={tweaks} setTweak={setTweak} role={role} setRole={setRole} />
      {!tweaks.showMarquee && <style>{`.hero-marquee{display:none}`}</style>}
    </>
  );
}

window.App = App;
