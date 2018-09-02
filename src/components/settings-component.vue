<template>

  <q-modal-layout>
    <q-toolbar slot="header">
      <q-btn flat round dense v-close-overlay icon="keyboard_arrow_left"></q-btn>
      <q-toolbar-title>
        Settings
      </q-toolbar-title>
      Version 0.3
    </q-toolbar>

    <div class="layout-padding">
      <q-btn icon="add_alert" class="full-width mb30" color="primary" label="Allow Push Notifications" @click="askForPermissionToReceiveNotifications"></q-btn>
      <q-btn icon="refresh" class="full-width mb30" color="primary" label="Refresh Page" @click="reloadPage"></q-btn>
      <q-btn color="positive" v-close-overlay class="full-width mb30" label="Mark All Bills As Paid" @click="markAllBillsAsPaid"></q-btn>
      <q-btn color="negative" v-close-overlay class="full-width mb30" label="Mark All Bills As Unpaid" @click="markAllBillsAsUnpaid"></q-btn>
    </div>

  </q-modal-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { billsCollection, devicesCollection, messaging } from '@/firestoreConfig';

@Component({
  components: {}
})
export default class Settings extends Vue {
  async askForPermissionToReceiveNotifications() {
    let token = '';
    try {
      await messaging.requestPermission();
      console.log('Notification permission granted.');
      const getToken = await messaging.getToken();
      console.log(getToken);
      if (getToken !== null) {
        token = getToken;
        await devicesCollection.add({
          token: token
        })
      } else {
        token = '';
      }
      return token;
    } catch (error) {
      console.log(error);
      return '';
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
    return this.$store.state.bills;
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