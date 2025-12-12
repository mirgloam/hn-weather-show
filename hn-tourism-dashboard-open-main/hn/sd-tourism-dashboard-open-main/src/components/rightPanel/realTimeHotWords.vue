<!-- 湖南实时热词  -->
<template>
  <CPanel>
    <template #header>湖南实时热词</template>
    <template #content>
      <div class="words">
        <CEcharts :option="option" />
      </div>
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import CPanel from '@/components/common/CPanel.vue'
import CEcharts from '@/components/common/CEcharts.vue'
import defaultIcon from '@/assets/images/real-circle-defalut.png'
import hotIcon from '@/assets/images/real-circle-hot.png'
const option = ref<any>({})
let animationInterval: number | null = null

// 用户提供的热词列表
const hotWordsList = [
  '湖南旅博会', '冰雪季', '湘超', '雾凇', '温泉', 
  '南岳祈福', '张家界', '凤凰古城', '崀山红叶', '东江湖晨雾',
  '岳麓山', '韶山红色游', '岳阳楼', '萌宠乐园', '臭豆腐',
  '城市灯光秀', '湘绣', '铜官窑'
]

// 生成固定位置 - 将区域划分为1x5水平布局，增大间距避免重叠
const getGridPosition = (index: number) => {
  // 1x5水平布局的固定坐标，增大间距避免重叠
  const gridPositions = [
    [12, 50],  // 第一个
    [30, 50],  // 第二个
    [50, 50],  // 第三个
    [70, 50],  // 第四个
    [88, 50]   // 第五个
  ]
  
  // 获取对应位置，使用固定位置
  return gridPositions[index % gridPositions.length]
}

// 使用固定大小
const getRandomSize = () => {
  return 55 // 固定大小55，避免大小不一
}

// 初始化ECharts配置
const initEcharts = () => {
  // 固定显示5个热词（用户要求5个）
  const displayCount = 5
  const shuffledWords = [...hotWordsList].sort(() => Math.random() - 0.5)
  const selectedWords = shuffledWords.slice(0, displayCount)
  
  const optionData: any = []
  
  // 渲染数据，并写入chart
  selectedWords.map((word: string, index: number) => {
    optionData.push({
      name: word,
      value: getGridPosition(index),
      symbolSize: getRandomSize(),
      // 随机使用不同图标
      symbol: Math.random() > 0.5 ? 'image://' + hotIcon : 'image://' + defaultIcon
    })
  })
  
  const options: any = {
    grid: {
      show: false,
      top: 20,
      left: 10,
      right: 10,
      bottom: 10
    },
    xAxis: [
      {
        type: 'value',
        show: false,
        min: 0,
        max: 100
      }
    ],
    yAxis: [
      {
        min: 0,
        show: false,
        max: 100
      }
    ],
    series: [
      {
        type: 'scatter',
        label: {
          normal: {
            show: true,
            formatter: (params: any) => {
              // 不显示百分比，只显示热词名称
              return `{hotName|${params.data.name}}`
            },
            rich: {
              hotName: {
                color: 'rgba(218, 163, 88, 1)',
                fontSize: 16,
                fontWeight: 'bold',
                padding: [0, 5],
                align: 'center'
              }
            }
          }
        },
        // 动画配置，实现跳动效果
        animationDuration: 1000,
        animationEasing: 'elasticOut',
        animationDelay: function (idx: number) {
          return idx * 100
        },
        animationDurationUpdate: 800,
        animationEasingUpdate: 'bounceOut',
        data: optionData
      }
    ]
  }
  return options
}

// 更新热词内容和位置，实现跳动效果
const updateHotWordsPosition = () => {
  // 直接重新初始化ECharts配置，生成全新的option对象
  option.value = initEcharts()
}

onMounted(() => {
  option.value = initEcharts()
  
  // 每3秒更新一次热词内容和位置，实现跳动效果
  animationInterval = window.setInterval(() => {
    updateHotWordsPosition()
  }, 3000)
})

onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
})
</script>

<style lang="scss" scoped>
::v-deep .panel-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.words {
  position: relative;
  width: 100%;
  height: 200px;
  background: url('@/assets/images/热词背景.png') no-repeat center center;
  background-size: 100% 175px;
  box-sizing: border-box;
  display: flex;
  padding: 0 12px 14px 12px;
  flex-direction: column;
  gap: 16px;
}
</style>
