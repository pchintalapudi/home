<template>
  <article id="projects">
    <icon-vue :icon-scale="3">
      <i class="clock"></i>
    </icon-vue>
    <h2>Personal Projects</h2>
    <section class="cards">
        <card-vue id="website" :cardTitle="'This website'" :content="'A spiel about this website'"></card-vue>
        <card-vue id="vm" :cardTitle="'Mini Virtual Machine'" :content="'A spiel about this website'"></card-vue>
        <card-vue id="planning" :cardTitle="'Course Planner'" :content="'A spiel about this website'" :linkColor="'var(--green)'" target="_blank" href="https://pchintalapudi.github.io/courses"></card-vue>
        <card-vue id="drawer" :cardTitle="'Molecule Drawer'" :content="'A spiel about this website'" :linkColor="'var(--green)'" target="_blank" href="https://pchintalapudi.github.io/mdraw"></card-vue>
        <card-vue id="simulator" :cardTitle="'VEX Simulator'" :content="'A spiel about this website'"></card-vue>
    </section>
  </article>
</template>
<script lang="ts">
import Vue from "vue";
import IconVue from "../utils/Icon.vue";
import CardVue from "../utils/Card.vue";
export default Vue.extend({
  components: { IconVue, CardVue },
});
</script>
<style scoped>
h2 {
  padding: 10px;
}
.cards {
    flex-flow: row wrap;
}
#projects {
    align-items: center;
}
</style>