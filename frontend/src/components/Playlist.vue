<template>
  <el-table 
    :data="list" 
    border 
    @row-click="handlePlay"
    :empty-text="'暂无数据'"
    style="font-family: 'Microsoft YaHei';"
  >
    <el-table-column prop="name" label="名称" min-width="200" />
    <el-table-column prop="singer" label="歌手/创建者" min-width="150" />
    <el-table-column prop="album" label="专辑/描述" />
    <el-table-column label="操作" width="100">
      <template #default="scope">
        <el-button 
          type="text" 
          icon="el-icon-star-on" 
          @click.stop="handleCollect(scope.row)"
        >收藏</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  list: { type: Array, default: () => [] }
});
const emit = defineEmits(['play', 'collect']);

// 原项目播放逻辑
const handlePlay = (row) => emit('play', row);
// 原项目收藏逻辑
const handleCollect = (row) => emit('collect', row);
</script>
