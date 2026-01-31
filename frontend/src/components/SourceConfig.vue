<template>
  <div class="source-config-box">
    <h3>音源配置</h3>
    <el-form :model="sourceForm" label-width="80px" @submit.prevent="addSource">
      <el-form-item label="音源名称">
        <el-input v-model="sourceForm.name" placeholder="如：自定义音源1" />
      </el-form-item>
      <el-form-item label="音源地址">
        <el-input v-model="sourceForm.url" placeholder="如：https://api.xxx.com/meting" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addSource">添加音源</el-button>
      </el-form-item>
    </el-form>
    
    <div class="source-list">
      <h4>已添加音源</h4>
      <el-list border :data="sources">
        <el-list-item v-for="item in sources" :key="item.url">
          <span>{{ item.name }}：{{ item.url }}</span>
        </el-list-item>
      </el-list>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { store } from '../store/index.js';

// 响应式数据
const sourceForm = ref({
  name: '',
  url: ''
});
const sources = ref(store.getSources());

// 监听音源变化
watch(() => store.getSources(), (newVal) => {
  sources.value = newVal;
});

// 添加音源
const addSource = () => {
  if (!sourceForm.name || !sourceForm.url) {
    return ElMessage.warning('请填写完整的音源信息！');
  }
  // 校验URL格式
  try {
    new URL(sourceForm.url);
  } catch (err) {
    return ElMessage.error('音源地址格式错误！');
  }
  store.addSource({
    name: sourceForm.name,
    url: sourceForm.url
  });
  // 重置表单
  sourceForm.value = { name: '', url: '' };
  ElMessage.success('音源添加成功！');
};
</script>

<style scoped>
.source-config-box {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
}

.source-list {
  margin-top: 20px;
}

.source-list h4 {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}
</style>
