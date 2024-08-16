<script setup lang="ts">
import { ref, reactive } from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
import { UploadFilled } from "@element-plus/icons-vue";
import Upload from "@/components/Upload.vue"
import DeleteIcon from "./icons/DeleteIcon.vue"
import { postCreateBase } from "@/services/base";


const uploadVisible = ref(false);
const dialogVisible = defineModel();

const baseName = ref("");
const synopsis = ref("");
const baseType = ref('private')
const base = reactive({
  name: "",
  synopsis: "",
  type: "private",
});
const createBase = async () => {
  const result = await postCreateBase(userStore.user.account, base.name, base.synopsis)
  console.log(result);
  
}

const options = [
  {
    value: 'private',
    label: '个人库',
  },
  {
    value: 'public',
    label: '公共库',
  },
]
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    width="40vw"
    :z-index="100"
  >
    <template #header>
        <h2 class="text-lg font-semibold">创建知识库
            <template v-if="base.type === 'private'">
              <el-tag type="primary">个人库</el-tag>
            </template>
            <template v-else>
              <el-tag type="warning">公共库</el-tag>
            </template>
        </h2>
    </template>
    <!-- <el-form-item label="知识库类型">
      <el-select
        v-model="base.type"
        placeholder="未选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="知识库名称">
      <el-input v-model="base.name" placeholder="请输入知识库名称"/>
    </el-form-item>
    <el-form-item label="知识库简介">
      <el-input
        v-model="base.synopsis"
        :rows="8"
        resize="none"
        type="textarea"
        maxlength="200"
        show-word-limit
        placeholder="请输入知识库简介"
      />
    </el-form-item>
    <!-- <Upload/> -->
    <template #footer>
        <el-button type="primary" @click="createBase">创建</el-button>
    </template>
  </el-dialog>
</template>
