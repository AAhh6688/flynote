<template>
  <!-- 和原WIN10桌面版完全一致的布局 -->
  <div class="app">
    <!-- 顶部导航（原样式） -->
    <Navbar />
    
    <!-- 主体内容（原布局） -->
    <div class="container main-content">
      <!-- 左侧：搜索+音源配置（原位置） -->
      <div class="left-panel">
        <Search @search="handleSearch" />
        <SourceConfig />
      </div>
      
      <!-- 中间：内容区（搜索结果/收藏，原布局） -->
      <div class="center-panel">
        <el-tabs v-model="activeTab" type="card">
          <el-tab-pane label="搜索结果" name="search">
            <Playlist 
              :list="searchResult" 
              @play="handlePlay" 
              @collect="handleCollect"
            />
          </el-tab-pane>
          <el-tab-pane label="我的收藏" name="collect">
            <Collection 
              :songs="collectSongs" 
              :playlists="collectPlaylists"
              @play="handlePlay"
              @remove="handleRemoveCollect"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
      
      <!-- 右侧：歌词（原位置） -->
      <div class="right-panel">
        <div class="lyric-box">
          <h3>歌词</h3>
          <div class="lyric-content">
            <pre>{{ currentLyric }}</pre>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部播放栏（原样式） -->
    <Player 
      :currentSong="currentSong" 
      @getLyric="handleGetLyric"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Navbar from './components/Navbar.vue';
import Search from './components/Search.vue';
import SourceConfig from './components/SourceConfig.vue';
import Playlist from './components/Playlist.vue';
import Collection from './components/Collection.vue';
import Player from './components/Player.vue';
import { search, getLyric } from './api';
import { store } from './store';

// 响应式数据（和原项目一致）
const activeTab = ref('search');
const searchResult = ref([]);
const currentSong = ref(null);
const currentLyric = ref('暂无歌词');
const collectSongs = computed(() => store.getCollectSongs());
const collectPlaylists = computed(() => store.getCollectPlaylists());

// 搜索（原项目功能）
const handleSearch = async (type, keyword, source) => {
  const res = await search(type, keyword, source);
  searchResult.value = res.data;
  activeTab.value = 'search';
};

// 播放歌曲（原项目功能）
const handlePlay = (song) => {
  currentSong.value = song;
  handleGetLyric(song.id, song.source);
};

// 获取歌词（原项目功能）
const handleGetLyric = async (id, source) => {
  const res = await getLyric(id, source);
  currentLyric.value = res.data;
};

// 收藏（原项目功能）
const handleCollect = (item) => {
  if (item.type === 'playlist' || item.album) {
    store.addCollectPlaylist(item);
  } else {
    store.addCollectSong(item);
  }
  ElMessage.success('收藏成功！');
};

// 取消收藏（原项目功能）
const handleRemoveCollect = (type, id) => {
  if (type === 'song') {
    store.removeCollectSong(id);
  } else {
    store.removeCollectPlaylist(id);
  }
  ElMessage.success('取消收藏成功！');
};
</script>

<style scoped>
/* 和原WIN10桌面版一致的布局样式 */
.main-content {
  display: flex;
  gap: 20px;
  padding: 20px 0;
  min-height: calc(100vh - 140px);
}

.left-panel {
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.center-panel {
  flex: 1;
}

.right-panel {
  width: 300px;
}

.lyric-box {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  height: 400px;
}

.lyric-content {
  height: 340px;
  overflow-y: auto;
  line-height: 2;
  white-space: pre-wrap;
  color: #666;
  font-family: "Microsoft YaHei";
}

/* 移动端适配（新增，不影响PC端原布局） */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
  .left-panel, .right-panel {
    width: 100%;
  }
  .lyric-box {
    height: 200px;
  }
  .lyric-content {
    height: 140px;
  }
}
</style>
