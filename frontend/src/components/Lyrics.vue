<template>
  <div class="lyrics-container">
    <h3>歌词</h3>
    <div class="lyrics-content">
      <pre>{{ currentLyrics || '暂无歌词' }}</pre>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

// 接收父组件的歌词
const props = defineProps({
  currentLyrics: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.lyrics-container {
  flex: 1;
  min-width: 300px;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
}
.lyrics-content {
  height: 300px;
  overflow-y: auto;
  line-height: 2;
  font-size: 14px;
  color: #333;
  white-space: pre-wrap; /* 保留歌词换行 */
}
/* 移动端适配 */
@media (max-width: 768px) {
  .lyrics-content {
    height: 200px;
  }
}
</style>
