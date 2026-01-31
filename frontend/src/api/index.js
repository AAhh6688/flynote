import axios from 'axios'

// 后端接口地址（部署后替换为你的Docker后端地址，如：https://music-backend.xxx.com）
const baseURL = import.meta.env.PROD ? 'https://music.gdstudio.org' : '/api'

// 创建请求实例
const request = axios.create({
  baseURL,
  timeout: 10000
})

// 搜索歌曲
export const searchMusic = async (keyword) => {
  try {
    const res = await request.get('/search', {
      params: { keyword }
    })
    return res.data
  } catch (err) {
    ElMessage.error(`搜索失败：${err.message}`)
    return { data: [] }
  }
}

// 获取歌词
export const getLyrics = async (songId) => {
  try {
    const res = await request.get('/lyric', {
      params: { id: songId }
    })
    return res.data
  } catch (err) {
    ElMessage.error(`获取歌词失败：${err.message}`)
    return { data: '暂无歌词' }
  }
}

