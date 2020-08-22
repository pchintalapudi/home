<template>
  <article id="projects">
    <icon-vue :icon-scale="3">
      <i class="clock"></i>
    </icon-vue>
    <h2>Personal Projects</h2>
    <section class="projects">
      <div class="overflowing">
        <project-vue v-for="project in projects" :key="project.name" v-bind="project"></project-vue>
      </div>
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
.overflowing {
  flex-flow: row nowrap;
}
.projects {
  overflow: auto;
  max-width: calc(100vw - 40px);
  padding: 10px;
}
</style>