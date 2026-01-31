import axios from 'axios'

// 后端接口地址（部署后替换为你的Docker/Cloudflare Workers地址）
const baseURL = import.meta.env.PROD ? 'https://your-backend-domain.com' : '/api'

const request = axios.create({
  baseURL,
  timeout: 10000
})

// 1. 搜索歌曲（支持指定音源）
export const searchMusic = async (keyword, source = 'kugou') => {
  try {
    const res = await request.get('/search', {
      params: { keyword, source }
    })
    return res.data
  } catch (err) {
    ElMessage.error('搜索失败：' + err.message)
    return { data: [] }
  }
}

// 2. 获取播放链接（适配不同音源）
export const getPlayUrl = async (music) => {
  try {
    const params = {
      source: music.source,
      hash: music.hash,
      albumId: music.albumId,
      songmid: music.songmid,
      id: music.id
    }
    const res = await request.get('/play', { params })
    return res.data
  } catch (err) {
    ElMessage.error('获取播放链接失败：' + err.message)
    return { data: { url: '' } }
  }
}
