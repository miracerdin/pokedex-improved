<template>
  <div>
    Logged in
    <span v-if="loggedIn">Yes</span>
    <span v-else>No</span>
    <div>
      <button @click="signOut">Sign out</button>
    </div>
    <div><LanguageSwitcher></LanguageSwitcher></div>
  </div>
</template>

<script lang="ts">
import { auth, logOut, userObserver } from "@/store/db";
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
      // if (user) {
      //   this.loggedIn = true;
      // } else {
      //   this.loggedIn = false;
      // }
    });
  }
  // created(){
  //   setupFirebase() {
  //   auth.onAuthStateChanged((user) => {
  //     //   this.loggedIn = !!user;
  //     if (user) {
  //       this.loggedIn = true;
  //     } else {
  //       this.loggedIn = false;
  //     }
  //   });
  // }}

  async signOut() {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style scoped></style>
