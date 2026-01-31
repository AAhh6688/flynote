import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express()
const PORT = process.env.PORT || 3000

// 跨域配置
app.use(cors())
// 解析JSON
app.use(express.json())

/*************************
 * 核心配置：第三方音乐API（可自由替换）
 * 示例使用公开的音乐API，你可替换为自己的音源
 *************************/
const THIRD_PARTY_API = {
  baseURL: 'https://xxx.xxx.xxx', // 替换为你的第三方音乐API地址
  searchPath: '/search/music',    // 搜索接口路径
  // 其他接口可扩展（如播放地址、歌单等）
}

// 搜索歌曲接口（转发第三方API）
app.get('/search', async (req, res) => {
  try {
    const { keyword } = req.query
    if (!keyword) {
      return res.json({ code: -1, msg: '请输入搜索关键词', data: [] })
    }
    // 调用第三方API
    const response = await axios.get(`${THIRD_PARTY_API.baseURL}${THIRD_PARTY_API.searchPath}`, {
      params: { keyword },
      timeout: 10000
    })
    // 适配第三方API返回格式（根据实际情况调整）
    const musicList = response.data.data || []
    res.json({ code: 0, msg: 'success', data: musicList })
  } catch (error) {
    console.error('转发API失败：', error.message)
    res.json({ code: -1, msg: 'API请求失败', data: [] })
  }
})

// 启动服务
app.listen(PORT, () => {
  console.log(`后端服务运行在 http://localhost:${PORT}`)
})