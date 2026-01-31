<template>
  <div class="search-container">
    <el-select v-model="selectedSource" class="source-select" placeholder="选择音源">
      <el-option label="酷狗音乐" value="kugou" />
      <el-option label="QQ音乐" value="qq" />
      <el-option label="通用音源" value="common" />
    </el-select>
    <el-input
      v-model="keyword"
      placeholder="输入歌曲/歌手名搜索"
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
const selectedSource = ref('kugou') // 默认选择酷狗音乐
// 获取父组件的searchMusic方法
const { proxy } = getCurrentInstance()

const handleSearch = () => {
  if (!keyword.value.trim()) {
    return ElMessage.warning('请输入搜索关键词')
  }
  // 传递音源参数给父组件
  proxy.searchMusic(keyword.value, selectedSource.value)
}
</script>

<style scoped>
.search-container {
  display: flex;
  gap: 10px;
  padding: 10px 0;
  align-items: center;
}
.source-select {
  width: 120px;
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
  .source-select {
    width: 100%;
  }
}
</style>
