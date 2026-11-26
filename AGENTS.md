# AGENTS.md - dsh-agent-uiux

面向在本仓库工作的 agent 的硬规则。人类安装与使用说明见 [README.md](./README.md)。

## 1. 这个仓库是什么

`dsh-agent-uiux` 是 dsh 的 UI/UX 设计师领域**原生单包**，产物是「人设 + 8 个只读
Skill + agent preset」，不是业务应用。

- **原生单包**：不依赖任何外部 agent core 包；`dsh plugin add` 装本包即可。
- **零工具**：本包不声明任何 tools 实现（无 `tools()`，也无 `toolNames` 字段）；能力由
  `cordis.patch.yml` 的 preset 组合 dsh 内置插件提供。
- **零状态**：不写盘、不建资产目录、没有 bootstrap；8 个 `uiux-*` Skill 只从包内
  `skills/` 读取并注册。
- **只读 Skill**：Skill 正文不会被运行时改写。
- **人设唯一来源**：`src/persona.ts` 的 `UIUX_PERSONA`，由 preset 层 `uiux-assets` 注入。
- **环境基线**：dsh `>=0.2.1-rc.2 <0.3.0`、Node ≥ `22.19.0`、pnpm ≥ `11.7.0`。
  兼容范围**唯一真源**是 `package.json` 的 `engines.dsh`；放宽/收缩前必须 `pnpm compat <版本>` 实测。

## 2. 角色边界

- 对「界面长什么样、状态是否齐全、实现能否照着做、好不好用」负责。
- 只写 `design/` 与 mock 目录；不修改 `src/`、`api/`、构建配置等产品代码。
- 不 `git push`、不合并、不发版；提交仅限设计目录。
- 品牌色相 / 字体家族 / 信息架构取舍：给候选与理由，留给人拍板。
- 不替 dev 做实现，不替 tester 下验收结论。

## 3. Skill 编写规则

- 一个 Skill 一个目录：`skills/<name>/SKILL.md`，frontmatter 三字段
  `name` / `description` / `whenToUse` 必须非空；`name` 等于目录名。
- `description` 必须与 `src/domain.ts` 的声明**逐字一致**（测试断言）。
- 随包文件放 `references/`（细则）与 `assets/`（模板），正文里用相对路径点名。
- 新增 / 删除 Skill 或随包文件时，同步：
  1. `src/domain.ts` 的 `skills` 列表；
  2. `scripts/verify-install.mjs` 的 `EXPECTED_*`；
  3. `scripts/compat-probe.mjs` 的 `EXPECTED_SKILLS`；
  4. `tests/domain.spec.ts` 的 `EXPECTED_SKILL_NAMES` 与 `tests/verify-install.spec.ts` 计数。

## 4. 装配规则

- `cordis.patch.yml` 只能有一个 `insert`；preset 工具面固定 14 项，顺序由
  `tests/patch.spec.ts` 钉死。
- persona 必须挂在 **preset 层**（`uiux-assets`），不得改回宿主层注入：
  宿主层只注入一次，切换 preset 会停在旧人设上。
- 只有 `tool-todo` / `tool-presentation` / `tool-subagent-fork` 与 `cordis:group`
  允许带 config，其余工具带 config 会被测试拒绝。

## 5. 验收

```bash
pnpm build && pnpm test && pnpm verify:install && npm pack --dry-run
```

CI 走 `.github/workflows/dsh-compat.yml`：自检 + 安装准入 + patch 组合 + 冷启动探针。
