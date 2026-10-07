<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 极寒水冷展览馆 · AIO X-TREME Showroom

一个用于展示一体式水冷产品的交互网页实验，适合查看前端展示效果、学习 React 页面组织与多语言界面。页面提供中、英、越南语内容、品牌与产品切换、规格面板及主题切换。

**这里的价格与规格是界面演示数据。** `constants.ts` 中的规格由 `generateSpecs()` 生成，价格为静态内容；请勿把它们作为实测结果、官方参数或采购依据。

## 本地查看

需要 Node.js 与 npm。在仓库根目录执行：

```bash
npm install
npm run dev
```

Vite 配置使用端口 `3000`，启动后查看终端给出的地址。构建与预览脚本分别是 `npm run build`、`npm run preview`。

原 AI Studio 入口：[View your app in AI Studio](https://ai.studio/apps/drive/16qPAXZwGodMRXrRyjoLsEQxHa2X4dQUh)。该入口的访问权限以 AI Studio 为准。原模板预留了 `.env.local` 中的 `GEMINI_API_KEY` 配置；当前页面使用本地展示数据，本地查看无需填写 Gemini Key；后续服务接入待确认。

## 目录入口

| 文件 | 用途 |
| --- | --- |
| [App.tsx](App.tsx) | 交互与页面组件 |
| [constants.ts](constants.ts) | 多语言文案、品牌与演示产品数据 |
| [types.ts](types.ts) | 页面数据类型 |
| [index.tsx](index.tsx) / [index.html](index.html) | 页面入口 |
| [package.json](package.json) / [vite.config.ts](vite.config.ts) | 依赖、脚本与开发服务配置 |

## 状态与贡献

当前版本为前端展示实验，`package.json` 标记版本 `0.0.0`。页面包含外部资源引用，资源可用性会影响展示效果。欢迎通过 Issue 或 Pull Request 改进语言表达、响应式布局与演示数据标识；如补充真实产品资料，请注明官方来源与核对日期。

## 维护与许可

仓库维护：[Ming-Sir-69](https://github.com/Ming-Sir-69)。品牌名称及第三方资源保留各自归属。仓库尚未提供 LICENSE 或 NOTICE，代码与资源的复用许可待确认。
