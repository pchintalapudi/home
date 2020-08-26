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
    <p>Junior c/o 2022 attending MIT double majoring in Computer Science &amp; Engineering and Bioengineering</p>
    <section class="meta">
      <address class="email">
        <p>premc</p>
        <i aria-hidden="true">@SLDKFSON@@~!!~!@#$%^&*()</i>
        <p>@</p>
        <i aria-hidden="true">@SLDKFSON@@~!!~!@#$%^&*()</i>
        <p>mit.edu</p>
      </address>
      <address class="phone">
        <p>925</p>
        <i aria-hidden="true">@SLDKFSON@@~!!~!@#$%^&*(234)567-9000</i>
        <p>216</p>
        <i aria-hidden="true">@SLDKFSON@@~!!~!@#$%^&*(875)456-213</i>
        <p>1580</p>
      </address>
      <address class="home">
        <p>5109&nbsp;</p>
        <i aria-hidden="true">@SLDKFSON@@~!!~!@#$%^&*(234)567-9000</i>
        <p>Campion&nbsp;</p>
        <i aria-hidden="true">@SLDKFSON@@~!!~!@#$%^&*(234)567-9000</i>
        <p>Drive,&nbsp;</p>
        <i aria-hidden="true">@SLDKFSON@@~!!~!@#$%^&*(234)567-9000</i>
        <p>CA&nbsp;</p>
        <i aria-hidden="true">@SLDKFSON@@~!!~!@#$%^&*(234)567-9000</i>
        <p>94582</p>
      </address>
      <address class="resume">
          <a href="https://github.com/pchintalapudi/home/raw/master/src/assets/Prem_Chintalapudi_Resume.pdf" download="">Resume (Download)</a>
      </address>
    </section>
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
h1 + p {
  align-items: center;
  font-size: 1.25em;
  padding: 20px;
}
.meta {
    flex-flow: row wrap;
    justify-content: space-evenly;
}
address {
    display: block;
    font-style: normal;
}
address>* {
    display: inline;
}
address>i {
    opacity:0;
    user-select: none;
    pointer-events: none;
    transform: scale(0, 0);
    position: absolute;
}
.phone>p:not(:last-child)::after {
    content:"-";
    display: inline;
}
:any-link, :any-link:visited {
    color: rgb(var(--blue));
    transition: color 300ms, opacity 300ms;
    text-decoration: none;
}
:any-link:hover {
    opacity: 0.75;
}
:any-link:active {
    opacity: 0.5;
}
</style>