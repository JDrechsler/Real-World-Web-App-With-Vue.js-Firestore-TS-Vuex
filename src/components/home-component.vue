<template>
  <q-layout view="hHr LpR lFf">
    <q-layout-header>
      <q-toolbar>
        <q-toolbar-title>Bill Tracker - {{getDateToday}}</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container class="scroll-content">
      <q-page>
        <div v-if="bills.length > 0">
          <div :key="bill.id" v-for="bill in unpaidBills">
            <card-comp :propbill="bill" @click.native="editSelectedBill(bill)" @contextmenu.native.prevent="editSelectedBill(bill)"></card-comp>
          </div>

          <hr>

          <div :key="bill.id" v-for="bill in paidBills">
            <card-comp :propbill="bill" @click.native="editSelectedBill(bill)" @contextmenu.native.prevent="editSelectedBill(bill)"></card-comp>
          </div>
        </div>
        <div v-else>No bills to show right now.</div>

        <q-page-sticky :offset="[18, 18]" position="bottom-right">
          <q-fab color="primary" direction="up" icon="add">
            <q-fab-action @click="addModalOpened=true" class="white" color="blue" icon="add"></q-fab-action>
            <q-fab-action @click="settingsModalOpened=true" class="white" color="blue" icon="settings"></q-fab-action>
            <q-fab-action @click="overviewModalOpened=true" class="white" color="blue" icon="info"></q-fab-action>
          </q-fab>
        </q-page-sticky>

        <q-modal :content-css="{minWidth: '80vw', minHeight: '80vh'}" v-if="addModalOpened" v-model="addModalOpened">
          <add-bill-comp></add-bill-comp>
        </q-modal>

        <q-modal :content-css="{minWidth: '80vw', minHeight: '80vh'}" v-if="editModalOpened" v-model="editModalOpened">
          <edit-bill-comp :propbill="selectedBill"></edit-bill-comp>
        </q-modal>

        <q-modal :content-css="{minWidth: '80vw', minHeight: '80vh'}" v-if="overviewModalOpened" v-model="overviewModalOpened">
          <overview-comp></overview-comp>
        </q-modal>

        <q-modal :content-css="{minWidth: '80vw', minHeight: '80vh'}" v-if="settingsModalOpened" v-model="settingsModalOpened">
          <settings-comp></settings-comp>
        </q-modal>

        <q-modal :content-css="{minWidth: '80vw', minHeight: '80vh'}" no-backdrop-dismiss no-esc-dismiss v-if="authModalOpened" v-model="authModalOpened">
          <auth-comp></auth-comp>
        </q-modal>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Settings from "@/components/settings-component.vue";
import Card from "@/components/card-component.vue";
import Overview from "@/components/overview-component.vue";
import AddBill from "@/components/add-bill-component.vue";
import EditBill from "@/components/edit-bill-component.vue";
import { store } from "@/store";
import Auth from "@/components/auth-component.vue";

@Component({
  components: {
    "settings-comp": Settings,
    "card-comp": Card,
    "overview-comp": Overview,
    "add-bill-comp": AddBill,
    "edit-bill-comp": EditBill,
    "auth-comp": Auth
  }
})
export default class Home extends Vue {
  message: string = "Vuefire & Firestore";
  notificationSupported: boolean = false;
  addModalOpened: boolean = false;
  editModalOpened: boolean = false;
  overviewModalOpened: boolean = false;
  settingsModalOpened: boolean = false;
  authModalOpened: boolean = false;
  search: string = "string";

  selectedBill: Bill = this.createEmptyBill();

  created() {
    this.enableServiceWorker();
    this.checkAutoPayBills();
    // this.authModalOpened = true;
  }

  enableServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", async () => {
        try {
          const reg = await navigator.serviceWorker.register("./sw.js");
          console.log("Registration successful. Scope is " + reg.scope);
        } catch (error) {
          console.log("Registration failed.", error);
        }
      });
    } else {
      console.log("no sw possibility");
    }
  }

  checkAutoPayBills(): void {
    this.unpaidBills
      .filter(bill => bill.autoPay && bill.dayOfMonth === new Date().getDate())
      .map(bills => {
        console.log(bills);
      });
  }

  editSelectedBill(bill: Bill) {
    this.selectedBill = bill;
    this.editModalOpened = true;
  }

  createEmptyBill(): Bill {
    return {
      id: "",
      isPaid: false,
      autoPay: false,
      dayOfMonth: 1,
      imageUrl: "",
      title: "",
      amount: 1
    };
  }

  get bills(): Bill[] {
    return store.state.bills;
  }

  get getDateToday(): string {
    let today = new Date();
    return today.toDateString();
  }

  get paidBills(): Bill[] {
    return this.bills.filter(u => u.isPaid);
  }

  get unpaidBills(): Bill[] {
    return this.bills.filter(p => !p.isPaid);
  }
}
</script>

<style scoped>
.scroll-content {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: absolute;
  z-index: 1;
  display: block;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  will-change: scroll-position;
  background: linear-gradient(45deg, #6cfd9f, #6887ff);
}
</style>