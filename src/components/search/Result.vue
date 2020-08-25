<template>
    <li><a :href="`#${id}`"></a></li>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        id:String,
        
    }
})
</script>
<style scoped>

</style>