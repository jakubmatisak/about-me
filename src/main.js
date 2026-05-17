// Bootstrap: build dynamic lists, wire role switch, language toggle,
// scroll reveal, terminal, grant filter, pubs accordion, email copy.

import {
  ROLE_KEYS, STACK_GROUPS, SIDE_PROJECTS, TOPICS, GRANTS, PUBS, THESES_RECENT,
  SOCIALS, EMAIL, grantBadgeClass,
} from "./data.js";
import { MESSAGES, applyLocale, initLocale, getLang, tr, fmt } from "./i18n.js";
import { createTerminal } from "./terminal.js";

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

/* -------------------- role state -------------------- */
let role = "dev";
const setRole = (r) => {
  if (!ROLE_KEYS.includes(r)) return;
  role = r;
  applyRoleUI();
  if (terminal) terminal.reset();
  // re-trigger headline animation
  const t = $("#hero-title");
  if (t) {
    t.classList.remove("anim-swap");
    void t.offsetWidth;
    t.classList.add("anim-swap");
  }
};

function applyRoleUI() {
  const R = tr().roles[role];
  // Headline (3 segments, middle accented, tail rendered smaller).
  const t = $("#hero-title");
  if (t && R) {
    t.innerHTML = `${escape(R.headline[0])}<br/><em>${escape(R.headline[1])}</em><br/><span class="tail">${escape(R.headline[2])}</span>`;
  }
  // Sub copy.
  const sub = $("#hero-sub-role");
  if (sub) sub.textContent = R.sub;

  // Active button state.
  $$("[data-role]").forEach((b) => {
    b.classList.toggle("is-on", b.dataset.role === role);
    b.setAttribute("aria-pressed", b.dataset.role === role ? "true" : "false");
  });
  // Role cmd labels (re-render from active locale).
  $$(".rc[data-role]").forEach((b) => {
    const k = b.dataset.role;
    b.textContent = "$ " + tr().roles[k].cmd;
  });
  $$(".rs-btn[data-role]").forEach((b) => {
    const k = b.dataset.role;
    b.textContent = tr().roles[k].label;
    b.title = tr().roles[k].cmd;
  });
}

/* -------------------- escape -------------------- */
function escape(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* -------------------- dynamic sections -------------------- */
function renderDevStack() {
  const wrap = $("#dev-stack");
  if (!wrap) return;
  wrap.innerHTML = "";
  STACK_GROUPS.forEach((g, gi) => {
    const row = document.createElement("div");
    row.className = "ds-row";
    row.dataset.reveal = "";
    row.style.setProperty("--reveal-delay", `${gi * 80}ms`);
    row.innerHTML = `
      <div class="ds-h">
        <span class="ds-brk">[</span>
        <span class="ds-name" data-i18n="dev.groups.${g.id}.h"></span>
        <span class="ds-brk">]</span>
        <span class="ds-tag" data-i18n="dev.groups.${g.id}.tag"></span>
      </div>
      <div class="ds-items">
        ${g.items.map((s) => `<span class="ds-chip">${escape(s)}</span>`).join("")}
      </div>
    `;
    wrap.appendChild(row);
  });
}

function renderSideProjects() {
  const wrap = $("#side-grid");
  if (!wrap) return;
  wrap.innerHTML = "";
  SIDE_PROJECTS.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "side-card";
    card.dataset.reveal = "";
    card.style.setProperty("--reveal-delay", `${i * 80}ms`);
    card.innerHTML = `
      <div class="side-top">
        <div class="side-name"><span class="side-hash">#</span><span data-i18n="dev.projects.${p.id}.name"></span></div>
        <div class="side-yrs">${escape(p.yrs)}</div>
      </div>
      <div class="side-tag" data-i18n="dev.projects.${p.id}.tag"></div>
      <p class="side-desc" data-i18n="dev.projects.${p.id}.desc"></p>
      <div class="side-meta">
        <span class="sm-k" data-i18n="dev.roleK"></span>
        <span class="sm-v" data-i18n="dev.projects.${p.id}.role"></span>
      </div>
      <div class="side-stack">${p.stack.map((s) => `<span class="pill">${escape(s)}</span>`).join("")}</div>
    `;
    wrap.appendChild(card);
  });
}

function renderTopics() {
  const wrap = $("#topic-grid");
  if (!wrap) return;
  wrap.innerHTML = "";
  TOPICS.forEach((t) => {
    const el = document.createElement("div");
    el.className = "topic";
    el.dataset.reveal = "";
    el.innerHTML = `
      <div class="topic-k">
        <span class="topic-bullet">▸</span>
        <span data-i18n="research.topics.${t.id}.k"></span>
        <span class="topic-tag topic-tag--${t.tag}">${escape(t.tag)}</span>
      </div>
      <div class="topic-desc" data-i18n="research.topics.${t.id}.desc"></div>
    `;
    wrap.appendChild(el);
  });
}

/* -------------------- grants -------------------- */
let grantFilter = "running";
let showAllGrants = false;
const GRANTS_LIMIT = 3;
// garant first within each filter; keep original order otherwise.
function sortGrants(arr) {
  return arr.slice().sort((a, b) => {
    if (a.role === b.role) return 0;
    return a.role === "garant" ? -1 : 1;
  });
}
function renderGrants() {
  const list = $("#grant-list");
  if (!list) return;
  const filtered = sortGrants(grantFilter === "all" ? GRANTS : GRANTS.filter((g) => g.status === grantFilter));
  const items = showAllGrants ? filtered : filtered.slice(0, GRANTS_LIMIT);
  list.innerHTML = "";
  items.forEach((g, i) => {
    const li = document.createElement("li");
    li.className = `grant ${g.featured ? "is-featured" : ""}`;
    li.dataset.reveal = "";
    li.style.setProperty("--reveal-delay", `${i * 40}ms`);
    const badgeCls = grantBadgeClass(g.type);
    const statusKey = g.status === "running" ? "statusRunning" : "statusDone";
    li.innerHTML = `
      <div class="g-type">
        <span class="g-badge g-badge--${badgeCls}">${escape(g.type)}</span>
        <span class="g-role g-role--${g.role}" data-i18n="projects.roleLabels.${g.role}"></span>
      </div>
      <div class="g-main">
        <div class="g-id">${escape(g.id)}</div>
        <div class="g-name">${escape(tr().projects.grantNames[g.id] || "")}</div>
      </div>
      <div class="g-meta">
        <div class="g-years">${escape(g.years)}</div>
        <div class="g-status g-status--${g.status}" data-i18n="projects.${statusKey}"></div>
      </div>
    `;
    list.appendChild(li);
  });
  // refresh i18n for newly inserted nodes
  reapplyI18nWithin(list);
  attachReveal(list);
  updateFilterCounts();

  // show-more / show-less under the grant list
  const moreWrap = $("#grants-more");
  const moreBtn = $("#grants-more-btn");
  if (moreWrap && moreBtn) {
    if (filtered.length > GRANTS_LIMIT) {
      moreWrap.hidden = false;
      moreBtn.textContent = showAllGrants
        ? tr().projects.less
        : fmt(tr().projects.moreTpl, filtered.length - GRANTS_LIMIT);
    } else {
      moreWrap.hidden = true;
    }
  }
}

function updateFilterCounts() {
  const counts = {
    all: GRANTS.length,
    running: GRANTS.filter((g) => g.status === "running").length,
    done: GRANTS.filter((g) => g.status === "done").length,
  };
  $$("[data-filter]").forEach((b) => {
    b.classList.toggle("is-on", b.dataset.filter === grantFilter);
    const c = b.querySelector(".gf-c");
    if (c) c.textContent = counts[b.dataset.filter];
  });
}

/* -------------------- publications -------------------- */
let showAllPubs = false;
let openPub = null;
const PUBS_LIMIT = 3;
function renderPubs() {
  const list = $("#pub-list");
  if (!list) return;
  const visible = showAllPubs ? PUBS : PUBS.slice(0, PUBS_LIMIT);
  list.innerHTML = "";
  visible.forEach((p, i) => {
    const realIdx = PUBS.indexOf(p);
    const li = document.createElement("li");
    li.className = `pub ${openPub === realIdx ? "is-open" : ""} ${p.featured ? "is-featured" : ""}`;
    li.dataset.reveal = "";
    li.style.setProperty("--reveal-delay", `${i * 40}ms`);
    const typeLabel = tr().pubs.typeLabel[p.type] || p.type;
    li.innerHTML = `
      <button class="pub-row" type="button" aria-expanded="${openPub === realIdx}">
        <span class="pub-year">${escape(p.year)}</span>
        <span class="pub-type pub-type--${p.type}">${escape(typeLabel)}</span>
        <span class="pub-title">${escape(tr().pubs.titles[realIdx] || "")}</span>
        <span class="pub-toggle">${openPub === realIdx ? "−" : "+"}</span>
      </button>
      <div class="pub-body" ${openPub === realIdx ? "" : "hidden"}>
        <div class="pub-meta">
          <div><span class="pm-k" data-i18n="pubs.meta.authors"></span><span class="pm-v">${escape(p.authors.join(", "))}</span></div>
          <div><span class="pm-k" data-i18n="pubs.meta.venue"></span><span class="pm-v">${escape(p.venue)}</span></div>
          <div><span class="pm-k" data-i18n="pubs.meta.pages"></span><span class="pm-v">${escape(p.pages)}</span></div>
        </div>
        <div class="pub-tags">${p.tags.map((t) => `<span class="pill">${escape(t)}</span>`).join("")}</div>
      </div>
    `;
    li.querySelector(".pub-row").addEventListener("click", () => {
      openPub = openPub === realIdx ? null : realIdx;
      renderPubs();
    });
    list.appendChild(li);
  });

  // sub label
  const subLabel = $("#pubs-sub");
  if (subLabel) {
    subLabel.textContent = fmt(tr().pubs.subTpl, showAllPubs ? tr().pubs.subFull : tr().pubs.subTop);
  }
  // more button
  const moreBtn = $("#pubs-more-btn");
  const moreWrap = $("#pubs-more");
  if (moreWrap && moreBtn) {
    if (PUBS.length > PUBS_LIMIT) {
      moreWrap.hidden = false;
      moreBtn.textContent = showAllPubs ? tr().pubs.less : fmt(tr().pubs.moreTpl, PUBS.length - PUBS_LIMIT);
    } else {
      moreWrap.hidden = true;
    }
  }

  reapplyI18nWithin(list);
  attachReveal(list);
}

/* -------------------- theses -------------------- */
function renderTheses() {
  const tbody = $("#theses-body");
  if (!tbody) return;
  tbody.innerHTML = "";
  THESES_RECENT.forEach((t, i) => {
    const tr_ = document.createElement("tr");
    tr_.innerHTML = `
      <td class="th-year">${escape(t.year)}</td>
      <td class="th-level"><span class="th-pill th-pill--${t.level}" data-i18n="teach.levelPill.${t.level}"></span></td>
      <td class="th-name" data-i18n="teach.thesisNames.${i}"></td>
      <td class="th-student">${escape(t.student)}</td>
    `;
    tbody.appendChild(tr_);
  });
  reapplyI18nWithin(tbody);
}

/* -------------------- teaching summary cards -------------------- */
function renderTeachCards() {
  const wrap = $("#teach-summary");
  if (!wrap) return;
  wrap.innerHTML = "";
  tr().teach.cards.forEach((c, i) => {
    const el = document.createElement("div");
    el.className = "ts-card";
    el.dataset.reveal = "";
    el.style.setProperty("--reveal-delay", `${i * 80}ms`);
    el.innerHTML = `<div class="ts-n">${escape(c.n)}</div><div class="ts-l">${c.l}</div>`;
    wrap.appendChild(el);
  });
  // CTA card last
  const cta = document.createElement("div");
  cta.className = "ts-card ts-card--cta";
  cta.dataset.reveal = "";
  cta.style.setProperty("--reveal-delay", "240ms");
  cta.innerHTML = `
    <div class="ts-cta-l" data-i18n="teach.cta.l"></div>
    <a href="#kontakt" class="ts-cta-link"><span data-i18n="teach.cta.link"></span> <span class="arr">→</span></a>
  `;
  wrap.appendChild(cta);
  reapplyI18nWithin(wrap);
  attachReveal(wrap);
}

/* -------------------- hero stats -------------------- */
function renderHeroStats() {
  const wrap = $("#hero-stats");
  if (!wrap) return;
  wrap.innerHTML = "";
  tr().hero.stats.forEach((s) => {
    const el = document.createElement("div");
    el.className = "stat";
    el.innerHTML = `<div class="stat-n">${escape(s.n)}</div><div class="stat-l">${escape(s.l)}</div>`;
    wrap.appendChild(el);
  });
}

/* -------------------- socials -------------------- */
function renderSocials() {
  const ul = $("#socials");
  if (!ul) return;
  ul.innerHTML = "";
  SOCIALS.forEach((s) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="${escape(s.href)}" target="_blank" rel="noreferrer">
        <span class="sk-k">${escape(s.k)}</span>
        <span class="sk-v">${escape(s.v)}</span>
        <span class="sk-arr">↗</span>
      </a>
    `;
    ul.appendChild(li);
  });
}

/* -------------------- top-bar scroll shadow -------------------- */
function topBarScroll() {
  const tb = $(".topbar");
  if (!tb) return;
  const upd = () => tb.classList.toggle("is-scrolled", window.scrollY > 20);
  upd();
  window.addEventListener("scroll", upd, { passive: true });
}

/* -------------------- IntersectionObserver reveal -------------------- */
let io;
function attachReveal(root = document) {
  if (!io) {
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
  }
  root.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
}

/* -------------------- timezone (DST-aware) -------------------- */
function renderTimezone() {
  const el = $("#tz-value");
  if (!el) return;
  // Use Intl to read Bratislava's current short timezone name (e.g. "GMT+2").
  // Slovakia: CEST = UTC+2 (last Sun of March → last Sun of October), CET = UTC+1.
  let offset = 1;
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Bratislava",
      timeZoneName: "short",
    }).formatToParts(new Date());
    const tzPart = parts.find((p) => p.type === "timeZoneName")?.value || "";
    const m = tzPart.match(/([+-]?\d+)/);
    if (m) offset = parseInt(m[1], 10);
  } catch {}
  const abbr = offset === 2 ? "CEST" : "CET";
  el.textContent = `UTC+${offset} · ${abbr}`;
}

/* -------------------- email copy -------------------- */
function wireEmail() {
  const btn = $("#email-btn");
  if (!btn) return;
  const at = $("#email-at");
  const lbl = $("#email-copy");
  if (at) at.textContent = EMAIL;
  btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch {}
    if (lbl) {
      lbl.textContent = tr().contact.copied;
      btn.classList.add("is-copied");
      setTimeout(() => {
        lbl.textContent = tr().contact.copy;
        btn.classList.remove("is-copied");
      }, 1800);
    }
  });
}

/* -------------------- role + lang controls -------------------- */
function wireRoleButtons() {
  $$("[data-role]").forEach((b) => {
    b.addEventListener("click", () => setRole(b.dataset.role));
  });
}
function wireLangButtons() {
  $$("[data-lang-btn]").forEach((b) => {
    b.addEventListener("click", () => applyLocale(b.dataset.langBtn));
  });
}

/* -------------------- i18n re-apply for inserted nodes -------------------- */
function reapplyI18nWithin(root) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = el.dataset.i18n.split(".").reduce((o, k) => (o == null ? o : o[k]), tr());
    if (v != null) el.textContent = v;
  });
  root.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const v = el.dataset.i18nHtml.split(".").reduce((o, k) => (o == null ? o : o[k]), tr());
    if (v != null) el.innerHTML = v;
  });
}

/* -------------------- colophon ASCII hover -------------------- */
function wireColophon() {
  const pre = $("#colo-ascii");
  if (!pre) return;
  // Inner box interior is 13 chars wide between the │ bars; the labels below
  // are pre-padded to exactly 13 chars so the right │ lines up under ┐.
  // Pure ASCII keeps every glyph at the same advance width — no Unicode
  // box-drawing mixed with letters (those can render at slightly different
  // widths and break the right edge). Each label is exactly 13 chars wide.
  const labels = { hover: "  lab > html ", idle: "    makať    " };
  const render = (hover) => {
    pre.classList.toggle("is-hover", hover);
    pre.textContent =
`     +------------------+
     |  $ vibecoded     |
     |  > deploying...  |
     |  > √ shipped     |
     |  > back to work  |
     +--------+---------+
              |
       +------+------+
       |${hover ? labels.hover : labels.idle}|
       +-------------+`;
  };
  render(false);
  pre.addEventListener("mouseenter", () => render(true));
  pre.addEventListener("mouseleave", () => render(false));
}

/* -------------------- footer ASCII (static) -------------------- */
function renderFooterAscii() {
  const pre = $("#foot-ascii");
  if (!pre) return;
  // ASCII chars only — see wireColophon for the rationale.
  pre.textContent =
`  +--------------+
  | while(true){ |
  |   research();|
  |   teach();   |
  |   ship();    |
  | }            |
  +--------------+`;
}

/* -------------------- terminal -------------------- */
let terminal = null;
function initTerminal() {
  const mount = $("#terminal");
  if (!mount) return;
  terminal = createTerminal(mount, () => role);
  terminal.reset();
}

/* -------------------- boot -------------------- */
function boot() {
  // Static (non-i18n) builders first so the markup exists.
  renderDevStack();
  renderSideProjects();
  renderTopics();
  renderTeachCards();
  renderHeroStats();
  renderSocials();
  renderTheses();
  renderGrants();
  renderPubs();
  renderFooterAscii();

  // i18n: initial pass.
  initLocale();
  applyRoleUI();

  // After a locale change, several lists need a fresh render
  // (their content also depends on the active locale).
  window.addEventListener("i18n:change", () => {
    renderHeroStats();
    renderTeachCards();
    applyRoleUI();
    renderGrants();
    renderPubs();
    // reapply across the whole page (already done by applyLocale, but our re-renders
    // produce new nodes that need it too)
    if (terminal) terminal.reset();
  });

  // Controls.
  wireRoleButtons();
  wireLangButtons();

  // Filter buttons (grants) — reset show-all when filter changes.
  $$("[data-filter]").forEach((b) => {
    b.addEventListener("click", () => {
      grantFilter = b.dataset.filter;
      showAllGrants = false;
      renderGrants();
    });
  });

  // Pubs "show more".
  const moreBtn = $("#pubs-more-btn");
  if (moreBtn) moreBtn.addEventListener("click", () => { showAllPubs = !showAllPubs; renderPubs(); });

  // Grants "show more".
  const gMoreBtn = $("#grants-more-btn");
  if (gMoreBtn) gMoreBtn.addEventListener("click", () => { showAllGrants = !showAllGrants; renderGrants(); });

  wireEmail();
  wireColophon();
  topBarScroll();
  renderTimezone();
  initTerminal();
  attachReveal(document);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
