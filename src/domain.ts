/**
 * `uiux` 领域数据：Skill 元数据与设计师人设，不依赖任何外部领域包。
 *
 * 单包声明 8 个只读 Skill，覆盖 UI/UX 的完整链路：方向定位 → 设计智能推荐 →
 * 设计系统 → 前端品味层 → 线框 → 效果图 → 评审 → 交接。{@link UIUXSkill} 只存
 * 元数据（name / description / dir），SKILL.md 正文由加载器从 `dir/SKILL.md` 读取，
 * 正文不内联进 `src/`。
 *
 * `dir` 一律由 `import.meta.url` 推导为**绝对路径**：源码态 `src/domain.ts`
 * 与编译态 `dist-server/domain.js` 都解析到包根的 `skills/<name>`。
 */
import { fileURLToPath } from 'node:url'
import { UIUX_PERSONA } from './persona.js'

/** 领域内单个 Skill 的元数据（正文不入库，由加载器从 `dir/SKILL.md` 读取）。 */
export interface UIUXSkill {
  /** Skill 名，必须与目录名及 frontmatter.name 一致。 */
  readonly name: string
  /** 模型侧可见的一句话描述（与 frontmatter.description 逐字一致）。 */
  readonly description: string
  /** Skill 目录的绝对路径。 */
  readonly dir: string
}

/** `uiux` 领域数据。 */
export interface UIUXDomain {
  /** 领域标识。 */
  readonly id: 'uiux'
  /** 领域版本（与 package.json 版本解耦，随领域契约变更递增）。 */
  readonly version: string
  /** 展示名。 */
  readonly displayName: string
  /** 设计师人设正文（主会话常驻）。 */
  readonly personaMarkdown: string
  /** 领域提供的全部 Skill（单一列表，顺序稳定便于 review diff）。 */
  readonly skills: readonly UIUXSkill[]
}

/** Skill 目录绝对路径：`<包根>/skills/<name>`（源码态 / 编译态同一语义）。 */
function skillDir(name: string): string {
  return fileURLToPath(new URL(`../skills/${name}`, import.meta.url))
}

/** 声明一个 Skill：name / description / dir 一次写全，dir 不允许调用方手拼。 */
function skill(name: string, description: string): UIUXSkill {
  return { name, description, dir: skillDir(name) }
}

/** `uiux` 领域：8 个只读 Skill + 设计师人设。 */
export const UIUX_DOMAIN: UIUXDomain = {
  id: 'uiux',
  version: '0.1.0',
  displayName: 'UI/UX Domain',
  personaMarkdown: UIUX_PERSONA,
  skills: [
    skill(
      'uiux-discovery',
      '界面设计的前置：搞清产品类型、目标用户、使用场景与约束，产出可执行的设计方向（design brief）。只要是在「还没想清楚要做什么界面」的阶段，就先读本技能；不用于已有方向的出图与实现。',
    ),
    skill(
      'uiux-pro',
      '设计智能推荐：按行业、产品类型与气质，给出风格方向、配色方案、字体配对与动效基调，并说明取舍理由。需要为项目定调或拿多套风格候选对比时使用。',
    ),
    skill(
      'uiux-design-system',
      '搭建设计系统：语义 token（颜色/间距/圆角/阴影/字体）、组件契约与变体、状态矩阵。需要把视觉方向落成可复用、可交接的规范时使用。',
    ),
    skill(
      'uiux-frontend-design',
      '前端设计的「品味层」：字体选择、动效、背景与主题，专治千篇一律的 AI 味（Inter + 紫渐变 + 白底）。做落地页、marketing 页或需要更强品牌感时使用。',
    ),
    skill(
      'uiux-wireframe',
      '生成低保真、黑白线框图（SVG 或查看页），只用结构说话，先不碰颜色与品牌。早期讨论布局与信息层级时使用。',
    ),
    skill(
      'uiux-prototype',
      '产出确定性效果图：三视口 × 状态矩阵，作为人工验收与视觉回归的依据。已有设计契约与 tokens、需要出图时使用。',
    ),
    skill(
      'uiux-design-review',
      '设计评审与打分：按 rubric 检查结构、token 使用、状态覆盖、可访问性与反 AI-slop，产出可执行的修改清单。设计完成、合并前或验收实现时使用。',
    ),
    skill(
      'uiux-handoff',
      '设计交接契约：design_ref、屏与状态清单、验收口径，以及 dev 实现与 tester 核对的一致性规则。提交 design 卡、拆 dev 卡或验收实现时使用。',
    ),
  ],
}
