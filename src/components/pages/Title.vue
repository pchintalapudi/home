<template>
  <article id="title">
    <span class="top">
      <span class="grow"></span>
      <span>
        <theme-switcher-vue class="dark-mode-switcher"></theme-switcher-vue>
      </span>
    </span>
    <h1>
      <img class="img" src="../../assets/profile.jpg" alt="A profile picture of Prem Chintalapudi" />
      <p>Prem Chintalapudi</p>
    </h1>
    <search-vue></search-vue>
  </article>
</template>
<script lang="ts">
import Vue from "vue";
import ThemeSwitcherVue from "../ThemeSwitcher.vue";
import SearchVue from "./Search.vue";
export default Vue.extend({
  components: { ThemeSwitcherVue, SearchVue },
});
</script>
<style scoped>
.top {
  width: 100%;
  flex-flow: row nowrap;
}
.img {
  border-radius: 50%;
  height: 50vmin;
  width: 50vmin;
  object-fit: cover;
}
h1 {
  align-items: center;
}
</style>