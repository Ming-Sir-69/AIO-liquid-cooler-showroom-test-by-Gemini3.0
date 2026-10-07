<picture>
  <source media="(prefers-color-scheme: dark)" srcset="readme-assets/header-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="readme-assets/header-light.svg">
  <img alt="极寒水冷展览馆 · ✦ EricMingle69" src="readme-assets/header-light.svg" width="100%">
</picture>

<p align="center">
  <a href="README.md">简体中文</a> · <a href="README.en.md">English</a> · <a href="PERSONAL-NOTICE.md">✦ EricMingle69</a>
</p>

# 极寒水冷展览馆

一个 React、TypeScript 与 Vite 的一体式水冷产品展示实验。
页面提供中文、英语、越南语，支持品牌/产品切换、规格面板与主题切换。

**价格与规格是演示数据**：规格由 `generateSpecs()` 生成，价格为静态值，不作为采购依据或官方产品参数。

## 本地查看

准备 Node.js 与 npm，在仓库根目录执行：

```sh
npm install
npm run dev
```

Vite 配置端口为 `3000`；实际地址以终端输出为准。
当前页面读取本地展示数据，本地查看无需 Gemini Key。

## 构建和预览

```sh
npm run build
npm run preview
```

外部图片或其他资源的可用性会影响展示效果。

## 从文件进入

| 文件 | 内容 |
| --- | --- |
| [App.tsx](App.tsx) | 页面交互与组件 |
| [constants.ts](constants.ts) | 三种语言与演示产品数据 |
| [types.ts](types.ts) | 数据类型 |
| [package.json](package.json) · [vite.config.ts](vite.config.ts) | 依赖、脚本与开发服务 |

## 原始入口与使用范围

项目来自 [AI Studio 应用入口](https://ai.studio/apps/drive/16qPAXZwGodMRXrRyjoLsEQxHa2X4dQUh)，访问权限由 AI Studio 决定。
模板预留了 Gemini 环境定义，后续服务接入需另行确认。
仓库没有覆盖原代码和资源的 LICENSE；品牌名称与第三方资源保留各自归属。

---

文档维护：**✦ EricMingle69** · [Ming-Sir-69](https://github.com/Ming-Sir-69)  
[个人标识、许可与权限说明](PERSONAL-NOTICE.md) · 明暗页眉随 GitHub 主题自动切换。
