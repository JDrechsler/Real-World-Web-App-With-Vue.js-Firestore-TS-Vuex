<template>
  <q-modal-layout>
    <q-toolbar slot="header">
      <q-btn @click="hideModalAuth" dense flat icon="keyboard_arrow_left" round v-if="userIsAuthorized"></q-btn>
      <q-toolbar-title>Authentication</q-toolbar-title>
    </q-toolbar>

    <div class="layout-padding">
      <q-card class="white">
        <q-tabs underline-color="#33CFFF" v-model="selectedTab">
          <q-tab name="login-tab" slot="title">Login</q-tab>
          <q-tab name="register-tab" slot="title">Register</q-tab>

          <q-tab-pane name="login-tab">
            <q-input float-label="Email" type="email" v-model="email"></q-input>
            <q-input float-label="Password" type="password" v-model="password"></q-input>
            <q-btn @click="loginUsingEmailPassword" class="full-width" color="positive">Login</q-btn>
          </q-tab-pane>
          <q-tab-pane name="register-tab">No new users accepted at the moment.</q-tab-pane>
        </q-tabs>
      </q-card>
    </div>
  </q-modal-layout>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { auth, billsCollection, optionsCollection } from "@/firestore";
import { store } from "@/store";
//@ts-ignore
import { Notify } from "quasar-framework";

@Component({
  components: {}
})
export default class Auth extends Vue {
  selectedTab: string = "login-tab";
  email: string = "";
  password: string = "";

  async loginUsingEmailPassword() {
    try {
      var userCredential = await auth.signInWithEmailAndPassword(
        this.email,
        this.password
      );
      console.log(`Logging in as: ${this.email}`);
      console.log("Logged in succesfully as: ", userCredential.user!.email);
      this.fetchFromFirebase();
      store.options.modalAuthOpened = false;
      console.log(`Current user: ${auth.currentUser!.email}`);
      store.options.userIsAuthenticated = true;
      Notify.create({
        type: "positive",
        message: `Welcome, ${auth.currentUser!.email}!`
      });
    } catch (ex) {
      console.log(ex.message);
      Notify.create({
        type: "negative",
        message: ex.message
      });
    }
  }

  fetchFromFirebase() {
    billsCollection.orderBy("dayOfMonth", "asc").onSnapshot(querySnapshot => {
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
  }

  hideModalAuth() {
    store.options.modalAuthOpened = false;
  }

  get userIsAuthorized() {
    return store.options.userIsAuthenticated;
  }
}
</script>

<style scoped>
.white {
  background: white;
}
</style>