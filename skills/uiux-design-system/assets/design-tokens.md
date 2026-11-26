# Design Tokens：<项目名>

> 语义优先。数值可调，角色名保持稳定。

## 颜色

```json
{
  "color": {
    "bg": "#______",
    "surface": "#______",
    "border-subtle": "#______",
    "border-strong": "#______",
    "text": "#______",
    "text-muted": "#______",
    "text-disabled": "#______",
    "primary": "#______",
    "on-primary": "#______",
    "success": "#______",
    "warning": "#______",
    "danger": "#______",
    "info": "#______"
  }
}
```

## 间距 / 圆角 / 阴影

```json
{
  "space": { "1": "4px", "2": "8px", "3": "12px", "4": "16px", "6": "24px", "8": "32px" },
  "radius": { "sm": "6px", "md": "10px", "lg": "16px", "full": "9999px" },
  "shadow": { "sm": "0 1px 2px rgba(0,0,0,.06)", "md": "0 4px 12px rgba(0,0,0,.08)", "lg": "0 12px 32px rgba(0,0,0,.12)" }
}
```

## 字体

```json
{
  "font": { "sans": "<字体栈>", "mono": "<等宽字体栈>" },
  "text": {
    "xs": "12/16", "sm": "14/20", "base": "16/24",
    "lg": "20/28", "xl": "24/32", "2xl": "32/40"
  }
}
```

## 组件契约（示例：Button）

- 变体：primary / secondary / ghost / danger
- 尺寸：sm / md / lg
- 状态：default / hover / focus / active / disabled / loading
- 可访问性：focus 可见；禁用态有 aria-disabled；loading 不丢宽度。
