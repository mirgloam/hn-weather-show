<!-- 测试CityDetail组件直接调用 -->
<template>
  <div>
    <h1>CityDetail组件测试</h1>
    <button @click="showDetail = true">显示长沙景区</button>
    <button @click="showDetail2 = true">显示衡阳景区</button>
    <button @click="showDetail3 = true">显示张家界景区</button>
    
    <CityDetail 
      :visible="showDetail" 
      :cityName="'长沙市'"
      @close="showDetail = false"
    />
    <CityDetail 
      :visible="showDetail2" 
      :cityName="'衡阳市'"
      @close="showDetail2 = false"
    />
    <CityDetail 
      :visible="showDetail3" 
      :cityName="'张家界市'"
      @close="showDetail3 = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CityDetail from './CityDetail.vue'

const showDetail = ref(false)
const showDetail2 = ref(false)
const showDetail3 = ref(false)
</script>