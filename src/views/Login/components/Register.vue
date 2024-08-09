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
  username:'',
  password1: '',
  password2: '',
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
    <!-- <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :auto-upload="false"
        :before-upload="beforeAvatarUpload"
        :on-change="upload"
    >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload> -->
    <span class="flex justify-between w-full">
      <el-link class="text-xs" @click="status = 'login'">返回登陆</el-link>
      <span></span>
    </span>
    <el-input v-model="registerData.phone" placeholder="请输入手机号" />
    <el-input v-model="registerData.username" placeholder="请输入用户名" />
    <el-input v-model="registerData.password1" placeholder="请输入登录密码" />
    <el-input v-model="registerData.password2" placeholder="请再次输入登录密码" />
    <div>
      <el-button 
        round color="#01358e" size="large" @click="register">
        <span class="px-4 text-md">注册</span>
      </el-button>
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