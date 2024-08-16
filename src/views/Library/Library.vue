<script setup lang="ts">
import { ref, reactive,onMounted,nextTick } from "vue";
import { useRouter,RouterView } from "vue-router"
const router = useRouter()
import { UploadFilled } from "@element-plus/icons-vue";
import EditText from "@/components/EditText.vue"
import Base from "./components/Base.vue"
import CreateBase from "./components/CreateBase.vue"
import DeleteIcon from "./components/icons/DeleteIcon.vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import BaseType from "@/components/BaseType.vue"
import { GetBaseListAPI,GetAllFileRecordsAPI} from "@/services/base";

const tableData = ref();
const currentPage = ref(1)
const baseTotal = ref(0)

const getBaseList = async () => {
  const result = await GetBaseListAPI(currentPage.value)
  tableData.value = result.data
  baseTotal.value = result.total_num
  // console.log(tableData.value)
}

const GetAllFileRecords = async () => {
  const result = await GetAllFileRecordsAPI(currentPage.value)
  console.log(result);
  
  // tableData.value = result.data
  // baseTotal.value = result.total_num
  // console.log(tableData.value)
}

onMounted(() => {
  getBaseList()
  GetAllFileRecords()
})
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
const baseDialog = ref();
const openBaseDialog = (name:string) => {
    baseDialog.value.openBaseDialog(name)
}

const createBaseDialog = ref()
const createBase = (name:string) => {
  createBaseDialog.value.openCreateBaseDialog()
}
const createdBase = () => {
  getBaseList()
}
</script>

<template>
  <div class="library w-[90vw] md:w-1/2 mx-auto">
    <div class="flex flex-col my-5">
        <h2 class="text-lg font-semibold my-3">知识库</h2>
    </div>
        <div class="flex justify-end mb-5">
          <!-- <el-input style="width: 300px;"></el-input> -->
          <el-button @click="createBase" size="large" round color="#01358e">创建知识库</el-button>
        </div>
        <div class="flex flex-col p-5 bg-white rounded-xl shadow-xl">
            <el-table :data="tableData" row-class-name="row" height="60vh">
                <el-table-column label="知识库名称" prop="name" >
                  <template #default="scope">
                    <EditText 
                      v-model:text="scope.row.name">
                      <el-link @click="openBaseDialog(scope.row.pid)" type="primary">{{ scope.row.name }}</el-link>   
                    </EditText>
                  </template>
                </el-table-column> 
                <el-table-column label="类型" prop="type" align="center"  width="100">
                  <template #default="scope">
                    <BaseType :type="scope.row.type" />
                  </template>
                </el-table-column>
                <el-table-column label="文档数量" prop="file_num" align="center" width="100"/>
                <el-table-column label="更新时间" prop="create_time" align="center" width="200"/>
                <el-table-column label="简介" prop="synopsis" align="center"  width="100">
                  <template #default="scope">
                    <el-popover effect="light" trigger="hover" placement="top" width="auto">
                      <template #default>
                        <div> {{ scope.row.synopsis }}</div>
                      </template>
                      <template #reference>
                        <el-button size="small" type="primary" round>查看</el-button>
                      </template> 
                    </el-popover>
                  </template>
                </el-table-column>
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
                <el-text>共{{baseTotal}}个知识库</el-text>
                <el-pagination
                    v-model:current-page="currentPage"
                    layout="prev, pager, next, jumper"
                    :total="baseTotal"
                />
            </div>
        </div>
  </div>
  <CreateBase ref="createBaseDialog" @created="createdBase"/>
  <Base ref="baseDialog"/>
</template>
<style lang="scss">
.el-table .row {
  height: 50px;
}
// .library .el-input__wrapper{
//   border-radius: 20px;
// }

.icon-delete {
  &:hover {
    color: var(--el-color-error)
  }
}
</style>