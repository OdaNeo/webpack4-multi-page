# webpack4-multi-page

## webpack4.44, js, glob, js/css code split, Tailwind css, babel, polyfill, gzip
## no Vue
## no React
## no jQuery
## SEO friendly

## DEV

```bash
# 克隆项目
git clone https://github.com/Oda-T/webpack4-multi-page.git

# 进入项目目录
cd webpack4-multi-page

# 安装依赖
npm instal
cnpm instal

# 格式化项目
npm run lint

# 启动服务
npm run dev
```

## PROD

```bash
# 构建生产环境
npm run build

# 构建webpack分析版本
npm run build:profile

# 构建GithubPage版本
npm run build:gh

```

## NOTE: 
1. 压缩图片使用 image-webpack-loader 或 image-minimizer-webpack-plugin，请使用 cnpm 安装依赖，或者使用 npm 代理。
2. 自定义页面添加在 `src/pages` 目录下，入口html文件需命名为 `index.html`，入口js文件需命名为`index.js`，公共样式以及子页面样式存放在 `src/styles` 目录下。
3. 默认 `static`目录下的文件不会被压缩，有可能会影响浏览器缓存，请谨慎使用。
4. webpack分析(http://webpack.github.io/analyse/)

## TODO:
1. add DefinePlugin
2. update to webpack 5
3. add jest test
