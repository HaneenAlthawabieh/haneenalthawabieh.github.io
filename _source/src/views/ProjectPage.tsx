import React, { useEffect, useState } from "react";
import { bySlug, projects, SELECTED, Project } from "../data/projects";
import { href } from "../lib/router";
import { renders, sheets, sheet, sheetRef, altFor } from "../lib/media";
import { Pic, Figure, SheetTile, Tags, useViewer, sheetItems, imageItems } from "../components/common";
import { OnSite } from "../components/OnSite";

export function ProjectPage({ slug }: { slug: string }) {
  const p = bySlug[slug];
  useEffect(() => { scrollTo(0, 0); }, [slug]);
  useEffect(() => {
    if (p) document.title = `${p.title} — Haneen T. Al Thawabieh`;
    return () => { document.title = "Haneen Al Thawabieh — Architecture"; };
  }, [p]);
  if (!p) return <NotFound />;
  const nRenders = renders(p.slug).length;
  const nSheets = sheets(p.slug).length;
  const allImgs = Array.from({ length: nRenders }, (_, k) => k + 1);
  const isBim = p.focus.includes("BIM / Revit");

  return (
    <article className={`project ${isBim ? "project--bim" : ""}`}>
      {/* 01 · Opening */}
      <header className="p-open">
        <div className="p-open__media">
          <Figure p={p} i={p.cover ?? 1} seq={allImgs} />
        </div>
        <div className="p-open__text wrap">
          <p className="eyebrow">
            {isBim && <span className="bim-flag">BIM case study</span>}
            {p.kicker}
          </p>
          <h1 className="display-xl">{p.title}</h1>
          <p className="p-open__intro">{p.intro}</p>
          <dl className="meta">
            <div><dt>Type</dt><dd>{p.types.join(" · ")}</dd></div>
            {p.location && <div><dt>Location</dt><dd>{p.location}</dd></div>}
            {p.year && <div><dt>Year</dt><dd className="tnum">{p.year}</dd></div>}
            {p.role && <div><dt>My role</dt><dd>{p.role}</dd></div>}
            {p.stage && <div><dt>Stage</dt><dd>{p.stage}</dd></div>}
            {p.credit && <div><dt>Credit</dt><dd>{p.credit}</dd></div>}
            {nSheets > 0 && <div><dt>Drawings</dt><dd className="tnum">{nSheets} sheet{nSheets > 1 ? "s" : ""} in this portfolio</dd></div>}
          </dl>
          <Tags p={p} />
        </div>
      </header>

      {/* 02–07 · Narrative sections, each pairing text with evidence */}
      <div className="p-body">
        {p.sections.map((s, k) => (
          <section key={s.heading} className={`p-sec ${k % 2 ? "p-sec--flip" : ""} ${s.sheets?.length && !s.images?.length ? "p-sec--tech" : ""}`}>
            <div className="p-sec__text">
              <p className="p-sec__n mono">{String(k + 2).padStart(2, "0")}</p>
              <h2 className="display-s">{s.heading}</h2>
              <p>{s.body}</p>
            </div>
            <div className="p-sec__media">
              {s.images && s.images.length > 0 && (
                <div className={`figs figs--${Math.min(s.images.length, 4)}`}>
                  {s.images.map((i) => <Figure key={i} p={p} i={i} seq={s.images!} caption={p.captions?.[i]} />)}
                </div>
              )}
              {s.sheets && s.sheets.length > 0 && (
                <div className={`sheets sheets--${s.sheets.length === 1 ? "one" : s.sheets.length === 2 ? "two" : "many"}`}>
                  {s.sheets.map((i) => <SheetTile key={i} p={p} i={i} size={s.sheets!.length === 1 ? "l" : "m"} />)}
                </div>
              )}
            </div>
          </section>
        ))}

        {p.options && <Options p={p} />}
        {p.compare && <Compare p={p} />}
        <OnSite p={p} />
      </div>

      {/* Technical architecture: the whole set, readable and zoomable */}
      {nSheets > 0 && <DrawingSet p={p} />}

      {/* Final presentation */}
      {(() => {
        const shown = new Set<number>([p.cover ?? 1, ...p.sections.flatMap((s) => s.images ?? []), ...(p.options?.items.map((o) => o.i) ?? [])]);
        const rest = allImgs.filter((i) => !shown.has(i));
        return rest.length > 0 ? (
          <section className="p-gallery wrap" aria-labelledby="gal-h">
            <h2 id="gal-h" className="eyebrow">More views · {rest.length}</h2>
            <div className="gal gal--more">
              {rest.map((i) => <Figure key={i} p={p} i={i} seq={rest} caption={p.captions?.[i]} />)}
            </div>
          </section>
        ) : null;
      })()}
      {false && p.gallery && p.gallery.length > 0 && (
        <section className="p-gallery wrap" aria-labelledby="gal-h">
          <h2 id="gal-h" className="eyebrow">Further views</h2>
          <div className={`gal gal--${Math.min(p.gallery.length, 4)}`}>
            {p.gallery.map((i) => <Figure key={i} p={p} i={i} seq={p.gallery!} caption={p.captions?.[i]} />)}
          </div>
        </section>
      )}

      {/* Role */}
      <section className="p-contrib wrap" aria-labelledby="con-h">
        <div>
          <h2 id="con-h" className="eyebrow">My role</h2>
          <ul className="contrib">{p.work.map((w) => <li key={w}>{w}</li>)}</ul>
        </div>
        <div className="p-contrib__credit">
          {p.credit && (<><h3 className="eyebrow">Office</h3><p>{p.credit}</p></>)}
        </div>
      </section>

      <NextProject p={p} />
    </article>
  );
}

function DrawingSet({ p }: { p: Project }) {
  const open = useViewer();
  const list = sheets(p.slug);
  const [showAll, setShowAll] = useState(list.length <= 12);
  const shown = showAll ? list : list.slice(0, 12);
  return (
    <section className="p-set" aria-labelledby="set-h">
      <div className="wrap">
        <div className="p-set__head">
          <div>
            <p className="eyebrow eyebrow--bronze">Technical architecture</p>
            <h2 id="set-h" className="display-m">Drawing set · {list.length} sheet{list.length > 1 ? "s" : ""}</h2>
          </div>
          <button className="btn btn--light" onClick={() => open(sheetItems(p), 0, p.title, "drawings")}>Open viewer</button>
        </div>
        <ol className="p-set__grid">
          {shown.map((s, k) => <li key={s.src}><SheetTile p={p} i={k + 1} size="s" /></li>)}
        </ol>
        {!showAll && <button className="btn btn--ghost-light" onClick={() => setShowAll(true)}>Show all {list.length} sheets</button>}
      </div>
    </section>
  );
}

function Options({ p }: { p: Project }) {
  const o = p.options!;
  const [k, setK] = useState(0);
  const open = useViewer();
  const seq = o.items.map((x) => x.i);
  const cur = o.items[k];
  const r = renders(p.slug)[cur.i - 1];
  const letter = (n: number) => String.fromCharCode(65 + n);
  return (
    <section className="opts" aria-labelledby="opt-h">
      <div className="opts__head">
        <p className="eyebrow">Design options · {o.items.length}</p>
        <h2 id="opt-h" className="display-s">{o.heading}</h2>
        <p>{o.note}</p>
        <ol className="opts__list" role="tablist" aria-label="Choose a façade option">
          {o.items.map((x, n) => (
            <li key={x.i}>
              <button role="tab" aria-selected={n === k} className={n === k ? "is-on" : ""} onClick={() => setK(n)}>
                <span className="mono">{letter(n)}</span>{x.label}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="opts__stage">
        <button className="opts__frame" onClick={() => open(imageItems(p, seq).map((it, n) => ({ ...it, title: `Option ${letter(n)} · ${o.items[n].label}` })), k, p.title, "images")} aria-label={`Enlarge option ${letter(k)}`}>
          <img key={cur.i} src={r.src} width={r.w} height={r.h} alt={`${p.title} — option ${letter(k)}: ${cur.label}`} />
          <span className="opts__tag mono">Option {letter(k)}</span>
        </button>
        <div className="opts__thumbs">
          {o.items.map((x, n) => {
            const t = renders(p.slug)[x.i - 1];
            return (
              <button key={x.i} className={n === k ? "is-on" : ""} onClick={() => setK(n)} aria-label={`Show option ${letter(n)}`}>
                <img src={t.src} alt="" loading="lazy" />
                <span className="mono">{letter(n)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Compare({ p }: { p: Project }) {
  const c = p.compare!;
  const [side, setSide] = useState<"a" | "b">("a");
  const open = useViewer();
  const cur = side === "a" ? c.a : c.b;
  const s = sheet(p.slug, cur)!;
  return (
    <section className="compare" aria-labelledby="cmp-h">
      <div className="compare__head">
        <h2 id="cmp-h" className="display-s">{c.labelA} / {c.labelB}</h2>
        <p>{c.note}</p>
        <div className="seg" role="tablist" aria-label="Choose drawing">
          <button role="tab" aria-selected={side === "a"} className={side === "a" ? "is-on" : ""} onClick={() => setSide("a")}>{c.labelA}</button>
          <button role="tab" aria-selected={side === "b"} className={side === "b" ? "is-on" : ""} onClick={() => setSide("b")}>{c.labelB}</button>
        </div>
      </div>
      <button className="compare__frame" onClick={() => open(sheetItems(p), cur - 1, p.title, "drawings")} aria-label={`Open ${s.title} in the drawing viewer`}>
        <img src={s.src} alt={altFor(p, cur, "sheet")} width={s.w} height={s.h} />
        <span className="compare__ref mono">{sheetRef(cur)} · {s.title}</span>
      </button>
    </section>
  );
}

function NextProject({ p }: { p: Project }) {
  const order = [...SELECTED, ...projects.filter((x) => !SELECTED.includes(x.slug)).map((x) => x.slug)];
  const idx = order.indexOf(p.slug);
  const next = bySlug[order[(idx + 1) % order.length]];
  const related = (p.related ?? []).map((s) => bySlug[s]).filter(Boolean).filter((r) => r.slug !== next.slug);
  return (
    <nav className="p-next" aria-label="More projects">
      <a className="p-next__main" href={href.project(next.slug)}>
        <Pic slug={next.slug} i={next.cover ?? 1} alt={`${next.title} — cover view`} />
        <span className="p-next__veil" />
        <span className="p-next__text">
          <span className="eyebrow">Next project</span>
          <span className="display-m">{next.title}</span>
          <span className="p-next__kicker">{next.kicker}</span>
        </span>
      </a>
      {related.length > 0 && (
        <div className="wrap p-related">
          <p className="eyebrow">Related</p>
          <ul>
            {related.map((r) => (
              <li key={r.slug}>
                <a href={href.project(r.slug)}>
                  <Pic slug={r.slug} i={r.cover ?? 1} alt={`${r.title} — cover view`} cropTo="3 / 2" />
                  <span>{r.title}</span>
                </a>
              </li>
            ))}
            <li className="p-related__all"><a href="#index">All projects →</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}

function NotFound() {
  return (
    <section className="wrap notfound">
      <h1 className="display-l">Project not found</h1>
      <p>This link does not match a project in the portfolio.</p>
      <a className="btn" href="#index">See all projects</a>
    </section>
  );
}
