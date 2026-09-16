# events page — state (2026-09-16)

Live: https://www.seena.design/events/  →  submitted.html on success

## Files
- `index.html` — form + validation + Zapier POST. Page-specific CSS inline.
- `submitted.html` — hamster animation → payoff images → peanut link.
- `style.css` — shared shell (fonts, blobs, card). Both pages link it.
  Shell edits go HERE, not inline, or the two pages drift.

## Zapier
- Catch Hook: `https://hooks.zapier.com/hooks/catch/26799192/4drdy7u/`
  (in `index.html`, const `HOOK_URL`)
- Posts form-encoded (avoids a CORS preflight). Fields:
  name, email, tues_oct_6 … wed_oct_28 (one per date, "yes"/""),
  would_pay, would_host, movie, movie_title, dates, submitted_at
- Date column keys are derived from checkbox values at submit time, so
  adding a date row needs no code change — but the sheet header must match
  exactly (lowercase, underscores).
- Sheet: "movie day 1 — responses", tab `movie day 1`, in the
  **alphagraphics.com** Drive (not personal).

## Open items
- [ ] SHEET: appends land around row 1013 because the CSV-imported sheet has
      ~1000 empty rows under the header. Delete the empty rows between the
      header and the first data row. CHECK FOR REAL DATA DOWN THERE FIRST.
- [ ] iOS Safari hamster on submitted.html (v.1.4.2) — fix is unverified.
- [ ] `socialimage_movienight.png` is 1.3MB. A JPEG would be ~150KB and
      previews would load faster on cellular.
- [ ] No spam protection. Honeypot field + a Zapier Filter step before
      linking this anywhere public.
- [ ] `submitted.html` has no og: tags (only matters if that URL gets shared).

## Gotchas
- Don't leave these files open-with-unsaved-changes in an editor while Claude
  edits them — saving a stale buffer has silently reverted work twice
  (the validation JS, and `mix-blend-mode` coming back on the hamster).
- The hamster PNGs have real alpha. Do NOT apply `mix-blend-mode: multiply`
  — it eats the white body.
- iMessage caches link previews per-URL. If a preview looks stale, send the
  link with a cache-buster (`/events/?v=2`).
