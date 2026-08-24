import type { AppTheme } from './types';

/** 昼间主题 */
const day: AppTheme = {
  id: 'day',
  name: '昼间',
  tokens: {
    /* ---- element-plus 基础色板（浅色） ---- */
    '--el-color-primary': '#1677ff',
    '--el-color-primary-light-3': '#5ca0ff',
    '--el-color-primary-light-5': '#8bbbff',
    '--el-color-primary-light-7': '#b9d6ff',
    '--el-color-primary-light-8': '#d0e4ff',
    '--el-color-primary-light-9': '#e8f2ff',
    '--el-color-primary-dark-2': '#125fcc',
    '--el-color-success': '#67c23a',
    '--el-color-warning': '#e6a23c',
    '--el-color-danger': '#f56c6c',
    '--el-color-error': '#f56c6c',
    '--el-color-info': '#909399',

    '--el-bg-color-page': '#f5f6f8',
    '--el-bg-color': '#ffffff',
    '--el-bg-color-overlay': '#ffffff',
    '--el-text-color-primary': '#303133',
    '--el-text-color-regular': '#606266',
    '--el-text-color-secondary': '#909399',
    '--el-text-color-placeholder': '#a8abb2',
    '--el-text-color-disabled': '#c0c4cc',
    '--el-border-color-darker': '#d4d7de',
    '--el-border-color-dark': '#cdd0d6',
    '--el-border-color': '#dcdfe6',
    '--el-border-color-light': '#e4e7ed',
    '--el-border-color-lighter': '#ebeef5',
    '--el-border-color-extra-light': '#f2f6fc',
    '--el-fill-color-darker': '#ebeced',
    '--el-fill-color-dark': '#ebedf0',
    '--el-fill-color': '#f0f2f5',
    '--el-fill-color-light': '#f5f7fa',
    '--el-fill-color-lighter': '#fafafa',
    '--el-fill-color-extra-light': '#fdfdfd',
    '--el-fill-color-blank': '#ffffff',

    /* ---- el-menu ---- */
    '--el-menu-bg-color': '#ffffff',
    '--el-menu-text-color': '#606266',
    '--el-menu-hover-bg-color': '#f5f7fa',
    '--el-menu-active-color': '#1677ff',
    '--el-menu-hover-text-color': '#1677ff',
    '--el-menu-border-color': '#e4e7ed',

    /* ---- 应用页面级 token ---- */
    '--app-page-bg': '#f5f6f8',
    '--app-surface-color': '#ffffff',
    '--app-text-color': '#333333',
    '--app-text-secondary': '#888888',
  },
};

export default day;
