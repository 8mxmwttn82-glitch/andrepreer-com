import { copyFile, mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(root, "source-images", "demo");
const outDir = path.join(root, "public", "images");
const manifestPath = path.join(root, "src", "data", "images.json");

const jobs = [
  { id: "residential-home-dusk", file: "midwest-home-2.jpg" },
  { id: "stone-home-and-lawn", file: "stone-wall-craft.jpg" },
  { id: "stone-home-plantings", file: "stone-wall-craft.jpg", crop: [0.15, 0.35, 0.57, 0.43] },
  { id: "front-entry-planting", file: "midwest-home-2.jpg", crop: [0.55, 0.35, 0.45, 0.65] },
  { id: "soil-and-hand-tools", file: "pebble-path.jpg" },
  { id: "interior-living-room", file: "garden-midwest.jpg" },
];

async function ensureOriginals() {
  await mkdir(sourceDir, { recursive: true });
  const existing = await readdir(sourceDir).catch(() => []);
  if (existing.some((name) => name.endsWith(".jpg"))) return;
  const downloaded = "/tmp/demo-img";
  const files = await readdir(downloaded);
  for (const file of files) {
    if (file.endsWith(".jpg")) await copyFile(path.join(downloaded, file), path.join(sourceDir, file));
  }
}

function targetWidths(width) {
  const steps = [640, 960, 1280, 1600, 1920].filter((size) => size < width - 20);
  steps.push(width);
  return [...new Set(steps)];
}

async function render(id, buffer, widths) {
  await Promise.all(
    widths.flatMap((width) => [
      sharp(buffer).resize(width).webp({ quality: 72 }).toFile(path.join(outDir, `${id}-${width}.webp`)),
      sharp(buffer).resize(width).avif({ quality: 48, effort: 4 }).toFile(path.join(outDir, `${id}-${width}.avif`)),
    ]),
  );
}

async function ogImage(hero) {
  const photo = await sharp(hero).resize(760, 630, { fit: "cover", position: "attention" }).modulate({ brightness: 0.72 }).toBuffer();
  const panel = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#1a2c24"/>
        <stop offset="0.42" stop-color="#1a2c24"/>
        <stop offset="0.68" stop-color="#1a2c24" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <text x="64" y="270" fill="#f3efe6" font-family="Liberation Serif, DejaVu Serif, serif" font-size="72">Andre Preer</text>
    <text x="64" y="332" fill="#e4dccf" font-family="Inter, Liberation Sans, sans-serif" font-size="26">Landscape, stone &amp; outdoor living</text>
    <text x="64" y="386" fill="#d9d0c3" font-family="Inter, Liberation Sans, sans-serif" font-size="20">Springfield &amp; Central Illinois</text>
  </svg>`);
  await sharp({
    create: { width: 1200, height: 630, channels: 3, background: "#1a2c24" },
  })
    .composite([
      { input: photo, left: 440, top: 0 },
      { input: panel, left: 0, top: 0 },
    ])
    .jpeg({ quality: 78 })
    .toFile(path.join(root, "public", "og.jpg"));
}

async function icons() {
  const svg = await readFile(path.join(root, "public", "favicon.svg"));
  await sharp(svg).resize(32, 32).png().toFile(path.join(root, "public", "favicon-32.png"));
  await sharp(svg).resize(180, 180).png().toFile(path.join(root, "public", "apple-touch-icon.png"));
}

async function main() {
  await ensureOriginals();
  await mkdir(outDir, { recursive: true });
  const manifest = {};
  let hero = null;
  for (const job of jobs) {
    const source = sharp(path.join(sourceDir, job.file)).rotate();
    const meta = await source.metadata();
    let pipeline = sharp(path.join(sourceDir, job.file)).rotate();
    if (job.crop) {
      const [x, y, w, h] = job.crop;
      pipeline = pipeline.extract({
        left: Math.round(meta.width * x),
        top: Math.round(meta.height * y),
        width: Math.round(meta.width * w),
        height: Math.round(meta.height * h),
      });
    }
    const buffer = await pipeline.toBuffer();
    const info = await sharp(buffer).metadata();
    const widths = targetWidths(info.width);
    const stamp = path.join(outDir, `${job.id}-${widths[widths.length - 1]}.webp`);
    const sourceStat = await stat(path.join(sourceDir, job.file));
    const outStat = await stat(stamp).catch(() => null);
    if (!outStat || outStat.mtimeMs < sourceStat.mtimeMs) await render(job.id, buffer, widths);
    manifest[job.id] = { width: info.width, height: info.height, widths };
    if (job.id === "residential-home-dusk") hero = buffer;
  }
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  if (hero) await ogImage(hero);
  await icons();
  console.log(`images ready: ${Object.keys(manifest).join(", ")}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
