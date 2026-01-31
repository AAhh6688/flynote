<template>
  <div class="player-container">
    <div class="player-info" v-if="currentMusic">
      <span>{{ currentMusic.name }} - {{ currentMusic.singer }}</span>
    </div>
    <div class="player-controls">
      <el-button icon="el-icon-refresh-left" @click="prevMusic">上一曲</el-button>
      <el-button 
        :icon="isPlaying ? 'el-icon-pause' : 'el-icon-play'" 
        @click="togglePlay"
        type="primary"
        :disabled="!currentMusic?.url"
      >{{ isPlaying ? '暂停' : '播放' }}</el-button>
      <el-button icon="el-icon-refresh-right" @click="nextMusic">下一曲</el-button>
      <audio ref="audioRef" :src="currentMusic?.url" @ended="nextMusic" @error="playError"></audio>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue'
const props = defineProps({
  currentMusic: {
    type: Object,
    default: null
  }
})
const audioRef = ref(null)
const isPlaying = ref(false)

// 监听当前歌曲变化，自动播放
watch(() => props.currentMusic, (newVal) => {
  if (newVal && newVal.url) {
    isPlaying.value = true
    audioRef.value.play().catch(err => {
      ElMessage.error('播放失败：' + err.message)
      isPlaying.value = false
    })
  }
})

// 播放/暂停切换
const togglePlay = () => {
  if (!currentMusic.value?.url) return
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play().catch(err => {
      ElMessage.error('播放失败：' + err.message)
    })
  }
  isPlaying.value = !isPlaying.value
}

// 播放错误提示
const playError = () => {
  ElMessage.error('音频播放失败，请检查播放链接是否有效')
  isPlaying.value = false
}

// 上一曲/下一曲（简易版，可自行扩展）
const prevMusic = () => {
  ElMessage.info('暂未实现上一曲，可自行扩展')
}
const nextMusic = () => {
  ElMessage.info('暂未实现下一曲，可自行扩展')
}
</script>

<style scoped>
.player-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 999;
}
.player-info {
  flex: 1;
}
.player-controls {
  display: flex;
  gap: 10px;
}
audio {
  display: none;
}
</style>
