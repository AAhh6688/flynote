<template>
  <div class="playlist-box">
    <el-table 
      :data="list" 
      border 
      @row-click="handlePlay"
      :empty-text="emptyText"
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
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';

// 接收参数
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
});

// 触发事件
const emit = defineEmits(['play', 'collect']);

// 空列表提示
const emptyText = computed(() => {
  return props.list.length === 0 ? '暂无数据' : '';
});

// 播放歌曲/歌单
const handlePlay = (row) => {
  emit('play', row);
};

// 收藏
const handleCollect = (row) => {
  emit('collect', row);
};
</script>

<style scoped>
.playlist-box {
  background: #fff;
  border-radius: 8px;
  padding: 10px;
}

.el-table {
  --el-table-row-hover-bg-color: #f5f7fa;
}
</style>
