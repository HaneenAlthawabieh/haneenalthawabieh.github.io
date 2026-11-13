import React, { useEffect, useState } from "react";
import { projects, bySlug, SELECTED, Project } from "../data/projects";
import { person, designToDetail } from "../data/about";
import { href } from "../lib/router";
import { img, sheet, sheets, sheetRef } from "../lib/media";
import { Pic, useViewer, sheetItems, imageItems } from "../components/common";
import { BuiltCard } from "../components/OnSite";
import { CVButtons } from "../components/cv";

export function Home({ anchor }: { anchor?: string }) {
  useEffect(() => {
    if (anchor) requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({ block: "start" }));
    else scrollTo(0, 0);
  }, [anchor]);
  return (
    <>
      <Hero />
      <Facts />
      <Featured />
      <Built />
      <Process />
      <Detail />
      <WorkIndex />
      <ContactBand />
    </>
  );
}

const coverOf = (p: Project) => p.cover ?? 1;
export const shortTitle = (p: Project) => p.title.replace(" — Revit Drawing Set", "").replace(" — Execution Package", "").replace(" — Shop Drawings", "");

/* ───────── Hero: the building on one side, the name on the other — a slow slideshow of key projects ───────── */
type Slide = { src: string; slug?: string; label: string; pos: string; mpos: string };
const SLIDES: Slide[] = [
  { src: "hero-1.jpg", slug: "stone-screen-residence", label: "Screen House · Amman", pos: "44% 50%", mpos: "62% 50%" },
  { src: "hero-2.jpg", slug: "minimalist-chalet", label: "Minimal Chalet · Amman", pos: "71% 50%", mpos: "40% 50%" },
];

function Hero() {
  const [k, setK] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (d: number) => setK((v) => (v + d + SLIDES.length) % SLIDES.length);
  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(1), 7000);
    return () => clearTimeout(t);
  }, [k, paused]);
  const s = SLIDES[k];
  return (
    <section className="hx" aria-label="Introduction" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hx__bgwrap" aria-hidden="true">
        {SLIDES.map((x, j) => (
          <img key={x.src} className={`hx__bg ${j === k ? "is-on" : ""}`} src={x.src} alt="" loading={j === 0 ? "eager" : "lazy"}
            style={{ ["--pos" as any]: x.pos, ["--mpos" as any]: x.mpos }} />
        ))}
      </div>
      <div className="hx__veil" />
      <div className="hx__in wrap">
        <div className="hx__text">
          <p className="hx__eyebrow mono">Design Architect · Amman, Jordan</p>
          <h1 className="hx__name">Haneen T.<br /><em>Al Thawabieh</em></h1>
          <p className="hx__tag">From the first idea to the architectural detail.</p>
          <p className="hx__sub">Villas, commercial buildings, industrial projects and interiors — from concept and façade design to execution and permit drawings.</p>
          <div className="hx__cta">
            <a className="btn btn--bronze" href="#featured">Explore the work <span aria-hidden="true">→</span></a>
            <a className="btn btn--ghost-light" href={href.about}>Meet the architect</a>
          </div>
          <div className="hx__ctrl">
            <span className="mono hx__count">{String(k + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}</span>
            <div className="hx__bars">
              {SLIDES.map((x, j) => <button key={j} className={j === k ? "is-on" : ""} onClick={() => setK(j)} aria-label={`Show ${x.label}`} />)}
            </div>
            {s.slug
              ? <a className="mono hx__label" href={href.project(s.slug)}>{s.label} <span aria-hidden="true">→</span></a>
              : <span className="mono hx__label">{s.label}</span>}
            <span className="hx__arrows">
              <button className="round" onClick={() => go(-1)} aria-label="Previous image">←</button>
              <button className="round round--solid" onClick={() => go(1)} aria-label="Next image">→</button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Honest facts, from the CV */
function Facts() {
  return (
    <div className="wrap facts-wrap">
      <dl className="factbar">
        <div><dt>5 years</dt><dd>Design practice in Amman</dd></div>
        <div><dt>Master Engineers</dt><dd>Design Architect, since 2024</dd></div>
        <div><dt>Execution & permits</dt><dd>GAM · JEA · Civil Defense</dd></div>
        <div><dt>Revit BIM</dt><dd>A complete BIM project delivered</dd></div>
      </dl>
    </div>
  );
}

/* ───────── Featured: a mosaic — everything visible at once ───────── */
function Featured() {
  const list = SELECTED.map((s) => bySlug[s]);
  return (
    <section className="featured wrap" id="featured" aria-labelledby="ft-h">
      <div className="featured__head">
        <div>
          <p className="eyebrow eyebrow--bronze">Selected work</p>
          <h2 id="ft-h" className="display-l">Designed with <em>care</em>,<br />drawn with precision.</h2>
        </div>
        <a className="btn btn--ghost" href="#index">All {projects.length} projects <span aria-hidden="true">→</span></a>
      </div>
      <ul className="mosaic">
        {list.map((p, k) => (
          <li key={p.slug} className={`tile ${k === 0 ? "tile--big" : ""}`}>
            <a href={href.project(p.slug)}>
              <Pic slug={p.slug} i={coverOf(p)} alt={`${p.title} — cover view`} />
              <span className="tile__veil" />
              <span className="tile__text">
                <span className="tile__flags">
                  {p.role && <span>{p.role}</span>}
                  {p.focus.includes("BIM / Revit") && <span>Revit / BIM</span>}
                  {p.credit?.startsWith("Team") && <span>Team project</span>}
                </span>
                <span className="tile__title">{shortTitle(p)}</span>
                <span className="tile__kicker">{p.types[0]}{p.location ? ` · ${p.location.split(",")[0]}` : ""}</span>
              </span>
              <span className="tile__arrow" aria-hidden="true">→</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ───────── Designed and built ───────── */
function Built() {
  const list = projects.filter((p) => p.built).sort((a, b) => (a.built!.status === "Built" ? -1 : 1));
  return (
    <section className="built wrap" id="built" aria-labelledby="bu-h">
      <div className="featured__head">
        <div>
          <p className="eyebrow eyebrow--bronze">From design to site</p>
          <h2 id="bu-h" className="display-l">Designed, then <em>built</em>.</h2>
        </div>
        <p className="built__lede">Renderings next to the buildings on site.</p>
      </div>
      <div className="built__grid">
        {list.map((p) => <BuiltCard key={p.slug} p={p} href={href.project(p.slug)} />)}
      </div>
    </section>
  );
}

/* ───────── How I work: the stages of her practice, from the CV ───────── */
const STAGES = [
  { t: "Concept & planning", d: "Site, programme and space planning — the organisation of the building.", slug: "courtyard-pool-residence" },
  { t: "Façade & form", d: "Massing, proportion, materials and the composition of the elevations.", slug: "stone-screen-residence" },
  { t: "Interiors & landscape", d: "Spatial atmosphere, joinery, lighting, gardens and outdoor rooms.", slug: "family-residence-interior" },
  { t: "Execution & permits", d: "Execution drawings, schedules and permit sets for GAM, JEA and Civil Defense.", slug: "neoclassical-residence-extension" },
  { t: "On site", d: "Follow-up with site teams to keep construction true to the approved design.", slug: "arched-loggia-villa" },
];

function Process() {
  return (
    <section className="band band--dark process" id="process" aria-labelledby="pr-h">
      <div className="wrap process__in">
        <div className="process__head">
          <p className="eyebrow eyebrow--bronze">How I work</p>
          <h2 id="pr-h" className="display-l">From vision<br />to <em>reality</em>.</h2>
        </div>
        <ol className="steps">
          {STAGES.map((s, k) => (
            <li key={s.t}>
              <span className="steps__n mono">{String(k + 1).padStart(2, "0")}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <a href={href.project(s.slug)} className="steps__link">e.g. {shortTitle(bySlug[s.slug])} →</a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────── From image to drawing (selected projects with full drawing sets) ───────── */
const STEP_COPY = ["The design", "The plan", "The detail"];

function Detail() {
  const open = useViewer();
  const [k, setK] = useState(0);
  const d = designToDetail[k];
  const dp = bySlug[d.slug];
  const bim = bySlug["hillside-bim-residence"];
  return (
    <section className="detail wrap" id="bim" aria-labelledby="dt-h">
      <div className="detail__head">
        <div>
          <p className="eyebrow eyebrow--bronze">Drawings</p>
          <h2 id="dt-h" className="display-l">From image <em>to detail</em></h2>
          <p className="detail__lede">On projects taken to execution, the same building can be followed from the rendering to the plan and to the detail that builds it.</p>
        </div>
        <div className="seg" role="tablist" aria-label="Choose a project">
          {designToDetail.map((x, j) => (
            <button key={x.slug} role="tab" aria-selected={j === k} className={j === k ? "is-on" : ""} onClick={() => setK(j)}>
              {shortTitle(bySlug[x.slug])}
            </button>
          ))}
        </div>
      </div>
      <ol className="dtd__steps" role="tabpanel">
        {d.steps.map((st, j) => (
          <li key={st.scale + d.slug} className="dtd__step">
            {st.kind === "image" ? (
              <button className="dtd__frame" onClick={() => open(imageItems(dp, [st.i]), 0, dp.title, "images")} aria-label={`Enlarge: ${st.note}`}>
                <Pic slug={dp.slug} i={st.i} alt={`${dp.title} — ${st.note}`} cropTo="4 / 3" />
              </button>
            ) : (
              <button className="dtd__frame dtd__frame--sheet" onClick={() => open(sheetItems(dp), st.i - 1, dp.title, "drawings")} aria-label={`Open drawing: ${st.note}`}>
                <img src={sheet(dp.slug, st.i)?.src} alt={`${dp.title} — ${st.note}`} loading="lazy" />
              </button>
            )}
            <p className="dtd__scale"><span className="mono">{String(j + 1).padStart(2, "0")}</span> {STEP_COPY[j]}</p>
            <p className="dtd__note">{st.kind === "sheet" && <span className="mono">{sheetRef(st.i)} </span>}{st.note}</p>
          </li>
        ))}
      </ol>
      <div className="detail__bim">
        <p><span className="flag flag--bim">Revit / BIM</span> {shortTitle(bim)}: a complete 34-sheet Revit set, from topography to construction details.</p>
        <div className="detail__bim-cta">
          <button className="btn" onClick={() => open(sheetItems(bim), 0, bim.title, "drawings")}>Open the drawing set</button>
          <a className="btn btn--ghost" href={href.project(bim.slug)}>Case study</a>
        </div>
      </div>
    </section>
  );
}

/* ───────── All projects, grouped ───────── */
const GROUPS: { name: string; id: string; test: (p: Project) => boolean }[] = [
  { name: "Residential", id: "residential", test: (p) => p.tier !== "large" && p.types[0] === "Residential" },
  { name: "Commercial & industrial", id: "commercial", test: (p) => p.tier !== "large" && (p.types[0] === "Commercial & Mixed-Use" || p.types[0] === "Industrial") },
  { name: "Interiors", id: "interiors", test: (p) => p.tier !== "large" && (p.types[0] === "Interiors" || p.types[0] === "Hospitality") },
  { name: "Large-scale & team work", id: "large", test: (p) => p.tier === "large" },
];

export function WorkIndex() {
  const rank = { featured: 0, large: 0, case: 1, additional: 2 };
  return (
    <section className="index wrap" id="index" aria-labelledby="idx-h">
      <div className="section-head">
        <p className="eyebrow">All projects</p>
        <h2 id="idx-h" className="display-l">Index</h2>
      </div>
      <nav className="index__jump" aria-label="Project groups">
        {GROUPS.map((g) => <a key={g.id} href={`#g-${g.id}`}>{g.name} <span className="mono">{projects.filter(g.test).length}</span></a>)}
      </nav>
      {GROUPS.map((g) => {
        const list = projects.filter(g.test).sort((a, b) => rank[a.tier] - rank[b.tier]);
        return (
          <div key={g.id} className="group" id={`g-${g.id}`}>
            <h3 className="group__h">{g.name} <span className="mono">{list.length}</span></h3>
            <ul className="grid">
              {list.map((p) => (
                <li key={p.slug} className="card">
                  <a href={href.project(p.slug)}>
                    <span className="card__media"><Pic slug={p.slug} i={coverOf(p)} alt={`${p.title} — cover view`} cropTo="3 / 2" /></span>
                    <span className="card__title">{shortTitle(p)}</span>
                    <span className="card__kicker">
                      {[p.role ?? null, p.credit?.startsWith("Team") ? "Team project" : null, p.focus.includes("BIM / Revit") ? "Revit / BIM" : sheets(p.slug).length > 3 ? "Drawings" : null, p.stage === "Built" ? "Built" : null].filter(Boolean).join(" · ") || p.types[0]}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}

function ContactBand() {
  return (
    <section className="band band--dark contact-band" id="contact">
      <div className="wrap contact">
        <div>
          <p className="eyebrow eyebrow--bronze">Contact</p>
          <h2 className="display-l">Let's work <em>together</em>.</h2>
          <p className="contact__lede">Available for design architect roles.</p>
        </div>
        <div className="contact__side">
          <dl className="contact__dl">
            <div><dt>Email</dt><dd><a href={`mailto:${person.email}`}>{person.email}</a></dd></div>
            <div><dt>Phone</dt><dd className="tnum"><a href={`tel:${person.phone.replace(/\s/g, "")}`}>{person.phone}</a></dd></div>
            <div><dt>Based in</dt><dd>{person.base}</dd></div>
          </dl>
          <div className="contact__links">
            <CVButtons light />
            <a className="btn btn--bronze" href={person.whatsapp} target="_blank" rel="noopener">WhatsApp</a>
            <a className="btn btn--ghost-light" href={person.linkedin} target="_blank" rel="noopener">LinkedIn</a>
            <a className="btn btn--ghost-light" href={person.behance} target="_blank" rel="noopener">Behance</a>
          </div>
        </div>
      </div>
    </section>
  );
}
