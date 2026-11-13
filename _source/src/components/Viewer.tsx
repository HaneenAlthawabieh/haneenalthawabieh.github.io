import React, { useCallback, useEffect, useRef, useState } from "react";

export interface ViewerItem { src: string; thumb?: string; title: string; ref?: string; w: number; h: number }

interface Props {
  items: ViewerItem[];
  start: number;
  label: string;           // e.g. project title
  kind: "drawings" | "images";
  onClose: () => void;
}

const MIN = 1, MAX = 8;

export function Viewer({ items, start, label, kind, onClose }: Props) {
  const [i, setI] = useState(start);
  const [s, setS] = useState(1);
  const [t, setT] = useState({ x: 0, y: 0 });
  const [list, setList] = useState(kind === "drawings" && typeof innerWidth !== "undefined" && innerWidth > 900);
  const stage = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const ptrs = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ d: number; s: number } | null>(null);
  const item = items[i];

  const reset = useCallback(() => { setS(1); setT({ x: 0, y: 0 }); }, []);
  const go = useCallback((d: number) => { setI((v) => (v + d + items.length) % items.length); reset(); }, [items.length, reset]);

  const zoomAt = useCallback((factor: number, cx?: number, cy?: number) => {
    setS((prev) => {
      const next = Math.min(MAX, Math.max(MIN, prev * factor));
      const r = stage.current?.getBoundingClientRect();
      if (r) {
        const px = (cx ?? r.left + r.width / 2) - (r.left + r.width / 2);
        const py = (cy ?? r.top + r.height / 2) - (r.top + r.height / 2);
        setT((tt) => next === 1 ? { x: 0, y: 0 } : { x: px - ((px - tt.x) * next) / prev, y: py - ((py - tt.y) * next) / prev });
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; prevFocus?.focus?.(); };
  }, []);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (document.fullscreenElement) return; onClose(); }
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "+" || e.key === "=") zoomAt(1.4);
      else if (e.key === "-") zoomAt(1 / 1.4);
      else if (e.key === "0") reset();
      else if (e.key === "Tab" && root.current) {
        const f = root.current.querySelectorAll<HTMLElement>("button, [href], [tabindex='0']");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, [go, zoomAt, reset, onClose]);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const w = (e: WheelEvent) => { e.preventDefault(); zoomAt(e.deltaY < 0 ? 1.18 : 1 / 1.18, e.clientX, e.clientY); };
    el.addEventListener("wheel", w, { passive: false });
    return () => el.removeEventListener("wheel", w);
  }, [zoomAt]);

  // preload neighbours
  useEffect(() => {
    [items[(i + 1) % items.length], items[(i - 1 + items.length) % items.length]].forEach((n) => { if (n) { const im = new Image(); im.src = n.src; } });
  }, [i, items]);

  const onDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.current.size === 2) {
      const [a, b] = [...ptrs.current.values()];
      pinch.current = { d: Math.hypot(a.x - b.x, a.y - b.y), s };
    }
  };
  const onMove = (e: React.PointerEvent) => {
    const prev = ptrs.current.get(e.pointerId);
    if (!prev) return;
    ptrs.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.current.size === 2 && pinch.current) {
      const [a, b] = [...ptrs.current.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const next = Math.min(MAX, Math.max(MIN, (pinch.current.s * d) / pinch.current.d));
      setS(next);
      if (next === 1) setT({ x: 0, y: 0 });
    } else if (s > 1) {
      setT((tt) => ({ x: tt.x + e.clientX - prev.x, y: tt.y + e.clientY - prev.y }));
    }
  };
  const onUp = (e: React.PointerEvent) => { ptrs.current.delete(e.pointerId); if (ptrs.current.size < 2) pinch.current = null; };

  const fullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await root.current?.requestFullscreen();
    } catch { /* not available in this view */ }
  };

  return (
    <div className={`viewer ${kind === "drawings" ? "viewer--sheets" : ""}`} ref={root} role="dialog" aria-modal="true" aria-label={`${label} — ${kind === "drawings" ? "drawing viewer" : "image viewer"}`}>
      <header className="viewer__bar">
        <div className="viewer__title">
          <span className="eyebrow">{label}</span>
          <strong>{item.ref && <span className="mono viewer__ref">{item.ref}</span>}{item.title}</strong>
        </div>
        <div className="viewer__tools">
          <span className="mono viewer__count" aria-live="polite">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
          {kind === "drawings" && <button className="vbtn" onClick={() => setList((v) => !v)} aria-pressed={list}>Sheets</button>}
          <button className="vbtn" onClick={() => zoomAt(1 / 1.4)} aria-label="Zoom out">−</button>
          <span className="mono viewer__zoom">{Math.round(s * 100)}%</span>
          <button className="vbtn" onClick={() => zoomAt(1.4)} aria-label="Zoom in">+</button>
          <button className="vbtn" onClick={reset}>Fit</button>
          <button className="vbtn hide-sm" onClick={fullscreen}>Full screen</button>
          <button className="vbtn vbtn--close" ref={closeBtn} onClick={onClose}>Close</button>
        </div>
      </header>
      <div className="viewer__body">
        {list && kind === "drawings" && (
          <nav className="viewer__list" aria-label="Sheets in this set">
            {items.map((it, k) => (
              <button key={it.src} className={`viewer__sheet ${k === i ? "is-on" : ""}`} onClick={() => { setI(k); reset(); }} aria-current={k === i}>
                <img src={it.thumb ?? it.src} alt="" loading="lazy" />
                <span><span className="mono">{it.ref}</span>{it.title}</span>
              </button>
            ))}
          </nav>
        )}
        <div
          className={`viewer__stage ${s > 1 ? "is-zoomed" : ""}`}
          ref={stage}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onDoubleClick={(e) => (s > 1 ? reset() : zoomAt(2.5, e.clientX, e.clientY))}
        >
          <img
            key={item.src}
            src={item.src}
            alt={item.title}
            width={item.w}
            height={item.h}
            draggable={false}
            style={{ transform: `translate(${t.x}px, ${t.y}px) scale(${s})` }}
          />
          <button className="viewer__nav viewer__nav--prev" onPointerDown={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()} onClick={() => go(-1)} aria-label="Previous">‹</button>
          <button className="viewer__nav viewer__nav--next" onPointerDown={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()} onClick={() => go(1)} aria-label="Next">›</button>
        </div>
      </div>
      <p className="viewer__hint mono hide-sm">Scroll or pinch to zoom · drag to pan · ← → to move between {kind === "drawings" ? "sheets" : "images"} · Esc to close</p>
    </div>
  );
}
