<script setup lang="ts">
import { ref, reactive,onMounted } from "vue";
import { UploadFilled } from "@element-plus/icons-vue";
import UploadPopup from "@/components/UploadPopup.vue"
import DeleteIcon from "./icons/DeleteIcon.vue"
import BaseType from "@/components/BaseType.vue"

const uploadVisible = ref(false);
const dialogVisible = ref(false);
// const props = defineProps<{
//   baseType: string;
// }>()

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
const openBaseDialog = (name: string) => {
  console.log("打开");
  
  console.log(name);
  
  dialogVisible.value = true
}

defineExpose({
  openBaseDialog
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    width="50vw"
    :z-index="100"
  >
    <template #header>
        <h2 class="text-lg font-semibold">{{library}}  
          <BaseType :type="'personal'"/>
        </h2>
    </template>
        <div class="flex flex-col">
            <div class="flex justify-end">
              <el-button class="w-20" type="danger" plain>删除文件</el-button>
              <el-button class="w-20" type="primary" @click="uploadVisible = true;">上传文件</el-button>
            </div>
            <el-table :data="tableData" row-class-name="row">
              <el-table-column type="selection" />
              <el-table-column label="文件名称" prop="name" width="200">
                 <template #default="scope">
                      <EditText :index="scope.$index" v-model:text="scope.row.name">
                        <el-text >{{ scope.row.name }}</el-text>   
                      </EditText>
                    </template>
              </el-table-column> 
              <el-table-column label="状态" prop="status" align="center"/>
              <el-table-column label="上传时间" prop="date" align="center"/>
              <el-table-column label="操作" align="center">
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
.icon-delete {
  &:hover {
    color: var(--el-color-error)
  }
}
</style>
