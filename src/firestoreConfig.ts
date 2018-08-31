import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';

// Initialize Firebase
const config = {
  authDomain: 'billersapp.firebaseapp.com',
  databaseURL: 'https://billersapp.firebaseio.com',
  projectId: 'billersapp',
  storageBucket: 'billersapp.appspot.com',
  messagingSenderId: '5384173140'
};
firebase.initializeApp(config);

const db = firebase.firestore();

const settings = { timestampsInSnapshots: true };
db.settings(settings);

// firebase billers collection
const billsCollection = db.collection('billers');
// firebase devices collections
const devicesCollection = db.collection('devices');

const messaging = firebase.messaging();
navigator.serviceWorker.ready.then(swReg => {
  messaging.useServiceWorker(swReg);
});

export { db, billsCollection, devicesCollection, messaging };
