<template>
  <q-modal-layout>
    <q-toolbar slot="header">
      <!-- <q-btn dense flat icon="keyboard_arrow_left" round v-close-overlay></q-btn> -->
      <q-toolbar-title>Authorization</q-toolbar-title>
    </q-toolbar>

    <div class="layout-padding">
      <q-card class="white">
        <q-tabs underline-color="#33CFFF" v-model="selectedTab">
          <q-tab name="login-tab" slot="title">Login</q-tab>
          <q-tab name="register-tab" slot="title">Register</q-tab>

          <q-tab-pane name="login-tab">
            <q-collapsible icon="explore" label="Google">
              <div>Google</div>
            </q-collapsible>
            <q-collapsible icon="perm_identity" label="Email and password">
              <div>Email and password</div>
            </q-collapsible>
            <q-collapsible icon="shopping_cart" label="Anonymouse">
              <div>Anonymous</div>
            </q-collapsible>
          </q-tab-pane>
          <q-tab-pane name="register-tab">
            <q-collapsible icon="explore" label="Google">
              <div>Google</div>
            </q-collapsible>
            <q-collapsible icon="perm_identity" label="Email and password">
              <div>Email and password</div>
            </q-collapsible>
            <q-collapsible icon="shopping_cart" label="Anonymouse">
              <div>Anonymous</div>
            </q-collapsible>
          </q-tab-pane>
        </q-tabs>
      </q-card>
    </div>
  </q-modal-layout>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class Auth extends Vue {
  selectedTab: string = "login-tab";
}
</script>

<style scoped>
.white {
  background: white;
}
</style>