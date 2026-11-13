/* Public project content. Every statement here is traceable to the CV, the drawing sets,
   or what the renderings directly show. Source folder names are kept privately in pipeline/curation.py. */

export type ProjectType = "Residential" | "Commercial & Mixed-Use" | "Industrial" | "Hospitality" | "Interiors" | "Landscape";
export type Focus = "Concept & Design" | "Façade Design" | "Architectural Planning" | "Technical Documentation" | "BIM / Revit";
export type Tier = "featured" | "large" | "case" | "additional";

export interface Section { heading: string; body: string; images?: number[]; sheets?: number[] }

export interface Project {
  slug: string;
  title: string;
  kicker: string;            // typology line
  types: ProjectType[];
  focus: Focus[];
  tier: Tier;
  year?: string;
  location?: string;
  cover?: number;            // render index used as the cover (default 1)
  lead?: boolean;            // Haneen is the lead / sole designer
  role?: string;             // overrides the "Lead designer" label
  built?: {
    status: "Built" | "Under construction";
    note: string;
    pairs: { render: number; photo: string; label: string }[];
    photos?: string[];
    video?: { src: string; poster: string };
  };
  stage?: string;
  credit?: string;           // verified employer / title-block credit
  intro: string;
  sections: Section[];
  work: string[];            // scope of work shown (evidence-based)
  verified?: string;         // exact title-block role wording, when present
  captions?: Record<number, string>;
  compare?: { a: number; b: number; labelA: string; labelB: string; note: string };
  options?: { heading: string; note: string; items: { i: number; label: string }[] };
  gallery?: number[];        // closing sequence (render indices, 1-based)
  related?: string[];
  deck?: { images: number[]; sheets: number[]; points: string[] };
}

const MASTER = "Master Engineers";

export const projects: Project[] = [
  /* ───────────── FEATURED ───────────── */
  {
    slug: "stone-screen-residence",
    title: "Screen House",
    kicker: "Private residence · three storeys and roof pavilion",
    types: ["Residential", "Landscape"],
    focus: ["Concept & Design", "Façade Design", "Architectural Planning"],
    lead: true,
    tier: "featured",
    cover: 15,
    role: "Full design",
    year: "2025–2026",
    stage: "Concept and design development",
    credit: MASTER,
    intro:
      "A family residence clad in beige Taffouh stone. A double-height entrance volume, wrapped in a perforated screen, stands between two stone wings and gives the street façade its centre.",
    sections: [
      {
        heading: "Overview",
        body:
          "The house sits on a 725 m² rectangular plot (30 × 24 m on the site plans). The programme runs across a basement, ground and first floors, with a glazed pavilion and terrace on the roof. The plans keep the pool on the garden side, so the street elevation stays composed and private while the living spaces open onto the garden.",
        sheets: [2, 3],
      },
      {
        heading: "Massing & façade",
        body:
          "The street elevation reads as two stone wings with the double-height entrance volume between them. Dark horizontal fascias run across both wings at each floor line, and the roof slabs extend past the walls to shade the upper glazing. The perforated screen around the entrance is denser at eye level and opens toward the top. Windows are grouped into wide, recessed bays.",
        images: [2, 3, 6],
      },
      {
        heading: "Garden side",
        body:
          "Toward the garden the stone volumes step back to form covered terraces on each level, and the pool runs along the rear with a glass edge, so terrace, pool deck and lawn read as one outdoor floor.",
        images: [4, 5],
      },
    ],
    work: ["Designed from the first sketch", "Architectural design — plans and elevations", "Façade composition", "Space planning", "Exterior presentation"],
    captions: { 1: "Street elevation — the double-height entrance volume", 6: "The perforated screen around the entrance" },
    gallery: [1, 7, 8, 9, 10],
    related: ["courtyard-pool-residence", "arched-stone-residence"],
    deck: {
      images: [1, 4],
      sheets: [2],
      points: [
        "Two stone wings framing a double-height, screened entrance volume",
        "Horizontal fascias give the façade a base, middle and top",
        "Pool and terraces kept to the rear for privacy",
      ],
    },
  },
  {
    slug: "hillside-bim-residence",
    title: "Hillside House",
    kicker: "Private residence on a sloping site",
    types: ["Residential", "Landscape"],
    focus: ["BIM / Revit", "Technical Documentation", "Architectural Planning", "Façade Design"],
    tier: "featured",
    cover: 22,
    year: "2025",
    location: "Amman, Jordan",
    credit: MASTER,
    role: "Concept to permit",
    stage: "Full architectural drawing set (34 sheets)",
    intro:
      "A residence that steps down a hillside across two basement levels. I designed it from the first sketch: the concept, the façades, the full Revit (BIM) drawing set and the Greater Amman Municipality approval drawings — from topography and excavation through plans, sections, schedules and construction details.",
    sections: [
      {
        heading: "Site & levels",
        body:
          "The plot falls steeply away from the street. The set starts from a topography plan and an excavation plan, and the sections record roughly 11 m between the lower basement (794.73 m) and the top of the ground floor (805.64 m). The house is arranged as stacked terraces: the ground floor sits at street level, and two basement floors open onto the garden below.",
        sheets: [2, 3, 4, 12],
      },
      {
        heading: "Planning",
        body:
          "Each level has its own dimensioned plan and a separate furniture-and-finishes plan carrying a room-by-room finishes table (floor, wall, ceiling and skirting). An area plan totals the floors, the annex and the pool. A roof drainage plan sets out falls and outlets.",
        sheets: [6, 7, 8, 11, 5, 9],
      },
      {
        heading: "Elevations & sections",
        body:
          "Two sections and four elevations are cut through the same model and share one set of level datums, so the stepped massing, the boundary walls and the garden terraces can be read together. The boundary walls get a sheet of their own because they follow the slope down three sides of the plot.",
        sheets: [12, 13, 14, 15, 16, 17, 20],
      },
      {
        heading: "Schedules & details",
        body:
          "Window and door schedules are tagged back to the plans. The detail sheets cover a typical wall section with underfloor heating, a curtain wall junction, the architectural projections, the hidden lighting coves that outline the façade, and typical wall and window sections.",
        sheets: [18, 19, 21, 22, 23, 24],
      },
      {
        heading: "Landscape",
        body:
          "The garden levels are designed as outdoor rooms: a pool terrace, an outdoor kitchen and bar, a sunken seating area around a fire pit, planted retaining walls and a children's play area on the lowest level.",
        images: [4, 13, 14, 15, 16, 6, 7, 8],
      },
    ],
    work: ["Concept design from the first sketch", "Façade design", "Revit (BIM) architectural drawing set", "Greater Amman Municipality approval drawings", "Window, door and finishes schedules", "Construction details", "Landscape design"],
    captions: {
      1: "Street approach — the house is read as a single storey from the road",
      4: "The house, pool and garden terraces from above",
      22: "Street approach at dusk",
    },
    gallery: [],
    related: ["neoclassical-residence-extension", "residence-interior-execution"],
    deck: {
      images: [22, 4],
      sheets: [12, 8, 21],
      points: [
        "34-sheet coordinated set: topography and excavation through to details",
        "Roughly 11 m of level change resolved as stepped terraces",
        "Schedules and finishes tables tied to the plans",
      ],
    },
  },
  {
    slug: "corner-commercial-building",
    title: "Corner Building",
    kicker: "Commercial · retail podium with upper floors",
    types: ["Commercial & Mixed-Use"],
    focus: ["Concept & Design", "Façade Design", "Architectural Planning"],
    tier: "featured",
    role: "Full design",
    year: "2026",
    stage: "Design development drawings",
    intro:
      "A commercial building on a tight corner plot. A double-height glazed retail podium wraps the corner, and a slim, full-height glazed bay marks the entrance to the floors above.",
    sections: [
      {
        heading: "Site & organisation",
        body:
          "The plot is an irregular wedge where two streets meet at an angle. The drawing set follows the building from the survey and site plan through a basement car park, a ground floor of shops along both frontages, and the floors above.",
        sheets: [1, 2, 4, 5],
      },
      {
        heading: "Façade",
        body:
          "The building is a stone volume lifted on a glazed base. Black-framed shopfronts run the full height of the podium, and a deep black band at first-floor level ties the two street elevations together. Above it the corner is softened into a curve, with a single incised line sweeping across the stone. A full-height glazed bay marks the entrance and carries the building's name.",
        images: [2, 3, 4],
      },
      {
        heading: "Upper floors",
        body:
          "The upper floors use regular punched openings with small balconies. They are kept quieter than the podium so the retail frontage reads first from the street, and the upper storeys sit back as a calm stone mass.",
        sheets: [6, 7, 8],
      },
    ],
    work: ["Designed from the first sketch", "Architectural design", "Façade design", "Floor plans and area diagrams", "Exterior presentation"],
    captions: { 1: "The corner at dusk — retail podium and stone upper floors" },
    gallery: [1, 5, 6, 7, 8, 9, 10],
    related: ["retail-market-complex", "commercial-restaurant-complex"],
    deck: {
      images: [1, 3],
      sheets: [5],
      points: ["Glazed retail podium wraps an irregular corner plot", "A full-height glazed bay marks the entrance", "Stone upper floors kept deliberately quiet"],
    },
  },
  {
    slug: "neoclassical-residence-extension",
    title: "Cornice House",
    kicker: "Residential · redesign of an existing villa",
    types: ["Residential", "Landscape"],
    focus: ["Technical Documentation", "Façade Design", "Architectural Planning"],
    tier: "featured",
    year: "2024–2025",
    stage: "Redesign — full architectural drawing set (28 sheets)",
    credit: MASTER,
    role: "Redesign & façades",
    intro:
      "An existing two-storey villa, redesigned in a restrained neoclassical language. I designed the redesign from the sketch stage — working between the existing building and the proposal — and designed the new façades. The drawing set places the existing floors next to the proposed ones and carries the design through to cornice profiles and wall sections.",
    sections: [
      {
        heading: "Existing & proposed",
        body:
          "The set records the existing ground and first floors next to the proposed plans, so the scope of the remodelling can be read sheet against sheet. A separate annex building has its own plans and section.",
        sheets: [4, 5, 6, 7, 11],
      },
      {
        heading: "Site & garden",
        body:
          "The site is an irregular plot with a curved front boundary. The site plan sets the pool, a sunken lounge and the garden terraces against the house, and the renderings show them as a sequence of outdoor rooms behind the main façade.",
        sheets: [2],
        images: [6, 7, 8],
      },
      {
        heading: "Façade language",
        body:
          "The main elevation is symmetrical about a double-height entrance bay. Pilasters and three cornice profiles organise the stone, and fine lines of hidden lighting trace the bay edges at night. Each of the four elevations is drawn with level datums and cornice references, so every moulding on the façade has a matching detail.",
        sheets: [14, 15, 16, 17],
        images: [1, 2],
      },
      {
        heading: "Construction details",
        body:
          "The detail sheets build up the assemblies layer by layer: 40 mm local stone, 30 mm thermal insulation and 100 mm hollow block in the typical wall sections; slab-on-grade with waterproofing membrane and underfloor heating; double-glazed window sections; pavement to asphalt; the three cornice profiles and the hidden-light recess.",
        sheets: [18, 20, 21, 22],
      },
    ],
    work: ["Redesign concept — existing vs. proposed", "Façade design", "Existing-condition and proposed plans", "Sections and elevations", "Door and window schedules", "Wall, slab and cornice details"],
    compare: {
      a: 4,
      b: 5,
      labelA: "Existing ground floor",
      labelB: "Proposed ground floor",
      note: "Both sheets come from the same drawing set. Switch between them to read the extent of the remodelling.",
    },
    captions: { 1: "Main elevation — symmetrical entrance bay with hidden-light detailing", 2: "The entrance bay" },
    gallery: [3, 4, 5, 9, 10, 11, 12],
    related: ["hillside-bim-residence", "arched-portal-residence"],
    deck: {
      images: [1, 6],
      sheets: [5, 20, 21],
      points: ["Existing villa redesigned — plans and façades", "Every façade moulding traced to a profile detail", "Wall and slab build-ups drawn layer by layer"],
    },
  },
  {
    slug: "gated-residential-community",
    title: "Al Tilal Compound",
    kicker: "Residential compound · entrance, streets and two villa types",
    types: ["Residential", "Landscape"],
    focus: ["Concept & Design", "Architectural Planning", "Façade Design"],
    tier: "large",
    role: "Full design",
    cover: 5,
    lead: true,
    year: "2025",
    location: "Amman, Jordan",
    stage: "Concept and design",
    credit: MASTER,
    intro:
      "A gated residential compound designed as one piece: the entrance, the street layout and two villa types — a detached villa and an attached pair — that repeat along the streets.",
    sections: [
      {
        heading: "The compound",
        body:
          "The compound is laid out on a regular street grid with rows of villas. Repeating two villa types with the same boundary walls, gates and planting gives every street a consistent rhythm.",
        images: [9, 5, 4, 8],
      },
      {
        heading: "Entrance",
        body:
          "The entrance is the compound's one landmark: a guard house under a deep timber-clad canopy, barriers on either side, and the compound name set into a stone wall.",
        images: [2, 1, 3],
      },
      {
        heading: "Type A · Detached villa",
        body:
          "A detached villa on a 500 m² plot, with a 300.20 m² ground floor. Parking and the entrance face the street, and the garden wraps the house on three sides.",
        images: [10, 11, 12, 13],
        sheets: [1, 2],
      },
      {
        heading: "Type B · Attached villas",
        body:
          "A mirrored pair of villas on a 750 m² plot — 296.65 m² on the ground floor and 292.10 m² on the first. The pair keeps the same street frontage, parking and entrance arrangement as Type A, so both types read as one street.",
        images: [14, 15, 16],
        sheets: [3, 4],
      },
    ],
    work: ["Designed from the first sketch", "Compound layout and entrance design", "Villa Type A and Type B — plans and façades", "Streetscape and landscape", "Visualization"],
    captions: { 2: "Compound entrance and guard house" },
    gallery: [6, 7],
    related: ["family-villa-compound", "pilaster-corner-villa"],
    deck: {
      images: [2, 7],
      sheets: [1, 3],
      points: ["Sole designer: compound, entrance and both villa types", "Two villa types repeat to give each street one rhythm", "The entrance canopy is the compound's landmark"],
    },
  },
  {
    slug: "residence-interior-execution",
    title: "Open-Plan Interior",
    kicker: "Interior architecture · ground floor of a family residence",
    types: ["Interiors", "Residential"],
    focus: ["Technical Documentation", "Concept & Design"],
    tier: "featured",
    cover: 4,
    stage: "Interior execution drawings (1:50)",
    intro:
      "An open-plan ground floor — living, dining and kitchen — designed in warm neutrals and dark timber, then documented as a 1:50 execution package covering ceilings, lighting, HVAC, flooring and every wall elevation.",
    sections: [
      {
        heading: "Spatial sequence",
        body:
          "Living, dining and kitchen share one long room, divided by furniture and a dark timber-clad column rather than walls. Service spaces are kept out of sight of the main rooms.",
        images: [1, 2, 4, 6],
        sheets: [2],
      },
      {
        heading: "Ceilings, lighting & services",
        body:
          "Separate sheets coordinate the ceiling layout, ceiling lighting, mechanical items and air-conditioning, so each trade works from its own plan. Lighting follows the furniture layout: pendant rings over the dining and living areas, and hidden strips in the ceiling coves and joinery.",
        sheets: [4, 5, 3, 6],
      },
      {
        heading: "Floors & sections",
        body:
          "The flooring plan sets out the tile grid with a panel detail and the selected finishes. Two long sections are paired with the renderings they describe, so every joinery wall can be checked against its image.",
        sheets: [7, 8, 9],
      },
      {
        heading: "Elevations",
        body:
          "Wall elevations are drawn for the kitchen and living area, the master bedroom and dressing, and the master and guest bathrooms, with built-in shelving, niches, rain showers and light strips dimensioned.",
        sheets: [10, 11, 12],
        images: [10, 12, 13],
      },
    ],
    work: ["Interior design", "Furniture and spatial layout", "Ceiling, lighting and HVAC coordination plans", "Flooring and finishes", "Interior elevations and sections"],
    captions: { 1: "Living room — the opening view of the ground floor", 16: "Laundry" },
    gallery: [3, 5, 7, 8, 9, 11, 14, 15, 16],
    related: ["family-residence-interior", "private-suites-interior"],
    deck: {
      images: [1, 4],
      sheets: [2, 5, 10],
      points: ["Open-plan ground floor divided by joinery, not walls", "Separate coordinated sheets for ceilings, lighting and HVAC", "Every joinery wall drawn as a 1:50 elevation"],
    },
  },
  {
    slug: "terraced-resort-hotel",
    title: "Terraced Hotel",
    kicker: "Hospitality · hotel and chalet zone on a coastal hillside",
    types: ["Hospitality", "Landscape"],
    focus: ["Concept & Design", "Façade Design"],
    tier: "large",
    year: "2022",
    location: "Aqaba, Jordan",
    credit: "Team project · Assi Office Architects",
    stage: "Architectural design",
    intro:
      "A resort hotel terraced into a desert hillside facing the sea, with a lower chalet zone and a chain of pools linking the two.",
    sections: [
      {
        heading: "Massing on the slope",
        body:
          "The main block steps back floor by floor, giving the upper floors deep terraces and letting the building follow the hill instead of standing against it. Bronze-toned bands zigzag across the white façade, tying the stepped balconies into one continuous line.",
        images: [2, 3, 4],
      },
      {
        heading: "Arrival & pools",
        body:
          "Guests arrive at a forecourt with a sculptural gateway and circular water features. Curved pool terraces then cascade from the hotel's lower floors toward the chalets, forming the main public space of the resort.",
        images: [5, 6, 7, 8],
      },
      {
        heading: "Chalet zone",
        body:
          "Below the hotel, a separate zone of two-storey chalets with timber screens and private terraces sits along a landscaped spine with its own entrance.",
        images: [9, 10, 11, 12],
      },
      {
        heading: "Site plan",
        body: "The site plan shows how the hotel, the pool terraces and the chalet zone share one wedge-shaped plot along the coast road, with the chalets clustered at the narrow southern end.",
        sheets: [1],
      },
    ],
    work: ["Contribution within the design team", "Massing and façade studies", "Landscape and pool terraces"],
    gallery: [1, 13],
    related: ["hospitality-wellness-interiors", "gated-residential-community"],
    deck: {
      images: [1, 6, 10],
      sheets: [1],
      points: ["Hotel block terraced into the hillside", "Cascading pools link hotel and chalets", "A single façade line ties the stepped balconies together"],
    },
  },
  {
    slug: "garment-manufacturing-campus",
    title: "Garment Factory",
    kicker: "Industrial · production hall, sampling, inspection and administration",
    types: ["Industrial", "Interiors"],
    focus: ["Concept & Design", "Architectural Planning"],
    tier: "featured",
    cover: 4,
    lead: true,
    credit: "Assi Office Architects",
    intro:
      "A large garment production facility designed around its working floor: a long steel-framed hall with cutting and sewing lines, plus sampling rooms, inspection areas, boardrooms and an administration wing.",
    sections: [
      {
        heading: "Organisation",
        body:
          "The production hall is a long, clear-span shed. Sampling, cutting, inspection and meeting rooms sit alongside it, and the administration offices and reception are part of the same building.",
        images: [1, 4, 3],
      },
      {
        heading: "Production floor",
        body:
          "Sewing lines run the length of the hall under a regular structural grid, with continuous linear lighting following the rows. Cutting tables and sampling rooms are fitted into the same grid, so the layout can be reconfigured line by line.",
        images: [9, 10, 11, 12],
      },
      {
        heading: "Arrival",
        body:
          "The reception is the one soft space in the building: timber screens, planting and lounge seating set against the industrial structure, with views through to the production floor.",
        images: [6, 7, 8],
      },
    ],
    work: ["Exterior design", "Interior design — production, sampling, boardrooms and reception", "Industrial planning", "Visualization"],
    gallery: [2, 5],
    related: ["corporate-workplace-interior", "industrial-headquarters"],
    deck: {
      images: [1, 9],
      sheets: [],
      points: ["Clear-span production hall on a regular grid", "Support rooms line the hall edge with views onto the floor", "Administration and reception at the front"],
    },
  },
  {
    slug: "corporate-workplace-interior",
    title: "Factory Offices",
    kicker: "Interior architecture · administration floor of a manufacturing company",
    types: ["Interiors", "Industrial"],
    focus: ["Concept & Design", "Architectural Planning"],
    lead: true,
    tier: "case",
    cover: 7,
    credit: "Assi Office Architects",
    intro:
      "The administration floor of a manufacturing company, planned as one connected workplace: open studios, executive offices, meeting rooms and staff spaces arranged along a glazed spine that overlooks the production floor.",
    sections: [
      {
        heading: "Open workspace",
        body:
          "The open offices use long, curved desks set between full-height library shelving and planted walls. The shelving doubles as storage and as a partition, so teams have their own zone without closed rooms.",
        images: [1, 2, 3, 4, 5],
      },
      {
        heading: "Offices & meeting rooms",
        body:
          "Executive and management offices sit behind glass along the circulation spine. Two meeting rooms share timber slat walls and integrated screens.",
        images: [10, 11, 12, 8, 9],
      },
      {
        heading: "Shared spaces",
        body:
          "A display lounge for visitors, a staff canteen and a glazed corridor complete the floor. The palette stays consistent throughout — light timber, grey stone flooring and glass — with the company's blue used only as an accent.",
        images: [6, 7, 13, 14],
      },
    ],
    work: ["Interior design", "Workplace planning", "Furniture layout", "Visualization"],
    gallery: [],
    related: ["garment-manufacturing-campus", "residence-interior-execution"],
    deck: {
      images: [1, 11],
      sheets: [],
      points: ["Library shelving used as partitions in the open studios", "Executive offices overlook the production floor", "One material palette across every room"],
    },
  },

  {
    slug: "waterfront-promenade-aqaba",
    title: "Aqaba Promenade",
    kicker: "Public realm · waterfront promenade and mixed-use frontage",
    types: ["Commercial & Mixed-Use", "Landscape"],
    focus: ["Concept & Design", "Architectural Planning"],
    tier: "large",
    year: "2024",
    location: "Aqaba, Jordan",
    credit: "Team project",
    stage: "Architectural design",
    intro:
      "A linear waterfront development on the Aqaba coast: a public promenade between the coast road and the sea, lined with mixed-use buildings and anchored by a tiered landmark building at the water's edge.",
    sections: [
      {
        heading: "A linear site",
        body:
          "The site is a long, narrow strip between the coast road and the water. The site plan arranges it as a continuous promenade with buildings on the landward side and public spaces, piers and moorings on the seaward side, so the waterfront stays open along its whole length.",
        sheets: [1],
        images: [1, 2],
      },
      {
        heading: "Frontage & landmark",
        body:
          "Three-storey mixed-use buildings with deep balconies and shaded ground floors line the promenade. At the centre, a circular building rises in stacked terraces to a lookout tower, giving the long frontage a single landmark that is visible from the water.",
        images: [3, 4, 5],
      },
      {
        heading: "Public spaces",
        body:
          "Along the promenade the walk opens into plazas with sculptural shade canopies, water features, a pool deck, pergolas and planted terraces. Timber boardwalks and moorings bring the public route down to the water.",
        images: [6, 7, 8, 9, 10, 11],
      },
    ],
    work: ["Contribution within the design team"],
    gallery: [12],
    related: ["terraced-resort-hotel", "gated-residential-community"],
    deck: {
      images: [1, 4],
      sheets: [1],
      points: ["Continuous public promenade along a narrow coastal strip", "Tiered landmark building anchors the frontage", "Plazas, shade canopies and moorings bring the public to the water"],
    },
  },

  /* ───────────── CASE STUDIES ───────────── */
  {
    slug: "reception-interior-shop-drawings",
    title: "Relief Wall Interior",
    kicker: "Interior architecture · shop drawings for a reception room",
    types: ["Interiors", "Residential"],
    focus: ["Technical Documentation", "Concept & Design"],
    tier: "case",
    stage: "Interior shop drawings",
    intro:
      "A living and dining room on an angled plan, carried from renderings to a full set of interior shop drawings: plans, ceilings, lighting, flooring, wall sections and joinery details.",
    sections: [
      {
        heading: "Design",
        body:
          "The room is organised around a fireplace wall with a sculpted botanical relief and a dark accent pier, facing a curved sofa group. The dining area sits on the far side under its own chandelier, against panelled walls with moulded frames.",
        images: [1, 2, 3],
      },
      {
        heading: "Plans",
        body:
          "Separate sheets fix the general dimensions of the faceted outer wall, the furniture layout, the ceiling with its air grilles, the ceiling lighting (chandeliers, downlights, spots, wall lights and hidden strips, with a legend) and the timber strip flooring.",
        sheets: [1, 2, 3, 4, 5, 6],
      },
      {
        heading: "Sections & details",
        body:
          "Four sections unfold each wall with its panelling, shelving, relief panel and light positions dimensioned. Details A, B and C cover the ceiling cove, the shadow gap and the cornice profile.",
        sheets: [7, 8, 9, 10],
      },
    ],
    work: ["Interior design", "Interior shop drawings", "Lighting and ceiling layouts", "Joinery and wall sections"],
    gallery: [4, 5, 6],
    related: ["residence-interior-execution", "family-residence-interior"],
  },
  {
    slug: "family-villa-compound",
    title: "Family Compound",
    kicker: "Residential · three villas on a shared site",
    types: ["Residential", "Landscape"],
    focus: ["Architectural Planning", "Technical Documentation"],
    tier: "large",
    role: "Full design",
    credit: MASTER,
    intro:
      "Three family villas planned together on one corner site, sharing an access road, landscape and a common architectural language while keeping separate gardens and pools.",
    sections: [
      {
        heading: "Site plan",
        body:
          "The compound site plan groups the three villas on one corner site with shared access, each house keeping its own pool and private garden. The site plan carries a planting and green-area table alongside the levels.",
        sheets: [1],
        images: [1, 2, 3],
      },
      {
        heading: "Villas",
        body:
          "Each villa has its own basement and ground floor plans. The façades share pale stone, framed entrance bays and pergola-covered terraces, so the three houses read as one family group.",
        sheets: [2, 3, 4, 5, 6, 7],
        images: [4, 5, 6],
      },
    ],
    work: ["Designed from the first sketch", "Design of all three villas — plans and exteriors", "Site planning", "Landscape"],
    gallery: [7, 8, 9, 10],
    related: ["gated-residential-community"],
  },
  {
    slug: "sculpted-volumes-villa",
    title: "Volumes House",
    kicker: "Residential · hillside villa and terraced landscape",
    types: ["Residential", "Landscape"],
    focus: ["Concept & Design", "Façade Design"],
    tier: "case",
    role: "Exterior design",
    year: "2023–2024",
    location: "Amman, Jordan",
    intro:
      "A villa built up from interlocking volumes in light stone and dark bronze-toned cladding, with the garden worked into the slope as a series of stepped terraces.",
    sections: [
      {
        heading: "Massing",
        body:
          "Each part of the house is expressed as its own block. Light stone volumes interlock with dark-clad ones, and deep canopies project over the entry and parking. The composition changes from every corner of the site rather than presenting one main face.",
        images: [1, 2, 3, 4, 5],
      },
      {
        heading: "Landscape",
        body:
          "The slope is handled with stone retaining walls and lit stairs between garden levels. Pergolas, a barbecue terrace and seating areas sit on the upper terraces, where the view opens out.",
        images: [7, 8, 9, 10],
      },
    ],
    work: ["Exterior design", "Massing studies", "Landscape design", "Presentation"],
    gallery: [6],
    related: ["stone-screen-residence", "terraced-garden-villa"],
  },
  {
    slug: "courtyard-pool-residence",
    title: "Pool Court House",
    kicker: "Residential · villa organised around a central pool court",
    types: ["Residential", "Landscape"],
    focus: ["Concept & Design", "Façade Design", "Architectural Planning"],
    lead: true,
    tier: "featured",
    role: "Full design",
    year: "2026",
    credit: MASTER,
    intro:
      "A two-storey villa wrapped around a pool court. The plan pulls the outdoor space into the middle of the house, and the street façade stays formal and screened.",
    sections: [
      {
        heading: "Plan",
        body:
          "Ground floor, first floor and roof plans.",
        sheets: [1, 2, 3],
      },
      {
        heading: "Façade",
        body:
          "Stone pilasters, layered cornices and perforated stone panels give the street elevation a classical order without literal ornament. A tall screened bay marks the entrance.",
        images: [1, 2, 4],
      },
      {
        heading: "Courtyard",
        body:
          "Floor-to-ceiling glazing opens the double-height living room onto the pool court. A water wall with a circular screen closes the court's far side.",
        images: [3, 5, 6],
      },
    ],
    work: ["Designed from the first sketch", "Architectural design", "Space planning", "Façade design", "Landscape"],
    gallery: [7, 8],
    related: ["stone-screen-residence", "pilaster-corner-villa"],
    deck: {
      images: [1, 3],
      sheets: [1],
      points: ["A pool court on the garden side", "Double-height glazing opens the living room onto the court", "Formal, screened street façade"],
    },
  },
  {
    slug: "arched-stone-residence",
    title: "Arch House",
    kicker: "Residential · villa with a carved stone entrance arch",
    types: ["Residential"],
    focus: ["Façade Design", "Architectural Planning"],
    lead: true,
    tier: "featured",
    role: "Full design",
    year: "2026",
    credit: MASTER,
    intro:
      "A symmetrical stone villa centred on a tall pointed-arch entrance framed in carved geometric panels — a contemporary reading of a traditional façade.",
    sections: [
      {
        heading: "Façade",
        body:
          "The front elevation is a strict symmetry of stone piers and cornices around the arched entrance. The carved panels are confined to the frames of the arch and the corner piers, so the ornament reads as a concentrated detail rather than a surface pattern.",
        images: [1, 2, 3],
      },
      {
        heading: "Plans",
        body:
          "First floor, basement and roof plans.",
        sheets: [1, 2, 3],
        images: [4, 7],
      },
    ],
    work: ["Designed from the first sketch", "Architectural design", "Façade design", "Space planning"],
    gallery: [5, 6, 8],
    related: ["arched-portal-residence"],
    deck: {
      images: [1, 2],
      sheets: [1],
      points: ["Symmetrical stone façade around a pointed-arch entrance", "Carved panels concentrated on the arch frame and corner piers", "Plans for the basement, first floor and roof"],
    },
  },
  {
    slug: "pilaster-corner-villa",
    title: "Pilaster House",
    kicker: "Residential · corner villa with a garden pool",
    types: ["Residential", "Landscape"],
    focus: ["Façade Design", "Architectural Planning"],
    lead: true,
    tier: "case",
    role: "Full design",
    year: "2026",
    location: "Amman, Jordan",
    credit: MASTER,
    intro:
      "A villa on a curved corner plot. Paired stone pilasters carry the façade, and the garden pool is screened by carved panels.",
    sections: [
      {
        heading: "Corner plot",
        body:
          "The plans sit the house against the straight boundaries and give the curved corner of the plot to the garden and pool.",
        sheets: [1, 2, 3],
      },
      {
        heading: "Façade & garden",
        body:
          "Tall pilasters frame full-height glazing on both street elevations, and a dark entrance bay breaks the symmetry. Around the pool, carved stone screens give privacy to the double-height living room.",
        images: [1, 2, 4, 5],
      },
    ],
    work: ["Designed from the first sketch", "Architectural design", "Space planning", "Façade design"],
    gallery: [3, 6, 7, 8],
    related: ["courtyard-pool-residence", "arched-stone-residence"],
  },
  {
    slug: "arched-portal-residence",
    title: "Portal House",
    kicker: "Residential · classical villa with a deep entrance portal",
    types: ["Residential", "Landscape"],
    focus: ["Façade Design", "Architectural Planning"],
    lead: true,
    tier: "case",
    role: "Full design",
    year: "2026",
    credit: MASTER,
    intro:
      "A classical villa organised around a deep arched portal, with darker stone inlays marking the window bays and a landscaped rear court.",
    sections: [
      {
        heading: "Façade",
        body:
          "The arched portal is pushed forward of the main wall and runs the full height of the house, framing the door and the window above it. A secondary arch at the garden gate repeats the motif at a smaller scale.",
        images: [1, 2, 4],
      },
      {
        heading: "Plans",
        body: "Ground, first, roof and basement plans.",
        sheets: [1, 2, 4, 3],
      },
      { heading: "Rear court", body: "The rear court is laid out around a water wall, dining terrace and planted beds.", images: [5, 6] },
    ],
    work: ["Designed from the first sketch", "Architectural design", "Space planning", "Façade design", "Landscape"],
    gallery: [3, 7],
    related: ["neoclassical-residence-extension", "arched-stone-residence"],
  },
  {
    slug: "family-residence-interior",
    title: "Family House Interior",
    kicker: "Interior architecture · reception, family living and private suites",
    types: ["Interiors", "Residential"],
    focus: ["Concept & Design"],
    tier: "case",
    intro:
      "Complete interiors for a multi-level family house, from the formal reception room through an open family floor to the bedroom suites and a roof apartment.",
    sections: [
      {
        heading: "Family living",
        body:
          "The family floor is one open room: a living area with a fireplace, a long dining table and a kitchen with a central island. Timber fins and a dropped ceiling define each zone without separating them.",
        images: [1, 2, 3, 4],
      },
      {
        heading: "Stair",
        body: "The stair is treated as a lit sculpture: vertical panels with recessed light slots rise beside floating treads lit from below.",
        images: [5, 6],
      },
      {
        heading: "Reception",
        body:
          "The formal reception is more classical: patterned rugs, carved screens and a separate dining area, kept apart from the family rooms.",
        images: [7, 8, 9],
      },
      {
        heading: "Private suites",
        body:
          "The master suite pairs timber wall panelling with a walk-in dressing room and a bathroom in blue-veined stone. The roof apartment repeats the open-plan arrangement at a smaller scale.",
        images: [10, 11, 12, 13, 14, 15],
      },
    ],
    work: ["Interior design", "Spatial layout", "Material and lighting concept", "Presentation"],
    captions: { 16: "Service spaces were designed with the same care: the laundry" },
    gallery: [16],
    related: ["residence-interior-execution", "private-suites-interior"],
  },
  {
    slug: "hospitality-wellness-interiors",
    title: "Spa & Pool Interiors",
    kicker: "Interior architecture · spa, indoor pool and fitness centre",
    types: ["Interiors", "Hospitality"],
    focus: ["Concept & Design"],
    tier: "case",
    intro:
      "The wellness floor of a seafront hospitality project: a spa with treatment rooms and a relaxation lounge, an indoor pool zone and a fitness centre, each with its own reception.",
    sections: [
      {
        heading: "Spa",
        body:
          "The spa moves from reception through treatment rooms and a sauna to a lounge and plunge pool facing the sea. Timber slats, moss walls and warm indirect light carry through every room.",
        images: [1, 2, 3, 4, 5, 6],
      },
      {
        heading: "Indoor pool",
        body:
          "Along the pool hall, a stepped timber wall with vertical light slots contrasts with grey stone floors. The loungers face a long window to the sea.",
        images: [7, 8, 9],
      },
      { heading: "Fitness", body: "The gym is organised in zones — weights, cardio by the windows, and a separate studio — with bold graphic walls.", images: [10, 11, 12] },
    ],
    work: ["Interior design", "Spatial planning", "Presentation"],
    gallery: [],
    related: ["terraced-resort-hotel", "family-residence-interior"],
  },
  {
    slug: "screened-facade-villa",
    title: "Grey Band House",
    kicker: "Residential · villa with a patterned screen panel",
    types: ["Residential"],
    focus: ["Façade Design", "Architectural Planning"],
    tier: "additional",
    cover: 7,
    role: "Full design",
    year: "2026",
    credit: MASTER,
    intro:
      "A light stone villa with grey stone bands, where a tall patterned screen panel and the upper terrace planting give the elevations depth.",
    sections: [
      { heading: "Façade", body: "Grey stone frames pick out the entrance and the upper bay, and the tall patterned screen is lit from behind at night.", images: [1, 2, 3, 4] },
      { heading: "Plans", body: "Basement, furnished ground floor, first floor and roof plans.", sheets: [1, 2, 3, 4] },
    ],
    work: ["Designed from the first sketch", "Exterior design", "Space planning", "Presentation"],
    gallery: [5, 6],
    related: ["stone-screen-residence"],
  },

  {
    slug: "facade-options-villa",
    title: "Five Façades",
    kicker: "Residential · five façade proposals for one villa",
    types: ["Residential"],
    focus: ["Concept & Design", "Façade Design"],
    tier: "case",
    role: "Full design",
    intro:
      "A villa designed from the first sketch, presented with five façade proposals for the same street front. Each option tests a different material palette and a different composition of frame, screen and glazing.",
    sections: [],
    options: {
      heading: "One house, five answers",
      note: "Switch between the proposals to compare how material and framing change the character of the same front.",
      items: [
        { i: 1, label: "White marble frame" },
        { i: 2, label: "Stone with planted terrace" },
        { i: 3, label: "Grey stone & white band" },
        { i: 4, label: "Grey stone & perforated panel" },
        { i: 5, label: "Perforated white screen" },
      ],
    },
    work: ["Designed from the first sketch", "Façade design — five options", "Presentation"],
    related: ["stone-screen-residence"],
  },
  {
    slug: "minimalist-chalet",
    title: "Minimal Chalet",
    kicker: "Residential · chalet with pool, water feature and fire-pit lounge",
    types: ["Residential", "Landscape"],
    focus: ["Concept & Design", "Façade Design"],
    tier: "case",
    cover: 11,
    role: "Full design",
    year: "2024",
    location: "Amman, Jordan",
    intro:
      "A minimalist chalet built on simplicity and open space. Large openings connect the living areas to the garden, and natural materials such as wood and stone give the exterior a modern, warm character.",
    sections: [
      { heading: "Outdoor living", body: "A sunken fire-pit lounge, a pool with a water feature and a timber pergola organise the garden into outdoor rooms.", images: [2, 3, 10] },
    ],
    work: ["Designed from the first sketch", "Exterior design", "Landscape", "Presentation"],
    related: ["terraced-garden-villa"],
  },

  /* ───────────── ADDITIONAL WORK ───────────── */
  {
    slug: "courtyard-garden-villa",
    title: "Garden House",
    kicker: "Residential · modern villa and walled garden",
    types: ["Residential", "Landscape"],
    focus: ["Concept & Design", "Architectural Planning"],
    tier: "additional",
    role: "Full design",
    year: "2026",
    intro: "A compact two-storey villa in white render with dark canopies, set in a walled garden with terraces, a pool and a garden pavilion.",
    sections: [{ heading: "Plans", body: "Ground and first floor plans on a structural grid.", sheets: [1, 2] }],
    work: ["Designed from the first sketch", "Exterior design", "Space planning", "Landscape"],
    gallery: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    slug: "arcade-corner-residence",
    title: "Arcade House",
    kicker: "Residential · villa with a ground-floor arcade",
    types: ["Residential"],
    focus: ["Façade Design"],
    tier: "additional",
    role: "Sketch revision & exterior",
    intro: "A white villa on a corner site with a continuous arcade along its ground floor, arched upper windows and a tall glazed bay.",
    sections: [],
    work: ["Revisions to the plan sketch", "Exterior design", "Presentation"],
    gallery: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    slug: "terraced-garden-villa",
    title: "Roof Garden Chalet",
    kicker: "Residential · chalet with pool court and roof gardens",
    types: ["Residential", "Landscape"],
    focus: ["Concept & Design", "Façade Design"],
    tier: "additional",
    role: "Exterior design",
    year: "2024",
    location: "Amman, Jordan",
    intro: "A weekend chalet in white and timber-toned panels, built around a pool court with a screened pergola lounge and planted roof terraces.",
    sections: [],
    work: ["Exterior design", "Landscape", "Presentation"],
    gallery: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    slug: "arched-loggia-villa",
    title: "Loggia House",
    kicker: "Residential · classical villa with arched loggias",
    types: ["Residential"],
    focus: ["Façade Design", "Architectural Planning"],
    tier: "case",
    role: "Full design",
    lead: true,
    stage: "Under construction",
    built: {
      status: "Under construction",
      note: "Designed from the first sketch through to execution. On site, the full-height framed arch, the arched loggias and the stone cladding are built as drawn; interior works are still in progress.",
      pairs: [
        { render: 1, photo: "m/arched-loggia-villa/b01.jpg", label: "Entrance frontage" },
        { render: 2, photo: "m/arched-loggia-villa/b02.jpg", label: "The framed arch" },
      ],
      photos: ["m/arched-loggia-villa/b03.jpg"],
      video: { src: "m/arched-loggia-villa/v01.mp4", poster: "m/arched-loggia-villa/v01.jpg" },
    },
    year: "2025",
    intro: "A villa now under construction, with a full-height framed arch at the entrance and open arched loggias to the side garden.",
    sections: [{ heading: "Plans", body: "Ground and first floor plans set on the site.", sheets: [1, 2] }],
    work: ["Designed from the first sketch", "Exterior design", "Space planning"],
    gallery: [1, 2, 3, 4, 5, 6],
  },
  {
    slug: "single-storey-classical-residence",
    title: "Long House",
    kicker: "Residential · single-storey villa on a sloping street",
    types: ["Residential"],
    focus: ["Façade Design"],
    tier: "case",
    lead: true,
    role: "Façade design",
    stage: "Built",
    credit: MASTER,
    built: {
      status: "Built",
      note: "The finished house matches the design: the raised entrance portal, the cornice lines, the rusticated stone panels on the boundary wall and the grouping of the windows were all carried through to site.",
      pairs: [{ render: 1, photo: "m/single-storey-classical-residence/b01.jpg", label: "Street elevation" }],
      video: { src: "m/single-storey-classical-residence/v01.mp4", poster: "m/single-storey-classical-residence/v01.jpg" },
    },
    year: "2024",
    location: "Amman, Jordan",
    intro: "A built single-storey villa: a long in white stone frontage with classical cornices and wrought-iron balconettes, its garage set into the fall of the street.",
    sections: [],
    work: ["Exterior façade design", "Elevations and boundary wall", "Visualization"],
    gallery: [1, 2, 3, 4, 5, 6],
  },
  {
    slug: "private-suites-interior",
    title: "Bedroom Suites",
    kicker: "Interior architecture · bedrooms, children's room and bathrooms",
    types: ["Interiors", "Residential"],
    focus: ["Concept & Design"],
    tier: "additional",
    intro: "Bedroom suites and bathrooms in a soft neutral palette, including a children's room with a raised sleeping loft and built-in study.",
    sections: [],
    work: ["Interior design", "Joinery layout"],
    gallery: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    slug: "retail-market-complex",
    title: "Market Building",
    kicker: "Commercial · four-storey market building",
    types: ["Commercial & Mixed-Use"],
    focus: ["Concept & Design", "Façade Design"],
    tier: "additional",
    role: "Exterior design",
    intro: "A four-storey retail building with a curved glazed corner, a fully glazed market floor at street level and escalators linking the shopping floors.",
    sections: [],
    work: ["Exterior design", "Presentation"],
    gallery: [1, 2, 3, 4, 5, 6],
  },
  {
    slug: "commercial-restaurant-complex",
    title: "Terrace Commercial Building",
    kicker: "Commercial · shops, restaurant and offices",
    types: ["Commercial & Mixed-Use"],
    focus: ["Concept & Design", "Façade Design"],
    tier: "additional",
    role: "Exterior design",
    intro: "A commercial complex in warm stone and glazing, with dark horizontal louvres, a curved canopy over the shopfronts and a raised restaurant terrace.",
    sections: [],
    work: ["Exterior design", "Presentation"],
    gallery: [1, 2, 3, 4, 5],
  },
  {
    slug: "industrial-headquarters",
    title: "Timber Trade Offices",
    kicker: "Industrial · administration building for a wood trading company",
    types: ["Industrial", "Commercial & Mixed-Use"],
    focus: ["Concept & Design", "Façade Design"],
    tier: "additional",
    role: "Exterior design",
    intro: "A three-storey office building for an industrial company, set in front of its warehouse. A stone-clad signage wall and a timber-screened glazed bay mark the entrance.",
    sections: [],
    work: ["Exterior design", "Presentation"],
    gallery: [1, 2, 3, 4, 5, 6],
  },
];

export const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

export const PROJECT_TYPES: ProjectType[] = ["Residential", "Commercial & Mixed-Use", "Industrial", "Hospitality", "Interiors", "Landscape"];
export const FOCUS: Focus[] = ["Concept & Design", "Façade Design", "Architectural Planning", "Technical Documentation", "BIM / Revit"];

/* Selected-work editorial order */
export const SELECTED = [
  "stone-screen-residence",
  "hillside-bim-residence",
  "courtyard-pool-residence",
  "neoclassical-residence-extension",
  "arched-stone-residence",
  "corner-commercial-building",
  "garment-manufacturing-campus",
  "residence-interior-execution",
  "sculpted-volumes-villa",
];

export const LARGE = ["waterfront-promenade-aqaba", "terraced-resort-hotel", "family-villa-compound"];

export const HERO = { slug: "stone-screen-residence", image: 15 };
