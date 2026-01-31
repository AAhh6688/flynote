import { createApp } from 'vue';
import ElementPlus from 'element-plus'; // 原项目UI（保留）
import 'element-plus/dist/index.css';
import App from './App.vue';
import './styles/global.css'; // 原项目样式（保留）

// 创建网页应用（替换桌面版入口）
const app = createApp(App);
app.use(ElementPlus);
app.mount('#app'); // 挂载到网页根容器
