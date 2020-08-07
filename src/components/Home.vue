<template>
  <main :dark-mode="darkMode">
    <nav>
      <span class="grow"></span>
      <span>
        <theme-switcher-vue class="dark-mode-switcher"></theme-switcher-vue>
      </span>
    </nav>
    <h1></h1>
  </main>
</template>
<script lang="ts">
import Vue from "vue";
import ThemeSwitcherVue from "./ThemeSwitcher.vue";
export default Vue.extend({
  components: { ThemeSwitcherVue },
  computed: {
    darkMode(): boolean {
      return this.$store.state.darkMode;
    },
  },
});
</script>
<style>
* {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  display: flex;
  box-sizing: border-box;
  background-color: transparent;
  flex-flow: column nowrap;
}
head,
style,
script {
  display: none;
}
html,
body,
main {
  height: 100vh;
  width: 100vw;
}
nav {
  flex-flow: row wrap;
  padding: 10px;
}
.grow {
  flex: 1;
}
.dark-mode-switcher {
  transform: scale(0.5, 0.5);
}
main {
  --back-color: white;
  --fore-color: black;
  --track-color: #dddddd;
  background-color: var(--back-color);
  color: var(--fore-color);
  transition: background-color 300ms, color 300ms;
}
input {
  background-color: var(--back-color);
  color: var(--fore-color);
  transition: background-color 300ms, color 300ms;
}
main[dark-mode] {
  --back-color: #121212;
  --fore-color: #ffffffde;
  --track-color: #222222;
}
</style>