import axios from 'axios'

// 后端接口地址（部署后替换为你的Docker/Cloudflare Workers地址）
const baseURL = import.meta.env.PROD ? 'https://your-backend-domain.com' : '/api'

const request = axios.create({
  baseURL,
  timeout: 10000
})

// 搜索歌曲（对接后端转发的第三方API）
export const searchMusic = async (keyword) => {
  try {
    const res = await request.get('/search', {
      params: { keyword }
    })
    return res.data
  } catch (err) {
    ElMessage.error('搜索失败：' + err.message)
    return { data: [] }
  }
}