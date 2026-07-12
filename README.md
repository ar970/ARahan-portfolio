# Arahan Singh — Portfolio

A personal portfolio for **Arahan Singh** (Marketing · Operations · Venture Builder).
Static site — plain HTML, CSS, and vanilla JavaScript. No build step, no framework,
no backend. Deploys as-is to Vercel (or any static host).

## Pages

| File | Page |
|------|------|
| `index.html` | Home — hero, timeline, "how I ship", selected work, stats |
| `about.html` | About — story, principles, self-audit, skills & tools |
| `work.html` | Work — filterable ventures/projects archive (card + board views) |
| `achievements.html` | Achievements — competitions, certifications, positions, extra-curricular |
| `resume.html` | Resume — one-page, print / save-to-PDF friendly |
| `contact.html` | Contact — brief form + channels |

## Structure

```
.
├── index.html · about.html · work.html · achievements.html · resume.html · contact.html
├── assets/
│   ├── css/styles.css     # design system (paper / sticky-note aesthetic)
│   ├── js/app.js          # cursor, sticky drag, reveals, filters, form, mascot
│   └── img/
│       ├── logo.svg       # "A" brand monogram
│       └── avatar.svg     # illustrated avatar (used in cursor + about portrait)
└── README.md
```

## Run locally

Any static server works, e.g.:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## ⚠️ Placeholders to fill in

Links were intentionally left as clearly-marked placeholders. Search for `href="#"`
and the `TODO` comments, then drop in the real values:

- **Footer** (all pages, in `assets` chrome / each `*.html`): LinkedIn, GitHub, Instagram.
- **`contact.html`**: email, LinkedIn, GitHub, Instagram (in `.contact-details`).
- **`resume.html`**: email, phone, LinkedIn, GitHub (in `.resume-contact`).

## Swapping the brand images

- Replace `assets/img/logo.svg` with your real "A" logo (SVG or PNG — if PNG, update
  the `<img src>` and favicon `href`).
- Replace `assets/img/avatar.svg` with your 3D avatar photo to use it for the custom
  cursor and the About-page portrait.

## Deploy to Vercel

1. Push this repo to GitHub (already the case).
2. In Vercel: **New Project → Import** this repo.
3. Framework preset: **Other** · Build command: *(none)* · Output directory: `./`
4. Deploy. Vercel serves the static files directly.

## Notes

- Fonts (Archivo Black, Lora, Caveat, IBM Plex Mono) load from Google Fonts.
- The contact form is front-end only; wire it to a form service (Formspree, Getform,
  Vercel Forms, etc.) to actually receive submissions.
- Respects `prefers-reduced-motion` and hides interactive extras when appropriate.
