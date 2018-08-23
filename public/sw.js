self.addEventListener('install', (/** @type {ExtendableEvent} */ event) => {
  console.log('SW: Install Event');
});

self.addEventListener('activate', () => {
  console.log('SW: Activate Event');
});

self.addEventListener('fetch', event => {
  console.log('fetchhhh');
});
