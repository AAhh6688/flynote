<template>
  <el-tabs v-model="activeTab" style="font-family: 'Microsoft YaHei';">
    <el-tab-pane label="收藏单曲" name="song">
      <el-table 
        :data="songs" 
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
    
    <el-tab-pane label="收藏歌单" name="playlist">
      <el-table 
        :data="playlists" 
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
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  songs: { type: Array, default: () => [] },
  playlists: { type: Array, default: () => [] }
});
const emit = defineEmits(['play', 'remove']);

const activeTab = ref('song');

// 原项目播放逻辑
const handlePlay = (row) => emit('play', row);
// 原项目删除收藏逻辑
const handleRemove = (type, id) => emit('remove', type, id);
</script>
