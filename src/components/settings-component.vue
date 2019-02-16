<template>
  <q-modal-layout>
    <q-toolbar slot="header">
      <q-btn dense flat icon="keyboard_arrow_left" round v-close-overlay></q-btn>
      <q-toolbar-title>Settings</q-toolbar-title>Version 0.3
    </q-toolbar>

    <div class="layout-padding">
      <q-btn @click="askForPermissionToReceiveNotifications" class="full-width mb30" color="primary" icon="add_alert" label="Allow Push Notifications"></q-btn>
      <q-btn @click="checkServiceWorker" class="full-width mb30" color="primary" icon="feedback" label="Check for Service Worker"></q-btn>
      <q-btn @click="reloadPage" class="full-width mb30" color="primary" icon="refresh" label="Refresh Page"></q-btn>
      <q-btn @click="markAllBillsAsPaid" class="full-width mb30" color="positive" label="Mark All Bills As Paid" v-close-overlay></q-btn>
      <q-btn @click="markAllBillsAsUnpaid" class="full-width mb30" color="negative" label="Mark All Bills As Unpaid" v-close-overlay></q-btn>
    </div>
  </q-modal-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  billsCollection,
  devicesCollection,
  messaging
} from "@/firestoreConfig";

//@ts-ignore
import { Notify } from "quasar-framework";
import { store } from "@/store";

@Component({
  components: {}
})
export default class Settings extends Vue {
  async askForPermissionToReceiveNotifications() {
    let token = "";
    try {
      await messaging.requestPermission();
      console.log("Notification permission granted.");
      const getToken = await messaging.getToken();
      console.log(getToken);
      if (getToken !== null) {
        token = getToken;
        await devicesCollection.add({
          token: token
        });
      } else {
        token = "";
      }
      return token;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  async checkServiceWorker() {
    try {
      const swReg = await navigator.serviceWorker.getRegistration();
      if (swReg !== undefined) {
        console.log(`SW found for ${swReg.scope}`);
        Notify.create({
          type: "info",
          message: `SW found for ${swReg.scope}`
        });
      } else {
        console.log("swReg is undefined");
        Notify.create({
          type: "info",
          message: `SW was not found`
        });
      }
    } catch (error) {
      console.log("Error getting sw registration", error);
      Notify.create({
        type: "negative",
        message: `Error getting sw registration, ${error}`
      });
    }
  }

  reloadPage() {
    window.location.reload();
  }

  markAllBillsAsPaid() {
    for (let bill of this.bills) {
      billsCollection.doc(bill.id).update({ isPaid: true });
    }
  }

  markAllBillsAsUnpaid() {
    for (let bill of this.bills) {
      billsCollection.doc(bill.id).update({ isPaid: false });
    }
  }

  get bills(): Bill[] {
    return store.state.bills;
  }
}
</script>

<style>
.q-modal-layout-content.col.scroll {
  background: linear-gradient(45deg, #6cfd9f, #6887ff) !important;
}
.mb30 {
  margin-bottom: 30px;
}
</style>