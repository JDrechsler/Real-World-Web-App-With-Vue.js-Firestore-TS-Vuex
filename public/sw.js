importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

/** @typedef {import('firebase')} messaging **/

firebase.initializeApp({
  messagingSenderId: '5384173140'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  console.log('[sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = `${payload.data.title} due today!`;
  /**@type {NotificationOptions} */
  var notificationOptions = {
    icon: 'img/icons/icon.png',
    badge: 'img/icons/icon.png',
    // body: `${payload.data.title} due today!`,
    image: payload.data.imageUrl,
    requireInteraction: true
  };

  /**
   * @type {ServiceWorkerRegistration}
   */
  const swReg = self.registration;
  return swReg.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('install', (/** @type {ExtendableEvent} */ event) => {
  console.log('SW: Install Event');
  self.skipWaiting();
});

self.addEventListener('activate', async event => {
  clients.claim();
  console.log('SW: Activate Event');
});

self.addEventListener('message', function(event) {
  console.log('SW Received Message: ' + event.data);
});
