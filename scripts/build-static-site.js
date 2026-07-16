const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = process.cwd();
const outDir = path.join(root, 'public');

const validation = spawnSync(process.execPath, [path.join(root, 'scripts', 'validate-static-site.js')], {
  stdio: 'inherit',
});

if (validation.status !== 0) {
  process.exit(validation.status || 1);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const files = [
  'apple-touch-icon.png',
  'deck-stage.js',
  'favicon.ico',
  'favicon.png',
  'Footer.dc.html',
  'Nav.dc.html',
  'robots.txt',
  'site.webmanifest',
  'sitemap.xml',
  'support.js',
];

for (const file of fs.readdirSync(root)) {
  if (file.endsWith('.html')) {
    files.push(file);
  }
}

const directories = ['assets', 'uploads'];

for (const file of files) {
  const source = path.join(root, file);
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, path.join(outDir, file));
  }
}

for (const directory of directories) {
  const source = path.join(root, directory);
  if (fs.existsSync(source)) {
    fs.cpSync(source, path.join(outDir, directory), { recursive: true });
  }
}

console.log(`Static site built into ${path.relative(root, outDir)}`);
