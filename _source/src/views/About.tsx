import React, { useEffect, useState } from "react";
import { person, bio, experience, education, capabilities, software, courses, languages } from "../data/about";
import { href } from "../lib/router";
import { CVButtons } from "../components/cv";

export function About() {
  useEffect(() => { scrollTo(0, 0); }, []);
  const done = courses.filter((c) => c.done);
  const ongoing = courses.filter((c) => !c.done);
  return (
    <article className="about">
      <header className="about__head wrap">
        <div className="about__headtext">
          <p className="eyebrow">About</p>
          <h1 className="display-xl">{person.name}</h1>
          <p className="about__role">{person.role} · {person.base}</p>
        </div>
        <figure className="about__photo"><img src="me.jpg" width={900} height={1125} alt={person.name} /></figure>
      </header>

      <section className="about__bio wrap">
        <div className="about__bio-text">
          {bio.map((b, k) => <p key={k} className={k === 0 ? "lead" : ""}>{b}</p>)}
        </div>
        <aside className="about__cv">
          <h2 className="eyebrow">Curriculum vitae</h2>
          <p>Experience, courses and software.</p>
          <div className="about__cvbtns"><CVButtons /></div>
          <Contact />
        </aside>
      </section>

      <section className="about__sec wrap" aria-labelledby="exp-h2">
        <h2 id="exp-h2" className="display-m">Experience</h2>
        <ol className="timeline">
          {experience.map((e) => (
            <li key={e.org} className="timeline__item">
              <p className="timeline__period mono">{e.period}</p>
              <div>
                <h3 className="timeline__org">{e.org}</h3>
                <p className="timeline__role">{e.role}</p>
                {e.points.length > 0 && <ul className="timeline__pts">{e.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>}
              </div>
            </li>
          ))}
          <li className="timeline__item">
            <p className="timeline__period mono">{education.period}</p>
            <div>
              <h3 className="timeline__org">{education.school}</h3>
              <p className="timeline__role">{education.degree}</p>
            </div>
          </li>
        </ol>
      </section>

      <section className="about__sec wrap" aria-labelledby="cap-h">
        <h2 id="cap-h" className="display-m">Capabilities</h2>
        <div className="caps">
          {capabilities.map((g) => (
            <div key={g.group} className="caps__group">
              <h3 className="eyebrow">{g.group}</h3>
              <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="about__sec wrap about__split">
        <div>
          <h2 className="display-s">Software</h2>
          <ul className="soft">{software.map((s) => <li key={s}>{s}</li>)}</ul>
          <h2 className="display-s about__lang">Languages</h2>
          <p>{languages.join(" · ")}</p>
        </div>
        <div>
          <h2 className="display-s">Courses & certifications</h2>
          <ul className="courses">
            {done.map((c) => (
              <li key={c.name}><span className="courses__y mono">{c.year}</span><span><strong>{c.name}</strong><br />{c.by}</span></li>
            ))}
          </ul>
          <h3 className="eyebrow courses__now">In progress</h3>
          <ul className="courses">
            {ongoing.map((c) => (
              <li key={c.name}><span className="courses__y mono">Now</span><span><strong>{c.name}</strong><br />{c.by}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about__sec wrap about__ai">
        <h2 className="display-s">AI-assisted workflows</h2>
        <p>
          I use AI-assisted tools in my design presentations, and I'm completing a course in architecture and interior design with AI.
        </p>
      </section>

      <section className="about__sec wrap about__end">
        <a className="btn" href="#selected">Selected work</a>
        <a className="btn btn--ghost" href={href.present}>Presentation mode</a>
      </section>
    </article>
  );
}

export function Contact() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (v: string, key: string) => {
    try { await navigator.clipboard.writeText(v); setCopied(key); setTimeout(() => setCopied(null), 1800); }
    catch {
      const r = document.createRange(); const el = document.getElementById(`c-${key}`);
      if (el) { r.selectNodeContents(el); const s = getSelection(); s?.removeAllRanges(); s?.addRange(r); }
    }
  };
  return (
    <dl className="contact-list">
      <div>
        <dt>Email</dt>
        <dd><a id="c-email" href={`mailto:${person.email}`}>{person.email}</a>
          <button className="copy" onClick={() => copy(person.email, "email")}>{copied === "email" ? "Copied" : "Copy"}</button></dd>
      </div>
      <div>
        <dt>Phone</dt>
        <dd><span id="c-phone" className="tnum">{person.phone}</span>
          <button className="copy" onClick={() => copy(person.phone, "phone")}>{copied === "phone" ? "Copied" : "Copy"}</button></dd>
      </div>
      <div>
        <dt>WhatsApp</dt>
        <dd><a href={person.whatsapp} target="_blank" rel="noopener">Message on WhatsApp</a></dd>
      </div>
      <div>
        <dt>LinkedIn</dt>
        <dd><a href={person.linkedin} target="_blank" rel="noopener">linkedin.com/in/haneen-al-thawabieh</a></dd>
      </div>
      <div>
        <dt>Behance</dt>
        <dd><a href={person.behance} target="_blank" rel="noopener">behance.net/haneenalthawa</a></dd>
      </div>
      <div><dt>Based in</dt><dd>{person.base}</dd></div>
    </dl>
  );
}
