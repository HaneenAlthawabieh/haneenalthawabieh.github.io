import { useEffect, useState } from "react";

/* Routes use plain #names only (hosting constraint): "", "work", "bim", "about", "present", "p-<slug>". */
export type Route =
  | { name: "home"; anchor?: string }
  | { name: "work" }
  | { name: "about" }
  | { name: "present" }
  | { name: "project"; slug: string };

export function parse(hash: string): Route {
  const h = hash.replace(/^#/, "");
  if (!h) return { name: "home" };
  if (h === "work") return { name: "work" };
  if (h === "about") return { name: "about" };
  if (h === "present") return { name: "present" };
  if (h.startsWith("p-")) return { name: "project", slug: h.slice(2) };
  return { name: "home", anchor: h };
}

export const href = {
  home: "#",
  work: "#work",
  about: "#about",
  present: "#present",
  project: (slug: string) => `#p-${slug}`,
};

export function useRoute(): Route {
  const [r, setR] = useState<Route>(() => parse(location.hash));
  useEffect(() => {
    const on = () => setR(parse(location.hash));
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  return r;
}
