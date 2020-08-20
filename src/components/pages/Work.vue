<template>
  <article id="work">
    <icon-vue :icon-scale="3">
      <i class="laptop"></i>
    </icon-vue>
    <h2>Work Experience</h2>
  </article>
</template>
<script lang="ts">
import Vue from "vue";
import IconVue from "../utils/Icon.vue";
export default Vue.extend({
  components: { IconVue },
});
</script>
<style scoped>
#work {
    align-items: center;
}
</style>