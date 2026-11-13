import React, { useState } from "react";
import { Project } from "../data/projects";
import { img } from "../lib/media";
import { useViewer } from "./common";
import { ViewerItem } from "./Viewer";

/* Design vs. site: rendering and photograph side by side (not overlaid — the viewpoints differ). */
export function Pair({ p, k = 0 }: { p: Project; k?: number }) {
  const open = useViewer();
  const pr = p.built!.pairs[k];
  const r = img(p.slug, pr.render)!;
  const items: ViewerItem[] = [
    { src: r.src, title: `Design — ${pr.label}`, w: r.w, h: r.h },
    { src: pr.photo, title: `On site — ${pr.label}`, w: 1080, h: 1920 },
  ];
  return (
    <div className="pair">
      <button className="pair__cell" onClick={() => open(items, 0, p.title, "images")} aria-label={`Enlarge design: ${pr.label}`}>
        <img src={r.src} alt={`${p.title} — design rendering, ${pr.label}`} loading="lazy" />
        <span className="pair__tag mono">Design</span>
      </button>
      <button className="pair__cell" onClick={() => open(items, 1, p.title, "images")} aria-label={`Enlarge site photo: ${pr.label}`}>
        <img src={pr.photo} alt={`${p.title} — on site, ${pr.label}`} loading="lazy" />
        <span className="pair__tag pair__tag--site mono">{p.built!.status === "Built" ? "Built" : "On site"}</span>
      </button>
    </div>
  );
}

export function SiteVideo({ p }: { p: Project }) {
  const v = p.built?.video;
  if (!v) return null;
  return (
    <figure className="sitevid">
      <video src={v.src} poster={v.poster} controls muted playsInline preload="none" />
      <figcaption className="mono">Site video · {p.built!.status}</figcaption>
    </figure>
  );
}

/* Full section on a project page */
export function OnSite({ p }: { p: Project }) {
  const b = p.built;
  const open = useViewer();
  if (!b) return null;
  const extra = b.photos ?? [];
  return (
    <section className="onsite" aria-labelledby="os-h">
      <div className="onsite__head">
        <p className="eyebrow eyebrow--bronze">From design to site</p>
        <h2 id="os-h" className="display-m">{b.status === "Built" ? "Built as designed" : "Under construction"}</h2>
        <p>{b.note}</p>
      </div>
      <div className="onsite__body">
        <div className="onsite__pairs">
          {b.pairs.map((pr, k) => (
            <div key={pr.photo}>
              <Pair p={p} k={k} />
              <p className="onsite__label">{pr.label}</p>
            </div>
          ))}
          {extra.length > 0 && (
            <div className="onsite__extra">
              {extra.map((src) => (
                <button key={src} className="pair__cell" onClick={() => open([{ src, title: "On site", w: 1080, h: 1920 }], 0, p.title, "images")} aria-label="Enlarge site photo">
                  <img src={src} alt={`${p.title} — on site`} loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
        <SiteVideo p={p} />
      </div>
    </section>
  );
}

/* Compact card for the home page */
export function BuiltCard({ p, href }: { p: Project; href: string }) {
  const [play, setPlay] = useState(false);
  const b = p.built!;
  return (
    <article className="bcard">
      {play && b.video ? (
        <div className="bcard__video"><video src={b.video.src} poster={b.video.poster} controls autoPlay muted playsInline /></div>
      ) : (
        <Pair p={p} />
      )}
      <div className="bcard__text">
        <p className="mono bcard__status"><span className={b.status === "Built" ? "dot dot--done" : "dot"} />{b.status}{p.role ? ` · ${p.role}` : ""}</p>
        <h3 className="bcard__title"><a href={href}>{p.title}</a></h3>
        <p className="bcard__note">{b.note}</p>
        <div className="bcard__cta">
          {b.video && <button className="btn btn--ghost" onClick={() => setPlay((v) => !v)}>{play ? "Show design vs. site" : "▶ Watch site video"}</button>}
          <a className="link" href={href}>Project →</a>
        </div>
      </div>
    </article>
  );
}
