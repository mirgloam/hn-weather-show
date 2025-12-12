<!-- 城市详情页面 - 显示A级景区信息 -->
<template>
  <div class="city-detail-container" v-if="visible">
    <div class="city-detail-content">
      <div class="header">
        <h2>{{ cityName }} - A级景区信息</h2>
        <button class="close-btn" @click="close">&times;</button>
      </div>
      
      <div class="content">
        <div class="scenic-list">
          <div v-for="(scenic, index) in scenicSpots" :key="index" class="scenic-item">
            <div class="scenic-name">{{ scenic.name }}</div>
            <div class="scenic-level" :class="`level-${scenic.level}`">{{ scenic.level }}</div>
          </div>
          <div v-if="scenicSpots.length === 0" class="no-data">暂无A级景区数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

// 定义组件属性
const props = defineProps<{
  visible: boolean
  cityName: string
}>()

// 定义事件
const emit = defineEmits(['close'])

// 景区数据
const scenicSpots = ref<any[]>([])

// 导入A级景区JSON数据
import scenicData from '@/assets/data/A级景区.json'
console.log('导入的景区数据:', scenicData)
console.log('邵阳市数据:', scenicData['邵阳市'])

// 按等级排序景区（从5A到2A）
const sortByLevel = (spots: any[]) => {
  const levelOrder: Record<string, number> = { '5A': 5, '4A': 4, '3A': 3, '2A': 2 }
  return [...spots].sort((a, b) => {
    const levelA = levelOrder[a.level] || 0
    const levelB = levelOrder[b.level] || 0
    return levelB - levelA
  })
}

// 关闭详情页面
const close = () => {
  emit('close')
}

// 城市名称映射（处理名称不一致的情况）
const cityNameMap: Record<string, string> = {
  '湘西土家族苗族自治州': '湘西自治州' // 地图上的名称 -> 数据中的名称
}

// 监听城市名称变化，加载对应数据
watch(() => props.cityName, (newVal) => {
  if (!newVal) {
    scenicSpots.value = []
    return
  }
  
  // 获取映射后的城市名称
  const mappedCityName = cityNameMap[newVal] || newVal
  
  // 检查JSON数据中是否存在该城市，支持带市和不带市两种格式
  const citySpots = scenicData[mappedCityName] || scenicData[`${mappedCityName}市`] || []
  scenicSpots.value = sortByLevel(citySpots)
  console.log(`加载${newVal}数据:`, citySpots)
}, { immediate: true })

// 监听可见性变化，确保组件可见时数据已加载
watch(() => props.visible, (newVal) => {
  if (newVal && props.cityName) {
    // 获取映射后的城市名称
    const mappedCityName = cityNameMap[props.cityName] || props.cityName
    
    // 组件可见时，根据当前城市名称重新加载数据
    const citySpots = scenicData[mappedCityName] || scenicData[`${mappedCityName}市`] || []
    scenicSpots.value = sortByLevel(citySpots)
    console.log('组件可见时的数据:', citySpots)
  }
})
</script>

<style scoped>
.city-detail-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.city-detail-content {
  width: 80%;
  height: 80%;
  background-color: rgba(10, 25, 47, 0.95);
  border-radius: 10px;
  border: 2px solid #2a3f5f;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: rgba(42, 63, 95, 0.8);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #3a4f6f;
}

.header h2 {
  color: #fff;
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: #ff4d4f;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.scenic-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
}

.scenic-item {
  background-color: rgba(42, 63, 95, 0.5);
  border: 1px solid #3a4f6f;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.scenic-item:hover {
  background-color: rgba(58, 79, 111, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.scenic-name {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 70%;
}

.scenic-level {
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
}

.level-5A {
  background-color: #ffd700;
  color: #333;
}

.level-4A {
  background-color: #c0c0c0;
  color: #333;
}

.level-3A {
  background-color: #cd7f32;
  color: #fff;
}

.no-data {
  grid-column: 1 / -1;
  text-align: center;
  color: #aaa;
  font-size: 18px;
  padding: 50px 0;
}

/* 滚动条样式 */
.content::-webkit-scrollbar {
  width: 8px;
}

.content::-webkit-scrollbar-track {
  background: rgba(42, 63, 95, 0.5);
  border-radius: 4px;
}

.content::-webkit-scrollbar-thumb {
  background: rgba(74, 101, 143, 0.8);
  border-radius: 4px;
}

.content::-webkit-scrollbar-thumb:hover {
  background: rgba(90, 120, 165, 1);
}
</style>