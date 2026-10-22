// Builds the static site into dist/. No dependencies: copies the prototype and its assets.
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// Prototype becomes the site root. It references prophet-logo.png by relative path.
const proto = readFileSync(join(root, 'mockup/maia-cowork-prototype.html'), 'utf8');
writeFileSync(join(dist, 'index.html'), proto);
cpSync(join(root, 'mockup/prophet-logo.png'), join(dist, 'prophet-logo.png'));
cpSync(join(root, 'mockup/maia-logo.svg'), join(dist, 'maia-logo.svg'));

// Static single-screen mockup and reference material.
cpSync(join(root, 'mockup/maia-cowork-mockup.html'), join(dist, 'mockup.html'));
for (const f of ['prototype-diagram.png', 'prototype-diagram-dev.png', 'prototype-diagram-exec.png', 'prototype-cowork.png', 'prototype-external.png', 'prototype-mcp.png', 'prototype-client-spaces.png', 'prototype-compat.png']) {
  const src = join(root, 'mockup', f);
  if (existsSync(src)) cpSync(src, join(dist, 'renders', f));
}
cpSync(join(root, 'screenshots'), join(dist, 'screenshots'), { recursive: true });
cpSync(join(root, 'sitemaps'), join(dist, 'sitemaps'), { recursive: true });

console.log('built dist/');
