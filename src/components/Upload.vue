<script setup lang="ts">
import  { ref , computed } from "vue"
import type { UploadProps, UploadFile } from 'element-plus'
import { UploadFilled , Close} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const fileList = ref<UploadFile[]>([])
const fileSizeFormat = (size: number) => {
  if (size < 1024) return size + 'B'
  if (size < 1024 * 1024) return (size / 1024).toFixed(2) + 'KB'
  if (size < 1024 * 1024 * 1024) return (size / 1024 / 1024).toFixed(2) + 'MB'
}
const handleRemove: UploadProps['onRemove'] = (uploadFile:UploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const handlePreview: UploadProps['onPreview'] = (file:UploadFile) => {
  console.log(file)
}
const upload: UploadProps['onChange'] = (uploadFile) => {
  console.log(uploadFile);
  const type = uploadFile.raw!.type
  const size = uploadFile.raw!.size
  console.log(type,size);
  if (type !== 'text/plain' && type!=='application/pdf' ) {
    ElMessage.error('上传文件必须为PDF/TXT格式!')
    return
  } else if ( size / 1024 / 1024 > 50) {
    ElMessage.error('文件大小不能超过50MB!')
    return
  }
  fileList.value.push(uploadFile)  
}
//上传数据
</script>

<template>
    <el-upload 
      :auto-upload="false"
      :on-change="upload"
      :on-preview="handlePreview" 
      :on-remove="handleRemove" 
      drag 
      :show-file-list="false"
      :multiple="true"
      class="md:block" hidden>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="md:block hidden el-upload__text">将文件拖到此处或 <em>点击上传</em></div>
      <div class="el-upload__tip">仅支持TXT/PDF格式；单个文件最大50MB </div>
    </el-upload>
    <el-scrollbar max-height="200px" :always="true">
      <div v-for="file in fileList" class="mt-1 mr-2 h-10 px-2 rounded-md flex justify-between items-center hover:bg-slate-100">
        <span> {{ file.name }}</span>
        <span>
          <span class="mr-8">{{ fileSizeFormat(file.size!) }}</span>
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