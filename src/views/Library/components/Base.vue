<script setup lang="ts">
import { ref, reactive } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import UploadPopup from "@/components/UploadPopup.vue"
import DeleteIcon from "./icons/DeleteIcon.vue"

const uploadVisible = ref(false);
const dialogVisible = defineModel();

const library = ref("个人知识库1");

const handleEdit = (index: number, row: any) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: any) => {
  console.log(index, row);
};

const tableData: any[] = [
  {
    date: "2024-07-21 16:58",
    name: "小卫星资料1",
    status: "已上传"
  },
  {
    date: "2024-07-21 16:58",
    name: "小卫星资料2",
    status: "已上传"
  },
  {
    date: "2024-07-21 16:58",
    name: "小卫星资料1",
    status: "已上传"
  },
  {
    date: "2024-07-21 16:58",
    name: "小卫星资料2",
    status: "已上传"
  },
  {
    date: "2024-07-21 16:58",
    name: "小卫星资料1",
    status: "已上传"
  },
  {
    date: "2024-07-21 16:58",
    name: "小卫星资料2",
    status: "已上传"
  },
  {
    date: "2024-07-21 16:58",
    name: "小卫星资料1",
    status: "已上传"
  },
  {
    date: "2024-07-21 16:58",
    name: "小卫星资料2",
    status: "已上传"
  },
  {
    date: "2024-07-21 16:58",
    name: "小卫星资料1",
    status: "已上传"
  },
  {
    date: "2024-07-21 16:58",
    name: "小卫星资料2",
    status: "已上传"
  },
];
const currentPage = ref(1)
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    width="50vw"
    :z-index="100"
  >
    <template #header>
        <h2 class="text-lg font-semibold">{{library}}  
          <el-tag type="primary">个人库</el-tag>
        </h2>
    </template>
        <div class="flex flex-col">
            <div class="flex justify-end">
              <el-button class="w-20">删除文件</el-button>
              <el-button class="w-20" @click="uploadVisible = true;">上传文件</el-button>
            </div>
            <el-table :data="tableData">
              <el-table-column type="selection" />
              <el-table-column label="文件名称" prop="name" width="200">
                  <template #default="scope">
                  <el-link>{{ scope.row.name }}</el-link>
                  </template>
              </el-table-column> 
              <el-table-column label="状态" prop="status" align="center"/>
              <el-table-column label="上传时间" prop="date" align="center"/>
              <el-table-column label="操作" align="center">
              <template #default="scope">
                  <el-link
                    :underline="false"
                    @click="handleDelete(scope.$index, scope.row)"
                    >
                    <DeleteIcon />
                  </el-link>
              </template>
              </el-table-column>
            </el-table>
            <div class="mt-5 flex justify-end">
                <el-pagination
                    v-model:current-page="currentPage"
                    layout="prev, pager, next, jumper"
                    :total="50"
                />
            </div>
        </div>
        <upload-popup v-model:isShow="uploadVisible" />
  </el-dialog>
</template>
<style scoped lang="scss">
</style>
