<template>
  <article class="filter">
    <button
      class="type"
      :selecting="viewingOptions"
      :style="`--link-color:var(${linkColor})`"
      @click="selectedOption === -1 ? viewingOptions=!viewingOptions : deselect()"
    >{{selectedOption === -1 ? (options.length > 2 ? 'Any ' : 'Either ') + filterType : options[selectedOption]}}</button>
    <button
      class="dropdown"
      @click="viewingOptions=!viewingOptions"
      :viewing="viewingOptions"
    >{{viewingOptions ? 'Hide Options' : 'View Options'}}</button>
    <ul class="options" v-if="viewingOptions">
      <li v-for="(filter, idx) in options" :key="`filter-${filterType}-${filter}`" style="--link-color:var(--fore-color)" class="option">
        <button @click="select(filter, idx)">{{filter}}</button>
      </li>
    </ul>
  </article>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    filterType: String,
    options: Array as () => string[],
    colors: Array as () => string[],
  },
  data() {
    return { selectedOption: -1, viewingOptions: false };
  },
  computed: {
    linkColor(): string {
      return this.selectedOption == -1 || !this.colors
        ? "--fore-color"
        : this.colors[this.selectedOption];
    },
  },
  methods: {
    deselect() {
      this.selectedOption = -1;
      this.$emit("deselect", this.filterType);
    },
    select(filter: string, idx: number) {
      this.selectedOption = idx;
      this.$emit("select", { type: this.filterType, filter });
      this.viewingOptions = false;
    },
  },
});
</script>
<style scoped>
.filter {
  position: relative;
  flex-flow: row nowrap;
}
button {
  text-align: left;
  padding: 10px;
  cursor: pointer;
  background-color: transparent;
  color:rgb(var(--link-color));
}
button:hover {
  background-color: rgba(var(--fore-color), var(--level-1));
}
button:active {
  background: rgba(var(--fore-color), var(--level-2));
}
.options {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translateY(100%);
  background-color: rgb(var(--track-color));
}
.options,
.options > :last-child > button {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.type[selecting], .type[selecting]+.dropdown {
  background-color: rgba(var(--fore-color), var(--level-1));
}
.dropdown {
  font-size: 0;
  position: relative;
}
.dropdown::after {
  content: "";
  border: 2px solid rgb(var(--fore-color));
  border-top-style: none;
  border-left-style: none;
  width: 10px;
  height: 10px;
  box-sizing: border-box;
  position: absolute;
  transform: translate(-4.5px, 2px) rotate(45deg);
  transition: border-color 300ms, transform 300ms;
}
.dropdown[viewing]::after {
  transform: translate(-4.5px, 8px) rotate(225deg);
}
.type {
    width: 175px;
}
</style>