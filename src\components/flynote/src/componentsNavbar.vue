<template>
  <nav class="navbar">
    <div class="logo">开源音乐播放器</div>
    <div class="nav-menu">
      <span class="menu-item" :class="{ active: activeTab === 'home' }">首页</span>
      <span class="menu-item" :class="{ active: activeTab === 'my' }">我的收藏</span>
      <span class="menu-item" :class="{ active: activeTab === 'setting' }">音源设置</span>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const activeTab = ref('home')
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}
.logo {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
}
.nav-menu {
  display: flex;
  gap: 30px;
}
.menu-item {
  cursor: pointer;
  color: #666;
}
.menu-item.active {
  color: #409eff;
  font-weight: bold;
}
/* 移动端适配 */
@media (max-width: 768px) {
  .nav-menu {
    gap: 15px;
  }
  .logo {
    font-size: 16px;
  }
}
</style>
