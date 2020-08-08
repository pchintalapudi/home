<template>
  <a class="card">
    <icon-vue :icon-scale="iconScale" v-if="$slots.default">
      <slot></slot>
    </icon-vue>
    <h3>{{cardTitle}}</h3>
    <p v-if="content">{{content}}</p>
  </a>
</template>
<script lang="ts">
import Vue from "vue";
import IconVue from "./Icon.vue";
export default Vue.extend({
  components: { IconVue },
  props: {
    cardTitle: String,
    content: String,
    iconScale:Number
  },
});
</script>
<style scoped>
.card {
    background-color: rgba(var(--fore-color), var(--level-1));
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    text-align: center;
}
.card>* {
    padding: 5px;
}
</style>