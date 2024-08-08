<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter,RouterView } from "vue-router"
const router = useRouter()
import { UploadFilled } from "@element-plus/icons-vue";
import knowledges from "./components/Knowledges.vue"
import DeleteIcon from "./components/icons/DeleteIcon.vue"

const brandBase = ref("个人文件库");
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
    name: "个人知识库1",
    type: "个人库",
    number:5
  },
  {
    date: "2024-07-21 16:58",
    name: "公共知识库1",
    type: "公共库"
  },
  {
    date: "2024-07-21 16:58",
    name: "个人知识库1",
    type: "个人库"
  },
  {
    date: "2024-07-21 16:58",
    name: "公共知识库1",
    type: "公共库"
  },
  {
    date: "2024-07-21 16:58",
    name: "个人知识库1",
    type: "个人库"
  },
  {
    date: "2024-07-21 16:58",
    name: "公共知识库1",
    type: "公共库"
  },
  {
    date: "2024-07-21 16:58",
    name: "个人知识库1",
    type: "个人库"
  },
  {
    date: "2024-07-21 16:58",
    name: "公共知识库1",
    type: "公共库"
  },
  {
    date: "2024-07-21 16:58",
    name: "个人知识库1",
    type: "个人库"
  },
  {
    date: "2024-07-21 16:58",
    name: "公共知识库1",
    type: "公共库"
  },
];

const manageKonwledges = (name:string) => {
    console.log("知识管理");
    dialogVisible.value = true
    // router.push({
    //     name:'knowledges'
    // })
}
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)

const currentPage = ref(1)
</script>

<template>
  <div class="w-1/2 mx-auto">
    <div class="flex flex-col my-5">
        <h2 class="text-lg font-semibold my-3">知识库</h2>
    </div>
        <div class="flex justify-end mb-5">
            <el-button size="large" round color="#01358e">创建知识库</el-button>
        </div>
        <div class="flex flex-col p-5 bg-white rounded-xl shadow-xl">
            <el-table :data="tableData" size="large">
                <el-table-column label="知识库名称" prop="name" width="200">
                    <template #default="scope">
                    <el-link @click="manageKonwledges(scope.row.name)">{{ scope.row.name }}</el-link>
                    </template>
                </el-table-column> 
                <el-table-column label="类型" prop="type" align="center"/>
                <el-table-column label="文档数量" prop="number" align="center"/>
                <el-table-column label="更新时间" prop="date" align="center" width="200"/>
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
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
        </div>
  </div>
  <knowledges v-model="dialogVisible"/>
</template>
<style scoped lang="scss">

</style>