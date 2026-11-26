# 设计交接单：<项目 / 屏>

## design_ref

`<commit sha>`

## 覆盖的屏

- <screen 1>
- <screen 2>

## 覆盖的状态

| 屏 | default | empty | loading | error | 其他 |
|---|---|---|---|---|---|
| <screen> | [ ] | [ ] | [ ] | [ ] | long-list |

## 不在本期

- <明确排除项>

## 评审结论

- 通过，总分 <x>/10。

## 给 dev 的要点

- 按 tokens 实现，禁止裸 hex / px。
- 断点：<...>
- 动效：<时长 / 缓动 / reduced-motion>

## 给 tester 的验收

- 对照 `design/refs/<screen>__<viewport>__<theme>__<state>.png`。
- 偏差回设计卡，不在实现里改。
