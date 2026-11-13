import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { bySlug, SELECTED, HERO, Project } from "../data/projects";
import { person, experience, education, software, expertise } from "../data/about";
import { img, sheet, sheets, sheetRef } from "../lib/media";

type Slide =
  | { kind: "title" }
  | { kind: "profile" }
  | { kind: "range" }
  | { kind: "cover"; p: Project; n: number }
  | { kind: "evidence"; p: Project; n: number }
  | { kind: "end" };

export function Present() {
  const slides = useMemo<Slide[]>(() => {
    const s: Slide[] = [{ kind: "title" }, { kind: "profile" }, { kind: "range" }];
    [...SELECTED, "waterfront-promenade-aqaba"].forEach((slug, k) => {
      const p = bySlug[slug];
      s.push({ kind: "cover", p, n: k + 1 });
      if (p.deck && (p.deck.sheets.length || p.deck.images.length > 1)) s.push({ kind: "evidence", p, n: k + 1 });
    });
    s.push({ kind: "end" });
    return s;
  }, []);
  const [i, setI] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const touch = useRef<number | null>(null);
  const go = useCallback((d: number) => setI((v) => Math.max(0, Math.min(slides.length - 1, v + d))), [slides.length]);
  const exit = useCallback(() => { if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); location.hash = "selected"; }, []);
  const fs = async () => { try { document.fullscreenElement ? await document.exitFullscreen() : await root.current?.requestFullscreen(); } catch { /* unavailable */ } };

  useEffect(() => {
    root.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(1); }
      else if (["ArrowLeft", "PageUp"].includes(e.key)) { e.preventDefault(); go(-1); }
      else if (e.key === "Home") setI(0);
      else if (e.key === "End") setI(slides.length - 1);
      else if (e.key === "Escape" && !document.fullscreenElement) exit();
      else if (e.key.toLowerCase() === "f") fs();
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [go, exit, slides.length]);

  // preload next slide's images
  useEffect(() => {
    const n = slides[i + 1];
    if (n && "p" in n && n.p.deck) n.p.deck.images.forEach((x) => { const s = img(n.p.slug, x); if (s) new Image().src = s.src; });
  }, [i, slides]);

  const s = slides[i];
  return (
    <div
      className="deck"
      ref={root}
      tabIndex={-1}
      role="region"
      aria-roledescription="presentation"
      aria-label="Portfolio presentation"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <div className="deck__slide" key={i} aria-live="polite">
        <SlideView s={s} />
      </div>
      <div className="deck__bar">
        <button className="vbtn" onClick={exit}>Exit</button>
        <div className="deck__progress" aria-hidden="true"><span style={{ width: `${((i + 1) / slides.length) * 100}%` }} /></div>
        <span className="mono deck__count">{String(i + 1).padStart(2, "0")} / {slides.length}</span>
        <button className="vbtn" onClick={() => go(-1)} disabled={i === 0} aria-label="Previous slide">←</button>
        <button className="vbtn" onClick={() => go(1)} disabled={i === slides.length - 1} aria-label="Next slide">→</button>
        <button className="vbtn hide-sm" onClick={fs}>Full screen</button>
      </div>
    </div>
  );
}

function SlideView({ s }: { s: Slide }) {
  if (s.kind === "title") {
    const h = img(HERO.slug, HERO.image)!;
    return (
      <div className="sl sl--title">
        <img className="sl__bg" src={h.src} alt="" />
        <div className="sl__veil" />
        <div className="sl__titlebox">
          <p className="mono">Portfolio review</p>
          <h1>{person.name}</h1>
          <p className="sl__role">{person.role} · {person.base}</p>
          <p className="sl__statement">{person.statement}</p>
        </div>
      </div>
    );
  }
  if (s.kind === "profile") {
    return (
      <div className="sl sl--text">
        <p className="mono sl__eyebrow">Profile</p>
        <h2>Five years across residential, commercial, industrial and hospitality work.</h2>
        <div className="sl__cols">
          <ol className="sl__tl">
            {experience.map((e) => (
              <li key={e.org}><span className="mono">{e.period}</span><strong>{e.org}</strong><em>{e.role}</em></li>
            ))}
            <li><span className="mono">{education.period}</span><strong>{education.school}</strong><em>{education.degree}</em></li>
          </ol>
          <div>
            <p className="sl__p">Concept, space planning, façade, interior and landscape design — supported by execution drawings, permit submissions, Revit BIM on selected projects, and site follow-up.</p>
            <p className="mono sl__soft">{software.join(" · ")}</p>
          </div>
        </div>
      </div>
    );
  }
  if (s.kind === "range") {
    return (
      <div className="sl sl--text">
        <p className="mono sl__eyebrow">Range of practice</p>
        <h2>Six areas of practice.</h2>
        <ol className="sl__range">
          {expertise.map((e) => <li key={e.n}><span className="mono">{e.n}</span><strong>{e.title}</strong><em>{e.body}</em></li>)}
        </ol>
      </div>
    );
  }
  if (s.kind === "cover") {
    const p = s.p;
    const im = img(p.slug, p.deck?.images[0] ?? 1)!;
    return (
      <div className="sl sl--cover">
        <figure className="sl__img"><img src={im.src} alt={`${p.title} — key view`} /></figure>
        <div className="sl__side">
          <p className="mono sl__eyebrow">{String(s.n).padStart(2, "0")} · {p.focus.includes("BIM / Revit") ? "BIM case study" : p.types[0]}</p>
          <h2>{p.title}</h2>
          <p className="sl__kicker">{p.kicker}</p>
          <ul className="sl__points">{(p.deck?.points ?? []).map((pt) => <li key={pt}>{pt}</li>)}</ul>
          <p className="mono sl__meta">
            {[p.location, p.year, p.credit, sheets(p.slug).length ? `${sheets(p.slug).length} sheets` : null].filter(Boolean).join(" · ")}
          </p>
        </div>
      </div>
    );
  }
  if (s.kind === "evidence") {
    const p = s.p;
    const d = p.deck!;
    const extra = d.images.slice(1, d.sheets.length ? 2 : 3);
    return (
      <div className="sl sl--evidence">
        <div className="sl__head">
          <p className="mono sl__eyebrow">{String(s.n).padStart(2, "0")} · {p.title}</p>
          <h2>{d.sheets.length ? "From image to drawing" : "Spaces"}</h2>
        </div>
        <div className={`sl__grid sl__grid--${extra.length + d.sheets.length}`}>
          {extra.map((x) => { const r = img(p.slug, x)!; return <figure key={`i${x}`} className="sl__fig"><img src={r.src} alt={`${p.title} — view`} /><figcaption>{p.captions?.[x] ?? p.kicker}</figcaption></figure>; })}
          {d.sheets.map((x) => { const r = sheet(p.slug, x)!; return <figure key={`s${x}`} className="sl__fig sl__fig--sheet"><img src={r.src} alt={`${p.title} — ${r.title}`} /><figcaption><span className="mono">{sheetRef(x)}</span> {r.title}</figcaption></figure>; })}
        </div>
      </div>
    );
  }
  return (
    <div className="sl sl--text sl--end">
      <p className="mono sl__eyebrow">Thank you</p>
      <h2>{person.name}</h2>
      <p className="sl__role">{person.role} · {person.base}</p>
      <dl className="sl__contact">
        <div><dt className="mono">Email</dt><dd>{person.email}</dd></div>
        <div><dt className="mono">Phone</dt><dd>{person.phone}</dd></div>
        <div><dt className="mono">LinkedIn</dt><dd>linkedin.com/in/haneen-al-thawabieh</dd></div>
        <div><dt className="mono">Behance</dt><dd>behance.net/haneenalthawa</dd></div>
      </dl>
    </div>
  );
}
