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

// async function checkBillsToday() {
//   const docsRes = await fetch(
//     'https://firestore.googleapis.com/v1beta1/projects/billersapp/databases/(default)/documents/billers?key=AIzaSyCJXGDc2kvyJSOSzu_hvhS64sHDnyKn_qE'
//   );
//   const docsData = await docsRes.json();

//   const bills = docsData.documents.map(data => data.fields);
//   const billsTodayUnpaid = bills
//     .filter(
//       bills => bills.dayOfMonth.integerValue === new Date().getDate().toString()
//     )
//     .filter(billToday => billToday.isPaid.booleanValue === false);

//   billsTodayUnpaid.forEach(billTodayUnpaid => {
//     console.log(billTodayUnpaid);

//     try {
//       self.registration.showNotification(
//         `${billTodayUnpaid.title.stringValue} due today!`,
//         {
//           body: `${billTodayUnpaid.amount.integerValue}$`
//         }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   });
// }
