<script setup lang="ts">
import { useQaStore } from '../../../stores/qa'
const qaStore = useQaStore()
import { useRouter } from 'vue-router';
const router = useRouter()
import HotWords from "./HotWords.vue";
import Input from "./Input.vue"

const sendQuestion = (question: string) => {
    console.log(555);
    router.push({
        path: '/chat',

    })
//   qaStore.setQuestion(question)
//   qaStore.setMode(mode.value)
//   qaStore.setShowResult(true)
}

</script>
<template>
<!-- 简介 -->
<!-- <div class="text-center w-full text-sm mt-3 md:tracking-widest">你好,欢迎使用{{ qaStore.title }}!</div> -->
<!-- <div class="flex flex-wrap justify-between md:w-1/2 w-11/12 mx-auto mt-20 letter-spacing-wide">
    <div class="bg-white lg:w-[24%] lg:mb-0 mb-5 w-[48%] rounded-lg p-4  shadow-md shadow-blue-200">
        <el-text class="my-3 text-sm">
            <strong class="flex"><IconFire/>简介:</strong>
            我们的{{qaStore.title}}，旨在通过深度学习和大数据分析，提供快速、准确，个性化的信息检索服务。<br>
        </el-text>
    </div>
    <div class="bg-white lg:w-[24%] lg:mb-0 mb-5 w-[48%] rounded-lg p-4  shadow-md shadow-blue-200">
        <el-text class="my-3 text-sm">
            <strong class="flex"><IconFire/>技术亮点:</strong>
            快速处理庞大数据，即刻获得深刻洞察。<br>
            行业领先的安全措施，保障用户的信息安全。
        </el-text>
    </div>
    <div class="bg-white lg:w-[24%] w-[48%] rounded-lg p-4  shadow-md shadow-blue-200">
        <el-text class="my-3 text-sm">
            <strong class="flex"><IconFire/>步骤:</strong>
            喂入语料，输入你的问题<br>
            选择你需要的模式<br>
            模型会生成你想要的答案。
        </el-text>
    </div>
    <div class="bg-white lg:w-[24%] w-[48%] rounded-lg p-4  shadow-md shadow-blue-200">
        <el-text class="my-3 text-sm">
            <strong class="flex"><IconFire/>开始探索:</strong>
            喂入语料,开启您的智能搜索之旅<br>
            我们承诺保护您的隐私,并确保所有数据安全<br>
        </el-text>
    </div>
</div> -->
<div class="mx-auto w-1/2">
    <div 
        class="bg-[url(/src/assets/image/introduction/bg_introduction.png)] bg-cover bg-center rounded-xl bg-no-repeat w-[50vw] h-[330px] mx-auto mt-24 overflow-hidden">
        <div class="bg-gradient-to-r from-[#1e3b8ae0] to-[#0285c7e0] w-full h-full text-white flex flex-col justify-between p-6">
            <h2 class="text-xl font-normal tracking-wide">Hi,我是您的小卫星智能助手，我可以回答任何小卫星相关的问题。</h2>
            <ul class="text-sm ml-4">
                <li class="list-disc py-4">有关小卫星的介绍有哪些？</li>
                <li class="list-disc py-4">小卫星的种类是哪些？</li>
                <li class="list-disc py-4">如何针对小卫星的运行轨迹进行测算？</li>
            </ul>
            <div class="pt-4 text-xs">
                <button class="px-4 py-2 rounded-xl mr-4 border border-white">小卫星查询</button>
                <button class=" px-4 py-2 rounded-xl mr-4 border border-white">小卫星智能分析</button>
                <button class=" px-4 py-2 rounded-xl mr-4 border border-white">常用报告撰写</button>
            </div>
        </div>
    </div>
    <HotWords class="mt-1"/>
</div>
<!-- <Input @sendQuestion = "sendQuestion"/> -->
</template>