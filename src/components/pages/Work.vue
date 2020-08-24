<template>
  <article id="work">
    <icon-vue :icon-scale="3">
      <i class="laptop"></i>
    </icon-vue>
    <h2 class="section-title">Work Experience</h2>
    <section class="experiences">
      <work-vue v-for="w in work" :key="w.name" v-bind="w"></work-vue>
    </section>
  </article>
</template>
<script lang="ts">
import Vue from "vue";
import IconVue from "../utils/Icon.vue";
import WorkVue from "../experiences/Work.vue";
interface Work {
  id: string;
  company: string;
  role: string;
  description: string;
  start: string;
  end: string | null;
}
export default Vue.extend({
  components: { IconVue, WorkVue },
  computed: {
    work(): Work[] {
      return this.$store.state.work;
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
.experiences {
  display: grid;
  padding: 30px;
  grid-template-columns: repeat(3, minmax(300px, 1fr));
  column-gap: 15px;
  row-gap: 15px;
}
@media (max-width: 900px) {
  .experiences {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
</style>