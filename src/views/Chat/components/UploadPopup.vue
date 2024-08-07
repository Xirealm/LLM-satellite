<script setup lang="ts">
import  { ref } from "vue"
import type { UploadProps, UploadUserFile } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

const isShow = defineModel('isShow')
// const fileList = defineModel('fileList')

const fileList = ref<UploadUserFile[]>([])
// defineEmits(['handlePreview', 'handleRemove'])

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}
//上传数据
</script>

<template>
<!-- 上传语料弹窗 -->
<el-dialog v-model="isShow" destroy-on-close title="喂入语料数据" class="w-full">
    <el-upload 
        v-model:file-list="fileList" action="http://5eed5804.r12.cpolar.top/api/upload/" :on-preview="handlePreview" :on-remove="handleRemove" drag class="md:block" hidden>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="md:block hidden el-upload__text">将文件拖到此处或 <em>点击上传</em></div>
        <div class="el-upload__tip">仅支持txt,pdf格式；文件大小需小于 200MB </div>
    </el-upload>
    <el-upload 
        v-model:file-list="fileList" action="http://5eed5804.r12.cpolar.top/api/upload/" :on-preview="handlePreview" :on-remove="handleRemove" class="block md:hidden">
        <button class="bg-blue-500 text-white px-12 py-1 rounded">点击上传</button>
        <!-- <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="md:hidden block el-upload__text"><em>点击上传</em></div> -->
    </el-upload>
</el-dialog>
</template>