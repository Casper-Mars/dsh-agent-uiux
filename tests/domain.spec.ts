/**
 * `uiux` 领域数据（`src/domain.ts` + `src/persona.ts`）的声明契约。
 *
 * 断言四件事：
 *   1. 声明的 Skill 集合与 `skills/` 目录精确相等（不多不少）；
 *   2. 每个 SKILL.md 的 frontmatter 三字段非空，name 等于目录名，
 *      description 与领域声明逐字一致；
 *   3. 随包 `references/` / `assets/` 的每个文件存在且非空；
 *   4. 人设与 `UIUX_DOMAIN.personaMarkdown` 同源，且不超过 90 行、包含必需章节。
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { UIUX_DOMAIN } from '../src/domain'
import { parseFirmwareSkillMarkdown } from '../src/firmware'
import { UIUX_PERSONA } from '../src/persona'

/** 包根：源码态 `tests/` 的上一级。 */
const REPO_ROOT = fileURLToPath(new URL('..', import.meta.url))
const SKILLS_ROOT = path.join(REPO_ROOT, 'skills')

/** 期望的 Skill（顺序与 `UIUX_DOMAIN.skills` 的稳定声明顺序一致）。 */
const EXPECTED_SKILL_NAMES = [
  'uiux-discovery',
  'uiux-pro',
  'uiux-design-system',
  'uiux-frontend-design',
  'uiux-wireframe',
  'uiux-prototype',
  'uiux-design-review',
  'uiux-handoff',
]

/** 人设行数硬上限。 */
const PERSONA_MAX_LINES = 90

/** `skills/` 下的一级目录名（排序后）。 */
function skillDirectories(): string[] {
  return readdirSync(SKILLS_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
}

/** 读取并解析某个 Skill 的 SKILL.md。 */
function readSkillFrontmatter(name: string) {
  const file = path.join(SKILLS_ROOT, name, 'SKILL.md')
  return parseFirmwareSkillMarkdown(readFileSync(file, 'utf8'), file)
}

/** 递归列出目录下的全部文件（相对目录）。 */
function allFiles(dir: string): string[] {
  if (!existsSync(dir)) return []
  const results: string[] = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name)
    if (entry.isDirectory()) results.push(...allFiles(abs).map((rel) => path.join(entry.name, rel)))
    else if (entry.isFile()) results.push(entry.name)
  }
  return results.sort()
}

describe('UIUX_DOMAIN 声明', () => {
  it('身份字段稳定，Skill 清单唯一且顺序固定', () => {
    expect(UIUX_DOMAIN.id).toBe('uiux')
    expect(UIUX_DOMAIN.version).toMatch(/^\d+\.\d+\.\d+$/)
    expect(UIUX_DOMAIN.displayName.length).toBeGreaterThan(0)

    const names = UIUX_DOMAIN.skills.map((skill) => skill.name)
    expect(names).toEqual(EXPECTED_SKILL_NAMES)
    expect(new Set(names).size).toBe(names.length)
  })

  it('声明的 Skill 集合与 skills/ 目录精确相等（不多不少）', () => {
    const declared = UIUX_DOMAIN.skills.map((skill) => skill.name).sort()
    expect(declared).toEqual(skillDirectories())
  })
})

describe.each(EXPECTED_SKILL_NAMES)('Skill %s', (name) => {
  const declared = UIUX_DOMAIN.skills.find((skill) => skill.name === name)

  it('已声明且 dir 是存在的一级目录绝对路径', () => {
    expect(declared).toBeDefined()
    const dir = (declared as { dir: string }).dir
    expect(path.isAbsolute(dir)).toBe(true)
    expect(path.basename(dir)).toBe(name)
    expect(path.dirname(dir)).toBe(SKILLS_ROOT)
    expect(existsSync(dir)).toBe(true)
    expect(statSync(dir).isDirectory()).toBe(true)
    expect(existsSync(path.join(dir, 'SKILL.md'))).toBe(true)
  })

  it('frontmatter 三字段非空，name 与目录名 / 声明名一致，description 与声明逐字一致', () => {
    const declaredSkill = declared as { name: string; description: string; dir: string }
    const parsed = readSkillFrontmatter(name)

    expect(parsed.name).toBe(name)
    expect(parsed.name).toBe(declaredSkill.name)
    expect(parsed.name).toBe(path.basename(declaredSkill.dir))
    expect(parsed.description.trim()).not.toBe('')
    expect(parsed.whenToUse.trim()).not.toBe('')

    // 模型侧描述与 SKILL.md frontmatter 必须同源，避免两处漂移。
    expect(declaredSkill.description).toBe(parsed.description)

    // 正文已剥离 frontmatter。
    expect(parsed.content.startsWith('---')).toBe(false)
    expect(parsed.content.trim().length).toBeGreaterThan(0)
  })

  it('随包 references/ 与 assets/ 下的文件非空', () => {
    for (const subdir of ['references', 'assets']) {
      const dir = path.join(SKILLS_ROOT, name, subdir)
      for (const file of allFiles(dir)) {
        expect(statSync(path.join(dir, file)).size, `${name}/${subdir}/${file} 为空`).toBeGreaterThan(0)
      }
    }
  })
})

describe('UI/UX 人设', () => {
  it('UIUX_PERSONA 与 UIUX_DOMAIN.personaMarkdown 同源（同一字符串）', () => {
    expect(UIUX_PERSONA).toBe(UIUX_DOMAIN.personaMarkdown)
  })

  it('以角色标题开头，且不超过 90 行', () => {
    const lines = UIUX_PERSONA.split('\n')
    expect(lines.length).toBeLessThanOrEqual(PERSONA_MAX_LINES)
    expect(UIUX_PERSONA.startsWith('# UI/UX 设计师')).toBe(true)
    expect(UIUX_PERSONA.trim().length).toBeGreaterThan(0)
  })

  it('承载表达风格 / 硬边界 / 交接 / 升级 / 红线', () => {
    expect(UIUX_PERSONA).toContain('## 表达风格')
    expect(UIUX_PERSONA).toContain('身份：')
    expect(UIUX_PERSONA).toContain('## 硬边界')
    expect(UIUX_PERSONA).toContain('## 交接')
    expect(UIUX_PERSONA).toContain('## 升级')
    expect(UIUX_PERSONA).toContain('## 红线')
  })

  it('不夹带流程检查清单（清单属于 Skill，不属于 persona）', () => {
    expect(UIUX_PERSONA).not.toContain('- [ ]')
  })
})
