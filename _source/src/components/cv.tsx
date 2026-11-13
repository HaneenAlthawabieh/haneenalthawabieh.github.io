import React from "react";
import { useViewer } from "./common";

const PAGES = [
  { src: "m/cv/p-1.jpg", title: "CV — page 1", w: 1241, h: 1755 },
  { src: "m/cv/p-2.jpg", title: "CV — page 2", w: 1241, h: 1755 },
];
/* Inside an embedded host, downloads are blocked, so the CV opens as pages; on a normal site a download link is added. */
const canDownload = (() => { try { return window.self === window.top; } catch { return false; } })();

export function CVButtons({ light }: { light?: boolean }) {
  const open = useViewer();
  return (
    <>
      <button className={`btn ${light ? "btn--bronze" : ""}`} onClick={() => open(PAGES, 0, "Haneen T. Al Thawabieh", "images")}>View CV</button>
      {canDownload && <a className={`btn ${light ? "btn--ghost-light" : "btn--ghost"}`} href="cv.pdf" download="Haneen-Al-Thawabieh-CV.pdf">Download PDF</a>}
    </>
  );
}
