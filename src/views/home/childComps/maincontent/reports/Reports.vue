<template>
  <div id="reports">
    <crumbs/>
    <el-card class="el-card">
      <div id="dataForm" style="width: 98%;height:400px;" class="data-form"></div>
    </el-card>
  </div>
</template>

<script>
import Crumbs from 'components/common/Crumbs'

import * as echarts from 'echarts'
import {getTimeGraData} from '@/network/home'

export default {
  components: {
    Crumbs
  },
  data() {
    return {
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          { 
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  mounted() {
    this.getTimeGraData()
    console.log(1);
  },
  methods: {
    getTimeGraData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('dataForm'));
      let getData;
      getTimeGraData().then(res => {
        let x = Object.assign(this.options, res.data);
        x.xAxis = {
          data: [
            "2017-12-27",
          "2017-12-28",
          "2017-12-29",
          "2017-12-30",
          "2017-12-31",
          "2018-1-1"
          ],
          boundaryGap: false
        }
        
        myChart.setOption(x);
      })
    }
  }
}
</script>

<style lang="less" scoped>
#reports {
  .el-card {
    margin-top: 14px;
    max-width:100%;
  }
}
</style>