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
  concept?: string;
  group: "interior" | "exterior" | "property";
  related: string[];
}

export const services: Service[] = [
  {
    slug: "landscape-design-installation",
    group: "exterior",
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
    image: null,
    concept: "landscaped-bed",
    related: ["trees-shrubs-roses", "patios-hardscaping-outdoor-living"],
  },
  {
    slug: "trees-shrubs-roses",
    group: "exterior",
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
    group: "exterior",
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
    image: null,
    concept: "stone-patio",
    related: ["patios-hardscaping-outdoor-living", "specialty-stone-water"],
  },
  {
    slug: "patios-hardscaping-outdoor-living",
    group: "exterior",
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
    image: null,
    concept: "outdoor-fire",
    related: ["fire-features", "landscape-design-installation"],
  },
  {
    slug: "fire-features",
    group: "exterior",
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
    concept: "outdoor-fire",
    related: ["patios-hardscaping-outdoor-living", "limestone-walls-stonework"],
  },
  {
    slug: "specialty-stone-water",
    group: "exterior",
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
    group: "property",
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
    related: ["full-kitchen-remodels", "landscape-design-installation"],
  },
  {
    slug: "interior-stonework-tile",
    group: "interior",
    name: "Interior stonework & tile",
    title: "Interior Stonework & Tile in Springfield, IL | Andre Preer",
    description:
      "Interior stonework and tile for Springfield and Central Illinois homes: backsplashes and detailed stone and tile surfaces designed with the room.",
    summary: "Stone and tile worked into the room as design, from backsplashes to detailed feature surfaces.",
    h1: "Interior stonework and tile",
    problem:
      "Stone and tile added as an afterthought read as a finish applied to a room. The surface, the light, and the cabinetry never quite agree.",
    solution:
      "Interior stonework and tile are treated as design, not decoration: the material, the pattern, the edges, and how the surface meets the cabinets, counters, and fixtures are decided with the room. This is Andre’s focus in the winter season, and it runs through his kitchen and bathroom work.",
    benefits: [
      "The stone or tile is chosen and laid out with the room, so edges and transitions land on purpose.",
      "Fine detail work is part of the practice, indoors as well as out.",
      "The same hands that plan the surface install it.",
    ],
    projects: [
      "A tile or stone backsplash designed with the counter and the cabinets",
      "A detailed stone or tile surface that becomes the feature of a room",
      "Stone and tile detail inside a kitchen or bathroom remodel",
    ],
    image: null,
    concept: "herringbone",
    related: ["backsplash-installation", "bathroom-remodeling", "specialty-stone-water"],
  },
  {
    slug: "bathroom-remodeling",
    group: "interior",
    name: "Bathroom remodeling",
    title: "Bathroom Remodeling in Springfield, IL | Andre Preer",
    description:
      "Bathroom remodeling in Springfield and Central Illinois, with tile and stone detail planned as part of the room.",
    summary: "Bathrooms planned as one room, with tile and stone detail worked in from the start.",
    h1: "Bathroom remodeling",
    problem:
      "A bathroom updated one fixture at a time ends up with tile that fights the vanity and a layout that still does not work for the people using it.",
    solution:
      "Andre plans the bathroom as a single scope: layout, surfaces, tile, and stone detail, then carries it through the build.",
    benefits: [
      "Surfaces, tile, and fixtures are decided together, so they meet on purpose.",
      "Tile and stone detail is part of the plan, not a finish added at the end.",
      "You work with the person who plans the room and builds it.",
    ],
    projects: [
      "A full bathroom remodel planned as one scope",
      "A tile or stone surface that anchors the room",
      "A bathroom planned alongside a kitchen or other interior work",
    ],
    image: null,
    related: ["interior-stonework-tile", "full-kitchen-remodels", "specialty-stone-water"],
  },
  {
    slug: "full-kitchen-remodels",
    group: "interior",
    name: "Full kitchen remodels",
    title: "Full Kitchen Remodels in Springfield, IL | Andre Preer",
    description:
      "Full kitchen remodels in Springfield and Central Illinois: layout, cabinets, countertops, backsplash, and finishing, planned as one scope.",
    summary: "The kitchen planned and built as one job, not a string of leftover updates.",
    h1: "Full kitchen remodels",
    problem:
      "A lot of kitchens are a pile of separate updates: cabinets from one year, a counter from another, and a backsplash that meets neither. The room still does not work for how you cook.",
    solution:
      "A full remodel sets the layout, cabinets, countertops, backsplash, and finishing in one scope. Andre walks the kitchen with you, then the work follows that plan.",
    benefits: [
      "The pieces that touch each other are decided together, so the counter, the tile, and the cabinets meet on purpose.",
      "You start with Andre, and the scope you agree to is the scope that gets built.",
      "The same practice can also take the yard and the stone outside, when the property needs both.",
    ],
    projects: [
      "A kitchen taken back to the layout and rebuilt as one room",
      "A remodel that keeps the footprint and replaces the working surfaces",
      "A kitchen planned in the same conversation as a door, a patio, or the view outside",
    ],
    image: null,
    concept: "kitchen-after",
    related: ["backsplash-installation", "cabinets", "countertops"],
  },
  {
    slug: "backsplash-installation",
    group: "interior",
    name: "Backsplash installation",
    title: "Kitchen Backsplash Installation in Springfield, IL | Andre Preer",
    description:
      "Kitchen backsplash installation in Springfield and Central Illinois, planned with the counter, the cabinets, and the light in the room.",
    summary: "The surface between the counter and the upper cabinets, set so the kitchen looks finished.",
    h1: "Backsplash installation",
    problem:
      "A backsplash added after everything else often stops short of the cabinet, fights the counter edge, or leaves outlets sitting in the wrong place. It is the part people notice first.",
    solution:
      "Andre installs the backsplash as part of the kitchen, not as a strip of tile at the end. The field, the edges, and how it meets the counter and the cabinets are decided before it goes up.",
    benefits: [
      "The backsplash is lined up with the counter and the cabinets instead of hiding a gap.",
      "It can be the whole project, or one part of a remodel that also includes cabinets and counters.",
      "You can see the idea as a design concept on this site. Finished jobs are something to look at in person.",
    ],
    projects: [
      "A full-height backsplash on a working wall",
      "A shorter run behind a range or a sink, finished at a clean edge",
      "Tile or stone chosen to sit with a counter that is staying, or one that is being replaced",
    ],
    image: null,
    concept: "herringbone",
    related: ["countertops", "full-kitchen-remodels", "lighting-finishing"],
  },
  {
    slug: "cabinets",
    group: "interior",
    name: "Cabinets, new and refacing",
    title: "Kitchen Cabinets & Refacing in Springfield, IL | Andre Preer",
    description:
      "New kitchen cabinets and cabinet refacing in Springfield and Central Illinois, planned with the counters and the backsplash.",
    summary: "New cabinets when the boxes need to change, or refacing when the layout can stay.",
    h1: "Cabinets, new and refacing",
    problem:
      "Replacing every cabinet is the wrong job when the layout still works. Refacing is the wrong job when the boxes are tired or the doors no longer fit how you use the room.",
    solution:
      "Andre looks at the boxes you have. New cabinets when the layout or the carcasses need to change. Refacing when the layout can stay and the doors, drawers, and finish are what is dated.",
    benefits: [
      "The choice between new and refacing is made from the kitchen you have, not from a default package.",
      "Cabinets are planned with the counter and the backsplash, so the lines meet.",
      "Hardware and the finish are part of the cabinet scope, not a separate errand.",
    ],
    projects: [
      "New base and wall cabinets in a kitchen that is being rearranged",
      "Refacing doors and drawer fronts where the layout stays",
      "A run of cabinets that has to meet a new counter and a new backsplash",
    ],
    image: null,
    concept: "cabinets",
    related: ["full-kitchen-remodels", "countertops", "kitchen-islands-layout"],
  },
  {
    slug: "countertops",
    group: "interior",
    name: "Countertops",
    title: "Kitchen Countertops in Springfield, IL | Andre Preer",
    description:
      "Kitchen countertops in Springfield and Central Illinois, set with the cabinets and the backsplash so the edges are part of one plan.",
    summary: "The working surface, templated and set so it meets the cabinets and the backsplash.",
    h1: "Countertops",
    problem:
      "A new counter on old cabinets, or a backsplash that was measured to a counter you are about to tear out, leaves the kitchen looking pieced together.",
    solution:
      "Countertops are measured to the cabinets that will actually be there, and to the backsplash that will land on them. The edge, the sink, and the cooktop are part of that layout.",
    benefits: [
      "The surface is planned with the cabinet run, not dropped on after the fact.",
      "The backsplash has a real edge to meet.",
      "You decide the material in the consultation. This page does not pretend a specific product is the house standard.",
    ],
    projects: [
      "A counter replacement with the existing cabinet layout",
      "New counters as part of a full remodel",
      "A sink or cooktop opening laid out with the backsplash and the cabinet seams",
    ],
    image: null,
    concept: "countertops",
    related: ["backsplash-installation", "cabinets", "kitchen-islands-layout"],
  },
  {
    slug: "kitchen-islands-layout",
    group: "interior",
    name: "Islands and layout changes",
    title: "Kitchen Islands & Layout Changes in Springfield, IL | Andre Preer",
    description:
      "Kitchen islands and layout changes in Springfield and Central Illinois, including when an island does not fit the room.",
    summary: "Moving the work zone, and adding an island only when the walk space can spare it.",
    h1: "Islands and layout changes",
    problem:
      "An island in a room that cannot spare the walkway makes the kitchen harder to use. Leaving a cramped layout alone because the cabinets are new does the same thing.",
    solution:
      "Layout comes first. Andre looks at the doors, the windows, and how you actually cook and pass through. An island is in the plan when the clearances work. If they do not, the plan says so.",
    benefits: [
      "You do not get an island as a default.",
      "A layout change is tied to the cabinets, the counters, and the backsplash, so those are not ordered for a floor plan you are about to abandon.",
      "The kitchen can stay in conversation with a door to the yard when that is part of how you live.",
    ],
    projects: [
      "An island added where the aisles still work",
      "A work zone moved off a cramped wall",
      "A layout that lines a door, a window, or a view up with the counter",
    ],
    image: null,
    concept: "island",
    related: ["full-kitchen-remodels", "cabinets", "lighting-finishing"],
  },
  {
    slug: "lighting-finishing",
    group: "interior",
    name: "Lighting and finishing",
    title: "Kitchen Lighting & Finishing in Springfield, IL | Andre Preer",
    description:
      "Kitchen lighting and finishing touches in Springfield and Central Illinois: fixtures, hardware, and the details that complete the cabinets and backsplash.",
    summary: "Fixtures, hardware, and the last details that make the cabinets and backsplash look complete.",
    h1: "Lighting and finishing touches",
    problem:
      "A new backsplash under the old fixture, or new cabinets with the original hardware, still reads as unfinished. The last layer is what people see at night.",
    solution:
      "Finishing is planned with the rest of the kitchen: fixtures, hardware, and the small edges that meet the backsplash and the cabinets. It can close a remodel or be a shorter scope on a kitchen you are keeping.",
    benefits: [
      "The light you cook under is chosen with the cabinet finish and the backsplash, not from a leftover ceiling box.",
      "Hardware and trim are in the same conversation as the doors and the tile.",
      "This is finishing work inside the kitchen scope. It is not a license claim.",
    ],
    projects: [
      "Fixtures over an island, a sink, or a work run",
      "Hardware and the small trim that finishes new or refaced cabinets",
      "The last pass after a backsplash and counter are in",
    ],
    image: null,
    concept: "lighting",
    related: ["backsplash-installation", "cabinets", "kitchen-islands-layout"],
  },
];

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function servicesIn(group: Service["group"]): Service[] {
  return services.filter((service) => service.group === group);
}

export const reasons = [
  {
    title: "Design and build stay together",
    text: "The plan is not drawn by one company and installed by another. Andre carries the yard from the walk-through through the build.",
  },
  {
    title: "Stone and tile are treated as design",
    text: "Backsplashes, bathrooms, walls, and patios share one idea: natural materials, set true, with edges and transitions decided before the work begins.",
  },
  {
    title: "Inside and out, one practice",
    text: "Kitchens and bathrooms in the winter, landscape and stone outdoors the rest of the year. The same person plans and builds both.",
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
    text: "Call or send the estimate request. Say what town the property is in, what you want to change, and how you prefer to be reached. That is enough to start. It is not a quote.",
  },
  {
    n: "02",
    title: "Site visit and consultation",
    text: "Andre walks the kitchen, the bathroom, the yard, or all of it with you. The visit is for how you use the space and for what is already worth keeping.",
  },
  {
    n: "03",
    title: "Design and proposal",
    text: "You get a proposed scope for the work you discussed, with enough detail to decide whether to go ahead. A drawing, notes, or a walk-through of the plan — the form depends on the project. You can accept it or decline it.",
  },
  {
    n: "04",
    title: "Build",
    text: "The agreed work is installed with care. In a kitchen that means cabinets, counters, backsplash, and the finish. Outside, hardscape is set true and plants are placed with their mature size in mind.",
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
        "@type": ["GeneralContractor", "HomeAndConstructionBusiness"],
        "@id": `${site.url}/#business`,
        name: site.name,
        url: `${site.url}/`,
        telephone: "+1-309-431-1805",
        email: site.email,
        image: `${site.url}/og.jpg`,
        description:
          "Interior design with stonework and tile, kitchen and bathroom remodeling, plus landscape design, hardscaping, and custom stonework for Springfield and Central Illinois homes. Andre M. Preer II.",
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
          "Interior design",
          "Kitchen remodeling",
          "Bathroom remodeling",
          "Tile backsplash installation",
          "Interior stonework and tile",
          "Landscape design",
          "Limestone walls",
          "Hardscaping",
          "Planting",
          "Outdoor living",
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
          name: "Interiors, landscape, hardscape, and stonework",
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
