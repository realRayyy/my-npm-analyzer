# my-npm-analyzer

## 使用方法

1. 安装依赖

```
npm install
```

2. 编译运行

```
npm run build
npm link
npm-cli analyze
```

## 功能介绍

1. 分析 `npm` 依赖，生成 `npm-analyze.json` 数据
2. 支持 `--depth` 指定递归层级, `--json` 指定文件位置

## 待实现功能

1. 循环依赖处理（写了，但不知道对不对）
2. `npm` `pnpm` `yarn` 适配
3. 搭建本地服务器，传递分析数据到网页中
