<template>
  <q-modal-layout>
    <q-toolbar slot="header">
      <q-btn dense flat icon="keyboard_arrow_left" round v-close-overlay></q-btn>
      <q-toolbar-title>Add New Bill</q-toolbar-title>
    </q-toolbar>

    <div class="layout-padding">
      <card-comp :propbill="newBill"></card-comp>

      <q-field label="Auto Pay:">
        <q-toggle color="positive" v-model="newBill.autoPay"></q-toggle>
      </q-field>

      <q-field label="Title:">
        <q-input type="text" v-model="newBill.title"></q-input>
      </q-field>

      <q-field label="Amount:">
        <q-input type="number" v-model="newBill.amount"></q-input>
      </q-field>

      <q-field label="Day of Month:">
        <q-input type="number" v-model="newBill.dayOfMonth"></q-input>
      </q-field>

      <q-field label="Paid Status:">
        <q-toggle color="positive" v-model="newBill.isPaid"></q-toggle>
      </q-field>

      <q-field label="Image Url:">
        <q-input type="url" v-model="newBill.imageUrl"></q-input>
      </q-field>

      <br>
      <q-btn @click="addBill" class="full-width" color="positive" icon="add" v-close-overlay>Add {{newBill.title}}</q-btn>
    </div>
  </q-modal-layout>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Card from "@/components/card-component.vue";
import { billsCollection } from "@/firestoreConfig";

@Component({
  components: {
    "card-comp": Card
  }
})
export default class AddBill extends Vue {
  newBill: Bill = {
    isPaid: false,
    autoPay: false,
    dayOfMonth: 1,
    imageUrl:
      "https://visualpharm.com/assets/432/iOS%20Application%20Placeholder-595b40b75ba036ed117d63a8.svg",
    title: "New Bill",
    amount: 0,
    id: ""
  };

  created() {
    let today = new Date();
    this.newBill.dayOfMonth = today.getDate();
    let newId = billsCollection.doc().id;
    this.newBill.id = newId;
  }

  async addBill() {
    if (this.newBill.title.trim()) {
      try {
        await billsCollection.doc(this.newBill.id).set(this.newBill);
        console.log("added", this.newBill.title);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
.q-modal-layout-content.col.scroll {
  background: linear-gradient(45deg, #6cfd9f, #6887ff);
}
.q-field-label * {
  color: rgb(0, 0, 0);
}
.q-if-addon,
.q-if-control,
.q-if-label {
  color: black;
}
</style>