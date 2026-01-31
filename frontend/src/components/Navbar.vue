<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">
        <h2>音乐播放器</h2>
      </div>
      <div class="menu">
        <span class="menu-item">首页</span>
        <span class="menu-item">排行榜</span>
        <span class="menu-item">我的音乐</span>
      </div>
    </div>
  </nav>
</template>

<script setup>
// 保留原逻辑（无）
</script>

<style scoped>
.logo h2 {
  font-size: 18px;
  color: #2c3e50;
  font-weight: 700;
  font-family: "Microsoft YaHei";
}

.menu {
  display: flex;
  gap: 30px;
}

.menu-item {
  cursor: pointer;
  color: #666;
  font-family: "Microsoft YaHei";
}

.menu-item:hover {
  color: #409eff;
}
</style>
