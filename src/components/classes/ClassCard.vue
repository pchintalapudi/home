<template>
  <article
    :class="`class-card ${loading ? 'loading' : ''}`"
    @click="$emit('describe-class', {id, term, year, title:classTitle, description:classDescription})"
  >
    <h4>{{classTitle}}</h4>
    <b>{{id}}</b>
  </article>
</template>
<script lang="ts">
import Vue from "vue";
interface ClassData {
  description: string;
  subject_id: string;
  title: string;
  url: string;
}
export default Vue.extend({
  props: {
    year: Number,
    term: String,
    id: String,
  },
  data() {
    return { changed: false };
  },
  async mounted() {
    await this.$store.dispatch("getClassData", this.id);
    this.changed = !this.changed;
  },
  computed: {
    classData(): ClassData | undefined {
      return (
        (this.changed && !this.changed) || this.$store.state.classCache[this.id]
      );
    },
    loading(): boolean {
      return !this.classData;
    },
    classTitle(): string {
      return this.classData ? this.classData.title : "Loading class data...";
    },
    classDescription(): string {
      return this.classData
        ? this.classData.description
        : "Loading class description";
    },
  },
  watch: {
    id(next, old) {
      this.$store.dispatch("getClassData", next);
    },
  },
});
</script>
<style scoped>
.class-card {
  align-items: center;
  justify-content: center;
  transition: background-color 300ms;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
}
.loading {
  cursor: default;
  pointer-events: none;
}
.class-card:hover {
  background-color: rgba(var(--fore-color), var(--level-1));
}
.class-card:active {
  background-color: rgba(var(--fore-color), var(--level-2));
}
.class-card:hover > h4 {
  transition: color 300ms;
  color: rgb(var(--link-color));
}
.class-card > h4 {
  text-align: center;
}
</style>