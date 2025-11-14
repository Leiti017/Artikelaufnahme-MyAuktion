
const CACHE_NAME = 'artikelaufnahme-shell-v1';
const SHELL = [
  '/',
  '/favicon.ico',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (SHELL.includes(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((resp) => resp || fetch(event.request))
    );
    return;
  }
  event.respondWith(
    fetch(event.request).catch(() => caches.match('/'))
  );
});
