<template>
  <article :id="id || false" class="work" :highlighted="highlighted">
    <h3>{{role}}</h3>
    <h4>{{company}}</h4>
    <i>{{timeRange}}</i>
    <p class="description" v-html="markedDesc"></p>
  </article>
</template>
<script lang="ts">
import Vue from "vue";
import marked from "marked";
export default Vue.extend({
  props: {
    id: String,
    company: String,
    role: String,
    description: String,
    start: String,
    end: String,
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
    markedDesc(): string {
      return marked(this.description, { gfm: true, breaks: true });
    },
    highlighted():boolean {
        return this.$store.state.highlighted === this.id;
    }
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
.tags {
  flex-flow: row wrap;
}
.tags > * {
  display: inline;
}
.tags > :not(:last-child)::after {
  content: ", ";
  display: inline;
  padding-right: 0.125em;
}
.work :any-link,
.work :any-link:visited {
  color: rgb(var(--blue));
  text-decoration: none;
  transition: color 300ms, opacity 300ms;
  align-self: start;
}
.work :any-link:hover {
  opacity: 0.75;
}
.work :any-link:active {
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
.work {
    transition: background-color 300ms;
    border-radius: 10px;
}
.work[highlighted] {
    background-color: rgba(var(--green), 0.3);
}
</style>