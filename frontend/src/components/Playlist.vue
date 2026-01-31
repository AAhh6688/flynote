<template>
  <div class="playlist-container">
    <h3>搜索结果</h3>
    <el-table 
      :data="musicList" 
      border 
      @row-click="handlePlay"
      :empty-text="emptyText"
    >
      <el-table-column prop="name" label="歌曲名" width="200" />
      <el-table-column prop="singer" label="歌手" width="150" />
      <el-table-column prop="album" label="专辑" />
    </el-table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

// 接收父组件的音乐列表
const props = defineProps({
  musicList: {
    type: Array,
    default: () => []
  }
})

// 触发播放事件
const emit = defineEmits(['play'])

// 空列表提示
const emptyText = computed(() => {
  return props.musicList.length === 0 ? '暂无搜索结果，请换关键词试试' : ''
})

// 点击歌曲行播放
const handlePlay = (row) => {
  emit('play', row)
}
</script>

<style scoped>
.playlist-container {
  flex: 1;
  min-width: 300px;
}
.el-table {
  --el-table-row-hover-bg-color: #f5f7fa;
}
</style>
