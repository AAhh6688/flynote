<template>
  <div class="player-container">
    <!-- 当前播放歌曲信息 -->
    <div class="player-info" v-if="currentMusic">
      <div class="name">{{ currentMusic.name }}</div>
      <div class="singer">{{ currentMusic.singer }}</div>
    </div>
    <!-- 播放控制按钮 -->
    <div class="player-controls">
      <el-button 
        icon="el-icon-play" 
        @click="togglePlay"
        type="primary"
        :disabled="!currentMusic"
      >{{ isPlaying ? '暂停' : '播放' }}</el-button>
      <el-button 
        icon="el-icon-refresh-right" 
        @click="nextMusic"
        :disabled="!currentMusic"
      >下一曲</el-button>
    </div>
    <!-- 隐藏的音频标签 -->
    <audio 
      ref="audioRef" 
      :src="currentMusic?.url" 
      @play="handlePlay"
      @pause="handlePause"
      @ended="handleEnded"
      @error="handleError"
    ></audio>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue'

// 接收父组件的参数
const props = defineProps({
  currentMusic: {
    type: Object,
    default: null
  },
  currentLyrics: {
    type: String,
    default: ''
  }
})

// 音频实例
const audioRef = ref(null)
// 播放状态
const isPlaying = ref(false)

// 监听当前歌曲变化（自动播放）
watch(() => props.currentMusic, (newMusic) => {
  if (newMusic && newMusic.url) {
    // 重置播放状态
    isPlaying.value = false
    // 加载新音频
    audioRef.value.src = newMusic.url
    // 自动播放
    audioRef.value.play().then(() => {
      isPlaying.value = true
    }).catch(err => {
      ElMessage.error(`播放失败：${err.message}`)
    })
  } else if (!newMusic) {
    // 无歌曲时暂停
    audioRef.value?.pause()
    isPlaying.value = false
  }
})

// 播放/暂停切换
const togglePlay = () => {
  if (!props.currentMusic) return
  
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play().catch(err => {
      ElMessage.error(`播放失败：${err.message}`)
    })
  }
  isPlaying.value = !isPlaying.value
}

// 播放事件
const handlePlay = () => {
  isPlaying.value = true
}

// 暂停事件
const handlePause = () => {
  isPlaying.value = false
}

// 播放结束
const handleEnded = () => {
  isPlaying.value = false
  ElMessage.info('歌曲播放完毕')
}

// 播放错误
const handleError = () => {
  isPlaying.value = false
  ElMessage.error('音频播放失败，请检查播放链接是否有效')
}

// 下一曲（简易版，可扩展）
const nextMusic = () => {
  ElMessage.info('下一曲功能可自行扩展～')
}
</script>

<style scoped>
.player-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
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
  overflow: hidden;
}
.player-info .name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.player-info .singer {
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.player-controls {
  display: flex;
  gap: 10px;
}
audio {
  display: none;
}
/* 移动端适配 */
@media (max-width: 768px) {
  .player-container {
    height: 80px;
    flex-direction: column;
    padding: 5px 10px;
    justify-content: center;
  }
  .player-info {
    text-align: center;
    margin-bottom: 5px;
  }
}
</style>
