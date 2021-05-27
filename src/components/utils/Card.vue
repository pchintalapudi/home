<template>
  <a class="card" :style="`--link-color:${color}`" @click="highlight" :href="href || false">
    <icon-vue :icon-scale="iconScale" v-if="$slots.default">
      <slot></slot>
    </icon-vue>
    <h3>{{cardTitle}}</h3>
    <p v-if="content" class="content">{{content}}<slot name="rich-content"></slot></p>
  </a>
</template>
<script lang="ts">
import Vue from "vue";
import IconVue from "./Icon.vue";
export default Vue.extend({
  components: { IconVue },
  props: {
    cardTitle: String,
    content: String,
    iconScale: Number,
    linkColor: String,
    href: String,
  },
  computed: {
    color(): string {
      return this.linkColor || "var(--fore-color)";
    },
  },
  methods: {
    highlight() {
      if (this.href && this.href.startsWith("#"))
        this.$store.dispatch("highlight", this.href.substring(1));
    },
  },
});
</script>
<style scoped>
.card {
  background-color: rgba(var(--fore-color), var(--level-1));
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  text-align: center;
}
.card > * {
  padding: 5px;
}
.card:any-link {
  color: inherit;
  text-decoration: none;
  transition: color 300ms;
}
.card:any-link:hover,
.card:any-link:hover > h3 {
  color: rgb(var(--link-color));
}
[target].card:any-link > h3 {
  text-decoration: underline;
}
.content {
  text-transform: capitalize;
}
</style>