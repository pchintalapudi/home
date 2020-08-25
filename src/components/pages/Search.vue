<template>
  <article class="search">
    <section class="search-controls">
      <input type="text" name="tag-search" id="tag-search" />
      <p class="guide">Filter By:</p>
      <filters-vue
        :filterType="'Type'"
        :options="['Course', 'Work Experience', 'Personal Project']"
        :colors="['--blue', '--green', '--yellow']"
        @select="filteringBy = $event"
        @deselect="filteringBy = null"
      ></filters-vue>
      <filters-vue
        :filterType="'Major'"
        :options="['Bioengineering', 'Computer Science']"
        :colors="['--green', '--red']"
        v-if="filteringBy && filteringBy.filter === 'Course'"
      ></filters-vue>
    </section>
    <ul class="results">
      <li v-for="(result, idx) in results" :key="`search-${result}-${idx}`">{{result}}</li>
    </ul>
  </article>
</template>
<script lang="ts">
import Vue from "vue";
import FiltersVue from "../search/Filters.vue";
export default Vue.extend({
  components: { FiltersVue },
  data() {
    return { filteringBy: null, major: null };
  },
  computed: {
    tags(): string[] {
      return ["Bioengineering"];
    },
    results(): string[] {
      return [
        "many",
        "many",
        "many",
        "many",
        "many",
        "many",
        "many",
        "many",
        "many",
        "many",
        "many",
        "many",
        "many",
        "many",
        "many",
        "many",
        "many",
        "many",
        "many",
        "many",
      ];
    },
  }
});
</script>
<style scoped>
#tag-search {
  background-color: rgba(var(--fore-color), var(--level-2));
  font-size: 1.25em;
  padding: 5px;
  border-radius: 5px;
  width: 50vw;
}
.results {
  overflow: auto;
  flex-flow: row nowrap;
}
.results > * {
  padding: 20px;
  border-radius: 10px;
}
.search-controls {
  flex-flow: row nowrap;
  align-items: center;
  padding: 10px;
}
.guide {
  padding: 10px;
}
.search {
  padding: 20px;
}
</style>