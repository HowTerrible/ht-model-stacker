import type { WipStatus } from '../enums/wip';
import type { DateTimeString, Id, TimestampFields } from './common';

/** 烂尾记录（开封但未完成） */
export interface Wip extends TimestampFields {
  id: Id;
  userId: Id;
  productId: Id;
  /** 开工时间 */
  startedAt: DateTimeString;
  /** 完成进度 0-100 */
  progress: number;
  status: WipStatus;
  notes?: string;
}

export interface WipQuery {
  userId: Id;
  status?: WipStatus;
  page?: number;
  pageSize?: number;
}
