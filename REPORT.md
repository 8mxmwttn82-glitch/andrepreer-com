# Andre Preer site report

## Pages

| URL | Role |
| --- | --- |
| `/` | Home: hero, services, reference images, why call, approach, service area, closing call |
| `/about/` | Who Andre is and how he reads a property. No invented biography. |
| `/services/` | Overview of every service |
| `/services/landscape-design-installation/` | Landscape design and installation |
| `/services/trees-shrubs-roses/` | Trees, shrubs, roses, and planting |
| `/services/limestone-walls-stonework/` | Limestone walls and decorative stone |
| `/services/patios-hardscaping-outdoor-living/` | Patios, walks, outdoor living |
| `/services/fire-features/` | Fire pits, fire decks, gathering spaces |
| `/services/specialty-stone-water/` | Pebble, cobble, and waterfall stone |
| `/portfolio/` | Reference gallery with a lightbox. No fake project names. |
| `/process/` | Contact, site visit, proposal, build, final walkthrough |
| `/contact/` | Phone, email, consultation form |
| `/404.html` | Not found, with links and the phone number |

Every page has one H1, its own title and description, a canonical URL on `https://andrepreer.com`, and the phone in the header, footer, and mobile bar. There is no reviews block.

## Design

Editorial rather than a contractor template: Fraunces for headlines, Outfit for text, limestone and deep green, one bronze accent. Motion is limited to small color changes and is turned off for `prefers-reduced-motion`. The home hero is a full-bleed photograph with the call and the consultation link in the first screen.

Copy stays inside what the previous demo actually said: one person designing and building, planting, limestone, outdoor living, fire, and specialty pebble or waterfall stone, for ordinary Central Illinois houses. No years in business, license numbers, insurance, awards, or review counts.

## Brand decision: “Annag’s”

Retired. It is not on the site.

The demo at `springfield-demos.pages.dev/annags-interior-exterior/` headlines “Annag’s Interior and Exterior Design” and says it is led by Andre M. Preer II. That page is a sales demo (“Free demos by Marion Ring”, with a “placeholders for Marion” comment in the source). Whether Andre owns or uses that name is not established. Publishing it would put a second, unverified name on the door. The site is Andre Preer / Andre M. Preer II / AndrePreer.com. If “Annag’s” is a real DBA he wants customers to see, it can be added later as a single secondary line.

## Image audit

Every file from the demo’s `/img/` directory is in `source-images/demo/`. Filenames and alt text on that demo do not match the pictures. None of them are presented as a finished Andre Preer project. House numbers in the photos are not this business’s address.

Published, labeled “Reference photo”:

| Demo file | What it actually shows | How it is used |
| --- | --- | --- |
| `midwest-home-2.jpg` | Two-story house at dusk, house number 1156. Looks like a real-estate photograph. | Hero and gallery. `residential-home-dusk`. |
| `stone-wall-craft.jpg` | Stone-clad house, lawn, foundation shrubs. Real-estate style; the trees do not read as central Illinois. | Gallery and stone/planting pages, including a crop of the beds. Not described as a retaining wall he built. |
| `pebble-path.jpg` | Soil, a scoop, shears, and a small pot. Not a pebble path. | Planting page, as materials. `soil-and-hand-tools`. |
| `garden-midwest.jpg` | Bright modern living room. Not a garden. Could be stock or a generated interior. | Interior–exterior page only, captioned as an interior, not his work. |

Not published:

| Demo file | What it actually shows | Why it was left out |
| --- | --- | --- |
| `pebble-close.jpg` | Geometric pendant lights. EXIF: “All rights reserved — Oleg Magni.” | Wrong subject, and an explicit copyright. |
| `rose-garden.jpg` | Eltz Castle in fog. | Not roses, not a local project. |
| `evening-fire.jpg` | A tent under the stars. The demo used it only as a faint CSS background. | Not a residential fire feature. |
| `suburban-yard.jpg` | A person at an espresso machine. | Unrelated. |
| `residential-fire.jpg` | Another modern living room. | Not a fire feature. |
| `midwest-patio.jpg` | A modern glass house and lawn. | Not a patio, and it fights the “real Midwestern house” message. |
| `stone-craft.jpg` | People screeding concrete. | Would imply those workers are Andre’s crew. |

There are no before-and-after pairs and no project names, client names, or job locations.

## Form

`POST /api/contact` validates on the server, rejects the honeypot, attaches up to three checked images, and sends through Resend or `env.EMAIL.send()`. Turnstile is on only when both keys exist. If mail is not configured, the response is HTTP 503 and the page tells the visitor to call or email. A success message is not shown in that case.

`functions/api/*` calls the same handler for a possible Pages deploy. Production config is the Worker in `wrangler.jsonc`.

## QA

Unit tests (`npm test`): 15 passing. They cover validation, the honeypot, the unconfigured provider, mock success, Resend (including a photo and escaped HTML), the Cloudflare Email binding, Turnstile on/off/misconfigured, a non-image upload, and the HTML fallback page.

Against `wrangler dev`:

- Every page, image, and internal link returned 200. Unknown URLs returned the 404 page.
- Incomplete form: 400 `validation`.
- Honeypot filled: 400 `spam`, and the mail sender was not called.
- No provider configured: 503 `unconfigured`, body tells the visitor to call 309-431-1805 and says nothing was sent.
- `MAIL_PROVIDER=mock` with `ALLOW_MOCK_EMAIL=true`: 200, `mock: true`, including a one-file photo upload (`attachmentCount: 1`).
- `GET /api/form-config` returns the Turnstile site key only when both keys exist, and does not return the secret or the Resend key.

Lighthouse (mobile and desktop, local Worker dev), home page: performance 100, accessibility 100, best practices 100, SEO 100. Largest contentful paint about 1.7s on mobile.

Contact page, before the script was moved out of the HTML: performance 100, accessibility 100, SEO 100, best practices 92, because an inline module was blocked by Content-Security-Policy. That script now loads from `/contact-form.js`. The gallery script loads from `/lightbox.js`. JSON-LD is `application/ld+json` and is not executed.

Checked by hand in the built HTML: one H1 per page, unique titles and descriptions, canonicals on `https://andrepreer.com`, no “Annag”, no “49 Shelly”, no lorem. `tel:+13094311805` is the prominent number. `702-232-6150` appears in the footer and on the contact page only.

## Facts Andre needs to confirm

- The services above are the ones he actually wants to sell. Fire decks, indoor pebble walks, and interior work are included because the demo described them.
- 309-431-1805 is the number customers should call. 702-232-6150 is still a working alternate.
- belicimo8@gmail.com is the inbox for form mail and the public email.
- “Springfield and Central Illinois” is the right service area, and he will say yes or no to towns outside Springfield.
- The public name should stay “Andre Preer”, or he wants a legal name or “Annag’s” added.
- He both designs and builds, rather than only one of those.
- The hallway pebble walk that “reads like a creek” and then a waterfall is a real kind of work he does, not just a line from the demo.
- A domain he controls for the From address (`CONTACT_FROM`) once Resend or Cloudflare Email is turned on. Gmail cannot be the sender.
- Any license, insurance, years in business, or awards he wants stated. None are on the site.
- Photographs of his own finished jobs, to replace the reference images.
