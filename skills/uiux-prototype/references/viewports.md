# 视口与状态约定

## 视口

| 名称 | 尺寸 | 用途 |
|---|---|---|
| desktop | 1440×900 | 主桌面 |
| tablet | 1024×768 | 平板 / 小笔电 |
| mobile | 390×844 | 主流手机 |

## 状态

| 状态 | 要求 |
|---|---|
| default | 有代表性数据，主操作可达 |
| empty | 有说明文案 + 下一步动作，不是白屏 |
| loading | 骨架屏或占位，不丢布局 |
| error | 错误原因 + 重试入口 |
| long-list | 列表滚动 / 虚拟化的表现 |

## 主题

- light / dark 各一套，都要单独调，不互相反色。

## 命名

`<screen>__<viewport>__<theme>__<state>.png`

例：`orders__mobile__light__empty.png`

## 可复现要求

- 关闭动画（`prefers-reduced-motion: reduce`）。
- 自托管字体。
- 固定随机数据种子。
