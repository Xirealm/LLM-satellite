<script setup lang="ts">
import { ref, reactive } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import UploadPopup from "@/components/UploadPopup.vue"
import DeleteIcon from "./icons/DeleteIcon.vue"

const dialogFormVisible = ref(false);
const dialogVisible = defineModel();
console.log(dialogVisible.value);

const library = ref("个人知识库1");
const brandOptions = [
  {
    value: '个人文件库',
    label: '个人文件库',
  },
  {
    value: '公共知识库1',
    label: '公共知识库1',
  },
]
interface User {
  date: string;
  name: string;
  address: string;
}

const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
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

const manageKonwledges = (name:string) => {
    console.log("知识管理");
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    width="50vw"
    z-index="100"
  >
    <template #header>
        <h2 class="text-lg font-semibold">{{library}}  
          <el-tag type="primary">个人库</el-tag>
        </h2>
    </template>
        <div class="flex flex-col">
            <div class="flex text-lg font-semibold my-3">
                <div>
                    <el-button class="w-20">删除文件</el-button>
                    <el-button class="w-20" @click="dialogFormVisible = true;">上传文件</el-button>
                </div>
            </div>
            <el-table :data="tableData" height="500">
                <el-table-column label="文件名称" prop="name" width="200">
                    <template #default="scope">
                    <el-link @click="manageKonwledges(scope.row.name)">{{ scope.row.name }}</el-link>
                    </template>
                </el-table-column> 
                <el-table-column label="状态" prop="status" align="center"/>
                <el-table-column label="上传时间" prop="date" align="center"/>
                <el-table-column label="操作" align="center">
                <template #default="scope">
                    <el-link
      
                      @click="handleDelete(scope.$index, scope.row)">
                      <DeleteIcon />
                    </el-link>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <upload-popup v-model:isShow="dialogFormVisible" />
  </el-dialog>
</template>
