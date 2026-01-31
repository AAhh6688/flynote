<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">
        <h2>开源音乐播放器</h2>
      </div>
      <div class="nav-menu">
        <span class="menu-item">首页</span>
        <span class="menu-item">排行榜</span>
        <span class="menu-item">我的音乐</span>
      </div>
    </div>
  </nav>
</template>

<script setup>
// 无需额外逻辑
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 999;
}

.logo h2 {
  font-size: 18px;
  color: #2c3e50;
  font-weight: 700;
}

.nav-menu {
  display: flex;
  gap: 30px;
}

.menu-item {
  cursor: pointer;
  color: #666;
  font-size: 14px;
}

.menu-item:hover {
  color: #409eff;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .nav-menu {
    gap: 15px;
  }
  .logo h2 {
    font-size: 16px;
  }
}
</style>
