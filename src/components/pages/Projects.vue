<template>
  <article id="projects">
    <icon-vue :icon-scale="3">
      <i class="clock"></i>
    </icon-vue>
    <h2>Personal Projects</h2>
    <section class="projects">
      <project-vue
        v-for="project in projects"
        :key="project.name"
        v-bind="project"
      ></project-vue>
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
h2 {
  padding: 10px;
}
#projects {
  align-items: center;
}
.projects {
    flex-flow: row wrap;
    justify-content: space-evenly;
    padding: 30px;
}
.project {
    flex-basis:calc(100%/3);
    min-width: 300px;
}
</style>