# dsh-agent-uiux

> 在本仓库工作的 agent 请先读 [AGENTS.md](./AGENTS.md)。

`dsh-agent-uiux` 是 dsh 的 **UI/UX 设计师领域原生单包**：装这一个包，就能得到

- **设计师 persona**：由 preset 层的 `uiux-assets` 注册进该 preset 的 system prompt，随 preset 组合启停；
- **8 个只读领域 Skill**：方向定位 → 设计智能推荐 → 设计系统 → 前端品味层 → 线框 → 效果图 → 评审 → 交接；
- **1 个 agent preset**：`uiux`，由 `cordis.patch.yml` 装配。

零外部核心依赖：`peerDependencies` 里的 `@deepseek-ai/*` 只提供类型与运行时服务契约，
由 dsh 侧提供，用户无需单独安装。Skill 为**原生只读**：正文只来自包内 `skills/`，
不写盘、不被改写。

## 为什么单独抽出来

UI/UX 原来挂在 CTO 的 `designer` 子 preset 上。把它独立成角色包后：

- 角色边界清楚：设计师只管设计与交接，不下场写产品代码；
- 可以单独调度：驿传按 kind 派单时，设计类工作可以投给专职 UIUX 会话；
- 技能可独立演进：设计 Skill 的迭代不牵动 CTO 包。

## 技能清单

| Skill | 用途 |
|---|---|
| `uiux-discovery` | 前期定位：产品类型、用户、场景、约束 → design brief |
| `uiux-pro` | 设计智能推荐：风格 / 配色 / 字体配对 / 动效基调 |
| `uiux-design-system` | 语义 token、组件契约、状态矩阵 |
| `uiux-frontend-design` | 字体 / 动效 / 背景 / 主题，反 AI-slop |
| `uiux-wireframe` | 黑白低保真线框，先定结构 |
| `uiux-prototype` | 三视口 × 状态矩阵确定性效果图 |
| `uiux-design-review` | 按 rubric 打分与评审，产出修改清单 |
| `uiux-handoff` | design_ref 交接、拆 dev 卡、验收口径 |

## 安装

前置：dsh `>=0.2.1-rc.2 <0.3.0`、Node ≥ `22.19.0`、pnpm ≥ `11.7.0`。

```bash
# 在仓库根目录：安装依赖并编译（产出 dist-server/）
pnpm install
pnpm build

# 装进指定 profile（首次使用会自动初始化 profile）
dsh plugin --profile <p> add link:$PWD
```

`link:` 安装的是当前目录，改动后需要 `pnpm build` 重新生成 `dist-server/`；`main`
指向 `dist-server/index.js`。

> **注意（多角色同一 profile）**：一个 profile 只装一个角色包时，本包的
> `agent-preset-registry.default` 生效；与 CTO / PM / Dev 合装时，默认 preset 由
> 部署侧决定（本包只额外注册 `uiux` preset，不抢默认）。

## 与部署侧的关系

- 派单路由（kind → preset）在 worker 侧的 kit 配置（`worker.presetByKind`），
  不在本包、也不在平台。新增 `ux` 类工作项时，kit 加一行 `ux: uiux` 即可。
- 本包不声明 tools 实现；工具面由 `cordis.patch.yml` 组合 dsh 内置插件提供。

## 兼容性

| dsh 版本 | 结论 |
|---|---|
| `0.2.1-rc.2` | 已验证（manifest + patch 组合 + 冷启动探针） |
| `0.2.2-rc.1`（latest） | 已验证 |
| `0.2.2-rc.2`（next） | 预警线 |

兼容范围唯一真源是 `package.json` 的 `engines.dsh`；放宽/收缩前必须 `pnpm compat <版本>` 实测。
CI 每日巡检（`.github/workflows/dsh-compat.yml`），不兼容自动开 issue。

## 本地验收

```bash
pnpm build && pnpm test && pnpm verify:install && npm pack --dry-run
```

## 许可

Apache-2.0
