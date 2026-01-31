<template>
  <div class="player-bar">
    <div class="container">
      <!-- 原项目歌曲信息 -->
      <div class="song-info" v-if="currentSong">
        <div class="name">{{ currentSong.name }}</div>
        <div class="singer">{{ currentSong.singer }}</div>
      </div>
      
      <!-- 原项目播放控制 -->
      <div class="controls">
        <el-button icon="el-icon-skip-back" @click="prevSong">上一曲</el-button>
        <el-button 
          :icon="isPlaying ? 'el-icon-pause' : 'el-icon-play'" 
          @click="togglePlay"
          type="primary"
          :disabled="!currentSong"
        >{{ isPlaying ? '暂停' : '播放' }}</el-button>
        <el-button icon="el-icon-skip-forward" @click="nextSong">下一曲</el-button>
      </div>
      
      <!-- 原项目进度条 -->
      <div class="progress" v-if="currentSong">
        <el-slider 
          v-model="currentTime" 
          :max="duration" 
          @change="seek"
          width="200px"
        />
        <span>{{ formatTime(currentTime) }}/{{ formatTime(duration) }}</span>
      </div>
    </div>
    
    <!-- 网页音频标签（替换桌面版播放组件） -->
    <audio 
      ref="audioRef" 
      :src="currentSong?.url" 
      @play="handlePlay"
      @pause="handlePause"
      @timeupdate="handleTimeUpdate"
      @loadedmetadata="handleLoadedMetadata"
      @ended="handleEnded"
      @error="handleError"
      hidden
    ></audio>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  currentSong: { type: Object, default: null }
});
const emit = defineEmits(['getLyric']);

const audioRef = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

// 监听歌曲变化（原项目逻辑）
watch(() => props.currentSong, (newSong) => {
  if (newSong?.url) {
    isPlaying.value = false;
    currentTime.value = 0;
    duration.value = 0;
    audioRef.value.src = newSong.url;
    // 自动播放
    audioRef.value.play().then(() => {
      isPlaying.value = true;
      emit('getLyric', newSong.id, newSong.source);
    }).catch(err => ElMessage.error(`播放失败：${err.message}`));
  } else {
    audioRef.value?.pause();
    isPlaying.value = false;
  }
});

// 原项目播放/暂停逻辑
const togglePlay = () => {
  if (!props.currentSong) return;
  if (isPlaying.value) {
    audioRef.value.pause();
  } else {
    audioRef.value.play().catch(err => ElMessage.error(`播放失败：${err.message}`));
  }
  isPlaying.value = !isPlaying.value;
};

// 原项目上/下一曲（占位，可扩展）
const prevSong = () => ElMessage.info('暂未实现上一曲');
const nextSong = () => ElMessage.info('暂未实现下一曲');

// 进度条控制（原项目逻辑）
const seek = (val) => {
  audioRef.value.currentTime = val;
  currentTime.value = val;
};

// 时间格式化（原项目逻辑）
const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

// 音频事件（原项目逻辑）
const handlePlay = () => isPlaying.value = true;
const handlePause = () => isPlaying.value = false;
const handleTimeUpdate = () => currentTime.value = audioRef.value.currentTime;
const handleLoadedMetadata = () => duration.value = audioRef.value.duration;
const handleEnded = () => {
  isPlaying.value = false;
  ElMessage.info('播放完毕');
};
const handleError = () => {
  isPlaying.value = false;
  ElMessage.error('播放失败，请检查音源');
};
</script>

<style scoped>
/* 原项目播放栏样式 */
.player-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: #fff;
  border-top: 1px solid #eee;
  font-family: "Microsoft YaHei";
}

.player-bar .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.song-info {
  flex: 1;
}

.song-info .name {
  font-size: 14px;
  font-weight: 500;
}

.song-info .singer {
  font-size: 12px;
  color: #666;
}

.controls {
  display: flex;
  gap: 10px;
}

.progress {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .player-bar {
    height: 70px;
  }
  .progress {
    display: none;
  }
}
</style>
