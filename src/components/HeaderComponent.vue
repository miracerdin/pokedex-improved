<template>
  <div class="container">
    <div>
      <button v-if="loggedIn" class="btn" @click="signOut">Sign out</button>
    </div>
    <LanguageSwitcher></LanguageSwitcher>
  </div>
</template>

<script lang="ts">
import { auth, logOut } from "@/store/db";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
@Component({
  components: {
    LanguageSwitcher,
  },
})
export default class HaederComponent extends Vue {
  loggedIn = false;

  created() {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      this.loggedIn = !!user;
    });
  }

  async signOut() {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
}
.btn {
  border: calc(var(--element-size) * 0.025) solid var(--accent-color);
  padding: 0.6rem;
  width: 5rem;
  border-radius: 1rem;
  cursor: pointer;
  background-color: var(--background-color-secondary);
  color: var(--text-color-primary);
  margin-right: 0.5rem;
}
@media (max-width: 577px) {
  .container {
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
  }
}
</style>
