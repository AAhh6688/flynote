<template>
  <div class="search-container">
    <el-input
      v-model="keyword"
      placeholder="输入歌曲/歌手名（如：周杰伦 晴天）"
      suffix-icon="el-icon-search"
      @keyup.enter="handleSearch"
      class="search-input"
    />
    <el-button type="primary" @click="handleSearch">搜索</el-button>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
const keyword = ref('')
// 获取父组件的搜索方法
const { proxy } = getCurrentInstance()

const handleSearch = () => {
  if (!keyword.value.trim()) {
    return ElMessage.warning('请输入搜索关键词！')
  }
  // 调用父组件的搜索方法
  proxy.searchMusic(keyword.value)
}
</script>

<style scoped>
.search-container {
  display: flex;
  gap: 10px;
  padding: 10px 0;
  align-items: center;
}
.search-input {
  flex: 1;
}
/* 移动端适配 */
@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
