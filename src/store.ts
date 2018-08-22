import Vue from 'vue';
import Vuex from 'vuex';
import { billsCollection } from '@/firestoreConfig';

Vue.use(Vuex);

billsCollection.orderBy('dayOfMonth', 'asc').onSnapshot(querySnapshot => {
  let billsArray: Array<any> = [];
  querySnapshot.forEach(doc => {
    let bill = doc.data();
    bill.id = doc.id;
    billsArray.push(bill);
  });
  store.commit('setBills', billsArray);
});

export const store = new Vuex.Store({
  state: {
    bills: []
  },

  mutations: {
    setBills(state, val) {
      if (val) {
        state.bills = val;
      } else {
        state.bills = [];
      }
    }
  }
});
