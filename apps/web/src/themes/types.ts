/**
 * UI 主题定义：一组作用于 :root 的 theme token（CSS 自定义属性）。
 *
 * token 分三类：
 * - `--el-*`：element-plus 官方变量，覆盖后全局组件样式随之变化；
 * - `--app-*`：本应用的页面级变量（背景、文字等），供自定义样式引用；
 * - 其他：暂无。
 */
export interface AppTheme {
  id: string;
  name: string;
  /** 是否暗色主题（影响原生控件的 color-scheme 等） */
  dark?: boolean;
  /** theme token 表：CSS 变量名 → 值 */
  tokens: Record<string, string>;
}
