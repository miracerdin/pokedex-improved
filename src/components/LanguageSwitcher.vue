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

  handleChange(event: Event) {
    localStorage.setItem("lang", (event.target as HTMLSelectElement).value);
    window.location.reload();
  }
}
</script>

<style scoped>
.container {
  margin-right: 0.5rem;
}
select {
  padding: 0.6rem 0.4rem;
  border-radius: 1rem;
  border: calc(var(--element-size) * 0.025) solid var(--accent-color);
  cursor: pointer;
  background-color: var(--background-color-secondary);
  color: var(--text-color-primary);
}
</style>
