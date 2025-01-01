<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import * as echarts from "echarts";

//时间选择器配置
const value1 = ref("");
const defaultTime =
  ref < [Date, Date] > [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)];

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
const getChartData = async () => {
  const { orderData, videoData } = await proxy.$api.getChartData();
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

  //饼状图渲染
  pieOptions.series = [
    {
      data: videoData,
      type: "pie",
      radius: ["0", "60%"],
    },
  ];
  const twoEchart = echarts.init(proxy.$refs["videoEchart"]);
  twoEchart.setOption(pieOptions);

  //监听页面变化
  observer.value = new ResizeObserver(() => {
    oneEchart.resize();
    twoEchart.resize();
  });
  //容器存在
  if (proxy.$refs["echart"]) {
    observer.value.observe(proxy.$refs["echart"]);
  }
};
onMounted(() => {
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
              <el-dropdown-item>本周</el-dropdown-item>
              <el-dropdown-item>本月</el-dropdown-item>
              <el-dropdown-item>本季度</el-dropdown-item>
              <el-dropdown-item>本年</el-dropdown-item>
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
