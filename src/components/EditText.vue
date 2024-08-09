<script setup lang="ts">
import { ref, nextTick } from 'vue'
import IconEdit from "./icons/IconEdit.vue"

const text = defineModel("text")
const props = defineProps<{
    index:number
}>()
const editBaseNameIndex = ref()
const editBaseNameInput = ref()
const editBaseNameInputBlur = () => {
    if(text.value === "") return
    editBaseNameIndex.value = null
}

const editBaseNameInputFocus = async (index:any) => {
  editBaseNameIndex.value = index
  await nextTick()
  editBaseNameInput.value.focus()
}
</script>
<template>
    <div class="group flex">
        <el-input class="h-full" ref="editBaseNameInput" @blur="editBaseNameInputBlur" v-if="editBaseNameIndex === index" type="text" v-model="text"/>
        <template v-else>
            <slot />
            <button @click="editBaseNameInputFocus(index)" class="group-hover:block hidden ml-1">
                <IconEdit />
            </button>
        </template>
    </div>
</template>