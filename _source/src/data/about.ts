/* All content below is taken from the current CV (Haneen T. Al Thawabieh — Design Architect). */

export const person = {
  name: "Haneen T. Al Thawabieh",
  role: "Design Architect",
  base: "Amman, Jordan",
  statement: "From the first idea to the architectural detail.",
  email: "haneen.t.thwabieh@gmail.com",
  phone: "+962 79 143 7381",
  behance: "https://www.behance.net/haneenalthawa",
  linkedin: "https://www.linkedin.com/in/haneen-al-thawabieh-65b946180",
  whatsapp: "https://wa.me/962791437381",
};

export const bio = [
  "I'm a Design Architect based in Amman, Jordan, with five years of practice across residential, commercial, industrial, hospitality and mixed-use projects.",
  "My focus is design: concept, space planning, façades, interiors and landscape. I also prepare execution drawings and permit submissions, and use Revit BIM on selected projects — including a complete BIM-based project at Master Engineers, where I lead the architectural design of several projects at once.",
  "I work with clients and engineering teams from the first presentation to approval, and follow my designs onto site with the construction teams.",
];

export const experience = [
  {
    org: "Master Engineers Company",
    role: "Design Architect",
    period: "10/2024 — Present",
    points: [
      "Leads architectural design across concurrent projects, from concept development and high-end façade design to technical documentation.",
      "Applies Revit BIM in modelling, documentation and coordination, including delivery of a complete BIM-based project.",
      "Develops architectural concepts and photorealistic visualizations, integrating AI-assisted tools into design presentations.",
      "Presents design proposals to clients and coordinates feedback and approvals.",
      "Follows up architectural execution with site teams to keep construction in line with approved designs and to resolve design issues.",
    ],
  },
  {
    org: "Assi Office Architects Engineering Consultants",
    role: "Design Architect",
    period: "09/2021 — 10/2024",
    points: [
      "Designed industrial complexes, luxury villas, commercial projects, interiors and landscapes.",
      "Produced exterior concepts and photorealistic presentations for client approval.",
      "Prepared construction drawings, finishing schedules and bills of quantities (BOQs).",
      "Coordinated permit submissions with Greater Amman Municipality, municipalities, the Jordan Engineers Association and Civil Defense.",
      "Integrated structural and MEP requirements into architectural design.",
    ],
  },
  {
    org: "Greater Amman Municipality",
    role: "Architectural Intern",
    period: "2020",
    points: [],
  },
];

export const education = { degree: "Bachelor of Architecture", school: "Al-Balqa Applied University", period: "2016 — 2021" };

export const capabilities = [
  { group: "Design", items: ["Concept development", "Space planning", "Façade & exterior design", "Interior design", "Landscape design"] },
  { group: "Technical", items: ["BIM modelling & coordination", "Construction & shop drawings", "Permitting documentation", "Quantity take-off", "Building regulations"] },
  { group: "Practice", items: ["Client communication & presentations", "Multidisciplinary coordination", "Construction follow-up", "Managing concurrent projects"] },
  { group: "Sectors", items: ["Residential & mixed-use", "Industrial & commercial", "Hospitality"] },
];

export const software = ["Autodesk Revit (BIM)", "AutoCAD", "3ds Max & V-Ray", "D5 Render", "Lumion", "Adobe Photoshop", "Microsoft Office"];

export const courses = [
  { name: "Architecture & Interior Design with AI", by: "TAKWEEN AI", year: "In progress", done: false },
  { name: "BIM & Revit Course", by: "Arch. Abdallah Tabbalat", year: "2026", done: true },
  { name: "Interior Design Course", by: "Pivot Design", year: "2024", done: true },
  { name: "Engineering Supervision Course", by: "Jordan Engineers Association", year: "2023", done: true },
  { name: "KNAUF Drywall System", by: "KNAUF Akademie", year: "2021", done: true },
  { name: "3ds Max Course", by: "Joury Space Training", year: "2020", done: true },
  { name: "Autodesk Certified Professional: Revit Architecture", by: "Archizone Training Academy", year: "2018", done: true },
];

export const languages = ["Arabic", "English"];

export const expertise = [
  { n: "01", title: "Architectural Design", body: "Concepts, space planning, building composition and design development.", ref: { slug: "stone-screen-residence", sheet: 2, image: 1 } },
  { n: "02", title: "Façade & Exterior Design", body: "Massing, proportion, material expression, opening composition and exterior identity.", ref: { slug: "sculpted-volumes-villa", image: 3 } },
  { n: "03", title: "Interior Architecture", body: "Spatial experience, furniture planning, materials, functional organisation and atmosphere.", ref: { slug: "residence-interior-execution", image: 4 } },
  { n: "04", title: "Landscape Design", body: "Outdoor rooms, circulation between levels, planting and the relationship of garden to house.", ref: { slug: "hillside-bim-residence", image: 7 } },
  { n: "05", title: "Technical Documentation", body: "Working drawings, wall and window sections, cornice and lighting details, schedules.", ref: { slug: "neoclassical-residence-extension", sheet: 20 } },
  { n: "06", title: "BIM & Design Coordination", body: "Revit modelling and coordinated sheet sets — plans, sections, elevations and schedules from one model.", ref: { slug: "hillside-bim-residence", sheet: 12 } },
];

/* Design to Detail: three scales from the same project */
export const designToDetail = [
  {
    slug: "neoclassical-residence-extension",
    steps: [
      { scale: "Vision", kind: "image", i: 1, note: "Main elevation" },
      { scale: "Organisation", kind: "sheet", i: 5, note: "Ground floor — dimensioned plan" },
      { scale: "Detail", kind: "sheet", i: 20, note: "Typical wall vertical section & window detail" },
    ],
  },
  {
    slug: "hillside-bim-residence",
    steps: [
      { scale: "Vision", kind: "image", i: 4, note: "Terraced levels from above" },
      { scale: "Organisation", kind: "sheet", i: 12, note: "Section A-A through the slope" },
      { scale: "Detail", kind: "sheet", i: 21, note: "Wall section, curtain wall & projection details" },
    ],
  },
  {
    slug: "residence-interior-execution",
    steps: [
      { scale: "Vision", kind: "image", i: 4, note: "Kitchen and dining" },
      { scale: "Organisation", kind: "sheet", i: 2, note: "Furniture plan" },
      { scale: "Detail", kind: "sheet", i: 10, note: "Kitchen & living elevations" },
    ],
  },
] as const;
