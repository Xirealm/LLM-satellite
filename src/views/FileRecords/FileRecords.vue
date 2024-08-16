<script setup lang="ts">
import { ref, reactive,onMounted,nextTick } from "vue";
import { useRouter,RouterView } from "vue-router"
const router = useRouter()
import { UploadFilled } from "@element-plus/icons-vue";
import EditText from "@/components/EditText.vue"
import IconDelete from "@/components/icons/IconDelete.vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import BaseType from "@/components/BaseType.vue"
import { GetAllFileRecordsAPI} from "@/services/base";

const tableData = ref();
const currentPage = ref(1)
const baseTotal = ref(0)

const GetAllFileRecords = async () => {
  const result = await GetAllFileRecordsAPI(currentPage.value)
  console.log(result);
  tableData.value = result.data
  baseTotal.value = result.total_num
  console.log(tableData.value)
}

onMounted(() => {
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

</script>

<template>
  <div class="library w-[90vw] md:w-1/2 mx-auto">
    <div class="flex flex-col my-5">
        <h2 class="text-lg font-semibold my-3">上传记录</h2>
    </div>
        <div class="flex justify-end mb-5">
          <!-- <el-input style="width: 300px;"></el-input> -->
          <el-button size="large" round color="#01358e">创建知识库</el-button>
        </div>
        <div class="flex flex-col p-5 bg-white rounded-xl shadow-xl">
            <el-table :data="tableData" row-class-name="row" height="60vh">
                <el-table-column label="文件名称" prop="file_name" >
                  <template #default="scope">
                    <EditText 
                      v-model:text="scope.row.file_name">
                      {{ scope.row.file_name }} 
                    </EditText>
                  </template>
                </el-table-column> 
                <el-table-column label="归属知识库" prop="name" align="center" width="100"/>
                <el-table-column label="状态" prop="status" align="center"  width="100">
                  <template #default="scope">
                    <el-tag v-if="scope.row.status === 'success'" type="success">上传成功</el-tag>
                    <el-tag v-else-if="scope.row.status === 'failure'" type="error">上传失败</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="上传时间" prop="upload_time" align="center" width="200"/>
                <!-- <el-table-column label="操作" align="center" width="100">
                  <template #default="scope">
                      <el-link
                        :underline="false"
                        class="icon-delete"
                        @click="handleDelete(scope.$index, scope.row)"
                        >
                      <IconDelete />
                    </el-link>
                  </template>
                </el-table-column> -->
            </el-table>
            <div class="mt-5 flex justify-between">
                <el-text>共{{baseTotal}}个文件</el-text>
                <el-pagination
                    v-model:current-page="currentPage"
                    layout="prev, pager, next, jumper"
                    :total="baseTotal"
                />
            </div>
        </div>
  </div>
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