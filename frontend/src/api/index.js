import axios from 'axios';
import { store } from '../store';

// 后端地址（部署后替换为你的Docker公网地址）
const baseURL = import.meta.env.PROD ? 'https://你的后端地址' : '/api';

const request = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// 1. 多类型搜索（和原项目功能一致）
export const search = async (type, keyword, source) => {
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

// 2. 歌单/专辑详情（原项目功能）
export const getDetail = async (type, id, source) => {
  try {
    const res = await request.post('/detail', { type, id, source });
    return res.data;
  } catch (err) {
    ElMessage.error(`获取详情失败：${err.message}`);
    return { data: [] };
  }
};

// 3. 获取歌词（原项目功能）
export const getLyric = async (id, source) => {
  try {
    const res = await request.post('/lyric', { id, source });
    return res.data;
  } catch (err) {
    ElMessage.error(`获取歌词失败：${err.message}`);
    return { data: '暂无歌词' };
  }
};
