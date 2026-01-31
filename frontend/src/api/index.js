import axios from 'axios';
import { store } from '../store/index.js';

// 后端接口地址（部署后替换为你的Docker后端公网地址）
const baseURL = import.meta.env.PROD ? 'https://your-backend-domain.com' : '/api';

const request = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 1. 多类型搜索
export const searchMusic = async (type, keyword, source) => {
  try {
    const res = await request.post('/search', {
      type,
      keyword,
      source: source || store.getSources()[0].url
    });
    return res.data;
  } catch (err) {
    ElMessage.error(`搜索失败：${err.message}`);
    return { data: [] };
  }
};

// 2. 获取歌单/专辑详情
export const getDetail = async (type, id, source) => {
  try {
    const res = await request.post('/detail', {
      type,
      id,
      source: source || store.getSources()[0].url
    });
    return res.data;
  } catch (err) {
    ElMessage.error(`获取详情失败：${err.message}`);
    return { data: [] };
  }
};

// 3. 获取歌词
export const getLyrics = async (id, source) => {
  try {
    const res = await request.post('/lyric', {
      id,
      source: source || store.getSources()[0].url
    });
    return res.data;
  } catch (err) {
    ElMessage.error(`获取歌词失败：${err.message}`);
    return { data: '暂无歌词' };
  }
};
