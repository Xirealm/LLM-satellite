<script setup lang="ts">
import { ChatDotSquare, Comment } from '@element-plus/icons-vue'
defineEmits(['newQuestion'])
</script>

<template>
<button class = "
    hidden md:block absolute left-5 top-5
    w-32 px-4 py-2 rounded-lg text-white
    transition duration-200 ease-in-out bg-blue-500 hover:bg-blue-400"
    @click = "$emit('newQuestion')">
    <span class="flex justify-evenly text-base">
        <el-icon :size="20" class="mt-1"><ChatDotSquare /></el-icon>新建聊天
    </span>
</button>
<button
    class = "block md:hidden absolute top-4 text-white"
    @click="$emit('newQuestion')">
    <span class="flex justify-center">
        <el-icon :size="30" color="#3b82f6"><Comment /></el-icon>
    </span>
</button>
</template>