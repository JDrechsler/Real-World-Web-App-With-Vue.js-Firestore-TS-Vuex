import Vue from 'vue';
import { billsCollection, optionsCollection } from '@/firestoreConfig';

billsCollection.orderBy('dayOfMonth', 'asc').onSnapshot(querySnapshot => {
  let billsArray: Array<Bill> = [];
  querySnapshot.forEach(doc => {
    let bill = doc.data() as Bill;
    bill.id = doc.id;
    billsArray.push(bill);
  });

  if (billsArray) {
    store.bills = billsArray;
  } else {
    store.bills = [];
  }
});

optionsCollection.onSnapshot(querySnapshot => {
  let options = querySnapshot.docs[0].data();
  if (options) {
    store.options.income1 = options.income1;
    store.options.income2 = options.income2;
  }
});

export const store = Vue.observable({
  bills: <Bill[]>[],
  options: {
    income1: 0,
    income2: 0
  }
});
