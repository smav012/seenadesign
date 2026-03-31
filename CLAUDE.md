# seenadesign

Portfolio site for Seena Mavaddat — multidisciplinary designer and artist based in NY.

## Sites

- **Design portfolio**: `seena.design` → `index.html`
- **Art portfolio**: `seena.site` → `art/index.html`
- **Archive**: `archive.html`
- **Links page**: `links.html`
- **Store**: `store.seena.site` (Big Cartel, external)

## Tech stack

Plain HTML/CSS/JS — no build step, no framework.

- Bootstrap 4.4.1 (local copy in `css/` and `js/`) — largely unused, kept for compatibility
- jQuery 3.4.1 (local) — largely unused
- Custom CSS: `css/main.css` (all styles), `css/responsive.css` (breakpoints, focus states)
- Custom JS: all inline in each page's `<script>` tag (`js/index.js`, `js/modern.js`, `js/enhancements.js` exist but are legacy/unused)
- Fonts: Avenir Next, Typestar-Normal, Typestar-OCR (local in `fonts/`)
- Google Analytics: G-HY2PLLJWGS

## Design site design system (`index.html` + `css/main.css`)

- **Background**: black
- **Accent color**: `var(--yellow)` = `#FFF800` — used for hover states on all links
- **Link hover**: `color: var(--yellow); text-decoration: underline`
- **`.arr` class**: wraps `↗` arrows sitewide — `font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 1.35em; display: inline-block; vertical-align: -0.08em`. Arrow goes BEFORE link text: `<span class="arr">↗</span> Link Text`
- **Logo drop shadow** (sticker effect on dark bg): `drop-shadow(0 0 2px rgba(255,255,255,0.12)) drop-shadow(0 3px 8px rgba(40,40,40,0.7))` — applied to both `.logo-image` (intro) and `.header-logo` (sticky nav)
- **Current page indicator**: `.header-link.current-page { color: var(--yellow); }` — add class to the active nav link on each page
- **Focus styles**: `:focus-visible` only (not `:focus`) in `responsive.css` — prevents yellow outline on mouse clicks. Image links also have explicit `outline: none !important` in `main.css`

## Design site structure (`index.html`)

Full-page vertical snap-scroll layout. Each project is a `.snap-section.project-section`. Projects are hardcoded in `index.html` — no data file. Images in `img/`.

**Snap scroll JS (inline in `index.html`):**

- `scrollToSection(index)` — unified nav function, updates `currentSectionIndex` state
- `currentSectionIndex` — tracked as state. Do NOT use `window.scrollY` to infer current section; unreliable on mobile after programmatic scrolling
- `isSectionScrolling` — lock to prevent double-firing; cleared via scroll-end detection (`window.addEventListener('scroll')` with 80ms debounce), not a fixed timeout
- Mobile: `touchmove` listener with `{ passive: false }` + `e.preventDefault()` on non-carousel elements blocks native scroll; section snap fires on `touchend`
- Keyboard: `up/down` = sections, `left/right` = carousel scroll (looks up carousel from `currentSectionIndex`, no hover tracking needed), `Esc` = close lightbox
- **Lightbox**: scoped to clicked carousel via `collectImagesFromContainer()`. Clicking a carousel image opens lightbox instead of navigating to image URL
- UI state: scroll indicator hidden + key hint shown when on any project section; both restored when returning to intro via `scrollToSection(0)`

**Carousel:**

- `.carousel-container` wraps `.carousel` (flex row of `.carousel-image-link` items)
- `scrollCarousel(container, direction)` scrolls by one image width + 20px gap

## Archive page (`archive.html`)

Two snap sections: intro (same layout as `index.html`) + archive grid.

- **Grid**: 3x2 desktop (`grid-template-columns: repeat(3,1fr); grid-template-rows: repeat(2,1fr)`), 2x3 mobile. Fits within `100vh` — no overflow scroll on the section
- **Cards**: `.archive-card[data-project="id"]` — click opens slide-up panel
- **Slide-up panel**: fixed, 90vh, `transform: translateY(100%)` to `translateY(0)`. Has its own carousel + lightbox. `touchmove` prevention skips when panel is active so panel body/carousel can scroll natively
- **Project data**: `PROJECTS` object inline in `archive.html` (not a separate file)
- **"Archive" link** has `.current-page` class — yellow, indicating active page
- Snap scroll uses same implementation as `index.html`

## Art site design system (`art/`)

- **Color palette**: deep indigo/purple background (`#1a1030`), cream text (`rgba(240,236,224,...)`)
- **Fonts**: TypestarOCR (local, monospace/OCR aesthetic) for labels, nav, links; system font stack for body
- **Blob background**: animated blobs (`drift-1` through `drift-4` keyframes) fixed behind content at `z-index: 0`; content at `z-index: 1`
- **`.arr` class**: same spec as design site — must use `<span class="arr">↗</span>` in all HTML and in `projects.js` descriptions
- **Mobile breakpoint**: `700px` (`max-width: 700px`)
- **Panel/popup**: slide-in right panel for project previews on `art/index.html`

## Art site structure (`art/`)

- `art/index.html` — gallery/project list
- `art/projects.js` — `PROJECTS` array, source of truth for all art projects (id, title, year, medium, description, images, layout)
- `art/project_pages/project.html` — single project page, reads `?id=` param and renders from `PROJECTS`
- `art/about.html` — about page
- Images in `art/img/`

## Store (`store/` — BigCartel export)

- Theme: custom BigCartel theme (top-header layout)
- Colors/fonts set via `store/settings.json` (Liquid `{{ theme.xxx }}` vars → CSS custom properties in `store/theme.css`)
- Custom overrides appended at bottom of `store/theme.css` after the BigCartel copyright comment block
- **Font**: Share Tech Mono (Google Fonts, loaded via `<link>` in `store/layout.html` `<head>`) — replaces TypestarOCR which can't be self-hosted on BigCartel
- **Blob background**: same aesthetic as art site, uses `art-drift-*` keyframe names to avoid collision
- Uploading: manual via BigCartel Admin → Design → Edit Code (no git deploy)

## Known issues / in-progress

- Mobile logo right-alignment on `art/about.html` and `art/project_pages/project.html` — `.proj-logo-header` small logo should float right on mobile; root cause unclear

## Git / deployment

- GitHub: `https://github.com/smav012/seenadesign`
- Main branch: `main`
- Domain registered on **Hover** — deployment method TBD (GitHub Pages requires public repo)
- CNAME file present for `seena.design`
- follow version naming (v.#.#.#.#)

## Cross-machine notes

- Mac and Windows machines both work on this repo
- `settings.json` contains Mac-specific allowed paths — that's intentional
- Memory is stored locally per machine (not in git)
