<script setup lang="ts">
import { ref, reactive } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import Upload from "@/components/Upload.vue"
import DeleteIcon from "./icons/DeleteIcon.vue"

const uploadVisible = ref(false);
const dialogVisible = defineModel();

const baseName = ref("");

const baseType = ref('private')

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
            <template v-if="baseType === 'private'">
              <el-tag type="primary">个人库</el-tag>
            </template>
            <template v-else>
              <el-tag type="warning">公共库</el-tag>
            </template>
        </h2>
    </template>
    <el-form-item label="知识库类型">
      <el-select
        v-model="baseType"
        placeholder="未选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="知识库名称">
      <el-input v-model="baseName" placeholder="请输入知识库名称"/>
    </el-form-item>
    <Upload/>
    <template #footer>
        <el-button type="primary">创建</el-button>
    </template>
  </el-dialog>
</template>
