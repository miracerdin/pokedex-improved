<template>
  <div id="app">
    <HeaderComponent> </HeaderComponent>
    <ThemeButton></ThemeButton>
    <nav>
      <router-link :to="`/${$i18n.locale}`">{{ $t("Home") }}</router-link> |
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
    </nav>
    <router-view />
  </div>
</template>
<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ThemeButton from "@/components/ThemeButton.vue";
@Component({
  components: {
    HeaderComponent,
    ThemeButton,
  },
})
export default class App extends Vue {}
</script>
<style>
:root {
  --background-color-primary: #ebebeb;
  --background-color-secondary: #fafafa;
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

nav {
  padding: 30px;
  font-size: 1.5rem;
}

nav a {
  font-weight: bold;
  color: var(--text-primary-colors);
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
