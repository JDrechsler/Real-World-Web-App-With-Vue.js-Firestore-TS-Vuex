<template>
  <q-modal-layout>
    <q-toolbar slot="header">
      <q-btn dense flat icon="keyboard_arrow_left" round v-close-overlay></q-btn>
      <q-toolbar-title>Edit {{updatedBill.title}}</q-toolbar-title>
    </q-toolbar>

    <div class="layout-padding">
      <card-comp :propbill="updatedBill"></card-comp>

      <q-field label="Auto Pay:">
        <q-toggle color="positive" v-model="updatedBill.autoPay"></q-toggle>
      </q-field>

      <q-field label="Title:">
        <q-input type="text" v-model="updatedBill.title"></q-input>
      </q-field>

      <q-field label="Amount:">
        <q-input type="number" v-model="updatedBill.amount"></q-input>
      </q-field>

      <q-field label="Day of Month:">
        <q-input type="number" v-model="updatedBill.dayOfMonth"></q-input>
      </q-field>

      <q-field label="Image Url:">
        <q-input type="url" v-model="updatedBill.imageUrl"></q-input>
      </q-field>

      <q-field label="Paid Status:">
        <q-toggle color="positive" v-model="updatedBill.isPaid"></q-toggle>
      </q-field>

      <br>
      <q-btn @click="updateBill(updatedBill)" class="full-width" color="positive" v-close-overlay>Save Changes to {{updatedBill.title}}</q-btn>
      <br>
      <br>
      <q-collapsible :label="'Delete ' + updatedBill.title + ' Bill'" icon="delete">
        <div>
          <q-btn @click="deleteBill(updatedBill)" color="negative" icon="delete" v-close-overlay></q-btn>
        </div>
      </q-collapsible>
    </div>
  </q-modal-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Card from "@/components/card-component.vue";
import { billsCollection } from "@/firestoreConfig";
import { store } from "@/store";

@Component({
  components: {
    "card-comp": Card
  }
})
export default class EditBill extends Vue {
  @Prop() propbill!: Bill;

  updatedBill: Bill = Object.assign({}, this.propbill);

  created() {}

  updateBill(bill: Bill) {
    if (this.updatedBill.title.trim()) {
      billsCollection.doc(bill.id).update(bill);
      console.log("updated", bill.title);
    }
  }

  deleteBill(bill: Bill) {
    billsCollection.doc(bill.id).delete();
    console.log("deleted", bill.title);
  }

  get bills(): Bill[] {
    return store.state.bills;
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