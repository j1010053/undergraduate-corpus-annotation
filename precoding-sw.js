"use strict";
// Only this app's shell is cached. Annotations stay in the existing localStorage key.
const VERSION = "fe0a5a9d4ab1950d";
const PREFIX = "concordance-precoding-shell:";
const CACHE = PREFIX + VERSION;
const ASSETS = ["precoding.html", "precoding.webmanifest", "precoding-icon-192.png", "precoding-icon-512.png", "precoding-icon-180.png"]
  .map(path => new URL(path, self.registration.scope).href);

self.addEventListener("install", event => {
  // addAll is atomic: do not announce readiness if any required file failed.
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS.map(url => new Request(url, {cache:"reload"})))));
  // An update waits for the user or for all old tabs to close; no forced reload.
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  url.search = "";
  url.hash = "";
  if (!ASSETS.includes(url.href)) return; // Home page, backups, GitHub and other sites pass through.
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    return (await cache.match(url.href)) || fetch(event.request);
  })());
});
self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") {
    event.waitUntil(self.skipWaiting());
  } else if (event.data?.type === "CACHE_STATUS" && event.ports[0]) {
    event.waitUntil((async () => {
      try {
        const cache = await caches.open(CACHE);
        const found = await Promise.all(ASSETS.map(url => cache.match(url)));
        event.ports[0].postMessage({version:VERSION, ready:found.every(Boolean), assetCount:found.filter(Boolean).length, expected:ASSETS.length});
      } catch (_) {event.ports[0].postMessage({version:VERSION, ready:false});}
    })());
  }
});
