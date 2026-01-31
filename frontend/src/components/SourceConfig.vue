<template>
  <div class="source-config">
    <h3 style="font-family: 'Microsoft YaHei';">音源配置</h3>
    <el-form :model="sourceForm" label-width="80px">
      <el-form-item label="音源名称">
        <el-input v-model="sourceForm.name" placeholder="如：自定义音源" />
      </el-form-item>
      <el-form-item label="音源地址">
        <el-input v-model="sourceForm.url" placeholder="如：https://api.xxx.com/meting" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addSource">添加音源</el-button>
      </el-form-item>
    </el-form>
    
    <div class="source-list" style="margin-top: 15px;">
      <h4 style="font-family: 'Microsoft YaHei';">已添加音源</h4>
      <el-list border :data="sources">
        <el-list-item v-for="item in sources" :key="item.url">
          {{ item.name }}：{{ item.url }}
        </el-list-item>
      </el-list>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { store } from '../store';

const sourceForm = ref({ name: '', url: '' });
const sources = ref(store.getSources());

// 监听音源变化
watch(() => store.getSources(), (newVal) => {
  sources.value = newVal;
});

// 添加第三方API音源
const addSource = () => {
  if (!sourceForm.name || !sourceForm.url) {
    return ElMessage.warning('请填写完整音源信息！');
  }
  // 校验URL格式
  try {
    new URL(sourceForm.url);
  } catch (err) {
    return ElMessage.error('音源地址格式错误！');
  }
  store.addSource(sourceForm.value);
  sourceForm.value = { name: '', url: '' };
  ElMessage.success('音源添加成功！');
};
</script>

<style scoped>
.source-config {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
}
</style>
