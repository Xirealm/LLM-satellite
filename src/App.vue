<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style lang="scss">
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #F4F5FA;
}
</style>