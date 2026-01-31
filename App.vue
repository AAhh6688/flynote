<template>
  <div class="app-container">
    <!-- 顶部导航 -->
    <Navbar />
    <!-- 搜索区 -->
    <Search />
    <!-- 播放列表 -->
    <Playlist :musicList="musicList" @play="playMusic" />
    <!-- 播放控制栏 -->
    <Player :currentMusic="currentMusic" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Search from './components/Search.vue'
import Playlist from './components/Playlist.vue'
import Player from './components/Player.vue'

// 全局音乐列表和当前播放歌曲
const musicList = ref([])
const currentMusic = ref(null)

// 搜索歌曲（对接Search组件）
const searchMusic = async (keyword) => {
  const res = await import('./api/index.js').then(mod => mod.searchMusic(keyword))
  musicList.value = res.data
}

// 播放歌曲（对接Playlist组件）
const playMusic = (music) => {
  currentMusic.value = music
}

// 暴露方法给Search组件
defineExpose({ searchMusic })
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>