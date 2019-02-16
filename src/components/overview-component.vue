<template>
  <q-modal-layout>
    <q-toolbar slot="header">
      <q-btn dense flat icon="keyboard_arrow_left" round v-close-overlay></q-btn>
      <q-toolbar-title>Overview</q-toolbar-title>
    </q-toolbar>

    <div class="layout-padding">
      <q-card>
        <q-list>
          <q-item>
            <q-item-side>
              <q-item-tile color="positive" icon="add"/>
            </q-item-side>
            <q-item-main>
              <q-item-tile label>1. Monthly Income:</q-item-tile>
              <q-item-tile sublabel>
                <q-input prefix="$" type="number" v-model="appOptions.income1"></q-input>
              </q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-card>

      <q-card>
        <q-list>
          <q-item>
            <q-item-side>
              <q-item-tile color="positive" icon="add"/>
            </q-item-side>
            <q-item-main>
              <q-item-tile label>2. Monthly Income:</q-item-tile>
              <q-item-tile sublabel>
                <q-input prefix="$" type="number" v-model="appOptions.income2"></q-input>
              </q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-card>

      <q-card>
        <q-list>
          <q-item>
            <q-item-side>
              <q-item-tile color="red" icon="remove"/>
            </q-item-side>
            <q-item-main>
              <q-item-tile label>Monthly amount for bills:</q-item-tile>
              <q-item-tile sublabel>${{getMonthlyAmountBills}}</q-item-tile>
            </q-item-main>
          </q-item>

          <q-item>
            <q-item-side>
              <q-item-tile color="primary" icon="arrow_forward"/>
            </q-item-side>
            <q-item-main>
              <q-item-tile label>Monthly money left:</q-item-tile>
              <q-item-tile sublabel>${{getMonthlyMoneyLeft.toFixed(2)}}</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-card>

      <q-btn @click="updateOptions" class="full-width" color="positive" icon="add" v-close-overlay>Save Changes</q-btn>
    </div>
  </q-modal-layout>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { store } from "@/store";
import { optionsCollection } from "@/firestoreConfig";

@Component({})
export default class Overview extends Vue {
  get bills() {
    return store.state.bills;
  }

  get appOptions() {
    return store.state.options;
  }

  get getMonthlyAmountBills() {
    let amountAllBills = 0;
    for (let bill of this.bills) {
      amountAllBills += bill.amount;
    }
    return amountAllBills;
  }

  get getMonthlyMoneyLeft() {
    return (
      this.appOptions.income1 +
      this.appOptions.income2 -
      this.getMonthlyAmountBills
    );
  }

  async updateOptions() {
    try {
      await optionsCollection.doc("1").update({
        income1: this.appOptions.income1,
        income2: this.appOptions.income2
      });
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style scoped>
.q-modal-layout-content.col.scroll {
  background: linear-gradient(45deg, #6cfd9f, #6887ff);
}
.q-card {
  background: rgba(239, 239, 218, 0.63);
  margin-bottom: 20px;
}
.q-icon {
  font-size: 28px;
}
.q-if-addon {
  color: #757575 !important;
}
input {
  color: #757575 !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}
</style>