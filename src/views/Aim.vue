<script setup>
import { ref, getCurrentInstance, onMounted, reactive, computed } from "vue";
import * as echarts from "echarts";
const observer = ref(null);
const { proxy } = getCurrentInstance();
const getAimData = async () => {
  const { data } = await proxy.$api.getAimData();
  const Children = computed(() => data.aimData);
  console.log(Children);
};
const getTableData = async () => {
    const data = await proxy.$api.getTableData();
    tableData.value = data.tableData
}
//这个是折线图的公共配置
const xOptions = reactive({
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  legend: {},
  grid: {
    top: "20%",
    left: "8%",
    bottom: "8%",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de"],
  series: [],
});
const getChartData = async () => {
  const { orderData } = await proxy.$api.getChartData();
  xOptions.xAxis.data = orderData.date;
  xOptions.series = Object.keys(orderData.data[0]).map((val) => {
    return {
      name: val,
      data: orderData.data.map((item) => item[val]),
      type: "line",
    };
  });
  const oneEchart = echarts.init(proxy.$refs["echart"]);
  oneEchart.setOption(xOptions);

  //监听页面变化
  observer.value = new ResizeObserver(() => {
    oneEchart.resize();
  });
  //容器存在
  if (proxy.$refs["echart"]) {
    observer.value.observe(proxy.$refs["echart"]);
  }
};
onMounted(() => {
  getChartData();
  getAimData();
});
</script>

<template>
  <el-aside :width="width">
    <el-menu>
      <el-menu-item v-for="item in Children" :index="item.path" :key="item.path">
        <span>{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  <el-main>
    <div ref="echart" style="height: 240px"></div>
    <div class="statisticdata" style="margin-left: 40px;margin-right: 100px;box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04)">
    <el-row>
    <el-col :span="8">
      <el-statistic title="注册时间" :value="3000" />
    </el-col>
    <el-col :span="8">
      <el-statistic :value="2000">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            用电量/计划量
          </div>
        </template>
        <template #suffix>/5,000</template>
      </el-statistic>
    </el-col>
    <el-col :span="8">
      <el-statistic title="计划完成概率" :value="80"/>
    </el-col>
  </el-row>
    </div>
      <div class="demo-progress">
      <el-progress :text-inside="true" :stroke-width="26" :percentage="70"/>
      <el-progress
      :text-inside="true"
        :stroke-width="22"
        :percentage="80"
        status="warning"
        />
    </div>
    <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in tableLabel" :key="key" :prop="key" :label="val">
                    </el-table-column>
                </el-table>
  </el-main>
</template>

<style scoped lang="less">
.demo-progress {
  margin-top: 80px;
  .el-progress {
    margin-bottom: 15px;
    max-width: 600px;
    margin-left: 40px;
  }
}
.el-col {
  text-align: center;
}
.statisticdata{
  border-radius: 4px;
  height:120px;
  margin-top:50px;
  .el-statistic{
    margin-top:30px;
  }
}
</style>
