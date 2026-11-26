# Andre Preer

Marketing site for Andre M. Preer II, a residential landscape, hardscape, and stonework practice in Springfield and Central Illinois. The site is a static build plus a Cloudflare Worker that serves the files and accepts consultation requests at `POST /api/contact`.

Primary phone: [309-431-1805](tel:+13094311805). Alternate: 702-232-6150. Email: belicimo8@gmail.com. Service area: Springfield and Central Illinois. The street address is intentionally not published.

## Stack

- [Astro](https://astro.build) 5, static output
- Hand-written CSS, self-hosted Fraunces and Outfit (latin subsets)
- Responsive AVIF and WebP generated with Sharp
- Cloudflare Worker with [static assets](https://developers.cloudflare.com/workers/static-assets/) (`wrangler.jsonc`)
- Optional Pages Functions in `functions/` that call the same handler. The Worker is the deploy target.

## Local development

```bash
npm install
npm run dev
```

The dev server is `http://127.0.0.1:4731`. `predev` rebuilds images from `source-images/demo/`.

To run the Worker and the contact API against the built site:

```bash
npm run build
cp .dev.vars.example .dev.vars
npm run worker:dev
```

`wrangler dev` reads `.dev.vars` and does not upload it. The example file turns on the mock mail provider so a submission returns success without sending email. Do not copy those mock values into production.

```bash
npm test
```

## Build

```bash
npm run build
```

Output directory: `dist/`. That folder is the Worker assets directory. `npm run worker:bundle` writes the bundled ES module to `dist-worker/worker.js` via `wrangler deploy --dry-run --outdir dist-worker`.

## Deploy to Cloudflare Workers

From this repo, after `npm run build`:

```bash
npx wrangler deploy
```

`wrangler.jsonc` is set up as:

- `name`: `andrepreer`
- `main`: `src/worker.ts`
- `assets.directory`: `./dist`
- `assets.binding`: `ASSETS`
- `assets.not_found_handling`: `404-page` (Astro emits `dist/404.html`)
- `assets.run_worker_first`: `["/api/*"]` only

The Worker handles `/api/contact` and `/api/form-config`. Every other request is passed to `env.ASSETS.fetch`, and asset routing serves the static site, including the 404 page.

### Custom domain andrepreer.com

1. Deploy the Worker.
2. In the Cloudflare dashboard, open the Worker → Settings → Domains & Routes → Add → Custom domain.
3. Add `andrepreer.com`. Cloudflare creates the DNS record when the zone is on the same account.
4. Add `www.andrepreer.com` only if you want it, and redirect it to the apex. Canonical URLs on the site are `https://andrepreer.com/...` with a trailing slash.
5. Confirm the certificate is active before sharing the domain.

### Uploading the deploy bundle

`andrepreer-site-deploy.zip` is laid out so the unzipped folder can be deployed directly:

```text
wrangler.jsonc          # main: ./dist-worker/worker.js, assets.directory: ./assets
dist-worker/worker.js   # single ES module
assets/                 # static site, including 404.html
```

```bash
unzip andrepreer-site-deploy.zip -d andrepreer-deploy
cd andrepreer-deploy
npx wrangler deploy
```

The same files are what the Workers script and [assets upload](https://developers.cloudflare.com/workers/static-assets/direct-upload/) APIs expect: the module, the asset manifest generated from `assets/`, and the config (name, compatibility date, `run_worker_first`, `not_found_handling`).

## Form environment variables

Set these on the Worker (dashboard → Settings → Variables, or `wrangler secret put` for secrets). `.dev.vars` is local only.

| Name | Required | Purpose |
| --- | --- | --- |
| `MAIL_PROVIDER` | no | `auto` (default), `resend`, `cloudflare`, or `mock` |
| `RESEND_API_KEY` | for Resend | [Resend](https://resend.com) API key. Secret. |
| `CONTACT_TO` | yes, to send | Inbox that receives requests. Use `belicimo8@gmail.com` unless Andre changes it. |
| `CONTACT_FROM` | yes, to send | Verified sender. Plain email or `Name <email@domain>`. Resend and Cloudflare Email both require a domain you control. A Gmail address will not work as `From`. |
| `TURNSTILE_SITE_KEY` | no | Public Turnstile site key. The widget appears only when this and the secret are both set. |
| `TURNSTILE_SECRET_KEY` | no | Turnstile secret. Secret. If only one of the two keys is set, the form refuses to send and tells the visitor to call. |
| `ALLOW_MOCK_EMAIL` | local only | Must be `true` together with `MAIL_PROVIDER=mock`. Never set this in production. |

`auto` uses Resend when `RESEND_API_KEY`, `CONTACT_TO`, and `CONTACT_FROM` are all set. Otherwise it uses the Cloudflare Email binding when that binding and the same two addresses are set. If neither path is ready, `POST /api/contact` returns HTTP 503 and the page tells the visitor to call or email. It does not claim the message was sent.

### Cloudflare Email binding

Email Sending is optional. To use it instead of Resend, uncomment `send_email` in `wrangler.jsonc`:

```jsonc
"send_email": [
  { "name": "EMAIL", "destination_address": "belicimo8@gmail.com" }
]
```

The sender domain has to be onboarded to Cloudflare Email Sending. Set `MAIL_PROVIDER` to `cloudflare`, or leave it unset and omit `RESEND_API_KEY` so `auto` falls through to the binding. The handler calls `env.EMAIL.send()` with the text, HTML, reply-to, and any photos.

### Photos and spam checks

Up to 3 photos, JPEG, PNG, or WebP, 2 MB each, 6 MB together. They are attached to the email and are not stored. A honeypot field named `company_website` rejects bot submissions. Turnstile runs only when both keys are present.

## Pages Functions

`functions/api/contact.ts` and `functions/api/form-config.ts` call the same code as the Worker. They are there if the project is ever attached to Pages. This deployment does not use them. Do not upload the `functions/` directory as static assets.

## Project layout

- `src/pages/` — routes
- `src/server/` — validation, email, and the contact handler
- `src/worker.ts` — Worker entry
- `source-images/demo/` — original files from the previous demo, including ones that are not published
- `public/images/` — generated responsive images
- `scripts/images.mjs` — crops, AVIF, WebP, Open Graph image, favicons
