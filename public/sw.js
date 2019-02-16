importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// /** @typedef {import('firebase')} messaging **/

firebase.initializeApp({
  messagingSenderId: '5384173140'
});

const messaging = firebase.messaging();
const staticCache = 'bills-static-cache-1';
const staticUrlsToCache = [
  './',
  './app.css',
  './chunk-vendors.css',
  './app.js',
  './chunk-vendors.js',
  './manifest.json',
  './icon.png',
  './icon_192.png',
  './sw.js'
];

const cacheStaticResources = async () => {
  const cache = await caches.open(staticCache);
  try {
    await cache.addAll(staticUrlsToCache);
    console.log('cached static resources');
  } catch (error) {
    console.log(`An error happened during static assets caching: ${error}`);
  }
};

/**
 * @param {RequestInfo} request
 */
const useResourceStrategy = async request => {
  try {
    const response = await caches.match(request);
    if (response) {
      //if in cache use cache
      return response;
    } else {
      //if not in cache try to fetch using internet
      const fetchResponse = await fetch(request);
      //if response 404 (does not exist)
      if (fetchResponse.status === 404) {
        // use offline fallback page
        return await caches.match('404.html');
      } else {
        // addResourceToDynamicCache(request, fetchResponse.clone());
        return fetchResponse;
      }
    }
  } catch (error) {
    console.log(error);
    return await caches.match('offline.html');
  }
};

self.addEventListener('install', (/** @type {ExtendableEvent} */ event) => {
  console.log('SW: Install Event');
  event.waitUntil(cacheStaticResources());
});

self.addEventListener('activate', () => {
  console.log('SW: Activate Event');
});

self.addEventListener('fetch', (/** @type {FetchEvent} */ event) => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(useResourceStrategy(event.request));
  }
});
