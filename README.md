# about-me

Personal portfolio for **Ing. Jakub Matišák, PhD.** — IOLab @ FEI STU Bratislava.

Static site, no build step. Open `index.html` in a browser, or serve the folder:

```sh
python -m http.server 8080
# then visit http://localhost:8080
```

## Layout

```
index.html               markup, Tailwind config, font preload
assets/styles.css        design tokens + components
assets/favicon.svg
src/main.js              bootstrap (entry point, ES module)
src/i18n.js              SK + EN message bundles + applyLocale()
src/data.js              structured data (grants, pubs, theses, stack, term scripts)
src/terminal.js          role-driven typewriter
.github/workflows/       GitHub Pages deploy on push to main
_design/                 original Claude Design handoff (read-only reference)
```

## Editing the content

- **Copy / translations** → `src/i18n.js`. Each section has its own subtree (`about.lead`, `dev.projects.ovl.desc`, …). SK and EN bundles mirror each other.
- **Grants, publications, theses, projects, stack** → `src/data.js`. The fields that don't translate (years, IDs, authors, venues) live here; the translatable strings (names, titles) are looked up from `i18n.js` by ID.
- **Accent color** → change `--accent` in `assets/styles.css` (`:root` block). Default is `#7aa2f7` (blue). Other v3-era choices: `#ff7a45` (orange), `#bb9af7` (purple), `#9ece6a` (green), `#e0af68` (amber).
- **Theme mode** → toggle `data-mode` on `<html>` (`dark` is the default; the prototype also defined `dim` and `light` — token blocks are present in the CSS if you want to re-enable them).
- **Roles** → there are three: `dev`, `research`, `teach`. Headline/sub copy lives in `i18n.roles.<key>`, terminal script in `data.js` (`TERM_SCRIPTS` for SK, `TERM_SCRIPTS_EN` for EN).

## Languages

Slovak loads by default. The SK/EN toggle in the top bar persists to `localStorage.lang`. All translatable strings are reached via `data-i18n` / `data-i18n-html` attributes — see `i18n.applyLocale()` for the walk.

## Deploying

- Push to `main` → `.github/workflows/pages.yml` uploads the repo root as the Pages artifact.
- In the repo settings, set **Pages → Source = GitHub Actions**.
- An empty `.nojekyll` is included so Jekyll doesn't strip underscored paths.

## Credit

Design medium: HTML/CSS/JS mockup made with [Claude Design](https://claude.ai/design); the source bundle is preserved verbatim under `_design/` for reference.
