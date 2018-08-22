import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCJXGDc2kvyJSOSzu_hvhS64sHDnyKn_qE',
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

// firebase collections
const billsCollection = db.collection('billers');

export { db, billsCollection };
