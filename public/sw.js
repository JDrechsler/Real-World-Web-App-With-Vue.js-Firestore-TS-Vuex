importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

// /** @typedef {import('firebase')} messaging **/

firebase.initializeApp({
  messagingSenderId: '5384173140'
});

const messaging = firebase.messaging();

self.addEventListener('install', (/** @type {ExtendableEvent} */ event) => {
  console.log('SW: Install Event');
  self.skipWaiting();
});

self.addEventListener('activate', async event => {
  clients.claim();
  console.log('SW: Activate Event');
});
