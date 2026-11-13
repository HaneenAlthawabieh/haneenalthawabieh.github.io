# Haneen T. Al Thawabieh — Architecture portfolio

Live site: https://haneenalthawabieh.github.io/

## How the site is built
- `index.html` + `app.js` are the built site (React + TypeScript, bundled with esbuild).
- `m/<project>/` holds the images: `rNN.jpg` renders, `dNN.jpg` drawing sheets, `bNN.jpg` site photos, `v01.mp4` site videos.
- `_source/` holds the source: `src/data/projects.ts` (all project text), `src/data/about.ts` (CV, contact), `assets.json` (image list per project).

## Making a change
1. Copy `_source/` into a working folder with a `public/` folder containing `assets.json`, edit, then run `node build.mjs`.
2. Copy the new `dist/index.html` and `dist/app.js` (plus any new images under `m/`) to the repo root and push to `main`.
GitHub Pages redeploys automatically in 1–2 minutes.
