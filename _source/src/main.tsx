import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { useRoute, href } from "./lib/router";
import { ViewerProvider } from "./components/common";
import { Home } from "./views/Home";
import { ProjectPage } from "./views/ProjectPage";
import { About } from "./views/About";
import { Present } from "./views/Present";
import { person } from "./data/about";

function Nav({ overHero }: { overHero: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(scrollY > 40);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const close = () => setOpen(false);
    addEventListener("hashchange", close);
    return () => removeEventListener("hashchange", close);
  }, []);
  const light = overHero && !scrolled && !open;
  return (
    <header className={`nav ${light ? "nav--light" : ""} ${scrolled || open ? "nav--solid" : ""}`}>
      <div className="nav__in">
        <a className="nav__mark" href={href.home} aria-label={`${person.name} — home`}>
          <span className="nav__name">H. T. Al Thawabieh</span>
          <span className="nav__role mono">Design Architect</span>
        </a>
        <button className="nav__toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Menu"}
        </button>
        <nav id="nav-links" className={`nav__links ${open ? "is-open" : ""}`} aria-label="Main">
          <a href="#selected">Work</a>
          <a href="#bim" className="nav__bim">BIM / Revit</a>
          <a href="#index">Index</a>
          <a href={href.about}>About</a>
          <a href={href.present} className="nav__present">Present</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__in">
        <p><strong>{person.name}</strong> · {person.role} · {person.base}</p>
        <p><a href={href.about}>About & CV</a> · <a href={person.linkedin} target="_blank" rel="noopener">LinkedIn</a> · <a href={person.whatsapp} target="_blank" rel="noopener">WhatsApp</a> · <a href={person.behance} target="_blank" rel="noopener">Behance</a></p>
      </div>
    </footer>
  );
}

function App() {
  const r = useRoute();
  if (r.name === "present") return <ViewerProvider><Present /></ViewerProvider>;
  const page =
    r.name === "project" ? <ProjectPage slug={r.slug} /> :
    r.name === "about" ? <About /> :
    <Home anchor={r.name === "work" ? "index" : r.name === "home" ? r.anchor : undefined} />;
  const key = r.name === "project" ? r.slug : r.name;
  return (
    <ViewerProvider>
      <button className="skip" onClick={() => { const m = document.getElementById("main"); m?.focus(); m?.scrollIntoView(); }}>Skip to content</button>
      <Nav overHero={r.name === "home" && !r.anchor} />
      <main id="main" key={key} className="page" tabIndex={-1}>{page}</main>
      <Footer />
    </ViewerProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
