<template>
  <div class="search-box">
    <el-select v-model="searchType" class="search-type" placeholder="搜索类型">
      <el-option label="歌曲" value="song" />
      <el-option label="歌手" value="singer" />
      <el-option label="歌单" value="playlist" />
      <el-option label="专辑" value="album" />
    </el-select>
    
    <el-select v-model="selectedSource" class="source-select" placeholder="选择音源">
      <el-option 
        v-for="item in sources" 
        :key="item.url" 
        :label="item.name" 
        :value="item.url"
      />
    </el-select>
    
    <el-input
      v-model="keyword"
      placeholder="输入歌曲/歌手/歌单/专辑名"
      suffix-icon="el-icon-search"
      @keyup.enter="handleSearch"
      class="search-input"
    />
    
    <el-button type="primary" @click="handleSearch">搜索</el-button>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';
import { store } from '../store/index.js';

// 响应式数据
const searchType = ref('song');
const keyword = ref('');
const sources = ref(store.getSources());
const selectedSource = ref(sources.value[0]?.url || '');

// 获取父组件的搜索方法
const { proxy } = getCurrentInstance();

// 搜索方法
const handleSearch = () => {
  if (!keyword.value.trim()) {
    return ElMessage.warning('请输入搜索关键词！');
  }
  proxy.searchHandler(searchType.value, keyword.value, selectedSource.value);
};
</script>

<style scoped>
.search-box {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.search-type, .source-select {
  width: 100%;
}

.search-input {
  width: 100%;
}

.el-button {
  width: 100%;
}
</style>
