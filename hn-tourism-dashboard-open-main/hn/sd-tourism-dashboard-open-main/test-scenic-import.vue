<template>
  <div>
    <h1>测试景区数据导入</h1>
    <div v-if="scenicData">
      <h2>数据加载成功</h2>
      <p>城市数量: {{ Object.keys(scenicData).length }}</p>
      <h3>邵阳市景区:</h3>
      <ul>
        <li v-for="(spot, index) in scenicData['邵阳市']" :key="index">
          {{ spot.name }} - {{ spot.level }}
        </li>
      </ul>
    </div>
    <div v-else>
      <h2>数据加载失败</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import scenicData from '@/assets/data/A级景区.json'

console.log('测试数据:', scenicData)
console.log('邵阳市数据:', scenicData['邵阳市'])
</script>