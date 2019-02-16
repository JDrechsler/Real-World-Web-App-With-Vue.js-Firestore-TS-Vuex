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

const billsCollection = db.collection('billers');
const devicesCollection = db.collection('devices');
const optionsCollection = db.collection('options');

const messaging = firebase.messaging();
navigator.serviceWorker.ready.then(swReg => {
  messaging.useServiceWorker(swReg);
});

export { db, billsCollection, devicesCollection, optionsCollection, messaging };
