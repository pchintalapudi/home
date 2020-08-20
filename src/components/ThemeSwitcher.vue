<template>
  <button class="track" @click="toggle">
    <i class="sun" :moon="darkMode"></i>
  </button>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  computed: {
    darkMode(): boolean {
      return this.$store.state.darkMode;
    }
  },
  methods: {
      toggle() {
          this.$store.commit("darkMode", !this.darkMode);
      }
  }
});
</script>
<style scoped>
.track {
    width: 120px;
    height: 60px;
    border-radius: 30px;
    background-color: rgb(var(--track-color));
    cursor: pointer;
    position: relative;
}
.track::after {
    content: "";
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    pointer-events: none;
    opacity: 0;
    background-color: rgb(var(--fore-color));
    transition: opacity 300ms, background-color 300ms;
    border-radius: 30px;
}
.track:hover::after {
    opacity: 0.25;
}
.track:active::after {
    opacity: 0.5;
}
.sun {
    border: 5px solid rgb(var(--fore-color));
    transition: all 300ms;
    display: block;
    position: absolute;
    height: 44px;
    width: 44px;
    transform: scale(0.875, 0.875) rotate(22.5deg) translate(15px, 2.5px);
}
.sun::before {
    transform: rotate(45deg) scale(1.25, 1.25);
    transform-origin: center center;
    position: absolute;
    content: "";
    border: 5px solid rgb(var(--fore-color));
    transition: all 300ms;
    display: block;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
}
.sun::after {
    border-radius: 50%;
    border: 5px solid rgb(var(--fore-color));
    background-color: rgb(var(--track-color));
    transition: all 300ms;
    position: absolute;
    content: "";
    display: block;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
    transform: scale(1.375, 1.375);
}

.sun[moon] {
    border-radius: 50%;
    border-color: transparent;
    background-color: rgb(var(--fore-color));
    transform: translate(65px, 7px);
}
.sun[moon]::before {
    opacity: 0;
}
.sun[moon]::after {
    border-color: transparent;
    transform: translateX(10px);
}
</style>