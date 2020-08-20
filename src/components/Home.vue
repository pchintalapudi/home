<template>
  <main :dark-mode="darkMode">
    <title-vue></title-vue>
    <education-vue></education-vue>
    <projects-vue></projects-vue>
  </main>
</template>
<script lang="ts">
import Vue from "vue";
import TitleVue from "./pages/Title.vue";
import EducationVue from "./pages/Education.vue";
import ProjectsVue from "./pages/Projects.vue";
export default Vue.extend({
  components: { TitleVue, ProjectsVue, EducationVue },
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
  overflow-x: hidden;
}
.grow {
  flex: 1;
}
main {
  --back-color: 255, 255, 255;
  --fore-color: 0, 0, 0;
  --track-color: 244, 244, 244;
  --level-1: 0.05;
  --level-2: 0.07;
  --level-3: 0.08;
  --level-4: 0.09;
  --level-5: 0.11;
  --level-6: 0.12;
  --level-7: 0.14;
  --level-8: 0.15;
  --level-9: 0.16;
  --blue: 18, 96, 160;
  --green: 0, 144, 64;
  --yellow: 196, 144, 0;
  --red: 206, 32, 32;
  background-color: rgb(var(--back-color));
  color: rgb(var(--fore-color));
  transition: background-color 300ms, color 300ms;
  overflow-y: auto;
  scroll-behavior: smooth;
}
input, button {
  background-color: rgb(var(--back-color));
  color: rgb(var(--fore-color));
  transition: background-color 300ms, color 300ms;
}
main[dark-mode] {
  --back-color: 18, 18, 18;
  --fore-color: 222, 222, 222;
  --track-color: 29, 29, 29;
  --blue: 0, 136, 255;
  --green: 8, 242, 142;
  --yellow: 253, 253, 102;
  --red: 220, 60, 60;
}
html {
  font-family: "Merriweather", serif;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Rubik", sans-serif;
}
</style>