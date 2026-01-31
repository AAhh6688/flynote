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
import { searchMusic, getPlayUrl } from './api/index.js'

// 全局音乐列表和当前播放歌曲
const musicList = ref([])
const currentMusic = ref(null)

// 搜索歌曲（接收音源参数）
const searchMusicHandler = async (keyword, source) => {
  const res = await searchMusic(keyword, source)
  musicList.value = res.data
}

// 播放歌曲（先获取播放链接）
const playMusic = async (music) => {
  // 获取播放链接
  const playRes = await getPlayUrl(music)
  if (playRes.code === 0 && playRes.data.url) {
    // 给歌曲添加播放链接
    currentMusic.value = { ...music, url: playRes.data.url }
  } else {
    ElMessage.error(playRes.msg || '获取播放链接失败')
  }
}

// 暴露方法给Search组件
defineExpose({ searchMusic: searchMusicHandler })
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
