<template>
  <article
    :class="['class-card', error ? 'error' : loading ? 'loading' : 'active']"
    :id="id"
    :highlighted="highlighted"
    :title="error && 'Failed to load full class information, do you have an unstable network?'"
    @click="!error && $emit('describe-class', {id, term, year, title:classTitle, description:classDescription})"
  >
    <h4>{{error ? id : classTitle}}</h4>
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
    return { changed: false, error:true };
  },
  async mounted() {
    try {
      await this.$store.dispatch("getClassData", this.id);
    } catch {
      this.error = true;
    }
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
    highlighted():boolean {
        return this.$store.state.highlighted === this.id;
    }
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
  background-color: rgba(var(--fore-color), var(--level-2));
}
.loading {
  cursor: default;
  pointer-events: none;
}
.class-card.active:hover {
  background-color: rgba(var(--fore-color), var(--level-4));
}
.class-card.active:active {
  background-color: rgba(var(--fore-color), var(--level-5));
}
.class-card.active:hover > h4 {
  transition: color 300ms;
  color: rgb(var(--link-color));
}
.class-card > h4 {
  text-align: center;
}
.class-card[highlighted] {
    background-color: rgba(var(--blue), 0.3);
}
.error {
  cursor:not-allowed;
}
</style>