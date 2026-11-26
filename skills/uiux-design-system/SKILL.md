---
name: uiux-design-system
description: 搭建设计系统：语义 token（颜色/间距/圆角/阴影/字体）、组件契约与变体、状态矩阵。需要把视觉方向落成可复用、可交接的规范时使用。
whenToUse: 风格已定，需要产出 tokens、组件契约、状态矩阵，或为某个页面 / 组件补规范时。
---

# 设计系统：把方向落成契约

设计系统的价值在于**约束**：让不同的页面、不同的人做出来是一套东西。
产出是文本契约 + token 文件，不是口头约定。

token 角色说明见 `references/token-roles.md`；token 模板见 `assets/design-tokens.md`。

## 第一步：先有语义，再有数值

写 token 的顺序永远是「角色 → 数值」，不是「找一个好看的颜色」。

- 颜色：`color.bg` / `color.surface` / `color.border` / `color.text` / `color.textMuted` /
  `color.primary` / `color.onPrimary` / `color.success` / `color.warning` / `color.danger` / `color.info`。
- 间距：4 或 8 的倍数阶（`space.1..12`）。
- 圆角：`radius.sm/md/lg/full`。
- 阴影：`shadow.sm/md/lg`（层级，不是装饰）。
- 字体：`font.sans` / `font.mono`，字号阶 `text.xs..3xl`，行高与字重成对。

## 第二步：组件契约

每个组件写清：结构、变体（variant）、尺寸、状态、可访问性。

必写状态（缺一不可）：`default / hover / focus / active / disabled / loading /
error / empty`（列表类加 `long-list`）。

变体优先用「语义属性」而不是「颜色名」：`primary`/`secondary`/`ghost`/`danger`，
而不是 `purple`/`gray`。

## 第三步：状态矩阵

按「屏 × 状态」列矩阵。每格要么指到一张图/线框，要么写「不适用 + 原因」。
列了就必须有产出；空白不允许。

## 第四步：自检

- 实现里不应出现裸 hex / px（除 token 定义处）。
- 对比度：正文 ≥ 4.5:1，大字 ≥ 3:1。
- 每个交互元素有可见 focus 态。
- 深色模式单独定义，不是反色。

## 反合理化

| 借口 | 现实 |
|---|---|
| 先写页面，token 后面统一 | 页面结构决定 token 组合，补不回来 |
| 这个组件特殊，加个新色 | 例外写进组件契约并说明理由，不是偷偷加 hex |
| 状态太多，先做 default | 空/加载/错误态是产品的一部分，不是附属 |
| 颜色名挺好懂 | 换成语义名，换肤和深色模式才有解 |
