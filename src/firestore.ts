import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/auth';
import { config } from './config';

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();

const settings = { timestampsInSnapshots: true };
db.settings(settings);

const billsCollection = db.collection('billers');
const devicesCollection = db.collection('devices');
const optionsCollection = db.collection('options');

const messaging = firebase.messaging();
navigator.serviceWorker.ready.then(swReg => {
  messaging.useServiceWorker(swReg);
});

export {
  db,
  auth,
  billsCollection,
  devicesCollection,
  optionsCollection,
  messaging
};
