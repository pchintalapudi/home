<template>
  <article class="project">
    <h3>{{name}}</h3>
    <b>{{timeRange}}</b>
    <p>{{description}}</p>
    <a :href="link" v-if="!!link">Live Demo</a>
    <a :href="github" v-if="!!github">Github Project</a>
    <ul class="tags">
      <li v-for="tag in tags" :key="`${name}-${tag}`">{{tag}}</li>
    </ul>
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
    github: String,
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
}
.tags {
  flex-flow: row wrap;
}
.tags > * {
  display: inline;
  font-style: italic;
}
.tags > :not(:last-child)::after {
  content: ", ";
  display: inline;
  padding-right: 0.125em;
}
:any-link,
:any-link:visited {
  color: rgb(var(--blue));
  text-decoration: none;
  transition: color 300ms, opacity 300ms;
  align-self: start;
}
:any-link:hover {
    opacity: 0.75;
}
:any-link:active {
    opacity: 0.5;
}
</style>