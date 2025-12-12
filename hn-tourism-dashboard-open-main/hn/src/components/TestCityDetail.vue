<!-- 测试用城市详情页面 -->
<template>
  <div class="city-detail-container" v-if="visible">
    <div class="city-detail-content">
      <div class="header">
        <h2>{{ cityName }} - A级景区信息</h2>
        <button class="close-btn" @click="close">&times;</button>
      </div>
      
      <div class="content">
        <div class="scenic-list">
          <!-- 直接显示测试数据 -->
          <div class="scenic-item">
            <div class="scenic-name">南岳衡山旅游区</div>
            <div class="scenic-level level-5A">5A</div>
          </div>
          <div class="scenic-item">
            <div class="scenic-name">罗荣桓故居纪念馆</div>
            <div class="scenic-level level-4A">4A</div>
          </div>
          <div class="scenic-item">
            <div class="scenic-name">蔡伦竹海旅游风景区</div>
            <div class="scenic-level level-4A">4A</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  visible: boolean
  cityName: string
}>()

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
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
</style>