<script setup lang="ts">
import { ref} from "vue"
import NewChatButton from "./NewChatButton.vue"
import ModelTitle from "./ModelTitle.vue"
import History from "@/components/History.vue"
import { useQaStore } from '@/stores/qa'
const qaStore = useQaStore()
defineEmits(['newQuestion'])
const isHistoryOpen = ref(false)
</script>

<template>
<header 
    class="h-[60px] relative flex flex-wrap items-center justify-between text-center bg-[url('../src/assets/header.jpg')]">
    <img src="../../../assets/title.png" alt="" class="mx-auto h-[30px]">
    <button class="md:hidden block absolute top-5 left-4" @click="isHistoryOpen = true">
        <img src="../../../assets/history.png" width="29" >
    </button>
    <button class="md:hidden block absolute top-4 right-2" @click="qaStore.newQuestion">
        <img src="../../../assets/newChat.png" width="35" class="">
    </button>
</header>
<History v-model="isHistoryOpen"/>
</template>