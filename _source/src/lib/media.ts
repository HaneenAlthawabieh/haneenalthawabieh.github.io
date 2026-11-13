import assets from "../../public/assets.json";
import { bySlug, Project } from "../data/projects";

export interface Img { src: string; w: number; h: number }
export interface Sheet extends Img { thumb: string; title: string }

type Assets = Record<string, { renders: Img[]; drawings: Sheet[] }>;
const A = assets as unknown as Assets;

export const renders = (slug: string): Img[] => A[slug]?.renders ?? [];
export const sheets = (slug: string): Sheet[] => A[slug]?.drawings ?? [];
export const img = (slug: string, i: number): Img | undefined => renders(slug)[i - 1];
export const sheet = (slug: string, i: number): Sheet | undefined => sheets(slug)[i - 1];
export const cover = (p: Project | string): Img | undefined => img(typeof p === "string" ? p : p.slug, 1);
export const project = (slug: string): Project | undefined => bySlug[slug];

/* Sheet reference in an architectural register: A-03 style numbering per project set. */
export const sheetRef = (i: number) => `A-${String(i).padStart(2, "0")}`;

export const altFor = (p: Project, i: number, kind: "render" | "sheet" = "render") => {
  if (kind === "sheet") return `${p.title} — ${sheet(p.slug, i)?.title ?? "drawing"}`;
  return p.captions?.[i] ? `${p.title} — ${p.captions[i]}` : `${p.title}, view ${i}`;
};
