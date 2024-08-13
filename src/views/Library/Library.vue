<script setup lang="ts">
import { ref, reactive,nextTick } from "vue";
import { useRouter,RouterView } from "vue-router"
const router = useRouter()
import { UploadFilled } from "@element-plus/icons-vue";
import EditText from "@/components/EditText.vue"
import Base from "./components/Base.vue"
import CreateBase from "./components/CreateBase.vue"
import DeleteIcon from "./components/icons/DeleteIcon.vue"
import { ElMessage, ElMessageBox } from 'element-plus'

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
    type: "公共库",
    number:5
  },
  {
    date: "2024-07-21 16:58",
    name: "个人知识库1",
    type: "个人库",
    number:5
  },
  {
    date: "2024-07-21 16:58",
    name: "公共知识库1",
    type: "公共库",
    number:5
  },
  {
    date: "2024-07-21 16:58",
    name: "个人知识库1",
    type: "个人库",
    number:5
  },
  {
    date: "2024-07-21 16:58",
    name: "公共知识库1",
    type: "公共库",
    number:5
  },
  {
    date: "2024-07-21 16:58",
    name: "个人知识库1",
    type: "个人库",
    number:5
  },
  {
    date: "2024-07-21 16:58",
    name: "公共知识库1",
    type: "公共库",
    number:5
  },
  {
    date: "2024-07-21 16:58",
    name: "个人知识库1",
    type: "个人库",
    number:5
  },
  {
    date: "2024-07-21 16:58",
    name: "公共知识库1",
    type: "公共库",
    number:5
  },
];
const handleEdit = (index: number, row: any) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: any) => {
  ElMessageBox.confirm(
    '是否确认删除该知识库?',
    '删除知识库',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      console.log(index, row);
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      // ElMessage({
      //   type: 'info',
      //   message: 'Delete canceled',
      // })
    })
};

const baseVisible = ref(false)
const openBase = (name:string) => {
    console.log("知识管理");
    baseVisible.value = true
}

// const editBaseNameIndex = ref()
// const editBaseNameInput = ref()
// const editBaseName = async (index:any) => {
//   editBaseNameIndex.value = index
//   await nextTick()
//   editBaseNameInput.value.focus()
// }
// const editBaseNameInputBlur = () => {
//   editBaseNameIndex.value = null
// }

const createBaseVisible = ref(false)
const createBase = (name:string) => {
  console.log("知识管理");
  createBaseVisible.value = true
}
const currentPage = ref(1)
</script>

<template>
  <div class="library w-1/2 mx-auto">
    <div class="flex flex-col my-5">
        <h2 class="text-lg font-semibold my-3">知识库</h2>
    </div>
        <div class="flex justify-end mb-5">
          <!-- <el-input style="width: 300px;"></el-input> -->
          <el-button @click="createBase" size="large" round color="#01358e">创建知识库</el-button>
        </div>
        <div class="flex flex-col p-5 bg-white rounded-xl shadow-xl">
            <el-table :data="tableData" row-class-name="row">
                <el-table-column label="知识库名称" prop="name" >
                    <template #default="scope">
                      <EditText :index="scope.$index" v-model:text="scope.row.name">
                        <el-link @click="openBase">{{ scope.row.name }}</el-link>   
                      </EditText>
                    </template>
                </el-table-column> 
                <el-table-column label="类型" prop="type" align="center"  width="100"/>
                <el-table-column label="文档数量" prop="number" align="center" width="100"/>
                <el-table-column label="更新时间" prop="date" align="center" width="200"/>
                <el-table-column label="操作" align="center" width="100">
                <template #default="scope">
                    <el-link
                    :underline="false"
                    class="icon-delete"
                    @click="handleDelete(scope.$index, scope.row)"
                    >
                    <DeleteIcon />
                  </el-link>
                </template>
                </el-table-column>
            </el-table>
            <div class="mt-5 flex justify-between">
                <el-text>共50个知识库</el-text>
                <el-pagination
                    v-model:current-page="currentPage"
                    layout="prev, pager, next, jumper"
                    :total="50"
                />
            </div>
        </div>
  </div>
  <CreateBase v-model="createBaseVisible" />
  <Base v-model="baseVisible"/>
</template>
<style lang="scss">
.el-table .row {
  height: 50px;
}
.icon-delete{
  &:hover{
    color:var(--el-color-error)
  }
}
// .library .el-input__wrapper{
//   border-radius: 20px;
// }
</style>