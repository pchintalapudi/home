<template>
  <main :dark-mode="darkMode">
    <title-vue></title-vue>
    <summary-vue></summary-vue>
    <education-vue></education-vue>
    <work-vue></work-vue>
    <projects-vue></projects-vue>
  </main>
</template>
<script lang="ts">
import Vue from "vue";
import ThemeSwitcherVue from "./ThemeSwitcher.vue";
import TitleVue from "./pages/Title.vue";
import SummaryVue from "./pages/Summary.vue";
import EducationVue from "./pages/Education.vue";
import WorkVue from "./pages/Work.vue";
import ProjectsVue from "./pages/Projects.vue";
export default Vue.extend({
  components: {
    ThemeSwitcherVue,
    SummaryVue,
    ProjectsVue,
    EducationVue,
    WorkVue,
    TitleVue
  },
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
h1 {
  font-size: 2.5em;
}
h2 {
  font-size: 2em;
}
main {
  --back-color: 255, 255, 255;
  --fore-color: 0, 0, 0;
  --text-color: 0, 0, 0;
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
  --blue: 0, 100, 200;
  --green: 0, 144, 64;
  --yellow: 200, 175, 0;
  --red: 206, 32, 32;
  background-color: rgb(var(--back-color));
  color: rgb(var(--text-color));
  transition: background-color 300ms, color 300ms;
  overflow-y: auto;
  scroll-behavior: smooth;
}
input,
button {
  color: rgb(var(--fore-color));
  transition: background-color 300ms, color 300ms;
  border: none;
  text-align: left;
}
main[dark-mode] {
  --back-color: 18, 18, 18;
  --fore-color: 222, 222, 222;
  --track-color: 29, 29, 29;
  --text-color: 153, 153, 153;
  --blue: 0, 136, 255;
  --green: 8, 242, 142;
  --yellow: 220, 220, 80;
  --red: 220, 60, 60;
}
main > * {
  flex-shrink: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  color: rgb(var(--fore-color));
  transition: color 300ms;
  font-family: "Rubik", sans-serif;
}
html, input, button {
  font-family: "Merriweather", serif;
  font-size: 1em;
}
img {
    display: initial;
    object-fit: contain;
}
@media (max-width: 500px) {
  html {
    font-size: 0.8em;
  }
}
</style>