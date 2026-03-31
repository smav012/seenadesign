# seenadesign

Portfolio site for Seena Mavaddat — multidisciplinary designer and artist based in NY.

## Sites

- **Design portfolio**: `seena.design` → `index.html`
- **Art portfolio**: `seena.design/art/` → `art/index.html`
- **Archive**: `archive.html`
- **Links page**: `links.html`
- **Store**: `store.seena.site` (Big Cartel, external)

## Tech stack

Plain HTML/CSS/JS — no build step, no framework.

- Bootstrap 4.4.1 (local copy in `css/` and `js/`)
- jQuery 3.4.1 (local)
- Custom JS: `js/index.js`, `js/modern.js`, `js/enhancements.js`
- Fonts: Avenir Next, Typestar-Normal, Typestar-OCR (local in `fonts/`)
- Google Analytics: G-HY2PLLJWGS

## Design site structure (`index.html`)

Full-page vertical snap-scroll layout. Each project is a `.snap-section.project-section`. Projects are hardcoded in `index.html` — no data file. Images are in `img/`.

## Art site structure (`art/`)

- `art/index.html` — gallery/project list
- `art/projects.js` — `PROJECTS` array, source of truth for all art projects (id, title, year, medium, description, images, layout)
- `art/project_pages/project.html` — single project page, reads `?id=` param and renders from `PROJECTS`
- `art/about.html` — about page
- Images in `art/img/`

## Git / deployment

- GitHub: `https://github.com/smav012/seenadesign`
- Main branch: `main` — deploys to `seena.design` via GitHub Pages
- CNAME: `seena.design`

## Cross-machine notes

- Mac and Windows machines both work on this repo
- `settings.json` contains Mac-specific allowed paths — that's intentional
- Memory is stored locally per machine (not in git)
