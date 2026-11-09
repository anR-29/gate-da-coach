// Service worker: repeat visits load from the device instead of the network.
// - Files with ?v= (JS, CSS, data, lessons) never change under the same URL: cache first.
// - CDN libraries (exact versions) and fonts: cache first, kept across deploys.
// - The page itself: network first (a new deploy is picked up at once), cache when offline.
// - Everything else (the GitHub API used for sync) is never touched.
// VERSION is stamped by tools/bump_version.py; a new version drops the old app cache.
const VERSION = '202611092326';
const APP = `gdc-app-${VERSION}`;
const LIBS = 'gdc-libs';
const CDN = ['https://cdn.jsdelivr.net/npm/', 'https://fonts.googleapis.com/', 'https://fonts.gstatic.com/'];

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith('gdc-app-') && key !== APP) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});

async function cacheFirst(cacheName, request) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok || res.type === 'opaque') cache.put(request, res.clone());
  return res;
}

async function networkFirst(request) {
  const cache = await caches.open(APP);
  const url = new URL(request.url);
  const key = url.origin + url.pathname; // ?r=… or #… must not create new entries
  try {
    const res = await fetch(request);
    if (res.ok) cache.put(key, res.clone());
    return res;
  } catch {
    return (await cache.match(key)) || (await cache.match(request, { ignoreSearch: true })) || Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate' && url.origin === self.location.origin) {
    event.respondWith(networkFirst(req));
  } else if (url.origin === self.location.origin && url.searchParams.has('v')) {
    event.respondWith(cacheFirst(APP, req));
  } else if (CDN.some((p) => req.url.startsWith(p))) {
    event.respondWith(cacheFirst(LIBS, req));
  }
});
