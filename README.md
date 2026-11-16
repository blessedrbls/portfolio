# Oleksii — Web Developer Portfolio

Personal portfolio of Oleksii, a web developer building websites and Telegram bots for business.

**Live:** https://blessedrbls.github.io/portfolio-site/

## Features

- Interactive 3D particle sphere (Three.js, custom GLSL shaders) that reacts to the cursor
- Smooth scrolling with Lenis, scroll-driven animations with GSAP + ScrollTrigger
- Letter-by-letter text reveal, custom cursor, magnetic buttons, film-grain overlay
- Two languages: Ukrainian (default) and English
- Respects `prefers-reduced-motion`: all content is visible without animations
- Mobile-friendly: fewer particles, lower pixel ratio, native scroll on touch devices

## Tech

Plain static site — `index.html`, `style.css`, `main.js`. No build step.
Libraries are loaded from CDNs with pinned versions: Three.js 0.160.0, GSAP 3.12.5, Lenis 1.1.13.

## Run locally

Three.js is loaded as an ES module, so open the site through a local server rather than `file://`:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Status

Work in progress: hero section is done; Services, Work, Process and Contact sections are coming next.
