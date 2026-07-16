const fs = require('fs');
const path = require('path');

const root = process.cwd();
const publicPages = fs
  .readdirSync(root)
  .filter((file) => file.endsWith('.html') && !file.endsWith('.dc.html'))
  .sort();

let failed = false;

function fail(message) {
  failed = true;
  console.error(`FAIL ${message}`);
}

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

for (const file of publicPages) {
  const html = read(file);
  const head = (html.match(/<head[\s\S]*?<\/head>/i) || [''])[0];
  const required = {
    title: /<title>[^<]+<\/title>/i,
    description: /<meta\s+name="description"\s+content="[^"]+">/i,
    robots: /<meta\s+name="robots"\s+content="[^"]+">/i,
    canonical: /<link\s+rel="canonical"\s+href="https:\/\/algarvehomestay\.pt\//i,
    openGraph: /<meta\s+property="og:title"/i,
    twitter: /<meta\s+name="twitter:card"/i,
    icon: /<link\s+rel="icon"/i,
  };

  for (const [name, pattern] of Object.entries(required)) {
    if (!pattern.test(head)) fail(`${file}: missing ${name} metadata`);
  }

  if (/https:\/\/algarvehomestay\.pt\/[^"]*[çãáéíóúâêôÁÉÍÓÚÃÕÇ]/.test(head)) {
    fail(`${file}: canonical or social URL contains accented slug characters`);
  }
}

const sitemap = read('sitemap.xml');
if (sitemap.includes('www.algarvehomestay.pt')) fail('sitemap contains www host');
if (sitemap.includes('area-cliente')) fail('sitemap includes area-cliente');
if (!/<loc>https:\/\/algarvehomestay\.pt\/<\/loc>/.test(sitemap)) fail('sitemap missing homepage');

const robots = read('robots.txt');
if (!robots.includes('Sitemap: https://algarvehomestay.pt/sitemap.xml')) fail('robots.txt missing sitemap');

const areaCliente = read('area-cliente.html');
if (!/noindex, nofollow/.test(areaCliente)) fail('area-cliente missing noindex');
if (/type="password"|Palavra-passe/i.test(areaCliente)) fail('area-cliente contains credential controls');

const manifest = JSON.parse(read('site.webmanifest'));
for (const icon of manifest.icons || []) {
  const iconPath = path.join(root, icon.src.replace(/^\//, ''));
  if (!fs.existsSync(iconPath)) fail(`manifest icon missing: ${icon.src}`);
}

const index = read('index.html');
const jsonLdBlocks = [...index.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
if (!jsonLdBlocks.length) fail('index missing JSON-LD');
for (const [, block] of jsonLdBlocks) {
  try {
    JSON.parse(block);
  } catch (error) {
    fail(`invalid JSON-LD: ${error.message}`);
  }
}

for (const file of [...publicPages, ...fs.readdirSync(root).filter((entry) => entry.endsWith('.dc.html'))]) {
  const html = read(file);
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|#|\/)/.test(ref)) continue;
    if (ref.includes('{{')) continue;
    const target = ref.split('#')[0].split('?')[0];
    if (target && !fs.existsSync(path.join(root, target))) fail(`${file}: missing reference ${target}`);
  }
}

if (failed) process.exit(1);
console.log('Static site validation passed.');
