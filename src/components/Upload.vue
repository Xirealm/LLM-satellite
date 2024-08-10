<script setup lang="ts">
import  { ref } from "vue"
import type { UploadProps, UploadFile } from 'element-plus'
import { UploadFilled , Close} from '@element-plus/icons-vue'

const fileList = ref<UploadFile[]>([])

const handleRemove: UploadProps['onRemove'] = (uploadFile:UploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const handlePreview: UploadProps['onPreview'] = (file:UploadFile) => {
  console.log(file)
}
//上传数据
</script>

<template>
    <el-upload 
      :auto-upload="false"
      v-model:file-list="fileList" 
      :on-preview="handlePreview" 
      :on-remove="handleRemove" 
      drag 
      :show-file-list="false"
      :multiple="true"
      class="md:block" hidden>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="md:block hidden el-upload__text">将文件拖到此处或 <em>点击上传</em></div>
      <div class="el-upload__tip">仅支持txt,pdf格式；文件大小需小于 200MB </div>
    </el-upload>
    <el-scrollbar max-height="200px" :always="true">
      <div v-for="file in fileList" class="mt-1 mr-2 h-10 px-2 rounded-md flex justify-between items-center hover:bg-slate-100">
        <span> {{ file.name }}</span>
        <span>
          <span class="mr-8">{{ file.size }}</span>
            <el-link :underline="false" @click="handleRemove(file,fileList)">
              <el-icon size="20"><Close /></el-icon>
            </el-link>
          </span>
      </div>
    </el-scrollbar>
</template>
<style scoped lang="scss">
.file-item{
  border-radius: 20px;
  &:hover{
    background-color: red;
  }
}
</style>