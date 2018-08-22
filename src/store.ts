import Vue from 'vue';
import Vuex from 'vuex';
import { firebaseMutations, firebaseAction } from 'vuexfire';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bills: []
  },
  mutations: firebaseMutations,
  actions: {
    setBillsRef: firebaseAction(({ bindFirebaseRef }, ref) => {
      bindFirebaseRef('bills', ref);
    })
  }
});
