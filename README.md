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

# 提交代码
npm run commit

# 发版
npm run release -- -r major (1.0.0=>2.0.0)
npm run release -- -r minor (1.0.0=>1.1.0)
npm run release -- -r patch (1.0.0=>1.0.1)
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
4. webpack分析(http://webpack.github.io/analyse/) 。
5. 有关代码风格，参照prettier(https://prettier.io/docs/en/options.html) ，自行配置。
6. 代码提交使用了 commitlint 规范(https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#type-enum) 。
7. 更多发版指令详见(https://github.com/conventional-changelog/standard-version) 。

## TODO:
1. add DefinePlugin
2. update to webpack 5
3. add jest test
