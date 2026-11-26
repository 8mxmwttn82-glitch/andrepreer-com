export const site = {
  name: "Andre Preer",
  person: "Andre M. Preer II",
  url: "https://andrepreer.com",
  phoneDisplay: "309-431-1805",
  phoneTel: "+13094311805",
  altPhoneDisplay: "702-232-6150",
  altPhoneTel: "+17022326150",
  email: "belicimo8@gmail.com",
  area: "Springfield and Central Illinois",
  locality: "Springfield",
  region: "IL",
};

export const nav = [
  { href: "/services/", label: "Services" },
  { href: "/portfolio/", label: "Work" },
  { href: "/process/", label: "Process" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export interface Photo {
  id: string;
  alt: string;
  caption: string;
}

export const photos: Record<string, Photo> = {
  "residential-home-dusk": {
    id: "residential-home-dusk",
    alt: "Two-story house with light siding, a dark roof, and a wet driveway at dusk, with lawn and a young tree in front. Reference photograph, not an Andre Preer project.",
    caption: "A residential front at dusk. Reference photograph — not a finished Andre Preer project, and not his address.",
  },
  "stone-home-and-lawn": {
    id: "stone-home-and-lawn",
    alt: "Stone-clad house, curved driveway, and a broad lawn with young trees. Reference photograph, not an Andre Preer project.",
    caption: "Stone-clad house and lawn. Reference photograph — not a documented project and not identified as a Springfield property.",
  },
  "stone-home-plantings": {
    id: "stone-home-plantings",
    alt: "Foundation shrubs and a young tree in a lawn in front of a stone-clad house. Reference photograph, not an Andre Preer project.",
    caption: "Foundation planting against a stone house. Reference photograph — not a completed planting by Andre.",
  },
  "front-entry-planting": {
    id: "front-entry-planting",
    alt: "Front entry of a house with a young tree, a small planted bed, and a strip of lawn. Reference photograph, not an Andre Preer project.",
    caption: "A front walk, young tree, and entry bed. Reference photograph — not a client site.",
  },
  "soil-and-hand-tools": {
    id: "soil-and-hand-tools",
    alt: "Potting soil, a hand scoop, pruning shears, and a small planted pot on a work table. Reference photograph, not a completed planting.",
    caption: "Soil and hand tools. Reference photograph of materials, not a finished bed.",
  },
  "interior-living-room": {
    id: "interior-living-room",
    alt: "Bright living room with a sofa, a stair, and windows looking onto trees. Reference photograph, not an Andre Preer project.",
    caption: "An interior that opens toward trees. Reference photograph — not a room Andre finished.",
  },
};

export interface Service {
  slug: string;
  name: string;
  title: string;
  description: string;
  summary: string;
  h1: string;
  problem: string;
  solution: string;
  benefits: string[];
  projects: string[];
  image: string | null;
  related: string[];
}

export const services: Service[] = [
  {
    slug: "landscape-design-installation",
    name: "Landscape design & installation",
    title: "Landscape Design & Installation in Springfield, IL | Andre Preer",
    description:
      "Andre Preer designs and installs residential landscapes in Springfield and Central Illinois — beds, trees, walks, and the surfaces that tie them to the house.",
    summary: "A yard planned and installed as one job, sized to the house and the way you use it.",
    h1: "Landscape design and installation",
    problem:
      "A lot of yards are leftovers: a lawn, a few shrubs from different years, and a walk that doesn’t quite meet the door. Adding one more bed doesn’t fix how the place works.",
    solution:
      "Andre walks the property first, then designs and installs the landscape as one plan — planting, circulation, and the hard surfaces that organize them — instead of dropping a single feature in isolation.",
    benefits: [
      "The person who walked the yard is the person carrying the plan through installation.",
      "Planting and hardscape are decided together, so a wall is not an afterthought and a bed is not filling a gap.",
      "The work is aimed at Central Illinois houses: sun, grade, and a long stretch of the year when you are mostly looking at structure.",
    ],
    projects: [
      "A front yard with a clearer walk to the door and beds that hold up after the flowers are gone",
      "A backyard sorted into lawn, planting, and a place to sit",
      "A property plan that also includes walls, a patio, or a fire feature when those belong in the same picture",
    ],
    image: "front-entry-planting",
    related: ["trees-shrubs-roses", "patios-hardscaping-outdoor-living"],
  },
  {
    slug: "trees-shrubs-roses",
    name: "Trees, shrubs, roses & planting",
    title: "Trees, Shrubs & Rose Planting in Springfield, IL | Andre Preer",
    description:
      "Planting for Springfield homes: trees, shrubs, roses, and seasonal color placed for structure, bloom, and how the bed will look once it grows in.",
    summary: "Trees, shrubs, roses, and seasonal color, placed for structure now and for the size they will reach.",
    h1: "Trees, shrubs, roses, and planting",
    problem:
      "Plants bought one Saturday at a time rarely add up to a bed. They crowd the walk, hide the foundation, or leave the yard bare from November to April.",
    solution:
      "Planting is layered: trees and larger shrubs for structure, roses and smaller plants for bloom, and room left for the mature size. It can stand alone or sit inside a larger landscape plan.",
    benefits: [
      "Beds are composed, not filled. You can see what is meant to be the backbone and what is meant to flower.",
      "Placement accounts for sun, grade, and the views you actually have from the windows and the walk.",
      "Roses and seasonal color are part of the planting, not a separate catalog you have to reconcile later.",
    ],
    projects: [
      "Foundation planting that frames the house without swallowing it",
      "A rose and shrub bed with something happening besides the June bloom",
      "Trees placed for shade, screening, or a view — with the lawn and walks adjusted around them",
    ],
    image: "soil-and-hand-tools",
    related: ["landscape-design-installation", "limestone-walls-stonework"],
  },
  {
    slug: "limestone-walls-stonework",
    name: "Limestone walls & stonework",
    title: "Limestone Walls & Stonework in Springfield, IL | Andre Preer",
    description:
      "Limestone retaining walls and decorative stonework for Springfield and Central Illinois homes — grade, beds, and outdoor rooms in one material.",
    summary: "Structural and decorative limestone that holds grade, edges a bed, or frames an outdoor room.",
    h1: "Limestone walls and decorative stonework",
    problem:
      "A slope that washes, a bed with no edge, or a patio that sits awkwardly against the lawn. A timber wall or a loose row of block solves the grade and still looks like it was added later.",
    solution:
      "Limestone walls, structural or decorative, set so they do a job and still read as part of the house. The stone can hold grade, edge planting, or define the side of an outdoor room.",
    benefits: [
      "The wall is drawn with the planting and the walk, so it is not a separate ticket from a different crew.",
      "Limestone is a Midwestern material. It suits the houses around Springfield without pretending to be something else.",
      "Decorative stone and working walls can be the same vocabulary, instead of a pretty face on one side of the yard and a utility wall on the other.",
    ],
    projects: [
      "A low retaining wall that levels a side yard or a front slope",
      "Stone edging that gives a bed a finished line against lawn or gravel",
      "Walls that form the side of a patio, a fire area, or a change in grade you walk through",
    ],
    image: "stone-home-and-lawn",
    related: ["patios-hardscaping-outdoor-living", "specialty-stone-water"],
  },
  {
    slug: "patios-hardscaping-outdoor-living",
    name: "Patios, hardscaping & outdoor living",
    title: "Patios & Outdoor Living in Springfield, IL | Andre Preer",
    description:
      "Patios, walks, and outdoor living spaces in Springfield, planned with the planting and the house instead of poured as a single slab.",
    summary: "Patios, walks, and seating laid out for how you actually move between the house and the yard.",
    h1: "Patios, hardscaping, and outdoor living",
    problem:
      "A patio poured in the obvious rectangle often misses the door you use, the evening shade, and the way people sit. The yard is still a lawn with a pad on it.",
    solution:
      "Hardscape is planned with the planting and the rooms inside: where you step out, where you walk, where a chair actually gets used. A patio can be the whole project or one part of a larger plan.",
    benefits: [
      "Circulation, seating, and beds are one layout, so you are not left to invent the rest after the concrete cures.",
      "The work is scaled to a real house, not a showpiece terrace that only looks right in a photograph.",
      "Stone, walks, and planting share the same plan, which is the difference between a pad and an outdoor room.",
    ],
    projects: [
      "A patio or terrace just outside the door you actually use",
      "Walks that connect the drive, the entry, and the back without a leftover strip of mud",
      "An outdoor sitting area planned together with walls, planting, or a fire feature",
    ],
    image: "stone-home-plantings",
    related: ["fire-features", "landscape-design-installation"],
  },
  {
    slug: "fire-features",
    name: "Fire features & gathering spaces",
    title: "Fire Pits & Fire Decks in Springfield, IL | Andre Preer",
    description:
      "Fire pits, fire decks, and outdoor fire features for gathering in Springfield and Central Illinois, planned with seating and the rest of the yard.",
    summary: "Fire pits, fire decks, and gathering spaces with somewhere to sit and a way to reach them.",
    h1: "Fire features and gathering spaces",
    problem:
      "A fire pit dropped in the middle of the lawn is a ring of block and a long walk in the dark. The evenings you wanted it for still happen in the kitchen.",
    solution:
      "Fire pits, fire decks, and outdoor fire features are designed as places to gather: the fire, the seating, and the path from the house considered together. Warmth and a reason to be outside after the light goes.",
    benefits: [
      "Seating and circulation are part of the feature, not furniture you figure out afterward.",
      "The fire can sit with a patio, a wall, or the planting, so it belongs to the yard.",
      "It is planned for Central Illinois evenings — a real part of the outdoor room, not a centerpiece with nowhere to put your feet.",
    ],
    projects: [
      "A fire pit with seating as part of a patio",
      "A fire deck or gathering space built for a small group, not a resort terrace",
      "An evening spot tied back to the door, the grade, and the rest of the landscape",
    ],
    image: null,
    related: ["patios-hardscaping-outdoor-living", "limestone-walls-stonework"],
  },
  {
    slug: "specialty-stone-water",
    name: "Specialty stone & water features",
    title: "Specialty Stone & Water Features in Springfield, IL | Andre Preer",
    description:
      "Specialty pebble and stone detail, creek-like walks, and waterfall stonework for Springfield homes — indoors or out, when the project calls for it.",
    summary: "Miniature cobble, pebble paths, and waterfall stonework when a project needs that level of detail.",
    h1: "Specialty pebble, stone, and water features",
    problem:
      "Some projects need a detail the usual hardscape palette does not cover: a path that should feel like water, a small run of stone indoors, a waterfall over rock rather than a plastic basin.",
    solution:
      "Alongside walls, planting, and outdoor living, Andre does highly detailed stone work. One example he describes is miniature cobble and small pebbles set as a walk from a main hallway into a guest bathroom, the surface reading like a flowing creek, then rising into a waterfall that spills over stone. That kind of detail is available indoors or out. It is not the whole practice.",
    benefits: [
      "The fine stone work can be part of a full landscape plan instead of a novelty hired from somewhere else.",
      "Pebble, cobble, and waterfall stone are used when they earn a place, not as a default look.",
      "Indoor and outdoor stone can share a material idea, which matters when the house and the yard are being thought about together.",
    ],
    projects: [
      "A pebble or cobble walk, including the indoor creek-like path described above",
      "Waterfall stonework over rock, indoors or in the garden",
      "Custom stone detail added to a larger landscape, patio, or wall project",
    ],
    image: null,
    related: ["limestone-walls-stonework", "interior-exterior"],
  },
  {
    slug: "interior-exterior",
    name: "Interior–exterior design",
    title: "Interior & Exterior Design in Springfield, IL | Andre Preer",
    description:
      "Interior and exterior planned as one residential project in Springfield: outdoor rooms, materials, and circulation that meet the rooms inside.",
    summary: "The outdoor rooms and the rooms inside considered as one property, not two unrelated jobs.",
    h1: "Interior and exterior, planned together",
    problem:
      "A good patio can still feel stapled to the house if the door, the floor level, the view, and the materials inside were never part of the conversation.",
    solution:
      "Andre treats the property as one picture. Hardscape, planting, outdoor living, and the way those meet the interior — circulation, sightlines, and materials — stay in a single plan from the first walk to the finished work.",
    benefits: [
      "You are not handing a drawing from one firm to a crew that never stood in the yard.",
      "Outdoor rooms are placed for the doors and windows you have, not for an imaginary elevation.",
      "When a project needs an indoor stone detail as well as the landscape, it can stay in the same scope.",
    ],
    projects: [
      "A full property plan: landscape, walls, and the outdoor room that meets the house",
      "A remodel of the ground around a door, porch, or living room that opens outside",
      "An indoor-outdoor stone detail, such as a pebble walk, tied to the exterior work",
    ],
    image: "interior-living-room",
    related: ["landscape-design-installation", "specialty-stone-water"],
  },
];

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const reasons = [
  {
    title: "Design and build stay together",
    text: "The plan is not drawn by one company and installed by another. Andre designs the work and carries it through the build, so the walk-through and the finished yard are the same conversation.",
  },
  {
    title: "One composition, not separate tickets",
    text: "Walls, planting, fire, outdoor rooms, and specialty stone are drawn as one picture when the property needs more than a single trade.",
  },
  {
    title: "Stone and planting, handled as craft",
    text: "Limestone, hardscape, shrubs, trees, and roses are part of the same practice. A wall can hold grade and still belong next to the bed it edges.",
  },
  {
    title: "Sized to Central Illinois houses",
    text: "The work is for real Midwestern homes — sun, grade, and a long off-season — rather than a showpiece estate that only looks right in July.",
  },
];

export const processSteps = [
  {
    n: "01",
    title: "Contact",
    text: "Call or send the consultation form. Say what town the property is in, what you want to change, and how you prefer to be reached. That is enough to start. It is not a quote.",
  },
  {
    n: "02",
    title: "Site visit and consultation",
    text: "Andre walks the property with you. The visit is for how you use the place, and for sun, grade, views, and the parts already worth keeping.",
  },
  {
    n: "03",
    title: "Design and proposal",
    text: "You get a proposed scope for the work you discussed, with enough detail to decide whether to go ahead. A drawing, notes, or a walk-through of the plan — the form depends on the project. You can accept it or decline it.",
  },
  {
    n: "04",
    title: "Build",
    text: "The agreed work is installed with care: hardscape set true, plants placed with their mature size in mind, and stone detail finished when it is part of the scope.",
  },
  {
    n: "05",
    title: "Final walkthrough",
    text: "You walk the finished work together and note anything that still needs attention before the job is closed.",
  },
];

export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
        "@id": `${site.url}/#business`,
        name: site.name,
        url: `${site.url}/`,
        telephone: "+1-309-431-1805",
        email: site.email,
        image: `${site.url}/og.jpg`,
        description:
          "Residential landscape design and installation, limestone and stonework, patios and outdoor living, fire features, planting, and specialty stone for Springfield and Central Illinois. Andre M. Preer II.",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.locality,
          addressRegion: site.region,
          addressCountry: "US",
        },
        areaServed: [
          { "@type": "City", name: "Springfield", containedInPlace: { "@type": "State", name: "Illinois" } },
          { "@type": "AdministrativeArea", name: "Central Illinois" },
        ],
        knowsAbout: [
          "Landscape design",
          "Landscape installation",
          "Limestone walls",
          "Hardscaping",
          "Planting",
          "Outdoor living",
          "Fire features",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+1-309-431-1805",
            contactType: "customer service",
            areaServed: "US-IL",
            availableLanguage: "English",
          },
          {
            "@type": "ContactPoint",
            telephone: "+1-702-232-6150",
            contactType: "customer service",
            description: "Alternate phone",
            areaServed: "US-IL",
            availableLanguage: "English",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Residential landscape and stonework",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              url: `${site.url}/services/${service.slug}/`,
              areaServed: "Springfield, Illinois",
              provider: { "@id": `${site.url}/#business` },
            },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": `${site.url}/#andre`,
        name: site.person,
        telephone: "+1-309-431-1805",
        email: site.email,
        url: `${site.url}/about/`,
      },
    ],
  };
}
