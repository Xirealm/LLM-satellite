<script setup lang="ts">
import { ref, nextTick } from 'vue'
import IconEdit from "./icons/IconEdit.vue"

const text = defineModel("text")
const isEditText = ref(false)
const emit = defineEmits(['editFinish'])
const editTextInput = ref()
const editBaseNameInputBlur = () => {
    if(text.value === "") return
    isEditText.value = false
    emit('editFinish')
}

const editBaseNameInputFocus = async (index: any) => {
    isEditText.value = true
    await nextTick()
    editTextInput.value.focus()
}
</script>
<template>
    <div class="group flex">
        <el-input class="h-full" ref="editTextInput" @blur="editBaseNameInputBlur" v-if="isEditText" type="text" v-model="text"/>
        <template v-else>
            <slot />
            <button 
                @click="editBaseNameInputFocus" class="group-hover:block hidden ml-1">
                <IconEdit />
            </button>
        </template>
    </div>
</template>