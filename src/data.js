// Structured data for the portfolio.
// Strings that should be translated live in src/i18n.js, keyed by id.
// Code-side data (years, ids, urls, accent-mapped types) lives here.

export const ROLE_KEYS = ["dev", "research", "teach"];

export const STACK_GROUPS = [
  { id: "frontend",  items: ["Vue", "Vuetify", "Angular", "TypeScript", "Sass"] },
  { id: "state",     items: ["Pinia", "Vuex", "NgRx", "Redux"] },
  { id: "backend",   items: ["Python", "Laravel", "PHP", "REST API"] },
  { id: "viz",       items: ["Babylon", "Plotly", "Apex"] },
  { id: "tests",     items: ["Cypress", "Nightwatch"] },
  { id: "other",     items: ["Git", "Docker", "Linux"] },
];

export const SIDE_PROJECTS = [
  { id: "dms",         stack: ["Vue 3", "Vuetify 3", "Pinia", "Vite", "Vueflow", "Cypress"], yrs: "2 roky+" },
  { id: "vytazovanie", stack: ["Laravel", "Vue 2", "MS Graph", "PDF", "Queue"],              yrs: "in production" },
  { id: "aiagym",      stack: ["Vue 3", "Pinia", "MSAL/AAD", "Label Studio"],                yrs: "in production" },
  { id: "rpa",         stack: ["Laravel", "Blade", "Bootstrap"],                             yrs: "interný" },
  { id: "itaps",       stack: ["Laravel", "Bootstrap"],                                      yrs: "itaps.sk" },
];

export const TOPICS = [
  { id: "vlabs",  tag: "primary" },
  { id: "ar",     tag: "primary" },
  { id: "viz",    tag: "active" },
  { id: "ai",     tag: "growing" },
];

export const GRANTS = [
  { id: "012STU-4/2026",  type: "KEGA",            role: "garant",   years: "2026 – 2028", status: "running", featured: true },
  { id: "APVV-24-0390",   type: "APVV",            role: "riesitel", years: "2025 – 2029", status: "running" },
  { id: "1/0713/26",      type: "VEGA",            role: "riesitel", years: "2026",        status: "running" },
  { id: "003STU-4/2025",  type: "KEGA",            role: "riesitel", years: "2025 – 2027", status: "running" },
  { id: "1/0821/25",      type: "VEGA",            role: "riesitel", years: "2025 – 2028", status: "running" },
  { id: "POLrMSys",       type: "Mlady vyskumnik", role: "garant",   years: "2021 – 2022", status: "done" },
  { id: "3DVinOE",        type: "Mlady vyskumnik", role: "garant",   years: "2020 – 2021", status: "done" },
  { id: "2018et016",      type: "Iny domaci",      role: "garant",   years: "2019",        status: "done" },
];

// Map grant.type -> css class suffix (matches prototype: --kega, --vega, --apvv, …).
export function grantBadgeClass(type) {
  return type.toLowerCase().replace(/[^a-z]/g, "");
}

export const PUBS = [
  { type: "journal",   year: "2025", authors: ["ŽÁKOVÁ, K.", "URBANO, D.", "CRUZ-CORREIA, R.", "GUZMÁN, J. L.", "MATIŠÁK, J."], venue: "Education and Information Technologies",                     pages: "vol. 30, pp. 649–692", tags: ["AI", "education", "ChatGPT"],     featured: true },
  { type: "conf",      year: "2025", authors: ["MATIŠÁK, J.", "VRBOVSKÝ, A.", "ŽÁKOVÁ, K."],                                  venue: "exp.at '25 (IEEE)",                                          pages: "pp. 232–234",          tags: ["Scilab", "OVL", "simulation"],    featured: true },
  { type: "conf",      year: "2024", authors: ["ŽÁKOVÁ, K.", "MATIŠÁK, J.", "ŠEFČÍK, J."],                                    venue: "PID 2024 (Elsevier)",                                        pages: "pp. 115–119",          tags: ["PID", "interactive", "education"] },
  { type: "conf",      year: "2023", authors: ["MATIŠÁK, J.", "POHANČENIK, M.", "ŽÁKOVÁ, K."],                                venue: "exp.at '23 (IEEE)",                                          pages: "pp. 17–18",            tags: ["AR", "virtual lab", "mechatronics"] },
  { type: "conf",      year: "2022", authors: ["MATIŠÁK, J.", "ŽÁKOVÁ, K.", "RÁBEK, M."],                                    venue: "Cybernetics & Informatics K&I 2022 (IEEE)",                  pages: "—",                    tags: ["holography", "control"] },
  { type: "journal",   year: "2020", authors: ["MATIŠÁK, J.", "RÁBEK, M.", "ŽÁKOVÁ, K."],                                    venue: "Journal of Automation, Mobile Robotics and Intelligent Systems", pages: "vol. 14, pp. 42–47", tags: ["holography", "education", "3D"] },
  { type: "conf",      year: "2020", authors: ["MATIŠÁK, J.", "ŽÁKOVÁ, K."],                                                 venue: "21st IFAC World Congress (Elsevier)",                        pages: "pp. 17536–17541",      tags: ["IFAC", "holography", "towercopter"] },
  { type: "monograph", year: "2020", authors: ["ŤAPÁK, P.", "MATIŠÁK, J."],                                                   venue: "Úžitkový vzor č. 8947, ÚPV SR",                              pages: "Vestník č. 12/2020",   tags: ["hardware", "ÚPV SR"] },
  { type: "conf",      year: "2018", authors: ["MATIŠÁK, J.", "ŽÁKOVÁ, K."],                                                 venue: "ICETA 2018 (IEEE)",                                          pages: "pp. 355–360",          tags: ["web tool", "mechanical models"] },
];

export const THESES_RECENT = [
  { year: "2025", level: "dipl", student: "Roman KOIŠ" },
  { year: "2025", level: "dipl", student: "Matej KOLLÁR" },
  { year: "2025", level: "dipl", student: "Lukáš VIŠVARDA" },
  { year: "2024", level: "dipl", student: "Adrián VRBOVSKÝ" },
  { year: "2024", level: "dipl", student: "Emma VALÁBKOVÁ" },
  { year: "2023", level: "dipl", student: "Samuel KOBERA" },
];

export const SOCIALS = [
  { k: "linkedin",       v: "linkedin.com/in/jakmat",    href: "https://www.linkedin.com/in/jakmat/" },
  { k: "researchgate",   v: "/Jakub-Matisak",            href: "https://www.researchgate.net/profile/Jakub-Matisak" },
  { k: "orcid",          v: "0009-0000-2850-7565",       href: "https://orcid.org/0009-0000-2850-7565" },
  { k: "google scholar", v: "k7edJQkAAAAJ",              href: "https://scholar.google.com/citations?user=k7edJQkAAAAJ&hl=sk" },
  { k: "iolab",          v: "iolab.sk",                  href: "https://iolab.sk" },
];

export const EMAIL = "jakub.matisak@stuba.sk";

// Terminal scripts per role. Each line: { type: "cmd" | "out", text, hold?, cls? }.
export const TERM_SCRIPTS = {
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
    { type: "out", text: "25  total · 2 časopisy · 1 úžitkový vzor · 18 zborníky" },
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
    { type: "out", text: 'phd_thesis:    "Platforma pre virtuálne laboratórium' },
    { type: "out", text: '                mechatronických systémov"' },
    { type: "out", text: "supervised:" },
    { type: "out", text: "  - bachelor:  14" },
    { type: "out", text: "  - master:    9" },
    { type: "out", text: "  - total:     23 obhájených prác" },
    { type: "cmd", text: "echo $OPEN_TO_THESIS_SUPERVISION" },
    { type: "out", text: "true — píš na jakub.matisak@stuba.sk", cls: "ok" },
    { type: "cmd", text: "_", hold: true },
  ],
};

// English variants for the terminal — translated, but the prompts/path stay verbatim
// because they're "fake shell output". Only out-text translates.
export const TERM_SCRIPTS_EN = {
  dev: [
    { type: "cmd", text: "whoami" },
    { type: "out", text: "jakub matišák — frontend dev (+ backend when needed)" },
    { type: "cmd", text: "cat stack.txt" },
    { type: "out", text: "frontend  ▸ vue · vuetify · angular" },
    { type: "out", text: "backend   ▸ python · laravel" },
    { type: "out", text: "+         ▸ whatever the project calls for" },
    { type: "cmd", text: "cat day.txt" },
    { type: "out", text: "  9:00 → 18:00   projects · code" },
    { type: "out", text: "  evenings/wk   teaching · research" },
    { type: "cmd", text: "echo $STATUS" },
    { type: "out", text: "freelance: fully booked · collab welcome", cls: "ok" },
    { type: "cmd", text: "_", hold: true },
  ],
  research: [
    { type: "cmd", text: "grep -i focus ~/research/*.md" },
    { type: "out", text: "virtual laboratories ............ ▮▮▮▮▮▮▮▮▮▮ primary" },
    { type: "out", text: "AR / holography in education .... ▮▮▮▮▮▮▮▮▮▮ primary" },
    { type: "out", text: "3D visualization of mechatronics  ▮▮▮▮▮▮▮▮▮▯ active" },
    { type: "out", text: "AI in higher education .......... ▮▮▮▮▮▮▮▯▯▯ growing" },
    { type: "cmd", text: "wc -l ~/publications/* | tail -1" },
    { type: "out", text: "25  total · 2 journals · 1 utility model · 18 proceedings" },
    { type: "cmd", text: "git log --oneline -3 grants/" },
    { type: "out", text: "012STU-4/2026  KEGA · InnoTech Hub (PI)", cls: "ok" },
    { type: "out", text: "APVV-24-0390   LiDAR motion diagnostics (co-PI)" },
    { type: "out", text: "1/0713/26      VEGA · LabShift (co-PI)" },
    { type: "cmd", text: "_", hold: true },
  ],
  teach: [
    { type: "cmd", text: "cat ~/teaching/profile.yaml" },
    { type: "out", text: "university:    STU Bratislava" },
    { type: "out", text: "faculty:       FEI · Inst. of Automotive Mechatronics" },
    { type: "out", text: "phd_year:      2022" },
    { type: "out", text: 'phd_thesis:    "Platform for virtual laboratory of' },
    { type: "out", text: '                mechatronic systems"' },
    { type: "out", text: "supervised:" },
    { type: "out", text: "  - bachelor:  14" },
    { type: "out", text: "  - master:    9" },
    { type: "out", text: "  - total:     23 defended theses" },
    { type: "cmd", text: "echo $OPEN_TO_THESIS_SUPERVISION" },
    { type: "out", text: "true — write to jakub.matisak@stuba.sk", cls: "ok" },
    { type: "cmd", text: "_", hold: true },
  ],
};
