import { initializeApp, firestore } from 'firebase';
import Vue from 'vue';

var config = {
  databaseURL: 'https://billersapp.firebaseio.com',
  projectId: 'billersapp'
};

initializeApp(config);

const db = firestore();

export var billsRefSorted = db
  .collection('billers')
  .orderBy('dayOfMonth', 'asc');

// var billsRef = db.collection('billers');
Vue.prototype.$billsRef = db.collection('billers');
