<template>
  <div class="container">
    <div class="row">
      <div class="col-9"></div>
      <div class="col-3">
        <select
          class="custom-select"
          v-model="lang"
          @change="handleChange($event)"
        >
          <option value="en">English</option>
          <option value="tr">Turkish</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class LanguageSwitcher extends Vue {
  lang = localStorage.getItem("lang") || "en";

  handleChange(event: any) {
    localStorage.setItem("lang", event.target.value);
    window.location.reload();
  }
}
</script>

<style></style>
