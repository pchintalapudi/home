<template>
  <aside class="descriptor">
    <section class="controls">
      <button class="close" @click="$emit('close-descriptor')">&times;</button>
    </section>
    <article class="info">
      <h3>{{title}}</h3>
      <i>{{id}}</i>
      <b>{{term}} {{year}}</b>
      <p class="description">{{description}}</p>
    </article>
  </aside>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    description: String,
    title: String,
    id: String,
    year: Number,
    term: String,
  },
});
</script>
<style scoped>
.info {
  overflow: auto;
  padding: 5px;
}
.info > * {
  padding: 10px;
}
.descriptor {
  background-color: rgb(var(--track-color));
  transition: background-color 300ms;
  border-radius: 10px;
  box-shadow: 0 0 10px 2px #000000bb;
}
.controls {
  flex-flow: row-reverse wrap;
  transition: background-color 300ms;
  background-color: rgb(var(--link-color));
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding: 10px;
}
.controls > * {
  width: 33px;
  height: 33px;
  font-size: 1.5em;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 50%;
  transition: background-color 300ms;
  background-color: rgba(var(--button-color), 0.1);
  cursor: pointer;
  color:white;
}
.controls > *:hover {
  background-color: rgba(var(--button-color), 0.25);
}
.controls > *:active {
  background-color: rgba(var(--button-color), 0.5);
}
.close {
  --button-color: var(--back-color);
}
.description {
  font-size: 0.9em;
}
</style>