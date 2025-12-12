<template>
  <div class="test-json">
    <h2>JSON导入测试</h2>
    <div class="json-info">
      <p>数据类型: {{ typeof scenicData }}</p>
      <p>城市数量: {{ Object.keys(scenicData).length }}</p>
      <p>城市列表: {{ cities }}</p>
      <p>衡阳市景区数量: {{ scenicData['衡阳市'] ? scenicData['衡阳市'].length : '未找到' }}</p>
    </div>
    <div class="sample-data">
      <h3>衡阳市前3个景区:</h3>
      <ul>
        <li v-for="(spot, index) in scenicData['衡阳市']?.slice(0, 3)" :key="index">
          {{ spot.name }} - {{ spot.level }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import scenicData from '@/assets/data/A级景区.json'

// 计算属性
const cities = Object.keys(scenicData).slice(0, 10).join(', ')

// 调试输出
console.log('TestJson组件 - JSON数据:', scenicData)
console.log('TestJson组件 - 城市列表:', Object.keys(scenicData))
</script>

<style scoped>
.test-json {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 20px;
}

.json-info {
  margin-bottom: 20px;
}

.sample-data {
  margin-top: 20px;
}

.sample-data ul {
  list-style-type: disc;
  padding-left: 20px;
}

.sample-data li {
  margin-bottom: 5px;
}
</style>