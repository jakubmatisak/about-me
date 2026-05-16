// Portfolio komponenty — Jakub, programátor
// Lorem ipsum placeholdery kde to dáva zmysel.

const { useState, useEffect, useRef, useMemo } = React;

/* ------------------------------------------------------------------ */
/*  useIntersect — jemný scroll reveal                                 */
/* ------------------------------------------------------------------ */
function useIntersect(options = {}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold: 0.15, ...options });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function Reveal({ children, delay = 0, as: Tag = "div", ...rest }) {
  const [ref, seen] = useIntersect();
  return (
    <Tag
      ref={ref}
      {...rest}
      style={{
        ...(rest.style || {}),
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(14px)",
        transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/*  TopBar — sticky nav                                                */
/* ------------------------------------------------------------------ */
function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const items = [
    ["o-mne", "~/o-mne"],
    ["projekty", "~/projekty"],
    ["stack", "~/stack"],
    ["teraz", "~/teraz"],
    ["kontakt", "~/kontakt"],
  ];

  return (
    <header className={`topbar ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#top" className="brand">
        <span className="brand-dot" />
        <span className="brand-name">jakub<span className="brand-cursor">_</span></span>
      </a>
      <nav className="nav">
        {items.map(([id, label]) => (
          <a key={id} href={`#${id}`}>{label}</a>
        ))}
      </nav>
      <a href="#kontakt" className="nav-cta">
        <span className="dot-live" /> available
      </a>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — live terminal                                               */
/* ------------------------------------------------------------------ */
const TERMINAL_SCRIPT = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "jakub" },
  { type: "cmd", text: "cat about.txt" },
  { type: "out", text: "programátor · backend · distribuované systémy" },
  { type: "out", text: "bratislava, sk · UTC+2" },
  { type: "cmd", text: "ls projekty/" },
  { type: "out", text: "orbit/   ledger/   tinyvm/   dnslab/   minima/   notes/" },
  { type: "cmd", text: "echo $STATUS" },
  { type: "out", text: "open to work — available Q2 2026", cls: "ok" },
  { type: "cmd", text: "_" , hold: true },
];

function Terminal() {
  const [lines, setLines] = useState([]);
  const [typing, setTyping] = useState("");
  const [step, setStep] = useState(0);
  const [caret, setCaret] = useState(true);

  // blink caret
  useEffect(() => {
    const i = setInterval(() => setCaret((c) => !c), 520);
    return () => clearInterval(i);
  }, []);

  // play script
  useEffect(() => {
    if (step >= TERMINAL_SCRIPT.length) return;
    const node = TERMINAL_SCRIPT[step];

    if (node.hold) {
      setLines((l) => [...l, node]);
      return;
    }

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
          }, 280);
        }
      }, 42 + Math.random() * 30);
      return () => clearInterval(t);
    }

    // output: just append after a beat
    const to = setTimeout(() => {
      setLines((l) => [...l, node]);
      setStep((s) => s + 1);
    }, 160);
    return () => clearTimeout(to);
  }, [step]);

  const showingCmd = step < TERMINAL_SCRIPT.length && TERMINAL_SCRIPT[step]?.type === "cmd";

  return (
    <div className="terminal">
      <div className="term-head">
        <span className="tdot tdot--r" />
        <span className="tdot tdot--y" />
        <span className="tdot tdot--g" />
        <span className="term-title">jakub@void — zsh — 92×24</span>
      </div>
      <div className="term-body">
        {lines.map((ln, i) => (
          <div key={i} className={`tl tl--${ln.type} ${ln.cls || ""}`}>
            {ln.type === "cmd" ? (
              <><span className="prompt">➜</span> <span className="path">~</span> {ln.text}</>
            ) : (
              <span>{ln.text}</span>
            )}
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

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-grid">
        <div className="hero-left">
          <div className="eyebrow">
            <span className="dot-live" />
            <span>programátor · available · bratislava</span>
          </div>
          <h1 className="hero-title">
            Píšem <em>systémy</em><br/>
            ktoré <em>nepadajú</em><br/>
            o tretej ráno.
          </h1>
          <p className="hero-sub">
            Ahoj, som <strong>Jakub</strong>. Backend a distribuované systémy.
            Najradšej mám problémy, kde jeden riadok kódu ušetrí tisíc serverov.
          </p>
          <div className="hero-cta">
            <a href="#projekty" className="btn btn--primary">
              pozrieť projekty <span className="arr">→</span>
            </a>
            <a href="#kontakt" className="btn btn--ghost">
              napíš mi
            </a>
          </div>
          <div className="hero-stats">
            <Stat n="8+" label="rokov s kódom" />
            <Stat n="23" label="shippnutých projektov" />
            <Stat n="∞" label="zjedeného kofeínu" />
          </div>
        </div>
        <div className="hero-right">
          <Terminal />
        </div>
      </div>
      <div className="hero-marquee" aria-hidden>
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="marquee-inner">
              GO · RUST · TYPESCRIPT · POSTGRES · KAFKA · K8S · TERRAFORM · ELIXIR · REDIS · GRPC · GO · RUST · TYPESCRIPT · POSTGRES · KAFKA · K8S · TERRAFORM · ELIXIR · REDIS · GRPC ·&nbsp;
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
/*  About                                                              */
/* ------------------------------------------------------------------ */
function About() {
  return (
    <section id="o-mne" className="section">
      <SectionHead n="01" title="o mne" sub="// kto je za touto klávesnicou" />
      <div className="about-grid">
        <Reveal className="about-portrait">
          <div className="portrait">
            <div className="portrait-inner">
              <span className="portrait-init">JK</span>
            </div>
            <div className="portrait-tag">
              <span className="dot-live" /> online · píše kód
            </div>
          </div>
        </Reveal>

        <Reveal className="about-copy" delay={120}>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
            ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste
            natus error sit voluptatem.
          </p>

          <dl className="facts">
            <div><dt>lokácia</dt><dd>Bratislava, SK</dd></div>
            <div><dt>časové pásmo</dt><dd>UTC+2 · CET</dd></div>
            <div><dt>jazyky</dt><dd>SK · EN · trochu DE</dd></div>
            <div><dt>status</dt><dd><span className="chip chip--ok">open to work</span></dd></div>
          </dl>
        </Reveal>
      </div>
    </section>
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
/*  Projects                                                           */
/* ------------------------------------------------------------------ */
const PROJECTS = [
  {
    id: "orbit",
    name: "orbit",
    tag: "distribuovaný scheduler",
    year: "2025",
    desc: "Low-latency job scheduler pre multi-region workloady. Nahradil legacy cron farm, znížil p99 z 4.2s na 180ms.",
    stack: ["Go", "etcd", "gRPC", "Prometheus"],
    metric: ["p99", "180ms"],
    stars: "2.4k",
    featured: true,
  },
  {
    id: "ledger",
    name: "ledger",
    tag: "double-entry accounting engine",
    year: "2024",
    desc: "Immutable transaction log s ACID garanciou. Beží v produkcii u 3 fintech klientov, spracováva ~40M tx/deň.",
    stack: ["Rust", "Postgres", "Kafka"],
    metric: ["throughput", "40M/d"],
    stars: "890",
    featured: true,
  },
  {
    id: "tinyvm",
    name: "tinyvm",
    tag: "register-based virtual machine",
    year: "2024",
    desc: "Edukačný projekt — VM s JIT kompilátorom v <3000 LOC. Podporuje closures, GC, inline cache.",
    stack: ["Rust", "LLVM"],
    metric: ["LOC", "2 841"],
    stars: "5.1k",
  },
  {
    id: "dnslab",
    name: "dnslab",
    tag: "recursive DNS resolver",
    year: "2023",
    desc: "DNS server s DoH/DoT podporou, built-in adblock, prom metriky. Nasadený na ~12 homelab inštaláciách.",
    stack: ["Go", "DNSSEC"],
    metric: ["QPS", "18k"],
    stars: "640",
  },
  {
    id: "minima",
    name: "minima",
    tag: "static site generator",
    year: "2023",
    desc: "Markdown → HTML s parciálnymi buildmi. Používa incremental compilation, 8× rýchlejší než Hugo na mojom blogu.",
    stack: ["TypeScript", "Bun"],
    metric: ["build", "120ms"],
    stars: "312",
  },
  {
    id: "notes",
    name: "notes.jk",
    tag: "technický blog",
    year: "priebežne",
    desc: "Články o databázach, concurrency patterns, a občasné rants o JavaScripte. Ostatný post: „Why your Postgres is slow (probably)\".",
    stack: ["Astro", "MDX"],
    metric: ["postov", "47"],
    stars: null,
  },
];

function Projects() {
  return (
    <section id="projekty" className="section">
      <SectionHead n="02" title="projekty" sub="// čo som postavil" />
      <div className="projects">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} p={p} i={i} />
        ))}
      </div>
      <Reveal className="projects-foot">
        <a className="link-arr" href="#" onClick={(e) => e.preventDefault()}>
          celé portfolio na github.com/jakub <span>↗</span>
        </a>
      </Reveal>
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
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(18px)",
        transition: `opacity .6s ease ${i * 60}ms, transform .6s cubic-bezier(.2,.7,.2,1) ${i * 60}ms, border-color .2s, background .2s`,
      }}
    >
      <div className="card-top">
        <div className="card-id">
          <span className="card-hash">#</span>
          <span className="card-name">{p.name}</span>
        </div>
        <div className="card-year">{p.year}</div>
      </div>

      <div className="card-tag">{p.tag}</div>
      <p className="card-desc">{p.desc}</p>

      <div className="card-metric">
        <div className="metric-k">{p.metric[0]}</div>
        <div className="metric-v">{p.metric[1]}</div>
        {p.stars && (
          <div className="metric-stars">
            <span>★</span> {p.stars}
          </div>
        )}
      </div>

      <div className="card-stack">
        {p.stack.map((s) => (
          <span key={s} className="pill">{s}</span>
        ))}
      </div>

      <div className="card-foot">
        <a href="#" onClick={(e) => e.preventDefault()} className="card-link">
          case study <span className="arr">→</span>
        </a>
        <a href="#" onClick={(e) => e.preventDefault()} className="card-link card-link--ghost">
          repo <span>↗</span>
        </a>
      </div>

      <div className="card-glow" />
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Stack                                                              */
/* ------------------------------------------------------------------ */
const STACK = [
  {
    group: "jazyky",
    items: [
      ["Go", 95],
      ["Rust", 80],
      ["TypeScript", 88],
      ["Python", 75],
      ["Elixir", 60],
    ],
  },
  {
    group: "infra",
    items: [
      ["Postgres", 92],
      ["Kafka", 82],
      ["Redis", 85],
      ["Kubernetes", 78],
      ["Terraform", 70],
    ],
  },
  {
    group: "praktiky",
    items: [
      ["systémový dizajn", 90],
      ["observability", 85],
      ["perf tuning", 88],
      ["code review", 92],
      ["mentorovanie", 75],
    ],
  },
];

function Stack() {
  return (
    <section id="stack" className="section">
      <SectionHead n="03" title="stack" sub="// čím rád pracujem" />
      <div className="stack-grid">
        {STACK.map((g, gi) => (
          <Reveal key={g.group} className="stack-col" delay={gi * 80}>
            <div className="stack-h">
              <span className="stack-brk">[</span>
              {g.group}
              <span className="stack-brk">]</span>
            </div>
            <ul className="stack-list">
              {g.items.map(([name, pct]) => (
                <li key={name}>
                  <div className="sl-top">
                    <span className="sl-name">{name}</span>
                    <span className="sl-pct">{pct}%</span>
                  </div>
                  <div className="sl-bar">
                    <div className="sl-fill" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Now                                                                */
/* ------------------------------------------------------------------ */
function Now() {
  const items = [
    ["working on", "orbit v2 — multi-region failover"],
    ["reading", "„Designing Data-Intensive Applications\" (už štvrtý raz)"],
    ["learning", "Zig — zatiaľ opatrné áno"],
    ["listening", "lo-fi · Nils Frahm · Jon Hopkins"],
    ["elsewhere", "bežky v Malej Fatre, víkendy bez notebooku"],
  ];
  return (
    <section id="teraz" className="section">
      <SectionHead n="04" title="teraz" sub="// čo je aktuálne" />
      <Reveal className="now-card">
        <div className="now-stamp">
          <div className="stamp-k">last updated</div>
          <div className="stamp-v">24. apríl 2026</div>
        </div>
        <ul className="now-list">
          {items.map(([k, v], i) => (
            <li key={k} style={{ transitionDelay: `${i * 50}ms` }}>
              <span className="now-k">{k}</span>
              <span className="now-dots" aria-hidden>
                {".".repeat(40)}
              </span>
              <span className="now-v">{v}</span>
            </li>
          ))}
        </ul>
        <div className="now-foot">
          // inšpirované <a href="https://nownownow.com" target="_blank" rel="noreferrer">nownownow.com</a>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */
function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "jakub@example.sk";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const socials = [
    ["github", "github.com/jakub"],
    ["linkedin", "linkedin.com/in/jakub"],
    ["x", "x.com/jakub"],
    ["rss", "notes.jakub.sk/rss"],
  ];

  return (
    <section id="kontakt" className="section section--contact">
      <SectionHead n="05" title="kontakt" sub="// najlepšie cez email" />
      <div className="contact">
        <Reveal className="contact-main">
          <div className="contact-lead">
            Máš zaujímavý problém?<br/>
            <em>Napíš.</em>
          </div>
          <button className="email-btn" onClick={copy} title="klikni na skopírovanie">
            <span className="email-at">{email}</span>
            <span className="email-copy">
              {copied ? "✓ skopírované" : "⧉ kopírovať"}
            </span>
          </button>
          <p className="contact-note">
            Odpovedám obvykle do 24h. Projekty beriem priebežne,
            aktuálne je kapacita <strong>od júna 2026</strong>.
          </p>
        </Reveal>

        <Reveal className="contact-socials" delay={100}>
          <div className="sock-h">// inde na internete</div>
          <ul>
            {socials.map(([k, v]) => (
              <li key={k}>
                <a href="#" onClick={(e) => e.preventDefault()}>
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
        <div className="foot-brand">jakub<span>_</span></div>
        <div className="foot-meta">
          © 2026 · postavené s vim &amp; kofeínom · <a href="#top">↑ späť hore</a>
        </div>
      </div>
      <div className="footer-r">
        <pre className="foot-ascii">{`  .--.
 |o_o |   hackty-hack
 |:_/ |   while(alive) {
//   \\ \\      code();
(|     | )   sleep();
/'\\_   _/\`\\  }
\\___)=(___/`}</pre>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Tweaks                                                             */
/* ------------------------------------------------------------------ */
function TweaksUI({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
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
        <TweakColor label="accent" value={tweaks.accent} onChange={(v) => setTweak("accent", v)} />
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
          label="veľkosť titulku"
          min={48} max={120} step={2}
          value={tweaks.titleSize}
          onChange={(v) => setTweak("titleSize", v)}
          suffix="px"
        />
      </TweakSection>

      <TweakSection title="Hero">
        <TweakToggle
          label="live terminál"
          value={tweaks.showTerminal}
          onChange={(v) => setTweak("showTerminal", v)}
        />
        <TweakToggle
          label="marquee stack"
          value={tweaks.showMarquee}
          onChange={(v) => setTweak("showMarquee", v)}
        />
        <TweakToggle
          label="grain / zrno"
          value={tweaks.grain}
          onChange={(v) => setTweak("grain", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "mode": "dark",
  "accent": "#ff7a45",
  "displayFont": "mono",
  "titleSize": 84,
  "showTerminal": true,
  "showMarquee": true,
  "grain": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // apply tweaks to :root
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
      <TopBar />
      <main className="main">
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Now />
        <Contact />
      </main>
      <Footer />
      <TweaksUI tweaks={tweaks} setTweak={setTweak} />
      {!tweaks.showTerminal && <style>{`.terminal{display:none}.hero-right{display:none}.hero-grid{grid-template-columns:1fr}`}</style>}
      {!tweaks.showMarquee && <style>{`.hero-marquee{display:none}`}</style>}
    </>
  );
}

window.App = App;
