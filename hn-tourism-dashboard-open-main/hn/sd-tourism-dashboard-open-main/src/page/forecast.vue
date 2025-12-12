<template>
  <main class="container">
    <!-- 顶部标题 -->
    <CHeader />
    
    <!-- 返回按钮 -->
    <div class="back-button" @click="navigateBack">
      <i class="back-icon">←</i> 返回数据大屏
    </div>
    
    <!-- 预测页面标题 -->
    <div class="forecast-title">旅游数据预测分析</div>
    <div class="forecast-method-indicator">当前预测方法: {{ getForecastMethodName() }}</div>
    
    <!-- 预测结果概览 -->
    <div class="overview-section">
      <div class="overview-item">
        <div class="overview-label">未来5年游客量预测</div>
        <div class="overview-value">{{ forecastResults.touristNumber5Yr.toFixed(0) }}</div>
        <div class="overview-unit">万人次</div>
      </div>
      <div class="overview-item">
        <div class="overview-label">未来5年收入预测</div>
        <div class="overview-value">{{ forecastResults.income5Yr.toFixed(2) }}</div>
        <div class="overview-unit">亿元</div>
      </div>
      <div class="overview-item">
        <div class="overview-label">相关系数</div>
        <div class="overview-value correlation">{{ correlation.toFixed(4) }}</div>
        <div class="overview-desc">游客量与收入相关性</div>
      </div>
    </div>
    
    <!-- 预测图表 -->
    <div class="charts-section">
      <div class="chart-container">
        <h3>游客量预测趋势</h3>
        <CEcharts :option="touristForecastOption" />
      </div>
      <div class="chart-container">
        <h3>旅游收入预测趋势</h3>
        <CEcharts :option="incomeForecastOption" />
      </div>
      <div class="chart-container full-width">
        <h3>游客量与收入关系模型</h3>
        <CEcharts :option="relationModelOption" />
      </div>
    </div>
    
    <!-- 预测参数设置 -->
    <div class="params-section">
      <h3>预测参数设置</h3>
      <div class="params-controls">
        <div class="param-item">
          <label>预测年限:</label>
          <input type="number" v-model.number="forecastYears" min="1" max="10" @change="updateForecast">
        </div>
        <div class="param-item">
          <label>预测方法:</label>
          <select v-model="forecastMethod" @change="updateForecast">
            <option value="linear">线性回归</option>
            <option value="movingAverage">移动平均</option>
            <option value="exponentialSmoothing">指数平滑</option>
          </select>
        </div>
        <div class="param-item" v-if="forecastMethod === 'movingAverage'">
          <label>窗口大小:</label>
          <input type="number" v-model.number="windowSize" min="2" max="10" @change="updateForecast">
        </div>
        <div class="param-item" v-if="forecastMethod === 'exponentialSmoothing'">
          <label>平滑系数:</label>
          <input type="number" v-model.number="alpha" min="0.1" max="0.9" step="0.1" @change="updateForecast">
        </div>
      </div>
    </div>
    
    <!-- 预测结果表格 -->
    <div class="results-section">
      <h3>详细预测结果</h3>
      <div class="results-table-container">
        <table class="results-table">
          <thead>
            <tr>
              <th>年份</th>
              <th>游客量(万人次)</th>
              <th>旅游收入(亿元)</th>
              <th>类型</th>
            </tr>
          </thead>
          <tbody>
            <!-- 历史数据 -->
            <tr v-for="(item, index) in historicalData" :key="'historical-' + index" class="historical-data">
              <td>{{ item.year }}</td>
              <td>{{ item.tourist_number.toFixed(2) }}</td>
              <td>{{ item.tourism_income.toFixed(2) }}</td>
              <td>历史</td>
            </tr>
            <!-- 预测数据 -->
            <tr v-for="(item, index) in forecastData" :key="'forecast-' + index" class="forecast-data">
              <td>{{ item.year }}</td>
              <td>{{ item.tourist_number.toFixed(2) }}</td>
              <td>{{ item.tourism_income.toFixed(2) }}</td>
              <td>预测</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { useRouter } from 'vue-router'
import CHeader from '@/components/CHeader.vue'
import CEcharts from '@/components/common/CEcharts.vue'
import tourismData from '@/assets/data/各年接待旅游总人数和旅游业总收入.json'
import { LinearRegression, forecastFutureValues } from '@/modules/forecastUtils'

const router = useRouter()

// 预测参数
const forecastYears = ref(5)
const forecastMethod = ref<'linear' | 'movingAverage' | 'exponentialSmoothing'>('linear')
const windowSize = ref(3)
const alpha = ref(0.5)

// 预测结果
const forecastResults = ref({
  touristNumber5Yr: 0,
  income5Yr: 0
})

// 图表配置
const touristForecastOption = ref<any>({})
const incomeForecastOption = ref<any>({})
const relationModelOption = ref<any>({})

// 相关性系数
const correlation = ref(0)

// 数据
const historicalData = ref<any[]>([])
const forecastData = ref<any[]>([])

// 返回数据大屏
const navigateBack = () => {
  router.push('/')
}

// 获取预测方法的中文名称
const getForecastMethodName = () => {
  const methodMap: Record<string, string> = {
    linear: '线性回归',
    movingAverage: '移动平均',
    exponentialSmoothing: '指数平滑'
  }
  return methodMap[forecastMethod.value] || '未知方法'
}

// 初始化预测
const initForecast = () => {
  // 准备历史数据
  historicalData.value = tourismData
  
  // 训练线性回归模型
  const touristNumbers = tourismData.map(item => item.tourist_number)
  const tourismIncomes = tourismData.map(item => item.tourism_income)
  
  const lr = new LinearRegression()
  lr.train(touristNumbers, tourismIncomes)
  correlation.value = lr.getCorrelation()
  
  // 更新预测
  updateForecast()
}

// 更新预测
const updateForecast = () => {
  // 获取历史数据
  const years = tourismData.map(item => item.year)
  const touristNumbers = tourismData.map(item => item.tourist_number)
  const tourismIncomes = tourismData.map(item => item.tourism_income)
  
  // 预测未来游客量
  const futureTouristNumbers = forecastFutureValues(
    touristNumbers,
    forecastYears.value,
    forecastMethod.value,
    { windowSize: windowSize.value, alpha: alpha.value }
  )
  
  // 预测未来收入 - 根据选择的预测方法
  const futureIncomes = forecastFutureValues(
    tourismIncomes,
    forecastYears.value,
    forecastMethod.value,
    { windowSize: windowSize.value, alpha: alpha.value }
  )
  
  // 生成预测数据
  forecastData.value = []
  const lastYear = years[years.length - 1]
  
  for (let i = 0; i < forecastYears.value; i++) {
    forecastData.value.push({
      year: lastYear + i + 1,
      tourist_number: futureTouristNumbers[i],
      tourism_income: futureIncomes[i]
    })
  }
  
  // 更新预测结果概览
  if (forecastData.value.length >= 5) {
    forecastResults.value.touristNumber5Yr = forecastData.value[4].tourist_number
    forecastResults.value.income5Yr = forecastData.value[4].tourism_income
  } else {
    forecastResults.value.touristNumber5Yr = forecastData.value[forecastData.value.length - 1].tourist_number
    forecastResults.value.income5Yr = forecastData.value[forecastData.value.length - 1].tourism_income
  }
  
  // 更新图表
  updateCharts()
}

// 更新图表
const updateCharts = () => {
  // 准备数据
  const allYears = [...historicalData.value.map(item => item.year), ...forecastData.value.map(item => item.year)]
  const allTouristNumbers = [...historicalData.value.map(item => item.tourist_number), ...forecastData.value.map(item => item.tourist_number)]
  const allIncomes = [...historicalData.value.map(item => item.tourism_income), ...forecastData.value.map(item => item.tourism_income)]
  
  // 游客量预测趋势图
  touristForecastOption.value = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: allYears,
      axisLabel: {
        color: '#C5D6E6'
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
    },
    yAxis: {
      type: 'value',
      name: '万人次',
      nameTextStyle: {
        color: '#C5D6E6'
      },
      axisLabel: {
        color: '#C5D6E6'
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
    },
    series: [
      {
        name: '历史游客量',
        type: 'line',
        data: allTouristNumbers.slice(0, historicalData.value.length),
        lineStyle: {
          color: 'rgba(15, 222, 255, 1)'
        },
        itemStyle: {
          color: 'rgba(15, 222, 255, 1)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(15, 222, 255, 0.3)' },
            { offset: 1, color: 'rgba(15, 222, 255, 0)' }
          ])
        },
        smooth: true
      },
      {
        name: '预测游客量',
        type: 'line',
        data: allTouristNumbers,
        lineStyle: {
          color: 'rgba(218, 163, 88, 1)',
          type: 'dashed'
        },
        itemStyle: {
          color: 'rgba(218, 163, 88, 1)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(218, 163, 88, 0.3)' },
            { offset: 1, color: 'rgba(218, 163, 88, 0)' }
          ])
        },
        smooth: true
      }
    ]
  }
  
  // 旅游收入预测趋势图
  incomeForecastOption.value = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: allYears,
      axisLabel: {
        color: '#C5D6E6'
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
    },
    yAxis: {
      type: 'value',
      name: '亿元',
      nameTextStyle: {
        color: '#C5D6E6'
      },
      axisLabel: {
        color: '#C5D6E6'
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
    },
    series: [
      {
        name: '历史收入',
        type: 'line',
        data: allIncomes.slice(0, historicalData.value.length),
        lineStyle: {
          color: 'rgba(109, 128, 175, 1)'
        },
        itemStyle: {
          color: 'rgba(109, 128, 175, 1)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(109, 128, 175, 0.3)' },
            { offset: 1, color: 'rgba(109, 128, 175, 0)' }
          ])
        },
        smooth: true
      },
      {
        name: '预测收入',
        type: 'line',
        data: allIncomes,
        lineStyle: {
          color: 'rgba(255, 107, 107, 1)',
          type: 'dashed'
        },
        itemStyle: {
          color: 'rgba(255, 107, 107, 1)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255, 107, 107, 0.3)' },
            { offset: 1, color: 'rgba(255, 107, 107, 0)' }
          ])
        },
        smooth: true
      }
    ]
  }
  
  // 游客量与收入关系模型
  relationModelOption.value = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const isHistorical = params.dataIndex < historicalData.value.length
        const data = isHistorical ? historicalData.value[params.dataIndex] : forecastData.value[params.dataIndex - historicalData.value.length]
        return `年份: ${data.year}年<br/>游客人数: ${data.tourist_number}万人次<br/>旅游收入: ${data.tourism_income}亿元`
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
      top: '10%',
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
          color: '#C5D6E6'
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
          color: '#C5D6E6'
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
        name: '历史数据',
        type: 'scatter',
        data: historicalData.value.map(item => [item.tourist_number, item.tourism_income]),
        symbolSize: 8,
        itemStyle: {
          color: 'rgba(15, 222, 255, 1)'
        }
      },
      {
        name: '预测数据',
        type: 'scatter',
        data: forecastData.value.map(item => [item.tourist_number, item.tourism_income]),
        symbolSize: 8,
        itemStyle: {
          color: 'rgba(218, 163, 88, 1)'
        },
        symbol: 'diamond'
      },
      {
        name: '回归直线',
        type: 'line',
        data: generateRegressionLineData(),
        lineStyle: {
          color: 'rgba(255, 107, 107, 1)',
          type: 'dashed'
        },
        itemStyle: {
          color: 'rgba(255, 107, 107, 1)'
        },
        symbol: 'none'
      }
    ]
  }
}

// 生成回归直线数据
const generateRegressionLineData = () => {
  const touristNumbers = [...historicalData.value.map(item => item.tourist_number), ...forecastData.value.map(item => item.tourist_number)]
  const minX = Math.min(...touristNumbers)
  const maxX = Math.max(...touristNumbers)
  
  // 训练模型
  const lr = new LinearRegression()
  lr.train(
    historicalData.value.map(item => item.tourist_number),
    historicalData.value.map(item => item.tourism_income)
  )
  
  return [[minX, lr.predict(minX)], [maxX, lr.predict(maxX)]]
}

onMounted(() => {
  initForecast()
})
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/背景.png') no-repeat center center;
  background-size: 100% 100%;
  color: #C5D6E6;
}

.back-button {
  position: absolute;
  top: 100px;
  left: 24px;
  padding: 8px 16px;
  background: rgba(109, 128, 175, 0.8);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: rgba(109, 128, 175, 1);
    transform: translateX(-5px);
  }
  
  .back-icon {
    margin-right: 8px;
    font-weight: bold;
  }
}

.forecast-title {
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 28px;
  font-weight: bold;
  color: #FFFFFF;
  text-shadow: 0 0 10px rgba(15, 222, 255, 0.8);
}

.forecast-method-indicator {
  position: absolute;
  top: 170px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  color: rgba(15, 222, 255, 1);
  background: rgba(52, 71, 112, 0.8);
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid rgba(15, 222, 255, 0.5);
}

.overview-section {
  position: absolute;
  top: 180px;
  left: 24px;
  right: 24px;
  display: flex;
  justify-content: space-around;
  gap: 24px;
  
  .overview-item {
    flex: 1;
    background: rgba(109, 128, 175, 0.2);
    border: 1px solid rgba(109, 128, 175, 0.5);
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(109, 128, 175, 0.3);
      transform: translateY(-5px);
    }
    
    .overview-label {
      font-size: 16px;
      margin-bottom: 12px;
    }
    
    .overview-value {
      font-size: 32px;
      font-weight: bold;
      color: #FFFFFF;
      margin-bottom: 8px;
      
      &.correlation {
        color: rgba(15, 222, 255, 1);
      }
    }
    
    .overview-unit {
      font-size: 14px;
      color: rgba(201, 211, 234, 0.8);
    }
    
    .overview-desc {
      font-size: 14px;
      color: rgba(201, 211, 234, 0.8);
      margin-top: 8px;
    }
  }
}

.charts-section {
  position: absolute;
  top: 320px;
  left: 24px;
  right: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  .chart-container {
    background: rgba(109, 128, 175, 0.2);
    border: 1px solid rgba(109, 128, 175, 0.5);
    border-radius: 8px;
    padding: 20px;
    height: 400px;
    
    h3 {
      font-size: 18px;
      margin-bottom: 16px;
      text-align: center;
      color: #FFFFFF;
    }
    
    &.full-width {
      grid-column: 1 / -1;
    }
  }
}

.params-section {
  position: absolute;
  top: 740px;
  left: 24px;
  right: 24px;
  background: rgba(109, 128, 175, 0.2);
  border: 1px solid rgba(109, 128, 175, 0.5);
  border-radius: 8px;
  padding: 20px;
  
  h3 {
    font-size: 18px;
    margin-bottom: 16px;
    color: #FFFFFF;
  }
  
  .params-controls {
    display: flex;
    gap: 24px;
    align-items: center;
    
    .param-item {
      display: flex;
      align-items: center;
      gap: 8px;
      
      label {
        font-size: 16px;
      }
      
      input, select {
        padding: 8px 12px;
        background: rgba(52, 71, 112, 0.8);
        border: 1px solid rgba(109, 128, 175, 0.5);
        border-radius: 4px;
        color: #C5D6E6;
        font-size: 16px;
        
        &:focus {
          outline: none;
          border-color: rgba(15, 222, 255, 1);
        }
      }
    }
  }
}

.results-section {
  position: absolute;
  top: 840px;
  left: 24px;
  right: 24px;
  bottom: 24px;
  background: rgba(109, 128, 175, 0.2);
  border: 1px solid rgba(109, 128, 175, 0.5);
  border-radius: 8px;
  padding: 20px;
  overflow: hidden;
  
  h3 {
    font-size: 18px;
    margin-bottom: 16px;
    color: #FFFFFF;
  }
  
  .results-table-container {
    height: calc(100% - 44px);
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(52, 71, 112, 0.5);
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(109, 128, 175, 0.8);
      border-radius: 4px;
      
      &:hover {
        background: rgba(109, 128, 175, 1);
      }
    }
  }
  
  .results-table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid rgba(109, 128, 175, 0.3);
    }
    
    th {
      background: rgba(109, 128, 175, 0.3);
      font-weight: bold;
      color: #FFFFFF;
      position: sticky;
      top: 0;
    }
    
    .historical-data {
      color: #C5D6E6;
    }
    
    .forecast-data {
      color: rgba(218, 163, 88, 1);
      font-weight: bold;
    }
    
    tr:hover {
      background: rgba(109, 128, 175, 0.2);
    }
  }
}
</style>