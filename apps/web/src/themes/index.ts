import type { AppTheme } from './types';
import day from './day';
import night from './night';

export type { AppTheme };

/** 可用主题列表（新增主题时在此注册即可） */
export const availableThemes: AppTheme[] = [day, night];

export const DEFAULT_THEME_ID = day.id;

/** 按 id 获取主题，未知 id 回退默认主题 */
export function getAppThemeById(id: string): AppTheme {
  return availableThemes.find((theme) => theme.id === id) ?? availableThemes[0];
}
