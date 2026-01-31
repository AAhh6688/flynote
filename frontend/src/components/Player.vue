<template>
  <div class="player-bar">
    <div class="container">
      <!-- 歌曲信息 -->
      <div class="song-info" v-if="currentSong">
        <div class="name">{{ currentSong.name }}</div>
        <div class="singer">{{ currentSong.singer }}</div>
      </div>
      
      <!-- 播放控制 -->
      <div class="player-controls">
        <el-button icon="el-icon-skip-back" @click="prevSong">上一曲</el-button>
        <el-button 
          :icon="isPlaying ? 'el-icon-pause' : 'el-icon-play'" 
          @click="togglePlay"
          type="primary"
          :disabled="!currentSong"
        >{{ isPlaying ? '暂停' : '播放' }}</el-button>
        <el-button icon="el-icon-skip-forward" @click="nextSong">下一曲</el-button>
      </div>
      
      <!-- 进度条 -->
      <div class="progress-bar" v-if="currentSong">
        <el-slider 
          v-model="currentTime" 
          :max="duration" 
          @change="seek"
          width="200px"
        />
        <span class="time">{{ formatTime(currentTime) }}/{{ formatTime(duration) }}</span>
      </div>
    </div>
    
    <!-- 隐藏的音频标签 -->
    <audio 
      ref="audioRef" 
      :src="currentSong?.url" 
      @play="handlePlay"
      @pause="handlePause"
      @timeupdate="handleTimeUpdate"
      @loadedmetadata="handleLoadedMetadata"
      @ended="handleEnded"
      @error="handleError"
    ></audio>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';

// 接收参数
const props = defineProps({
  currentSong: {
    type: Object,
    default: null
  }
});

// 触发事件
const emit = defineEmits(['getLyrics']);

// 响应式数据
const audioRef = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

// 监听当前歌曲变化
watch(() => props.currentSong, (newSong) => {
  if (newSong && newSong.url) {
    // 重置状态
    isPlaying.value = false;
    currentTime.value = 0;
    duration.value = 0;
    // 加载新音频
    audioRef.value.src = newSong.url;
    // 自动播放
    audioRef.value.play().then(() => {
      isPlaying.value = true;
      // 获取歌词
      emit('getLyrics', newSong.id, newSong.source);
    }).catch(err => {
      ElMessage.error(`播放失败：${err.message}`);
    });
  } else if (!newSong) {
    audioRef.value?.pause();
    isPlaying.value = false;
  }
});

// 播放/暂停切换
const togglePlay = () => {
  if (!props.currentSong) return;
  if (isPlaying.value) {
    audioRef.value.pause();
  } else {
    audioRef.value.play().catch(err => {
      ElMessage.error(`播放失败：${err.message}`);
    });
  }
  isPlaying.value = !isPlaying.value;
};

// 上一曲/下一曲（简易版，可扩展）
const prevSong = () => {
  ElMessage.info('暂未实现上一曲，可自行扩展');
};
const nextSong = () => {
  ElMessage.info('暂未实现下一曲，可自行扩展');
};

// 进度条控制
const seek = (val) => {
  audioRef.value.currentTime = val;
  currentTime.value = val;
};

// 时间格式化
const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

// 音频事件处理
const handlePlay = () => { isPlaying.value = true; };
const handlePause = () => { isPlaying.value = false; };
const handleTimeUpdate = () => { currentTime.value = audioRef.value.currentTime; };
const handleLoadedMetadata = () => { duration.value = audioRef.value.duration; };
const handleEnded = () => {
  isPlaying.value = false;
  ElMessage.info('歌曲播放完毕');
};
const handleError = () => {
  isPlaying.value = false;
  ElMessage.error('音频播放失败，请检查播放链接是否有效');
};
</script>

<style scoped>
.player-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: #fff;
  border-top: 1px solid #eee;
  z-index: 999;
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
  color: #333;
}

.song-info .singer {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

.player-controls {
  display: flex;
  gap: 10px;
}

.progress-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.time {
  font-size: 12px;
  color: #999;
}

audio {
  display: none;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .player-bar {
    height: 70px;
  }
  .progress-bar {
    display: none;
  }
}
</style>
