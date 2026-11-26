/**
 * `dsh-agent-uiux` 包入口：导出 Cordis 插件三要素与 `uiux` 领域数据。
 *
 * `package.json` 的 `exports["."]` 指向本文件的编译产物
 * （`dist-server/index.js`）。
 */
export { name, apply, inject } from './plugin.js'
export { UIUX_DOMAIN, type UIUXDomain, type UIUXSkill } from './domain.js'
export { UIUX_PERSONA } from './persona.js'
