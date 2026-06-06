# English with Pedro — Link Hub

A calm, scalable link-tree / home page for Pedro Brito: online English lessons,
teaching tools, and translation software. Built as a zero-build static site and
styled with the **Britx "Living Cosmos"** design system (warm accents) with a
light/dark theme that follows the visitor's system preference.

## Stack

Plain HTML + CSS + JS. No build step, no dependencies to install — open
`index.html` or deploy the folder anywhere static (GitHub Pages, Netlify, etc.).
Fonts (Inter, IBM Plex Mono) and Bootstrap Icons load from CDNs.

## File structure

| File         | Purpose                                                                 |
| ------------ | ----------------------------------------------------------------------- |
| `index.html` | Semantic skeleton, meta/OG tags, and the no-flash theme bootstrap.      |
| `data.js`    | **Single source of truth** — profile, primary CTA, and link sections.  |
| `script.js`  | Renders `data.js`, plus theme/language toggles and ambient motion.      |
| `style.css`  | Design tokens (dark + light) and all components.                        |
| `logo.png`   | Logo / favicon / avatar / watermark.                                    |

## Add or change a link

Edit **`data.js`** only — nothing else.

```js
{
  id: "newsletter",                 // unique id
  icon: "bi-send",                  // any Bootstrap Icons class
  label: { pt: "Newsletter", en: "Newsletter" },
  note:  { pt: "Inscreva-se", en: "Subscribe" }, // optional subtitle
  href:  "https://example.com",
}
```

- **Add a link:** drop the object into the relevant section's `links` array.
- **Add a section:** add a new `{ id, label, links }` object to `SECTIONS`.
- **Reorder:** move objects around — render order follows array order.
- **Email-style copy button:** add `copy: "you@example.com"` to a `mailto:` link.

All text is bilingual via `{ pt, en }`. The active language persists in
`localStorage` and defaults to the visitor's browser language (PT fallback).

## Themes

- Loads in the visitor's system theme (`prefers-color-scheme`); the header toggle
  overrides it and the choice persists in `localStorage`.
- Tokens live in `:root`/`[data-theme="dark"]` and `[data-theme="light"]` in
  `style.css`. The design system specifies dark tokens; the light palette is a
  warm extension built from the same hues.

## Accessibility

Semantic landmarks, keyboard-operable toggles, `--rain` focus rings, and a
`prefers-reduced-motion` fallback that quiets all animation.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (GitHub Pages)

Push to the default branch and enable Pages → "Deploy from branch" → root.
