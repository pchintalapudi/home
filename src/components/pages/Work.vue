<template>
  <article id="work">
    <icon-vue :icon-scale="3">
      <i class="laptop"></i>
    </icon-vue>
    <h2>Work Experience</h2>
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
#work {
  align-items: center;
}
.experiences {
  flex-flow: row wrap;
}
.experiences > * {
  flex-basis: calc(100% / 3);
  min-width: 250px;
  padding: 30px;
}
</style>