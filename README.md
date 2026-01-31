music-player/
├── frontend/          # 前端代码（Cloudflare Pages部署）
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── main.js
│   │   ├── App.vue
│   │   ├── components/
│   │   │   ├── Navbar.vue       # 顶部导航
│   │   │   ├── Search.vue       # 搜索框
│   │   │   ├── Playlist.vue     # 播放列表
│   │   │   └── Player.vue       # 播放控制栏
│   │   ├── api/
│   │   │   └── index.js         # API请求封装（对接后端）
│   │   └── styles/
│   │       └── global.css       # 全局样式
├── backend/           # 后端代码（Docker部署）
│   ├── package.json
│   ├── index.js                # Express服务（转发第三方API）
│   ├── Dockerfile              # Docker构建文件
│   └── .dockerignore
└── README.md          # 部署说明
