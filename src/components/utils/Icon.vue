<template>
  <a class="icon" :style="`--scale:${scale}`">
    <slot></slot>
  </a>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    iconScale: Number,
  },
  computed:{
      scale():number {
          return this.iconScale || 2;
      }
  }
});
</script>
<style scoped>
.icon[tooltip]::after {
  content: attr(tooltip);
  position: absolute;
  font-style: normal;
  font-size: 0.5em;
  background-color: rgb(var(--back-color));
  padding: 5px;
  border-radius: 10px;
  border: 1px solid rgb(var(--fore-color));
  opacity: 0;
  transition: opacity 300ms, background-color 300ms;
  right: 0;
  transform: translateX(calc(100% + 5px));
  pointer-events: none;
}
.icon[tooltip]:hover::after {
  opacity: 1;
  pointer-events: all;
}
.icon {
  position: relative;
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  background-color: rgba(var(--fore-color), var(--level-1));
  transition: background-color 300ms;
  border-radius: 50%;
  transform: scale(var(--scale), var(--scale));
  margin: 22px 22px;
}
.icon:any-link {
  cursor: pointer;
}
.icon:any-link:hover {
  background-color: rgba(var(--fore-color), var(--level-2));
}
.icon:any-link:active {
  background-color: rgba(var(--fore-color), var(--level-5));
}
</style>