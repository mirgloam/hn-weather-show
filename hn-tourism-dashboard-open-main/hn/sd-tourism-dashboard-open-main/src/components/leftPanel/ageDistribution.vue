<!-- 门票收入Top5 -->
<template>
  <CPanel class="age-distribution">
    <template #header>门票收入Top5</template>
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
// 门票收入Top5数据（单位：万元）
const values: number[] = [697.52, 297.76, 197.05, 177.14, 167.54]
const ageGroups: string[] = ['汉寿野生动物世界', '南岳', '方特', '武陵源', '衡山花果山']

// 创建柱状图配置 - 完整独立的配置
const createEchartBar = (): EChartsOption => {
  // 清除之前注册的形状（避免重复注册）
  try {
    echarts.graphic.delShapeClass('CubeLeft')
    echarts.graphic.delShapeClass('CubeRight')
    echarts.graphic.delShapeClass('CubeTop')
  } catch (e) {
    // 忽略错误
  }
  
  const offsetX = 10
  const offsetY = 5
  
  // 注册自定义形状
  const CubeLeft = echarts.graphic.extendShape({
    shape: { x: 0, y: 0 },
    buildPath: function (ctx: any, shape: any) {
      const xAxisPoint = shape.xAxisPoint
      const c0 = [shape.x, shape.y]
      const c1 = [shape.x - offsetX, shape.y - offsetY]
      const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1]]
      const c3 = [xAxisPoint[0], xAxisPoint[1]]
      ctx.moveTo(c0[0], c0[1])
      ctx.lineTo(c1[0], c1[1])
      ctx.lineTo(c2[0], c2[1])
      ctx.lineTo(c3[0], c3[1])
      ctx.closePath()
    }
  })
  
  const CubeRight = echarts.graphic.extendShape({
    shape: { x: 0, y: 0 },
    buildPath: function (ctx: any, shape: any) {
      const xAxisPoint = shape.xAxisPoint
      const c1 = [shape.x, shape.y]
      const c2 = [xAxisPoint[0], xAxisPoint[1]]
      const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1]]
      const c4 = [shape.x + offsetX, shape.y - offsetY]
      ctx.moveTo(c1[0], c1[1])
      ctx.lineTo(c2[0], c2[1])
      ctx.lineTo(c3[0], c3[1])
      ctx.lineTo(c4[0], c4[1])
      ctx.closePath()
    }
  })
  
  const CubeTop = echarts.graphic.extendShape({
    shape: { x: 0, y: 0 },
    buildPath: function (ctx: any, shape: any) {
      const c1 = [shape.x, shape.y]
      const c2 = [shape.x + offsetX, shape.y - offsetY]
      const c3 = [shape.x, shape.y - offsetX]
      const c4 = [shape.x - offsetX, shape.y - offsetY]
      ctx.moveTo(c1[0], c1[1])
      ctx.lineTo(c2[0], c2[1])
      ctx.lineTo(c3[0], c3[1])
      ctx.lineTo(c4[0], c4[1])
      ctx.closePath()
    }
  })
  
  echarts.graphic.registerShape('CubeLeft', CubeLeft)
  echarts.graphic.registerShape('CubeRight', CubeRight)
  echarts.graphic.registerShape('CubeTop', CubeTop)

  return {
    // 清空之前的所有配置
    animation: true,
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          const item = params[1] || params[0]
          return item.name + ' : ' + item.value + '万元'
        }
      },
    grid: {
      left: '0%',
      right: '0%',
      top: '20%',
      bottom: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ageGroups,
      axisLine: {
        show: true,
        lineStyle: {
          width: 2,
          color: 'rgba(76, 93, 130, 1)'
        }
      },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 10,
        color: 'rgba(201, 211, 234, 1)',
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      name: '万元',
      nameTextStyle: {
        color: 'rgba(201, 211, 234, 1)',
        fontSize: 14,
        padding: [0, 32, 12, 0]
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(49, 58, 86, 1)'
        }
      },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        color: 'rgba(201, 211, 234, 1)'
      }
    },
    series: [
      {
        type: 'custom',
        renderItem: (_params: any, api: any) => {
          const location = api.coord([api.value(0), api.value(1)])
          return {
            type: 'group',
            children: [
              {
                type: 'CubeLeft',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(114, 138, 192, 1)' },
                    { offset: 1, color: 'rgba(68, 95, 156, 1)' }
                  ])
                },
                emphasis: {
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: 'rgba(230, 165, 75, 1)' },
                      { offset: 1, color: 'rgba(175, 111, 23, 1)' }
                    ])
                  }
                }
              },
              {
                type: 'CubeRight',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(161, 186, 244, 1)' },
                    { offset: 1, color: 'rgba(104, 134, 202, 1)' }
                  ])
                },
                emphasis: {
                  style: {
                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: 'rgba(230, 165, 75, 1)' },
                      { offset: 1, color: 'rgba(175, 111, 23, 1)' }
                    ])
                  }
                }
              },
              {
                type: 'CubeTop',
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0])
                },
                style: {
                  fill: 'rgba(198, 213, 244, 1)'
                },
                emphasis: {
                  style: {
                    fill: 'rgba(230, 165, 75, 1)'
                  }
                }
              }
            ]
          }
        },
        data: values
      },
      {
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          fontSize: 14,
          color: 'rgba(201, 211, 234, 1)',
          offset: [0, -25]
        },
        itemStyle: {
          color: 'transparent'
        },
        tooltip: { show: false },
        data: values
      }
    ]
  }
}

onMounted(() => {
  option.value = createEchartBar()
})
</script>

<style lang="scss" scoped>
.age-distribution {
  .chart-container {
    width: 100%;
    height: 100%;
  }
}
</style>