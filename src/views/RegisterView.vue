<template>
  <div class="container">
    <div class="cover">
      <h3>Register</h3>
      <form @submit.prevent="register">
        <div class="mb-3">
          <!-- <label for="" class="form-label">Email</label> -->
          <input
            v-model="displayName"
            type="name"
            class="form-control"
            name="name"
            id="name"
            aria-describedby="emailHelpId"
            placeholder="Name"
          />
        </div>
        <div class="mb-3">
          <!-- <label for="" class="form-label">Email</label> -->
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
          <!-- <label for="" class="form-label">Password</label> -->
          <input
            v-model="password"
            type="password"
            class="form-control"
            name="password"
            id="password"
            placeholder="password"
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { createUser, signIn } from "@/store/db";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class RegisterView extends Vue {
  email = "";
  password = "";
  displayName = "";
  register() {
    if (this.email && this.password) {
      createUser(this.email, this.password, this.displayName);
      this.email = "";
      this.password = "";
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
  transition: all 0.3s ease;
}
button:hover {
  background-color: rgb(197, 225, 216);
}
.error {
  color: red;
}
</style>
