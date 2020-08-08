<template>
  <home-vue></home-vue>
</template>
<script lang="ts">
import Vue from "vue";
import HomeVue from "./components/Home.vue";
export default Vue.extend({
  components: { HomeVue },
});
</script>