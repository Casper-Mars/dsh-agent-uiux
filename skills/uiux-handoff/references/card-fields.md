# 交接卡片字段

## design 卡

- `design_ref`：commit sha（必填）。
- 覆盖屏：<screen 列表>。
- 覆盖状态：每屏列出 default/empty/loading/error/...。
- 不在本期：<明确排除>。
- 评审结论：通过 / 得分。
- material：规格文件 + refs 截图。

## dev 卡

- `design_ref`：commit sha（必填）。
- 涉及屏：<screen 列表>。
- 必须覆盖状态：<清单>。
- 验收方式：对照 `refs/<screen>__<viewport>__light__<state>.png`。
- 允许偏差：仅限评审记录的项。

## 验收清单（tester）

- [ ] 结构与 refs 一致
- [ ] token 使用，无裸 hex/px
- [ ] 状态齐全
- [ ] 对比度 / 焦点达标
- [ ] 偏差已记录且经设计确认
