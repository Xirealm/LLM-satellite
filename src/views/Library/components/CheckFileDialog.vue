<script setup lang="ts">
import { ref, reactive,onMounted } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import UploadPopup from "@/components/UploadPopup.vue"
import DeleteIcon from "./icons/DeleteIcon.vue"
import BaseType from "@/components/BaseType.vue"
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
import {
  GetCheckFileListAPI
} from "@/services/base";
const uploadVisible = ref(false);
const dialogVisible = ref(false);

const handleDelete = (index: number, row: any) => {
  console.log(index, row);
};
const tableData= ref([])
const currentPage = ref(1)
const checkFileTotal = ref(0)

const GetCheckFileList = async () => {
  const res = await GetCheckFileListAPI(currentPage.value)
  tableData.value = res.data
  checkFileTotal.value = res.total_num
  console.log(res);
}

const openCheckFileDialog = () => {
  dialogVisible.value = true
  GetCheckFileList()
}

defineExpose({
  openCheckFileDialog
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    width="60vw"
    :z-index="100"
  >
    <template #header>
        <h2 class="text-lg font-semibold">
            审核共享文件
        </h2>
    </template>
        <div class="flex flex-col">
            <!-- <div class="flex justify-end">         
              <el-button class="w-20" type="primary" @click="uploadVisible = true;">通过</el-button>
            </div> -->
            <el-table :data="tableData" row-class-name="row" height="60vh">
              <!-- <el-table-column type="selection" /> -->
              <el-table-column label="文件名称" prop="file_name">
                 <template #default="scope">
                      <EditText :index="scope.$index" v-model:text="scope.row.file_name">
                        <el-text >{{ scope.row.file_name }}</el-text>   
                      </EditText>
                    </template>
              </el-table-column> 
              <el-table-column label="公共知识库" prop="share_collection" align="center"/>
              <el-table-column label="状态" prop="status" width="100" align="center">
                 <template #default="scope">
                    <el-tag v-if="scope.row.status === 'pending'">待审核</el-tag>   
                    <el-tag v-else>已审核</el-tag>   
                </template>
              </el-table-column> 
              <el-table-column label="上传用户" prop="username" align="center"/>
              <el-table-column label="上传时间" prop="upload_time" align="center" width="200"/>
              <el-table-column label="操作" align="center" width="200">
              <template #default="scope">
                <template v-if="scope.row.is_upload === '未知'">
                    <el-button class="w-20" type="primary">通过</el-button>
                    <el-button class="w-20" type="danger">拒绝</el-button>
                </template>
                <template v-else>
                    <el-tag>{{ scope.row.is_upload }}</el-tag>
                </template>
              </template>
              </el-table-column>
            </el-table>
            <div class="mt-5 flex justify-between">
                <el-text>共{{checkFileTotal}}条审核记录</el-text>
                <el-pagination
                    v-model:current-page="currentPage"
                    layout="prev, pager, next, jumper"
                    :total="checkFileTotal"
                />
            </div>
        </div>
        <upload-popup v-model:isShow="uploadVisible" />
  </el-dialog>
</template>
<style scoped lang="scss">
.icon-delete {
  &:hover {
    color: var(--el-color-error)
  }
}
</style>
