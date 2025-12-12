<!-- 顶部标题 -->
<template>
  <header class="header">湖南省旅游指标监控平台</header>
  
  <!-- 导航栏 -->
  <nav class="nav-bar">
    <ul class="nav-list">
      <li class="nav-item" :class="{ active: $route.path === '/' }">
        <router-link to="/" class="nav-link">数据大屏</router-link>
      </li>
      <li class="nav-item" :class="{ active: $route.path === '/second' }">
        <router-link to="/second" class="nav-link">营业收入</router-link>
      </li>
    </ul>
  </nav>
  
 
  
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  margin: 0 12px;
  top: 12px;
  width: calc(100% - 24px);
  height: 87px;
  background: url('@/assets/images/顶部标题.png') no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 800;
  letter-spacing: 12px;
  color: rgba(230, 239, 253);
}

.nav-bar {
  position: absolute;
  top: 50px;
  left: 24px;
  z-index: 100;
}

.nav-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 20px;
}

.nav-item {
  padding: 8px 16px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.nav-item:hover {
  background: rgba(218, 163, 88, 0.4);
  transform: translateY(-2px);
}

.nav-item.active {
  background: rgba(218, 163, 88, 0.6);
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
}

.text-carousel {
  position: absolute;
  top: 150px;
  left: 50%;
  width: 744px;
  height: 43px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, rgba(218, 163, 88, 0), rgba(218, 163, 88, 0.6), rgba(218, 163, 88, 0));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  overflow: hidden;
  cursor: pointer;
  pointer-events: all;
  &:hover {
    background: linear-gradient(90deg, rgba(218, 163, 88, 0.1), rgba(218, 163, 88, 0.7), rgba(218, 163, 88, 0.1));
  }
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-carousel-item {
  position: absolute;
  width: 100%;
  text-align: center;
  padding: 0 20px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: translateY(0);
  opacity: 1;
}

// 轮播动画样式
.carousel-enter-active,
.carousel-leave-active {
  transition: all 0.5s ease-in-out;
}

.carousel-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.carousel-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.carousel-enter-to,
.carousel-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
