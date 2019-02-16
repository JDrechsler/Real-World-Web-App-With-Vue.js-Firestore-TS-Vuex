<template>
  <div id="app">
    <home-component></home-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Home from "@/components/home-component.vue";

@Component({
  components: {
    "home-component": Home
  }
})
export default class Overview extends Vue {}
</script>

<style>
.q-field-label-inner.row.items-center {
  color: black;
}
</style>
