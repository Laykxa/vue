export default {
  getChartData: () => {
    return {
      code: 200,
      data: {
        orderData: {
          date: [
            "周一",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六",
            "周日",
          ],
          data: [
            {
              实际: 3839,
              预测: 1423,
            },
            {
              实际: 3560,
              预测: 2099,
            },
            {
              实际: 1864,
              预测: 4598,
            },
            {
              实际: 2634,
              预测: 1458,
            },
            {
              实际: 3622,
              预测: 3990,
            },
            {
              实际: 2004,
              预测: 1864,
            },
            {
              实际: 3797,
              预测: 3936,
            },
          ],
        },
        radarData: {
          indicatorData: [
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
            { name: 'Development', max: 52000 },
            { name: 'Marketing', max: 25000 }
          ],
          realData:[
            {
              real:4200,
              predict:5000,
            },
            {
              real:3000,
              predict:14000,
            },
            {
              real:20000,
              predict:28000,
            },
            {
              real:35000,
              predict:26000,
            },
            {
              real:50000,
              predict:42000,
            },
            {
              real:18000,
              predict:21000,
            },
          ]
        }
      },
    };
  },
}