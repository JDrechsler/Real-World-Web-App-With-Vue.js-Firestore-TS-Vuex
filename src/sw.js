workbox.core.setCacheNameDetails({ prefix: 'BillsVueTS' });

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('install', (/** @type {ExtendableEvent} */ event) => {
  console.log('SW: Install Event');
});

self.addEventListener('activate', () => {
  console.log('SW: Activate Event');
});

self.addEventListener('fetch', event => {
  console.log('fetchhhh');
});
