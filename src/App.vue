<template>
  <div id="app">
    <nav>
      <div class="nav-link">
        <router-link :to="`/${$i18n.locale}`">{{ $t("Home") }}</router-link>
        |
        <router-link :to="`/${$i18n.locale}/FavoritesPage`">{{
          $t("Favorites")
        }}</router-link>
        |
        <router-link :to="`/${$i18n.locale}/LoginView`">{{
          $t("Login")
        }}</router-link>
        |
        <router-link :to="`/${$i18n.locale}/RegisterView`">{{
          $t("Register")
        }}</router-link>
      </div>
      <div class="btnClass">
        <HeaderComponent> </HeaderComponent>
        <ThemeButton class="ThemeButton"></ThemeButton>
      </div>
    </nav>
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ThemeButton from "@/components/ThemeButton.vue";
import { auth } from "./store/db";
@Component({
  components: {
    HeaderComponent,
    ThemeButton,
  },
})
export default class App extends Vue {
  async created() {
    if (!auth.currentUser) {
      this.$router.push(`/${this.$i18n.locale}/LoginView`);
    }
  }
}
</script>
<style>
:root {
  --background-color-primary: #c5fbaf;
  --background-color-secondary: #95e9c4;
  --accent-color: #cacaca;
  --text-primary-color: #222;
  --element-size: 4rem;
}

/* Define styles for the root window with dark - mode preference */
:root.dark-theme {
  --background-color-primary: #1e1e1e;
  --background-color-secondary: #2d2d30;
  --accent-color: #3f3f3f;
  --text-primary-color: #ddd;
}
html,
body {
  margin: 0px !important;
  padding: 0px !important;
  background-color: #95e9c4;
  overflow-x: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  min-height: 100vh;
}
.nav-link {
  text-align: center;
  margin: auto;
}
nav {
  display: flex;
  justify-content: center;
  padding: 30px;
  font-size: 1.5rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}
.btnClass {
  display: flex;
}
.ThemeButton {
  display: inline-block;
}
nav a {
  font-weight: bold;
  color: var(--text-primary-colors);
}

nav a.router-link-exact-active {
  color: #42b983;
}
@media (max-width: 712px) {
  .btnClass {
    display: flex;
    flex-direction: column;
  }
}
@media (max-width: 577px) {
  .nav-link {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 30px;
    font-size: 1.5rem;
  }
  .btnClass {
    display: flex;
    flex-direction: column;
  }
}
</style>
