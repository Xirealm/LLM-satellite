<script setup lang="ts">
import { ElMessage,ElMessageBox } from 'element-plus'
import { useQaStore } from "../../../stores/qa"
import { ArrowDown,Edit } from '@element-plus/icons-vue'

const qaStore = useQaStore()

const editTitle = () => {
  ElMessageBox.prompt('', '修改名称', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: /.{1,}/,
    inputErrorMessage: '名称不能为空',
  })
    .then(({ value }) => {
      qaStore.title = value
    })
    .catch(() => {
      // ElMessage({
      //   type: 'info',
      //   message: '修改取消',
      // })
    })
}
</script>
<template>
    <el-popover placement="bottom" trigger="click">
        <button class="w-full flex justify-evenly text-black text-base py-2 px-5 font-normal hover:bg-gray-100" @click="editTitle">
          <el-icon size="26" class=""><Edit /></el-icon>修改名称
        </button>
        <template #reference>
          <h1 class="absolute top-0 left-1/2 -translate-x-1/2 md:h-11 h-8">
            {{ qaStore.title }}<el-icon size="14" class="ml-1 translate-y-[1px]"><ArrowDown /></el-icon>
          </h1>
        </template>
    </el-popover>
</template>
<style lang="scss">
.el-popover.el-popper{
  padding: 0;
  width:20px;
  border-radius: 7px;
  overflow: hidden;
}
</style>