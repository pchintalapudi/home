<template>
  <article class="project">
    <h3>{{name}}</h3>
    <b>{{timeRange}}</b>
    <p class="description" v-html="markedDesc"></p>
    <a :href="link" v-if="!!link">Live Demo</a>
    <a :href="github" v-if="!!github">GitHub Project</a>
  </article>
</template>
<script lang="ts">
import Vue from "vue";
import marked from "marked";
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
    markedDesc(): string {
      return marked(this.description, { breaks: true, gfm: true });
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
.project :any-link,
.project :any-link:visited {
  color: rgb(var(--blue));
  text-decoration: none;
  transition: color 300ms, opacity 300ms;
  align-self: start;
}
.project :any-link:hover {
  opacity: 0.75;
}
.project :any-link:active {
  opacity: 0.5;
}
.description {
    margin: 10px 0;
    display: block;
}
.description >>> p {
    display: initial;
}
.description :any-link {
    display: inline;
}
</style>