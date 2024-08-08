<script setup lang="ts">
import { ref, reactive } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import Upload from "@/components/Upload.vue"
import DeleteIcon from "./icons/DeleteIcon.vue"

const uploadVisible = ref(false);
const dialogVisible = defineModel();

const baseName = ref("");

</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    width="40vw"
    :z-index="100"
  >
    <template #header>
        <h2 class="text-lg font-semibold">创建知识库
          <el-tag type="primary">个人库</el-tag>
        </h2>
    </template>
    <el-form-item label="知识库名称">
      <el-input v-model="baseName" placeholder="请输入知识库名称"/>
    </el-form-item>
    <Upload/>
    <template #footer>
        <el-button type="primary">创建</el-button>
    </template>
  </el-dialog>
</template>
