# 基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json
COPY package.json ./

# 安装依赖
RUN npm install --production

# 复制所有代码
COPY . .

# 暴露端口
EXPOSE 3000

# 启动服务
CMD ["node", "index.js"]
