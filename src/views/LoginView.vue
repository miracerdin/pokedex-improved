<template>
  <div class="container">
    <div class="cover loginPage">
      <h3>{{ $t("Login") }}</h3>
      <form @submit.prevent="pressed">
        <div class="mb-3">
          <input
            v-model="email"
            type="email"
            class="form-control"
            name="email"
            id="email"
            aria-describedby="emailHelpId"
            placeholder="email"
          />
        </div>

        <div class="mb-3">
          <input
            v-model="password"
            type="password"
            class="form-control"
            name="password"
            id="password"
            :placeholder="$t('password').toString()"
          />
        </div>
        <button type="submit">{{ $t("Send") }}</button>
      </form>
      <div class="google" @click="handleGoogle">
        <img
          class="googlebtn"
          type="submit"
          src="../../src/assets/7123025_logo_google_g_icon.png"
          alt=""
        />
        <span> {{ $t("LoginGoogle") }}</span>
      </div>

      <span
        >{{ $t("loginPage.parag") }}
        <router-link class="link" :to="`/${$i18n.locale}/RegisterView`">{{
          $t("Register")
        }}</router-link></span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { auth, signIn, signUpProvider } from "@/store/db";

import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class LoginView extends Vue {
  email = "";
  password = "";

  handleGoogle() {
    signUpProvider();
  }
  pressed() {
    if (this.email && this.password) {
      signIn(this.email, this.password);
      this.email = "";
      this.password = "";
      console.log(auth);
    } else {
      alert("Fill all the sections");
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.cover {
  text-align: center;
  background-color: var(--background-color-secondary);
  color: var(--text-primary-color);
  width: 50%;
  margin: 1rem 0;
  padding: 1rem 0;
  border-radius: 1rem;
}
.google {
  position: relative;
  height: 3rem;
  background-color: var(--background-color-primary);
  border-radius: 1rem;
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  cursor: pointer;
}
.googlebtn {
  margin-right: 1rem;
  width: 30px;
  height: 30px;
  right: 1rem;
  transition: all 0.5s ease;
}
.mb-3 {
  width: 100%;
}
input {
  width: 60%;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
  border-radius: 1rem;
}
button {
  width: 100px;
  height: 45px;
  font-size: 100%;
  border-radius: 1rem;
  cursor: pointer;
}
form {
  margin-bottom: 1rem;
}
.link {
  color: rgb(212, 95, 95);
  transition: color 0.3s ease;
}
.link:hover {
  color: red;
}
.error {
  color: red;
}
</style>
