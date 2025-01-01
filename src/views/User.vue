<script setup>
import { ref, getCurrentInstance, onMounted} from 'vue'
const activeName = ref('first')
const { proxy } = getCurrentInstance()
let tableAttentionData = ref([])
let tableFanData = ref([])
const getAttentionData = async () => {
  let data= await proxy.$api.getAttentionData()
  tableAttentionData.value = data.attentionList.map(item => ({
    ...item,
  }))
  tableFanData.value = data.fanList.map(item => ({
    ...item,
  }))
}
onMounted(()=>{
getAttentionData();
})
</script>

<template>
<el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="关注" name="first">
      <el-table :data="tableAttentionData" style="width: 100%">
        <el-table-column prop="name" width="180" />
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="粉丝" name="second">
      <el-table :data="tableFanData" style="width: 100%">
        <el-table-column prop="name" width="180" />
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="less">
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>