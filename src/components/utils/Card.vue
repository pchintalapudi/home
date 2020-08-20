<template>
  <a class="card" :style="`--link-color:${color}`">
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
    iconScale:Number,
    linkColor:String
  },
  computed:{
      color():string {
          return this.linkColor || "var(--fore-color)";
      }
  }
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
.card:any-link {
    color:rgb(var(--fore-color));
    transition: color 300ms;
    text-decoration: none;
}
.card:any-link:hover {
    color:rgb(var(--link-color));
}
[out-link].card:any-link>h3 {
    text-decoration: underline;
}
</style>