<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import * as echarts from "echarts";
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
  const twoEchart = echarts.init(proxy.$refs["echart1"]);
  twoEchart.setOption(xOptions);

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
});
</script>
<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside style="width: 150px; height: 100%">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu index="1">
          <h3>2024年</h3>
          <el-menu-item index="1-1" style="height:50px; justify-content: center">1月</el-menu-item>
          <el-menu-item index="1-2" style="height:50px; justify-content: center">2月</el-menu-item>
          <el-menu-item index="1-3" style="height:50px; justify-content: center">3月</el-menu-item>
          <el-menu-item index="1-4" style="height:50px; justify-content: center">4月</el-menu-item>
          <el-menu-item index="1-5" style="height:50px; justify-content: center">5月</el-menu-item>
          <el-menu-item index="1-6" style="height:50px; justify-content: center">6月</el-menu-item>
          <el-menu-item index="1-7" style="height:50px; justify-content: center">7月</el-menu-item>
          <el-menu-item index="1-8" style="height:50px; justify-content: center">8月</el-menu-item>
          <el-menu-item index="1-9" style="height:50px; justify-content: center">9月</el-menu-item>
          <el-menu-item index="1-10" style="height:50px; justify-content: center">10月</el-menu-item>
          <el-menu-item index="1-11" style="height:50px; justify-content: center">11月</el-menu-item>
          <el-menu-item index="1-12" style="height:65px; justify-content: center">12月</el-menu-item>
        </el-menu>
      </el-menu>
    </el-aside>
    <el-main>
      <el-card style="height: 350px">
        <el-row>
          <el-col :span="8">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              style="width: 300px"
            >
              <el-button-group>
                <el-button type="primary" plain>整月</el-button>
                <el-button type="primary" plain>第一周</el-button>
                <el-button type="primary" plain>第二周</el-button>
                <el-button type="primary" plain>第三周</el-button>
                <el-button type="primary" plain>第四周</el-button>
              </el-button-group>
              <el-menu-item index="1" style="height: 40px; justify-content: center">
                <span>周一</span>
              </el-menu-item>
              <el-menu-item index="2" style="height: 40px; justify-content: center">
                <span>周二</span>
              </el-menu-item>
              <el-menu-item index="3" style="height: 40px; justify-content: center">
                <span>周三</span>
              </el-menu-item>
              <el-menu-item index="4" style="height: 40px; justify-content: center">
                <span>周四</span>
              </el-menu-item>
              <el-menu-item index="5" style="height: 40px; justify-content: center">
                <span>周五</span>
              </el-menu-item>
              <el-menu-item index="6" style="height: 40px; justify-content: center">
                <span>周六</span>
              </el-menu-item>
              <el-menu-item index="7" style="height: 40px; justify-content: center">
                <span>周日</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="16">
            <el-button class="button1">导出数据</el-button>
            <div ref="echart" style="height: 300px; margin-top: 10px"></div>
          </el-col>
        </el-row>
      </el-card>
      <el-card style="height: 350px; margin-top: 5px">
        <el-row>
          <el-col :span="3">
            <el-menu
              background-color="#fff"
              text-color="#262323"
              :collapse="isCollapse"
              :collapse-transition="false"
              :default-active="activeMenu"
            >
              <el-menu-item index="1" style="height: 47px; justify-content: center">
                <el-icon><House /></el-icon>
                <span>GRU</span>
              </el-menu-item>
              <el-menu-item index="2" style="height: 47px; justify-content: center">
                <el-icon><User /></el-icon>
                <span>LSTM</span>
              </el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="21">
            <div ref="echart1" style="height: 300px; margin-top: 10px"></div>
          </el-col>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

<style scoped lang="less">
.el-aside {
  .el-menu {
    border-right:none;
    h3{
        line-height:48px;
        text-align:center;
    }
}
}
.el-main {
  padding: 0px;
  .el-card {
    .el-button-group {
      .el-button {
        width: 60px;
      }
    }
    .button1 {
      position: absolute;
      top: 5px;
      right: 5px;
    }
    .el-menu {
      border-right: 0;
    }
  }
}
</style>
