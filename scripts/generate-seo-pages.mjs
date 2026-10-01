import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seoPages, notFoundSeo } from '../src/utils/seoPages.js';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = path.join(projectRoot, 'dist');
const baseHtml = await readFile(path.join(outputRoot, 'index.html'), 'utf8');
const sitemap = await readFile(path.join(outputRoot, 'sitemap.xml'), 'utf8');
const origin = 'https://cybravions.com';
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function replaceMeta(html, attribute, key, value) {
  const escapedKey = escapeRegex(key);
  const pattern = new RegExp(`<meta\\s+${attribute}="${escapedKey}"\\s+content="[^"]*"[^>]*\\/>`, 'i');
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" data-rh="true" />`;
  return html.replace(pattern, tag);
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function removeMarkedJsonLd(html, label) {
  const escapedLabel = escapeRegex(label);
  const pattern = new RegExp(`\\s*<!-- Structured Data: ${escapedLabel}[^>]*-->\\s*<script type="application/ld\\+json">[\\s\\S]*?<\\/script>`, 'i');
  return html.replace(pattern, '');
}

function renderPage(html, route, metadata) {
  const url = `${origin}${route}`;
  html = html.replace(/<script\s+type="application\/ld\+json"\s+id="page-seo-schema">[\s\S]*?<\/script>/i, '');
  let output = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`);
  output = output.replace(/<main\s+id="seo-fallback"[^>]*>[\s\S]*?<\/main>/i, `<main id="seo-fallback" style="max-width: 900px; margin: 0 auto; padding: 5rem 1.5rem; font-family: sans-serif; line-height: 1.6;"><h1>${escapeHtml(metadata.title)}</h1><p>${escapeHtml(metadata.description)}</p><nav aria-label="Main navigation"><a href="/">Home</a> · <a href="/about">About</a> · <a href="/ai">Cybravions AI</a> · <a href="/cyberverse">CyberRange</a> · <a href="/exception-manager">Exception Manager</a> · <a href="/training">Training</a> · <a href="/compliance">Compliance</a></nav><p><a href="/#contact">Contact CYBRAVION</a></p></main>`);
  output = replaceMeta(output, 'name', 'description', metadata.description);
  output = replaceMeta(output, 'property', 'og:url', url);
  output = replaceMeta(output, 'property', 'og:title', metadata.title);
  output = replaceMeta(output, 'property', 'og:description', metadata.description);
  output = replaceMeta(output, 'name', 'twitter:title', metadata.title);
  output = replaceMeta(output, 'name', 'twitter:description', metadata.description);
  output = output.replace(/<link\s+rel="canonical"\s+href="[^"]*"[^>]*\/>/i, `<link rel="canonical" href="${url}" data-rh="true" />`);

  if (route !== '/') {
    output = removeMarkedJsonLd(output, 'Service offerings');
  }

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: metadata.title,
    url,
    description: metadata.description,
    isPartOf: { '@id': `${origin}/#website` },
    about: { '@id': `${origin}/#organization` },
  };
  if (route !== '/404') {
    output = output.replace('</head>', `  <script type="application/ld+json" id="page-seo-schema">${JSON.stringify(pageSchema).replaceAll('<', '\\u003c')}</script>\n</head>`);
  }
  return output;
}

function validatePage(html, route, metadata) {
  const canonicalLinks = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]*)"[^>]*\/>/gi)];
  const expectedCanonical = route === '/404' ? 0 : 1;
  assert.equal(canonicalLinks.length, expectedCanonical, `Unexpected canonical count for ${route}`);
  if (expectedCanonical) assert.equal(canonicalLinks[0][1], `${origin}${route}`);
  const escapedTitle = escapeRegex(escapeHtml(metadata.title));
  assert.match(html, new RegExp(`<title>${escapedTitle}</title>`));
  assert.match(html, new RegExp(`<h1>${escapedTitle}</h1>`));
  assert.doesNotMatch(html, /"@type"\s*:\s*"FAQPage"/);
  if (route === '/404') assert.match(html, /<meta name="robots" content="noindex, follow"[^>]*\/>/);

  const structuredData = [...html.matchAll(/<script\s+type="application\/ld\+json"(?:\s+id="[^"]+")?>([\s\S]*?)<\/script>/gi)];
  assert.ok(structuredData.length > 0, `Missing structured data for ${route}`);
  for (const [, json] of structuredData) JSON.parse(json);
}

for (const [route, metadata] of Object.entries(seoPages)) {
  assert.ok(sitemap.includes(`<loc>${origin}${route}</loc>`), `Missing ${route} from sitemap.xml`);
  const html = renderPage(baseHtml, route, metadata);
  validatePage(html, route, metadata);
  if (route !== '/') assert.doesNotMatch(html, /"@type"\s*:\s*"Service"/);
  if (route === '/') {
    await writeFile(path.join(outputRoot, 'index.html'), html);
  } else {
    const routeDirectory = path.join(outputRoot, route.slice(1));
    await mkdir(routeDirectory, { recursive: true });
    await writeFile(path.join(routeDirectory, 'index.html'), html);
  }
}
assert.doesNotMatch(sitemap, /llms\.txt/i, 'Context documents should not be listed as landing pages in sitemap.xml');

let notFoundHtml = renderPage(baseHtml, '/404', notFoundSeo)
  .replace(/<link\s+rel="canonical"\s+href="[^"]*"[^>]*\/>/i, '')
  .replace(/<meta\s+name="robots"\s+content="[^"]*"[^>]*\/>/i, '<meta name="robots" content="noindex, follow" data-rh="true" />');
notFoundHtml = removeMarkedJsonLd(notFoundHtml, 'Service offerings');
validatePage(notFoundHtml, '/404', notFoundSeo);
await writeFile(path.join(outputRoot, '404.html'), notFoundHtml);
