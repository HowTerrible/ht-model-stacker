import type { Id, TimestampFields } from './common';

/** 堆积人用户 */
export interface User extends TimestampFields {
  id: Id;
  nickname: string;
  avatarUrl?: string;
  email?: string;
}

/** 用户信息 + 统计摘要 */
export interface UserProfile extends User {
  /** 堆积数量 */
  stackCount: number;
  /** 烂尾数量 */
  wipCount: number;
}
