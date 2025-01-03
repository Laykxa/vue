<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import * as echarts from "echarts";
import { useUserStore } from '../stores/user'
//import {getChartData} from '../api/mockData/home'
const userStore = useUserStore()
const weekMap = {
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  7: '周日'
}
//时间选择器配置
const value1 = ref("");
const defaultTime =
  ref < [Date, Date] > [new Date(2010, 1, 1, 0, 0, 0), new Date(2026, 1, 1, 0, 0, 0)];
const { proxy } = getCurrentInstance();
const observer = ref(null);
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
const pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  legend: {},
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
    "#fff",
  ],
  series: [],
});
const params={
  userId:userStore.userId
}
const xopparams={
  userId:userStore.userId
}
const getPieChartData=async()=>{
  const res = await proxy.$api.getPieData(params);
 // 处理数据
 const chartData = Object.entries(res.data).map(([key, value]) => ({
    name: weekMap[key] || `周${key}`,
      value: value.electricityRecord?.electricityConsumed || 0
    }))
  pieOptions.series = [
    {
      data: chartData,
      type: "pie",
      radius: ["0", "60%"],
    },
  ];
  const twoEchart = echarts.init(proxy.$refs["videoEchart"]);
  twoEchart.setOption(pieOptions);
  //监听页面变化
  observer.value = new ResizeObserver(() => {
   
    twoEchart.resize();
  });
  //容器存在
  if (proxy.$refs["echart"]) {
    observer.value.observe(proxy.$refs["echart"]);
  }
}

const getChartData = async () => {
  const res = await proxy.$api.getChartData();
  console.log(res);
  xOptions.xAxis.data = res.data.date;
  xOptions.series = Object.keys(res.data[0]).map((val) => {
    return {
      name: val,
      data: res.data.map((item) => item[val]),
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
const week=()=>{

}
const month=()=>{

}
const section=()=>{

}
const year=()=>{

}
onMounted(() => {
  getPieChartData();
  getChartData();
});
</script>
<template>
  <el-row class="home" :gutter="5">
    <el-col :span="24" style="margin-top: 0px">
      <el-card class="top-echart">
        <el-dropdown>
          <el-button>
            本周<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="week">按周</el-dropdown-item>
              <el-dropdown-item @click="month">按月</el-dropdown-item>
              <el-dropdown-item @click="section">按季度</el-dropdown-item>
              <el-dropdown-item @click="year">按年</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-date-picker
          v-model="value1"
          type="daterange"
          style="margin-left: 10px; width: 260px"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          :default-time="defaultTime"
          value-format="YYYY-MM-DD"
          @change="handleDateChange"
        />
        <div ref="echart" style="height: 240px"></div>
      </el-card>
    </el-col>
    <el-col :span="9">
      <el-card style="height: 400px; margin: 10px 5px 0px 20px">
        <div ref="videoEchart" style="height: 260px"></div>
        <div class="record">
          <p>综合准确率：80%</p>
          <p>单日最高用电：8月15日</p>
          <p>用电最多时间：</p>
        </div>
      </el-card>
    </el-col>
    <el-col :span="7">
      <el-card  style="height: 400px; margin: 10px 5px 0px 5px;position: relative;">
        <el-button type="primary" plain class="button1" style="position:absolute;top:5px;right: 5px;border-radius: 4px;">新建</el-button>
      </el-card>
    </el-col>
    <el-col :span="8"
      ><el-card style="height: 400px; margin: 10px 20px 0px 5px"></el-card
    ></el-col>
  </el-row>
</template>

<style scoped lang="less">
.home {
  height: 100%;
  overflow: auto;



  .top-echart {
    margin: 0px 20px 0px 20px;
  }
  

  .record {
    border-top: 1px solid #ccc;

    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;

      span {
        color: #666;
        margin-left: 40px;
      }
    }
  }
}
</style>
