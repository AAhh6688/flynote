<template>
  <div class="playlist-container">
    <h3>搜索结果</h3>
    <el-table :data="musicList" border @row-click="handlePlay">
      <el-table-column prop="name" label="歌曲名" />
      <el-table-column prop="singer" label="歌手" />
      <el-table-column prop="album" label="专辑" />
    </el-table>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
// 接收父组件的音乐列表
const props = defineProps({
  musicList: {
    type: Array,
    default: () => []
  }
})
// 触发播放事件
const emit = defineEmits(['play'])

const handlePlay = (row) => {
  emit('play', row)
}
</script>

<style scoped>
.playlist-container {
  flex: 1;
  margin: 10px 0;
}
.el-table {
  --el-table-row-hover-bg-color: #f5f7fa;
}
</style>