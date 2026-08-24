import type { Id, TimestampFields } from './common';

/** 堆积人用户 */
export interface User extends TimestampFields {
  id: Id;
  nickname: string;
  avatarUrl?: string;
  email?: string;
  /** 手机号 */
  phone?: string;
  /** QQ 号 */
  qq?: string;
  /** 微信号 */
  wechat?: string;
  /** 权限列表（JSON 字符串形式的权限数组，如 '["ADMIN"]'，供后续权限配置使用） */
  permissions: string;
}

/** 单个统计周期数据点（用于折线图） */
export interface UserStatsPoint {
  /** 周期标识：年度如 "2025"、季度如 "2025-Q3"、月度如 "2025-08" */
  period: string;
  /** 堆积数量 */
  stackCount: number;
  /** 烂尾数量 */
  wipCount: number;
  /** 累计花费 */
  totalSpent: number;
}

/** 用户信息 + 统计摘要 */
export interface UserProfile extends User {
  /** 堆积数量 */
  stackCount: number;
  /** 烂尾数量 */
  wipCount: number;
  /** 累计花费 */
  totalSpent: number;
  /** 按年度 / 季度 / 月度统计（用于折线图展示） */
  trendStats: UserStatsPoint[];
}
