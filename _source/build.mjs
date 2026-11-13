// Build: bundles src/main.tsx with esbuild, inlines CSS, writes dist/ (artifact page) and dist-standalone/ (any static host).
import { build } from "/opt/npm-tools/node_modules/esbuild/lib/main.js";
import fs from "node:fs";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname);
const out = path.join(root, "dist");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

await build({
  entryPoints: [path.join(root, "src/main.tsx")],
  bundle: true,
  minify: true,
  format: "iife",
  target: ["es2020"],
  jsx: "automatic",
  outfile: path.join(out, "app.js"),
  nodePaths: ["/opt/npm-tools/node_modules"],
  define: { "process.env.NODE_ENV": '"production"' },
  loader: { ".json": "json" },
  legalComments: "none",
});

const css = fs.readFileSync(path.join(root, "src/styles.css"), "utf8");
const title = "Haneen Al Thawabieh — Architecture";
const desc = "Architectural portfolio of Haneen T. Al Thawabieh, Design Architect in Amman, Jordan: residential, commercial, industrial, hospitality and interior projects with drawings, BIM documentation and construction details.";
const head = `<title>${title}</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="${desc}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:image" content="m/sculpted-volumes-villa/r01.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>${css}</style>`;
const body = `<div id="root"><noscript><div style="padding:24px;font-family:sans-serif">${title}. ${desc} This portfolio needs JavaScript to show its galleries and drawing viewer.</div></noscript></div>
<script src="app.js"></script>`;

// Artifact page: the host adds doctype/html/head/body
fs.writeFileSync(path.join(out, "index.html"), `${head}\n${body}\n`);
// Standalone page for any static host
fs.mkdirSync(path.join(root, "dist-standalone"), { recursive: true });
fs.writeFileSync(
  path.join(root, "dist-standalone", "index.html"),
  `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n${head}\n</head>\n<body>\n${body}\n</body>\n</html>\n`
);
fs.copyFileSync(path.join(out, "app.js"), path.join(root, "dist-standalone", "app.js"));
console.log("built", (fs.statSync(path.join(out, "app.js")).size / 1024).toFixed(0) + "KB app.js");
