import Vue from 'vue';
import Vuex from 'vuex';
import { billsCollection, optionsCollection } from '@/firestoreConfig';

Vue.use(Vuex);

billsCollection.orderBy('dayOfMonth', 'asc').onSnapshot(querySnapshot => {
  let billsArray: Array<Bill> = [];
  querySnapshot.forEach(doc => {
    let bill = doc.data() as Bill;
    bill.id = doc.id;
    billsArray.push(bill);
  });

  if (billsArray) {
    store.state.bills = billsArray;
  } else {
    store.state.bills = [];
  }
});

optionsCollection.onSnapshot(querySnapshot => {
  let options = querySnapshot.docs[0].data();
  if (options) {
    store.state.options.income1 = options.income1;
    store.state.options.income2 = options.income2;
  }
});

export const store = new Vuex.Store({
  state: {
    bills: <Bill[]>[],
    options: {
      income1: 0,
      income2: 0
    }
  }
});
