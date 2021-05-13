# webpack4-multi-page

## webpack4.44, js, glob, js/css 分割压缩, babel, polyfill, gzip

## no Vue

## no React

## no jQuery

## use url-loader instead of file-loader

## use art-template instead of html-loader

## 项目预览 firebase

https://webpack4-multi-page.web.app

## DEV

```bash
# 克隆项目
git clone https://github.com/Oda-T/webpack4-multi-page.git

# 进入项目目录
cd webpack4-multi-page

# 安装依赖
npm instal
cnpm instal

# 启动服务
npm run dev
```

## PROD

```bash
# 构建生产环境
npm run build

# 构建GithubPage版本
npm run build:gh

# 构建本地serve环境，可自定义publicPath
npm run build:stage
```

## NOTE: 压缩图片使用 image-webpack-loader 或 image-minimizer-webpack-plugin，请使用 cnpm 安装依赖，或者使用 npm 代理
