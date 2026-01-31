<template>
  <div class="app-container">
    <!-- 顶部导航 -->
    <Navbar />
    <!-- 搜索区 -->
    <Search />
    <!-- 主体内容：播放列表 + 歌词 -->
    <div class="main-content">
      <!-- 播放列表 -->
      <Playlist :musicList="musicList" @play="playMusic" />
      <!-- 歌词显示 -->
      <Lyrics :currentLyrics="currentLyrics" />
    </div>
    <!-- 播放控制栏 -->
    <Player 
      :currentMusic="currentMusic" 
      :currentLyrics="currentLyrics"
      @getLyrics="getLyrics"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Search from './components/Search.vue'
import Playlist from './components/Playlist.vue'
import Lyrics from './components/Lyrics.vue'
import Player from './components/Player.vue'
import { searchMusic, getLyrics } from './api/index.js'

// 全局状态
const musicList = ref([])       // 搜索结果列表
const currentMusic = ref(null)  // 当前播放歌曲
const currentLyrics = ref('')   // 当前歌词

// 搜索歌曲（对接Search组件）
const searchMusicHandler = async (keyword) => {
  const res = await searchMusic(keyword)
  musicList.value = res.data
}

// 播放歌曲（对接Playlist组件）
const playMusic = (music) => {
  currentMusic.value = music
  // 自动获取歌词
  getLyricsHandler(music.id)
}

// 获取歌词
const getLyricsHandler = async (songId) => {
  const res = await getLyrics(songId)
  currentLyrics.value = res.data
}

// 暴露方法给子组件
defineExpose({ 
  searchMusic: searchMusicHandler,
  getLyrics: getLyricsHandler
})
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.main-content {
  display: flex;
  gap: 20px;
  flex: 1;
  margin: 10px 0;
}
/* 移动端适配：歌词和列表垂直排列 */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
}
</style>
