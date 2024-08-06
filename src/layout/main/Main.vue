<script setup lang="ts">
import { ref} from "vue"
import { RouterView } from 'vue-router';
import { useQaStore } from '@/stores/qa'
const qaStore = useQaStore()

</script>

<template>
    <main class="mx-auto">
        <RouterView />  
    </main>
</template>

<style scoped>
</style>