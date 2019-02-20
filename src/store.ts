import Vue from 'vue';

export const store = Vue.observable({
  bills: <Bill[]>[],
  options: {
    income1: 0,
    income2: 0,
    modalAuthOpened: true,
    userIsAuthenticated: false
  }
});
