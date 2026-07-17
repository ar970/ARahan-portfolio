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

## Contact links

Real links are wired across the footer (every page), `contact.html`, and `resume.html`:

- **Email** — arahansingh2000@gmail.com
- **Phone** — +91 92895 36437
- **LinkedIn** — https://www.linkedin.com/in/arahansingh
- **Instagram** — https://www.instagram.com/arahxan/

The contact form's **Send the brief** button opens the visitor's email app with the
brief pre-filled to that address (`data-email` on the `.brief-form`). To collect
submissions server-side instead, point the form at a service like Formspree/Getform.
No GitHub link is used — add one to the footer socials if you create a profile.

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

## Motion layer

The site ships an expressive-but-classy animation layer, fully additive (works
identically with JS off, honors `prefers-reduced-motion`):

- Opening stamp intro on the home page, every visit, ending in a confetti
  shower (`#nointro` in the URL skips it; click anywhere to skip).
- Hero name letters stamp in; sticky notes idle-bob and drift with scroll
  parallax; hand-drawn pen doodles float around the hero.
- 3D cursor tilt on project cards, magnetic buttons, scroll progress bar,
  cascading work-grid reveals.
- Stats count up in view with a pen-circle pop; timeline cards sway on their
  pins; marker highlights sweep in; skill tags pop in staggered; ticker
  pauses on hover; nav links pop on hover.
- Paper confetti on the 1st-place achievement cards and on contact-form send.
- Sparky the mascot **speaks its lines** via the browser's speech synthesis
  (Web Speech API — no audio files). The 🔊 button on the bubble mutes it and
  the choice persists in localStorage. Browsers block audio until the first
  click/tap on the page, so the greeting is voiced after the first interaction.
- The mascot also waves on arrival and blinks idly.

## Notes

- Fonts (Archivo Black, Lora, Caveat, IBM Plex Mono) load from Google Fonts.
- The contact form is front-end only; wire it to a form service (Formspree, Getform,
  Vercel Forms, etc.) to actually receive submissions.
- Respects `prefers-reduced-motion` and hides interactive extras when appropriate.
