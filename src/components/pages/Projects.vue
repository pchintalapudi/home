<template>
  <article id="projects">
    <icon-vue :icon-scale="3">
      <i class="clock"></i>
    </icon-vue>
    <h2>Personal Projects</h2>
    <section class="projects">
      <project-vue v-for="project in projects" :key="project.name" v-bind="project"></project-vue>
    </section>
  </article>
</template>
<script lang="ts">
import Vue from "vue";
import IconVue from "../utils/Icon.vue";
import ProjectVue from "../experiences/Project.vue";
interface Project {
  name: string;
  description: string;
  tags: string[];
  start: string;
  end: string | null;
  link?: string;
  github?: string;
}
export default Vue.extend({
  components: { IconVue, ProjectVue },
  computed: {
    projects(): Project[] {
      return this.$store.state.projects;
    },
  },
});
</script>
<style scoped>
.icon {
    align-self: center;
}
h2 {
  padding: 10px;
  text-align: center;
}
.projects {
  display: grid;
  column-gap: 15px;
  row-gap: 15px;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  padding: 30px;
}
@media (max-width: 900px) {
  .projects {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>