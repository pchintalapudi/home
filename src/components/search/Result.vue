<template>
  <li class="result">
    <a :href="`#${id}`">{{title}}</a>
  </li>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    id: String,
    payload: Object,
    payloadType: Number,
  },
  computed: {
    title(): string {
      switch (this.payloadType) {
        case 0:
          return !this.$store.state.loading && this.$store.state.classCache[this.id] !== undefined ? this.$store.state.classCache[this.id].title : "Loading class title...";
        case 1:
          return this.payload.company + " - " + this.payload.role;
        case 2:
          return this.payload.name;
      }
      return "";
    },
  },
});
</script>
<style scoped>
.result > :any-link,
.result > :any-link:visited {
  color: rgb(var(--fore-color));
  text-decoration: none;
  padding: 10px;
  border-radius: 10px;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
.result > :hover {
  background-color: rgba(var(--fore-color), var(--level-1));
}
.result > :active {
  background-color: rgba(var(--fore-color), var(--level-2));
}
</style>