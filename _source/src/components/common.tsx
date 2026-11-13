import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Viewer, ViewerItem } from "./Viewer";
import { href } from "../lib/router";
import { cover, img, renders, sheet, sheets, sheetRef, altFor } from "../lib/media";
import { Project } from "../data/projects";

/* ---------- Viewer context: any component can open the drawing viewer / lightbox ---------- */
type Open = (items: ViewerItem[], start: number, label: string, kind: "drawings" | "images") => void;
const ViewerCtx = createContext<Open>(() => {});
export const useViewer = () => useContext(ViewerCtx);

export function ViewerProvider({ children }: { children: React.ReactNode }) {
  const [st, setSt] = useState<{ items: ViewerItem[]; start: number; label: string; kind: "drawings" | "images" } | null>(null);
  const open = useCallback<Open>((items, start, label, kind) => setSt({ items, start, label, kind }), []);
  useEffect(() => {
    const close = () => setSt(null);
    addEventListener("hashchange", close);
    return () => removeEventListener("hashchange", close);
  }, []);
  return (
    <ViewerCtx.Provider value={open}>
      {children}
      {st && <Viewer {...st} onClose={() => setSt(null)} />}
    </ViewerCtx.Provider>
  );
}

export const sheetItems = (p: Project): ViewerItem[] =>
  sheets(p.slug).map((s, k) => ({ src: s.src, thumb: s.thumb, title: s.title, ref: sheetRef(k + 1), w: s.w, h: s.h }));

export const imageItems = (p: Project, idx?: number[]): ViewerItem[] => {
  const all = renders(p.slug);
  const pick = idx ?? all.map((_, k) => k + 1);
  return pick.map((i) => all[i - 1]).filter(Boolean).map((r, k) => {
    const i = (idx ?? [])[k] ?? k + 1;
    return { src: r.src, title: p.captions?.[i] ?? `${p.title}`, w: r.w, h: r.h };
  });
};

/* ---------- Picture: real aspect ratio, lazy, never cropped unless asked ---------- */
export function Pic({ slug, i, alt, className, eager, cropTo }: { slug: string; i: number; alt: string; className?: string; eager?: boolean; cropTo?: string }) {
  const r = img(slug, i);
  if (!r) return null;
  return (
    <img
      className={className}
      src={r.src}
      width={r.w}
      height={r.h}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={cropTo ? { aspectRatio: cropTo, objectFit: "cover" } : undefined}
    />
  );
}

/* A clickable figure that opens the lightbox on a project's image sequence */
export function Figure({ p, i, seq, caption, className, wide }: { p: Project; i: number; seq: number[]; caption?: string; className?: string; wide?: boolean }) {
  const open = useViewer();
  const start = Math.max(0, seq.indexOf(i));
  return (
    <figure className={`fig ${wide ? "fig--wide" : ""} ${className ?? ""}`}>
      <button className="fig__btn" onClick={() => open(imageItems(p, seq), start, p.title, "images")} aria-label={`Enlarge: ${caption ?? altFor(p, i)}`}>
        <Pic slug={p.slug} i={i} alt={altFor(p, i)} />
      </button>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/* A drawing sheet tile that opens the drawing viewer at that sheet */
export function SheetTile({ p, i, size = "m" }: { p: Project; i: number; size?: "s" | "m" | "l" }) {
  const open = useViewer();
  const s = sheet(p.slug, i);
  if (!s) return null;
  return (
    <button className={`sheet sheet--${size}`} onClick={() => open(sheetItems(p), i - 1, p.title, "drawings")} aria-label={`Open drawing ${sheetRef(i)}: ${s.title}`}>
      <span className="sheet__paper">
        <img src={size === "l" ? s.src : s.thumb} width={s.w} height={s.h} alt={altFor(p, i, "sheet")} loading="lazy" decoding="async" />
      </span>
      <span className="sheet__label"><span className="mono">{sheetRef(i)}</span>{s.title}</span>
    </button>
  );
}

export function ProjectLink({ p, children, className }: { p: Project; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href.project(p.slug)}>{children}</a>;
}

export const coverOf = cover;
export const hasSheets = (p: Project) => sheets(p.slug).length > 0;

export function Tags({ p, limit }: { p: Project; limit?: number }) {
  const t = [...p.types, ...p.focus.filter((f) => f === "BIM / Revit" || f === "Technical Documentation")];
  return (
    <ul className="tags">
      {t.slice(0, limit ?? t.length).map((x) => <li key={x} className={x === "BIM / Revit" ? "tag tag--bim" : "tag"}>{x}</li>)}
    </ul>
  );
}
