<template>
  <div class="collection-box">
    <el-tabs v-model="collectTab">
      <el-tab-pane label="收藏单曲" name="songs">
        <el-table 
          :data="collectSongs" 
          border 
          @row-click="handlePlay"
          :empty-text="'暂无收藏单曲'"
        >
          <el-table-column prop="name" label="歌曲名" min-width="200" />
          <el-table-column prop="singer" label="歌手" min-width="150" />
          <el-table-column prop="album" label="专辑" />
          <el-table-column label="操作" width="100">
            <template #default="scope">
              <el-button 
                type="text" 
                icon="el-icon-delete" 
                @click.stop="handleRemove('song', scope.row.id)"
                style="color: #f56c6c"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      
      <el-tab-pane label="收藏歌单" name="playlists">
        <el-table 
          :data="collectPlaylists" 
          border 
          @row-click="handlePlay"
          :empty-text="'暂无收藏歌单'"
        >
          <el-table-column prop="name" label="歌单名" min-width="200" />
          <el-table-column prop="singer" label="创建者" min-width="150" />
          <el-table-column label="操作" width="100">
            <template #default="scope">
              <el-button 
                type="text" 
                icon="el-icon-delete" 
                @click.stop="handleRemove('playlist', scope.row.id)"
                style="color: #f56c6c"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

// 接收参数
const props = defineProps({
  collectSongs: {
    type: Array,
    default: () => []
  },
  collectPlaylists: {
    type: Array,
    default: () => []
  }
});

// 触发事件
const emit = defineEmits(['play', 'remove']);

// 响应式数据
const collectTab = ref('songs');

// 播放
const handlePlay = (row) => {
  emit('play', row);
};

// 移除收藏
const handleRemove = (type, id) => {
  emit('remove', type, id);
};
</script>

<style scoped>
.collection-box {
  background: #fff;
  border-radius: 8px;
  padding: 10px;
}
</style>
