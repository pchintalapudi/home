<template>
  <section class="title-page">
    <nav>
      <h1>Prem Chintalapudi</h1>
      <span class="grow"></span>
      <span>
        <theme-switcher-vue class="dark-mode-switcher"></theme-switcher-vue>
      </span>
    </nav>
    <article class="summary">
      <div tooltip="Education">
        <i class="icon graduation-cap"></i>
      </div>
      <div tooltip="Work Experience">
        <i class="icon laptop"></i>
      </div>
      <div tooltip="Personal Projects">
        <i class="icon clock"></i>
      </div>
      <div tooltip="Skills">
        <i class="icon hammer"></i>
      </div>
    </article>
  </section>
</template>
<script lang="ts">
import Vue from "vue";
import ThemeSwitcherVue from "../ThemeSwitcher.vue";
export default Vue.extend({
  components: { "theme-switcher-vue": ThemeSwitcherVue },
});
</script>
<style>
nav {
  width: 100vw;
  flex-flow: row wrap;
  padding: 10px;
}
.dark-mode-switcher {
  transform: scale(0.5, 0.5);
}
h1 {
  font-size: 2.5em;
}
.title-page {
    min-height: 100vh;
}
.icon {
  position: relative;
  width: 44px;
  height: 44px;
  background-color: rgba(var(--fore-color), var(--level-1));
  transition: background-color 300ms;
  border-radius: 50%;
  transform: scale(2, 2);
  margin: 0 22px;
  cursor: pointer;
}
.icon:hover {
    background-color: rgba(var(--fore-color), var(--level-2));
}
.icon:active {
    background-color: rgba(var(--fore-color), var(--level-5));
}
.laptop::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform-origin: center top;
  transform: scale(0.5625, 0.375) translateY(27.5px);
  border: 5px solid rgb(var(--green));
  border-radius: 5px;
  transition: border-color 300ms, background-color 300ms;
}
.laptop::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 9px solid rgb(var(--green));
  border-radius: 5px;
  transform: scale(0.5625, 0.5) translateY(17.5px) rotate3d(1, 0, 0, 67.5deg);
  transition: border-color 300ms, background-color 300ms;
}
.graduation-cap::before {
  position: absolute;
  content: "";
  background-color: rgb(var(--blue));
  transition: background-color 300ms;
  height: 10px;
  width: 19.5px;
  transform: translateY(20px);
  border-bottom-left-radius: 5px 2px;
  border-bottom-right-radius: 5px 2px;
}
.graduation-cap::after {
  position: absolute;
  content: "";
  height: 10px;
  width: 20px;
  background-color: rgb(var(--blue));
  box-shadow: -7.5px 5.5px 0 0px rgb(var(--back-color));
  transition: background-color 300ms, box-shadow 300ms;
  transform: translateY(10px) rotate(-10deg) skewX(60deg)
    rotate3d(1, 0, 0, 45deg);
}
.clock::before {
  content: "";
  height: 27.5px;
  width: 27.5px;
  border-radius: 50%;
  border: 2.5px solid rgb(var(--yellow));
  transform: translateY(7.75px);
  box-sizing: border-box;
  transition: border-color 300ms;
}
.clock::after {
  content: "";
  height: 8px;
  width: 11px;
  box-sizing: border-box;
  border-left: 2px solid rgb(var(--yellow));
  border-bottom: 2px solid rgb(var(--yellow));
  transform: translate(-1px, -6px) rotate(135deg);
  transition: border-color 300ms;
}
.hammer::before {
  content: "";
  height: 5px;
  width: 20px;
  background-color: rgb(var(--red));
  transform: translate(-2.5px, 22.5px) rotate(-45deg);
  border-radius: 1.25px;
  transition: background-color 300ms;
}
.hammer::after {
    content:"";
    height:10px;
    width:17.5px;
    background-color: rgb(var(--red));
    border-radius: 2.5px;
    transform: rotate(45deg) translateX(8.5px);
    transition: background-color 300ms;
}
.summary {
    flex-flow: row wrap;
    justify-content: space-evenly;
    width: 100vw;
    padding: 20px;
}
</style>