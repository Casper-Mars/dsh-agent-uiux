# 字体选择与排版

## 避开这些（默认货）

Inter、Roboto、Open Sans、Lato、系统默认字体——除非品牌规范明确要求。

## 推荐的字体方向

| 气质 | 字体 |
|---|---|
| 代码 / 极客 | JetBrains Mono、Fira Code、Space Grotesk |
| 编辑 / 内容 | Playfair Display、Crimson Pro、Newsreader |
| 技术理性 | IBM Plex Sans / Mono、Source Sans 3 |
| 有个性 | Bricolage Grotesque、Newsreader |
| 亲和圆润 | Nunito、Quicksand（谨慎，甜腻） |

## 配对原则

- 标题 + 正文：可同家族不同字重，或「有性格的标题 + 中性的正文」。
- 中性正文（如 IBM Plex Sans）能压住张扬的标题。
- 不要两个都在抢戏；一个负责记忆点，一个负责好读。
- 中文项目优先选有高质量中文覆盖的家族，避免拉丁字体配系统宋体导致撕裂。

## 排版细节

- 行长度 45–75 字符，超过就加 max-width。
- 标题行高 1.1–1.3，正文 1.5–1.7。
- 数字对齐用 `font-variant-numeric: tabular-nums`。
- 字号要有明显跳跃（至少 1.25 倍），不要 15/16/17 这种挤在一起。
- 字重承担层级时，同时配合字号与颜色，别只靠字重。

## 中文排版

- 中英混排加间隙，正文可用 `letter-spacing: 0.01em`。
- 标点全角与半角统一。
- 标题可适度收紧字距，正文不要。
