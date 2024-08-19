<script setup lang="ts">
import  { ref } from "vue"
import type { UploadProps, UploadUserFile } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import Upload from "./Upload.vue";
import { ElMessage } from 'element-plus'
const isShow = defineModel('isShow')

const props=defineProps<{
  base?: {
    id: string,
    name: string,
    type:string
  }
}>()
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}

const upload = ref()
const handleUpload = async() => {
  console.log(upload.value.fileList);
  await upload.value.submit()
  isShow.value = false
}
//上传数据
</script>

<template>
<!-- 上传语料弹窗 -->
<el-dialog v-model="isShow" top="20vh" width="40vw" destroy-on-close title="上传文件">
  <Upload ref="upload" :base="base"/>
  <template #footer>
    <el-button type="primary" @click="handleUpload">上传</el-button>
  </template>
</el-dialog>
</template>
<style scoped lang="scss">
</style>