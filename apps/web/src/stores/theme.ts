import { defineStore } from 'pinia';
import { availableThemes, DEFAULT_THEME_ID, getAppThemeById, type AppTheme } from '@/themes';

const THEME_STORAGE_KEY = 'app.theme';

function loadThemeId(): string {
  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved && availableThemes.some((theme) => theme.id === saved)) {
    return saved;
  }
  return DEFAULT_THEME_ID;
}

/**
 * 主题状态：将当前主题的 token 写入 :root，
 * element-plus 的 --el-* 变量被覆盖后全局组件样式随之切换。
 */
export const useThemeStore = defineStore('theme', {
  state: () => ({
    themeId: loadThemeId(),
  }),
  getters: {
    theme: (state): AppTheme => getAppThemeById(state.themeId),
    isDark: (state): boolean => !!getAppThemeById(state.themeId).dark,
  },
  actions: {
    /** 应用启动时调用一次，把持久化的主题 token 应用到文档根节点 */
    init() {
      this.apply(this.themeId);
    },
    toggle() {
      const index = availableThemes.findIndex((theme) => theme.id === this.themeId);
      const next = availableThemes[(index + 1) % availableThemes.length];
      this.switchTheme(next.id);
    },
    switchTheme(id: string) {
      if (!availableThemes.some((theme) => theme.id === id)) {
        return;
      }
      this.themeId = id;
      localStorage.setItem(THEME_STORAGE_KEY, id);
      this.apply(id);
    },
    apply(id: string) {
      const theme = getAppThemeById(id);
      const root = document.documentElement;
      for (const [key, value] of Object.entries(theme.tokens)) {
        root.style.setProperty(key, value);
      }
      root.classList.toggle('app-theme-dark', !!theme.dark);
    },
  },
});
