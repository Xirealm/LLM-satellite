<script setup lang="ts">
import { ref } from 'vue'
import { useChatStore } from '@/stores/chat';
import { useRouter } from 'vue-router'

const chatStore = useChatStore();
const router = useRouter()

const status = defineModel('status')

const loginData = ref({
    phone: '',
    password: ''
})
const login = () => {
    router.push('/index')
}
</script>
<template>
    <span class="text-2xl pb-4">欢迎使用{{ chatStore.title }}</span>
    <el-input v-model="loginData.phone" placeholder="请输入手机号" />
    <el-input v-model="loginData.password" type="password" placeholder="请输入登录密码" />
    <div class="flex justify-between w-full mb-4">
        <el-link class="text-xs" @click="status = 'register'">注册账号</el-link>
        <el-link class="text-xs">忘记密码？</el-link>
    </div>
    <div>
        <el-button 
            round color="#01358e" size="large" @click="login">
            <span class="px-4 text-md">登录</span>
        </el-button>
        <!-- OR
        <button 
            class="px-8 py-2 bg-blue-900 text-white rounded-full text-sm"
            @click="status = 'register'">
            注册
        </button> -->
    </div>
</template>