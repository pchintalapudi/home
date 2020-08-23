<template>
  <article :id="id || false">
    <h3>{{role}}</h3>
    <h4>{{company}}</h4>
    <i>{{timeRange}}</i>
    <p>{{description}}</p>
  </article>
</template>
<script lang="ts">
import Vue from "vue";
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
</style>