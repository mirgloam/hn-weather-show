<template>
  <div class="warning-carousel-container">
    <div class="warning-label">🚨 预警信息</div>
    <div class="warning-carousel">
      <div class="warning-content" ref="warningContentRef">
        <div v-for="(item, index) in warningData" :key="index" class="warning-item">
          {{ item.city }}
          <span class="warning-scenic-name">{{ item.name }}</span>
          景区当日接待{{ item.current }}万人次，超过最大接待量{{ item.max }}万人次！(超{{ item.exceedPercent }}%)
        </div>
        <!-- 复制一份数据用于无缝滚动 -->
        <div v-for="(item, index) in warningData" :key="`copy-${index}`" class="warning-item">
          {{ item.city }}
          <span class="warning-scenic-name">{{ item.name }}</span>
          景区当日接待{{ item.current }}万人次，超过最大接待量{{ item.max }}万人次！(超{{ item.exceedPercent }}%)
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

// 超过最大接待量的景区数据
const warningData = ref([
  { city: '株洲市', name: '中国花湖谷', max: 1.3, current: 1.81 },
  { city: '邵阳市', name: '武冈市文化馆', max: 0.15, current: 1.48 },
  { city: '岳阳市', name: '微笑绿洲生态营地', max: 1, current: 1.44 },
  { city: '株洲市', name: '株洲市博物馆', max: 1, current: 1.18 }
])

// 计算超过最大接待量的百分比
warningData.value.forEach(item => {
  const exceedPercent = ((item.current - item.max) / item.max * 100).toFixed(1)
  item.exceedPercent = exceedPercent
})

const warningContentRef = ref<HTMLElement | null>(null)
let animationFrameId: number | null = null
let currentPosition = 0
const scrollSpeed = 0.5
let itemHeight = 0

// 计算滚动高度
const calculateScrollHeight = () => {
  if (warningContentRef.value && warningData.value.length > 0) {
    const firstItem = warningContentRef.value.querySelector('.warning-item') as HTMLElement
    if (firstItem) {
      itemHeight = firstItem.offsetHeight
    }
  }
}

// 滚动动画
const scrollAnimation = () => {
  if (warningContentRef.value) {
    currentPosition -= scrollSpeed
    // 当滚动到一半数据时，重置位置以实现无缝滚动
    if (currentPosition <= -(itemHeight * warningData.value.length)) {
      currentPosition = 0
    }
    warningContentRef.value.style.transform = `translateY(${currentPosition}px)`
  }
  animationFrameId = requestAnimationFrame(scrollAnimation)
}

onMounted(() => {
  // 等待DOM渲染完成后计算高度
  setTimeout(() => {
    calculateScrollHeight()
    scrollAnimation()
  }, 100)
  
  // 监听窗口大小变化，重新计算高度
  window.addEventListener('resize', calculateScrollHeight)
})

onBeforeUnmount(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', calculateScrollHeight)
})
</script>

<style lang="scss" scoped>
.warning-carousel-container {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 400px;
  height: 100px;
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.warning-label {
  height: 30px;
  background-color: #ff4d4f;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 0 10px rgba(255, 77, 79, 0.5);
  animation: pulse 2s infinite;
}

.warning-carousel {
  flex: 1;
  background-color: rgba(255, 77, 79, 0.1);
  border: 3px solid #ff4d4f;
  border-top: none;
  border-radius: 0 0 6px 6px;
  padding: 10px 20px;
  overflow: hidden;
  position: relative;
}

.warning-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}

.warning-item {
  color: #ff4d4f;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.warning-scenic-name {
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  background-color: #ff4d4f;
  padding: 2px 8px;
  border-radius: 4px;
  margin: 0 4px;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 10px rgba(255, 77, 79, 0.5);
}

// 脉动动画
@keyframes pulse {
  0% {
    box-shadow: 0 0 5px rgba(255, 77, 79, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 77, 79, 0.8);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 77, 79, 0.5);
  }
}
</style>