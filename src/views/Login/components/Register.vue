<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat';
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const chatStore = useChatStore();
const router = useRouter()

const registerData = ref({
    phone: '',
    password: '',
})

const imageUrl = ref('')
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //文件类型及文件大小校验
//   if (rawFile.type !== 'image/jpeg') {
//     ElMessage.error('Avatar picture must be JPG format!')
//     return false
//   } else if (rawFile.size / 1024 / 1024 > 2) {
//     ElMessage.error('Avatar picture size can not exceed 2MB!')
//     return false
//   }
  return true
}
const upload:UploadProps['onChange'] = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  console.log(imageUrl.value);
}
const status = defineModel('status')
const register = () => {
  status.value = 'login'
}
</script>
<template>
    <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :auto-upload="false"
        :before-upload="beforeAvatarUpload"
        :on-change="upload"
    >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-input v-model="registerData.phone" placeholder="请输入手机号" />
    <el-input v-model="registerData.password" placeholder="请输入登录密码" />
    <div>
        <button class="px-8 py-2 bg-blue-900 text-white rounded-full text-sm" @click="register">注册</button>
    </div>
</template>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
  border-radius: 50%;
}

.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>