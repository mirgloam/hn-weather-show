<template>
  <main class="container">
    <!-- 右上角预警条 -->
    <WarningCarousel />
    <!-- 顶部标题 -->
    <CHeader />
    <!-- 页面内容 -->
    <div class="second-page-content">
      <h2>湖南省旅游营业收入Top10展示</h2>
      
      <!-- 地区选择 -->
      <div class="region-selector">
        <label for="region">选择地区：</label>
        <select id="region" v-model="selectedRegion" @change="handleRegionChange">
          <option value="all">全部地区</option>
          <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
        </select>
      </div>
      
      <!-- 营业收入数据表格 -->
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>地区</th>
              <th>景点名称</th>
              <th>当日营业收入(万元)</th>
              <th>累计营业收入(万元)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in displayData" :key="index">
              <td>{{ item.地区 }}</td>
              <td>{{ item.景点名称 }}</td>
              <td>{{ item['当日营业收入(万元)'] }}</td>
              <td>{{ item['累计营业收入(万元)'] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 底部组件 -->
    <CFooter />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CHeader from '@/components/CHeader.vue'
import CFooter from '@/components/CFooter.vue'
import WarningCarousel from '@/components/WarningCarousel.vue'
import revenueData from '@/assets/data/revenueData.js'

// 定义数据类型
interface RevenueItem {
  景点名称: string
  '当日营业收入(万元)': number
  '累计营业收入(万元)': number
}

interface RevenueData {
  [region: string]: RevenueItem[]
}

// 数据处理
const selectedRegion = ref('all')
const regions = ref<string[]>([
  '衡阳市', '益阳市', '常德市', '永州市', '湘潭市', 
  '长沙市', '株洲市', '邵阳市', '岳阳市', '张家界市', 
  '郴州市', '怀化市', '娄底市'
])
const allData = ref<any[]>([])
const displayData = ref<any[]>([])

// 测试数据 - 确保表格能正常显示
allData.value = [
  { 地区: '长沙市', 景点名称: '世界之窗', '当日营业收入(万元)': 69, '累计营业收入(万元)': 69 },
  { 地区: '衡阳市', 景点名称: '南岳', '当日营业收入(万元)': 11678, '累计营业收入(万元)': 11678 },
  { 地区: '张家界市', 景点名称: '天门山景区', '当日营业收入(万元)': 375.93, '累计营业收入(万元)': 375.93 }
]
displayData.value = [...allData.value]

// 初始化数据 - 直接使用导入的数据
onMounted(() => {
  try {
    console.log('直接导入的数据:', revenueData)
    
    // 更新地区列表
    const dataKeys = Object.keys(revenueData)
    console.log('更新后的地区列表:', dataKeys)
    regions.value = dataKeys
    
    // 转换数据格式，添加地区信息
    const processedData: any[] = []
    Object.entries(revenueData).forEach(([region, items]) => {
      if (Array.isArray(items)) {
        items.forEach(item => {
          processedData.push({
            地区: region,
            ...item
          })
        })
      }
    })
    
    allData.value = processedData
    console.log('处理后的数据:', allData.value)
    
    // 默认显示全部地区的Top10数据
    displayData.value = [...allData.value]
      .sort((a, b) => b['当日营业收入(万元)'] - a['当日营业收入(万元)'])
      .slice(0, 10)
    console.log('默认显示Top10数据:', displayData.value)
  } catch (error) {
    console.error('数据处理错误:', error)
  }
})

// 处理地区选择变化
const handleRegionChange = () => {
  console.log('选择的地区:', selectedRegion.value)
  if (selectedRegion.value === 'all') {
    // 选择全部地区时，按当日营业收入从高到低排序并只显示前10条
    displayData.value = [...allData.value]
      .sort((a, b) => b['当日营业收入(万元)'] - a['当日营业收入(万元)'])
      .slice(0, 10)
    console.log('Top10数据:', displayData.value)
  } else {
    const filtered = allData.value.filter(item => item.地区 === selectedRegion.value)
    console.log('筛选后的数据:', filtered)
    displayData.value = filtered
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/背景.png') no-repeat center center;
  background-size: 100% 100%;
}

.second-page-content {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 1200px;
  z-index: 10;
}

.second-page-content h2 {
  font-size: 36px;
  color: #fff;
  margin-bottom: 30px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  text-align: center;
}

.region-selector {
  margin-bottom: 30px;
  text-align: center;
}

.region-selector label {
  color: #fff;
  font-size: 18px;
  margin-right: 10px;
}

.region-selector select {
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: 1px solid #dab35c;
}

.data-table-container {
  max-height: 600px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  color: #fff;
}

.data-table th,
.data-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid rgba(218, 179, 92, 0.3);
}

.data-table th {
  background: rgba(218, 179, 92, 0.2);
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 10;
}

.data-table tr:hover {
  background: rgba(218, 179, 92, 0.1);
}

/* 滚动条样式 */
.data-table-container::-webkit-scrollbar {
  width: 8px;
}

.data-table-container::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.data-table-container::-webkit-scrollbar-thumb {
  background: rgba(218, 179, 92, 0.5);
  border-radius: 4px;
}

.data-table-container::-webkit-scrollbar-thumb:hover {
  background: rgba(218, 179, 92, 0.7);
}
</style>
