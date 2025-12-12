<!-- 旅游人数与收入关系 -->
<template>
  <CPanel @click="navigateToForecast">
    <template #header>旅游人数与收入关系</template>
    <template #content>
      <div class="chart-container" style="cursor: pointer;">
        <CEcharts :option="option" />
      </div>
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import CPanel from '@/components/common/CPanel.vue'
import CEcharts from '@/components/common/CEcharts.vue'
import { useRouter } from 'vue-router'
import tourismData from '@/assets/data/各年接待旅游总人数和旅游业总收入.json'

const option = ref<any>({})
const router = useRouter()

const navigateToForecast = () => {
  router.push('/forecast')
}

const createScatterChart = () => {
  // 准备数据
  const data = tourismData.map(item => [item.tourist_number, item.tourism_income, item.year])
  
  // 计算相关系数
  const calculateCorrelation = () => {
    const n = data.length
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0
    
    for (const [x, y] of data) {
      sumX += x
      sumY += y
      sumXY += x * y
      sumX2 += x * x
      sumY2 += y * y
    }
    
    const correlation = (n * sumXY - sumX * sumY) / 
      Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY))
    
    return correlation.toFixed(4)
  }
  
  const correlation = calculateCorrelation()
  
  return {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        return `年份: ${params.data[2]}年<br/>游客人数: ${params.data[0]}万人次<br/>旅游收入: ${params.data[1]}亿元`
      }
    },
    title: {
      text: `相关系数: ${correlation}`,
      left: 'center',
      textStyle: {
        color: '#C5D6E6',
        fontSize: 12
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      top: '20%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        name: '游客人数(万人次)',
        nameTextStyle: {
          color: '#C5D6E6'
        },
        axisLabel: {
          textStyle: {
            color: '#C5D6E6'
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(76, 93, 130, 1)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(52, 71, 112, 1)',
            type: 'dashed'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '旅游收入(亿元)',
        nameTextStyle: {
          color: '#C5D6E6'
        },
        axisLabel: {
          textStyle: {
            color: '#C5D6E6'
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(76, 93, 130, 1)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(52, 71, 112, 1)',
            type: 'dashed'
          }
        }
      }
    ],
    series: [
      {
        name: '旅游数据',
        type: 'scatter',
        data: data,
        symbolSize: function(val: any) {
          // 根据年份动态调整点的大小，越新的年份点越大
          const year = val[2]
          return Math.max(5, (year - 1978) * 0.3)
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(15, 222, 255, 1)' },
            { offset: 1, color: 'rgba(109, 128, 175, 1)' }
          ]),
          opacity: 0.8
        },
        emphasis: {
          itemStyle: {
            color: 'rgba(218, 163, 88, 1)',
            opacity: 1
          },
          scale: true,
          scaleSize: 10
        }
      }
    ]
  }
}

onMounted(() => {
  option.value = createScatterChart()
})
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>