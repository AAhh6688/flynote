<template>
  <div class="app-wrapper">
    <!-- 顶部导航 -->
    <Navbar />
    
    <!-- 主体内容 -->
    <div class="container main-content">
      <!-- 左侧：搜索+音源配置 -->
      <div class="left-panel">
        <Search />
        <SourceConfig />
      </div>
      
      <!-- 中间：内容区（搜索结果/收藏） -->
      <div class="center-panel">
        <el-tabs v-model="activeTab" type="card">
          <el-tab-pane label="搜索结果" name="search">
            <Playlist :list="searchResult" @play="playSong" @collect="collectSong" />
          </el-tab-pane>
          <el-tab-pane label="我的收藏" name="collect">
            <Collection 
              :collectSongs="collectSongs" 
              :collectPlaylists="collectPlaylists"
              @play="playSong"
              @remove="removeCollect"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
      
      <!-- 右侧：歌词 -->
      <div class="right-panel">
        <div class="lyrics-box">
          <h3>歌词</h3>
          <div class="lyrics-content">
            <pre>{{ currentLyrics || '暂无歌词' }}</pre>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部播放控制栏 -->
    <Player 
      :currentSong="currentSong" 
      @getLyrics="getLyricsHandler"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Search from './components/Search.vue';
import SourceConfig from './components/SourceConfig.vue';
import Playlist from './components/Playlist.vue';
import Collection from './components/Collection.vue';
import Player from './components/Player.vue';
import { searchMusic, getLyrics } from './api/index.js';
import { store } from './store/index.js';

// 响应式数据
const activeTab = ref('search');
const searchResult = ref([]);
const currentSong = ref(null);
const currentLyrics = ref('');
const collectSongs = computed(() => store.getCollectSongs());
const collectPlaylists = computed(() => store.getCollectPlaylists());

// 搜索方法（传给Search组件）
const searchHandler = async (type, keyword, source) => {
  const res = await searchMusic(type, keyword, source);
  searchResult.value = res.data;
  activeTab.value = 'search';
};

// 播放歌曲
const playSong = (song) => {
  currentSong.value = song;
  getLyricsHandler(song.id, song.source);
};

// 获取歌词
const getLyricsHandler = async (songId, source) => {
  const res = await getLyrics(songId, source);
  currentLyrics.value = res.data;
};

// 收藏歌曲
const collectSong = (song) => {
  store.addCollectSong(song);
  ElMessage.success('收藏成功！');
};

// 移除收藏
const removeCollect = (type, id) => {
  if (type === 'song') {
    store.removeCollectSong(id);
  } else {
    store.removeCollectPlaylist(id);
  }
  ElMessage.success('取消收藏成功！');
};

// 暴露方法给子组件
defineExpose({
  searchHandler,
  collectSong
});
</script>

<style scoped>
.app-wrapper {
  min-height: 100vh;
}

.main-content {
  display: flex;
  gap: 20px;
  padding: 20px 0;
  flex: 1;
}

.left-panel {
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.center-panel {
  flex: 1;
}

.right-panel {
  width: 300px;
}

.lyrics-box {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  height: 400px;
}

.lyrics-content {
  height: 320px;
  overflow-y: auto;
  line-height: 2;
  white-space: pre-wrap;
  color: #666;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  .left-panel, .right-panel {
    width: 100%;
  }
  .lyrics-box {
    height: 200px;
  }
  .lyrics-content {
    height: 120px;
  }
}
</style>
