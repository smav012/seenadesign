# Event planner page — WIP handoff (2026-09-15)

Branch: `wip/events-page`

## State
- `events/event.html` is a copy of `links.html` (same card, blob bg, fonts). Only the `<title>` has changed ("event planning").
- Content (header, collage, nav links, bird section, socials) is still the links-page content and needs to be replaced with event-planner content.

## Gotchas
- Asset paths are still relative to the root (`img/...`, `fonts/...`). The file is in `events/`, so they break. Change them to `../img/...` / `../fonts/...` (or `/img/...`).

## Next steps
- Decide what the "cute" event planner shows (event details, RSVP, schedule, etc.)
- Swap out the card content
- Merge to `main` with a version bump (v.#.#.#.#) when done; delete this file before merging
