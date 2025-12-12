<!-- 各行业收入 -->
<template>
  <CPanel>
    <template #header>当日接待人次</template>
    <template #content>
      <div class="chart-container">
        <CEcharts ref="chartRef" :option="option" />
      </div>
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import CPanel from '@/components/common/CPanel.vue'
import CEcharts from '@/components/common/CEcharts.vue'
import type { EChartsOption } from 'echarts'

const option = ref<EChartsOption>({})
const chartRef = ref()
// 当日接待人次数据（单位：万人次）
const VALUE = [238.37, 13.78, 7.75, 6.87]
const xAxisData = ['旅游区', '博物馆', '图书馆', '文化站']

// 创建柱状图配置 - 完整独立的配置
const createEchartBar = (): EChartsOption => {
  const seriesData = VALUE.map(value => ({ value }))
  
  let maxAmount = 0
  seriesData.forEach(item => {
    if (item.value > maxAmount) maxAmount = item.value
  })

  return {
    // 清空之前的所有配置
    animation: true,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: any) => {
        const item = params[0]
        return item.name + ' : ' + item.value + '万人次'
      }
    },
    grid: {
      left: '0%',
      right: '0%',
      top: '20%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: {
        show: true,
        lineStyle: {
          width: 2,
          color: 'rgba(76, 93, 130, 1)'
        }
      },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 12,
        color: '#C5D6E6'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      name: '万人次',
      nameTextStyle: {
        color: 'rgba(201, 211, 234, 1)',
        fontSize: 14,
        padding: [0, 32, 12, 0]
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(52, 71, 112, 1)',
          type: 'dashed'
        }
      },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        color: '#C5D6E6'
      }
    },
    series: [
      {
        type: 'pictorialBar',
        name: '渐变背景',
        barWidth: 14,
        symbol: 'rect',
        symbolSize: '100%',
        symbolPosition: 'start',
        symbolOffset: [0, 0],
        label: {
          show: true,
          position: 'top',
          formatter: (params: any) => {
            return seriesData[params.dataIndex].value + '万人次'
          },
          fontSize: 12,
          lineHeight: 16,
          color: '#93B9FF'
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(218, 163, 88, 1)' },
              { offset: 1, color: 'rgba(255, 130, 54, 1)' }
            ])
          }
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(197, 213, 249, 1)' },
            { offset: 1, color: 'rgba(120, 144, 199, 1)' }
          ])
        },
        z: 1,
        data: seriesData.map(item => item.value)
      },
      {
        type: 'pictorialBar',
        name: '块状切片',
        itemStyle: { color: '#011140' },
        barWidth: 14,
        symbolRepeat: 28,
        symbol: 'rect',
        symbolClip: true,
        symbolSize: [14, 2],
        symbolPosition: 'start',
        symbolOffset: [0, 0],
        data: seriesData.map(item => item.value),
        z: 2
      }
    ]
  }
}

onMounted(() => {
  option.value = createEchartBar()
})
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>