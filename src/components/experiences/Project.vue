<template>
  <article
    class="project"
    :style="`--link-color:rgb(var(--${linkColor}));`"
    @click="$emit('load-project', $props)"
  >
    <h3>{{name}}</h3>
    <b>{{timeRange}}</b>
  </article>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    name: String,
    description: String,
    tags: Array as () => string[],
    start: String,
    end: String,
    link: String,
  },
  computed: {
    timeRange(): string {
      return `${this.toMonth(
        +this.start.substring(0, 2)
      )} ${this.start.substring(3)} to ${
        this.end == null
          ? "Present"
          : `${this.toMonth(+this.end.substring(0, 2))} ${this.end.substring(
              3
            )}`
      }`;
    },
    linkColor(): string {
      switch (this.tags[0]) {
        case "Typescript":
          return "blue";
        case "C++":
          return "green";
        case "Python":
          return "yellow";
        case "Java":
          return "red";
        default:
          return "track-color";
      }
    },
  },
  methods: {
    toMonth(monthNumber: number) {
      return new Date(2020, monthNumber, 1).toLocaleString("default", {
        month: "long",
      });
    },
  },
});
</script>
<style scoped>
.project {
  padding: 10px;
  margin: 0 10px;
  transition: background-color 300ms;
  background-color: rgba(var(--fore-color), var(--level-1));
  border-radius: 10px;
  text-align: center;
  min-width: 200px;
  cursor: pointer;
}
.project:hover {
  background-color: rgba(var(--fore-color), var(--level-2));
}
.project:hover > h3 {
  color: var(--link-color);
}
</style>